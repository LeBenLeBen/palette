<template>
  <form
    v-if="mode === 'edit'"
    action=""
    class="text-center"
    @submit.prevent="handleFormSubmit()"
  >
    <ul class="list-inline list-inline--center">
      <li>
        <label for="color" class="visible-sr">Optional color code</label>
        <input
          id="color"
          v-model="sourceColor"
          type="text"
          name="color"
          class="field"
          placeholder="#, rgb, hsl, …"
          size="15"
        />
      </li>
      <li>
        <button class="btn btn--default">
          <Icon id="add" :scale="0.75" class="mrgr--" />
          Add palette
        </button>
      </li>
    </ul>
    <div v-if="error" class="mrgt text-danger">{{ error }}</div>
  </form>
</template>

<script>
import convertColor from 'color-convert';
import colorString from 'color-string';

import { getColorName } from '@/helpers/colors';

export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
  },

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

          // Create the 10 lightness variants
          for (let min = 0; min <= 90; min += 10) {
            const max = min + 10;
            let light = min + groupLightness;
            let source = false;

            if (l >= min && l < max) {
              light = l;
              source = true;
            }

            tints.push({
              s,
              l: light,
              source,
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
