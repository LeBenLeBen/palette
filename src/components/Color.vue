<template>
  <div>
    <div class="mrgb-">
      <strong>{{
        [900, 800, 700, 600, 500, 400, 300, 200, 100, 50][index]
      }}</strong>
    </div>
    <div class="color mrgb-" :style="swatchStyle"></div>
    <template v-if="mode === 'edit'">
      <Slider v-model.number="saturation" :min="0" :max="100" class="mrgb--" />
      <Slider
        v-model.number="lightness"
        :min="minLightness"
        :max="maxLightness"
      />
    </template>
    <ul v-else class="list-stacked list-stacked--tiny">
      <li>
        <button
          v-clipboard="hsl"
          type="button"
          class="btn btn--bare btn--ghost"
        >
          {{ hsl }}
        </button>
      </li>
      <li>
        <button
          v-clipboard="rgb"
          type="button"
          class="btn btn--bare btn--ghost"
        >
          {{ rgb }}
        </button>
      </li>
      <li>
        <button
          v-clipboard="hex"
          type="button"
          class="btn btn--bare btn--ghost"
        >
          {{ hex }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import convertColor from 'color-convert';

import Slider from '@/components/Slider';

export default {
  components: {
    Slider,
  },

  props: {
    index: {
      type: Number,
      required: true,
    },
    hue: {
      type: Number,
      required: true,
    },
    saturation: {
      type: Number,
      required: true,
    },
    lightness: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },

  computed: {
    minLightness() {
      return this.index === 0 ? 0 : this.index * 10;
    },

    maxLightness() {
      return this.index === 0 ? 10 : this.index * 10 + 10;
    },

    swatchStyle() {
      return {
        backgroundColor: this.hsl,
      };
    },

    hsl() {
      return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    },

    rgb() {
      const [r, g, b] = convertColor.hsl.rgb(
        this.hue,
        this.saturation,
        this.lightness
      );
      return `rgb(${r}, ${g}, ${b})`;
    },

    hex() {
      return `#${convertColor.hsl.hex(
        this.hue,
        this.saturation,
        this.lightness
      )}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.color {
  overflow: hidden;
  padding-top: 50%;

  border-radius: $border-radius-default;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15) inset;
}
</style>
