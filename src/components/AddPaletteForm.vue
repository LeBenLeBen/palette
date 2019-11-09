<template>
  <form
    action=""
    class="flex flex-col sm:flex-row justify-center"
    @submit.prevent="handleFormSubmit()"
  >
    <div>
      <label for="color" class="sr-only">Optional color code</label>
      <input
        id="color"
        v-model="sourceColor"
        type="text"
        name="color"
        class="field sm:w-auto"
        placeholder="#, rgb, hsl, …"
        size="15"
      />
      <div v-if="error" class="mt-2 text-sm text-red-700">{{ error }}</div>
    </div>
    <div class="mt-3 sm:mt-0 sm:ml-4">
      <Btn type="submit" variant="default" class="w-full sm:w-auto">
        <Icon id="add" :scale="0.75" class="mr-2 text-gray-600" />
        Add color
      </Btn>
    </div>
  </form>
</template>

<script>
import convertColor from 'color-convert';
import colorString from 'color-string';

import { getColorName } from '@/helpers/colors';

export default {
  data() {
    return {
      sourceColor: '',
      error: '',
    };
  },

  methods: {
    handleFormSubmit() {
      this.error = '';

      if (this.sourceColor) {
        // Try to parse the given color
        const color = colorString.get(this.sourceColor);

        if (color) {
          // Convert given color to HSL if necessary
          const [h, s, l] =
            color.model === 'hsl'
              ? color.value
              : convertColor[color.model].hsl(color.value);

          // Determine the original color lightness value for its group
          const lightnessString = l.toString();
          const groupLightness = parseInt(
            lightnessString.length === 1
              ? lightnessString[0]
              : lightnessString[1]
          );
          const tints = [];

          // Create the 9 lightness variants
          for (let min = 90; min >= 10; min -= 10) {
            let light = min + groupLightness;
            tints.push({
              s,
              l: light,
            });
          }

          const hex = convertColor[color.model].hex(color.value);
          this.$emit('add', {
            name: getColorName(hex),
            h,
            s,
            tints,
          });

          this.sourceColor = '';
        } else {
          this.error = 'Invalid color code.';
        }
      } else {
        this.$emit('add');
      }
    },
  },
};
</script>
