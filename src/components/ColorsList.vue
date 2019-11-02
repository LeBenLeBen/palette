<template>
  <ul class="colors-list list">
    <li v-for="(tint, i) in palette.tints" :key="i">
      <Color :hue="palette.h" :tint.sync="tint" :index="i" />
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
  },
};
</script>

<style lang="postcss" scoped>
.colors-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 12px;
}
</style>
