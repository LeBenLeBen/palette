<template>
  <form
    class="flex flex-col sm:flex-row justify-center"
    @submit.prevent="handleFormSubmit"
  >
    <CFormGroup v-slot="{ ids }" as="div">
      <CLabel class="sr-only">Optional color code</CLabel>
      <CTextField
        id="color"
        v-model="sourceColor"
        type="text"
        name="color"
        class="sm:w-auto"
        placeholder="#, rgb, hsl, …"
        size="15"
        :aria-describedby="ids.error"
      />
      <div v-if="error" :id="ids.error" class="mt-2 text-sm text-red-700">
        {{ error }}
      </div>
    </CFormGroup>

    <div class="mt-3 sm:mt-0 sm:ml-4">
      <CBtn type="submit" variant="default medium" class="w-full sm:w-auto">
        <CIcon id="add" class="mr-2 -my-1 text-gray-600" />
        Add color
      </CBtn>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import convertColor from 'color-convert';
import colorString from 'color-string';

import { addPalette, palettes } from '@/store';

import { getColorName } from '@/helpers/colors';

const sourceColor = ref('');
const error = ref('');

const handleFormSubmit = () => {
  error.value = '';

  if (sourceColor.value) {
    // Try to parse the given color
    const color = colorString.get(sourceColor.value);

    if (color) {
      // Convert given color to HSL if necessary
      const [h, s, l] =
        color.model === 'hsl'
          ? color.value
          : convertColor[color.model].hsl(color.value);

      // Determine the original color lightness value for its group
      const lightnessString = l.toString();
      const groupLightness = parseInt(
        lightnessString.length === 1 ? lightnessString[0] : lightnessString[1]
      );
      const thresholds = [95, 90, 80, 70, 60, 50, 40, 30, 20, 10];
      let tints = Array(10).fill(null);
      const initialIndex = thresholds.findIndex((t) => t <= l);

      // Place the given color at the correct index based on its lightness
      tints[initialIndex] = { s, l };

      // Generate the other lightnesses based on the given color lightness
      tints = tints.map((tint, i) => {
        if (tint) return tint;

        // Cap the lightness between the group min/max values
        const l = Math.max(
          Math.min(
            i === 0 ? 100 : thresholds[i - 1],
            thresholds[i] + groupLightness
          ),
          thresholds[i]
        );

        return { s, l };
      });

      tints.reverse();

      const hex = convertColor[color.model].hex(color.value);
      palettes.value.push({
        name: getColorName(hex),
        h,
        s,
        tints,
      });

      sourceColor.value = '';
    } else {
      error.value = 'Invalid color code.';
    }
  } else {
    addPalette();
  }
};
</script>
