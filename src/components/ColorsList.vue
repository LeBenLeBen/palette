<template>
  <ul class="colors-list list">
    <li v-for="(color, i) in palette.colors" :key="i">
      <Color
        :hue="palette.h"
        :saturation.sync="color.s"
        :lightness.sync="color.l"
        :mode="mode"
        :index="i"
      />
    </li>
  </ul>
</template>

<script>
import Color from '@/components/Color';

export default {
  components: {
    Color,
  },

  props: {
    palette: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.colors-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-gap: $spacing-unit-small;
}
</style>
