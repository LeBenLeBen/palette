<template>
  <ul class="colors-list list">
    <li v-for="(tint, i) in palette.tints" :key="i">
      <Color
        :tint="tint"
        :hue="palette.h"
        :index="i"
        @update:saturation="(s) => (tint.s = s)"
        @update:lightness="(l) => (tint.l = l)"
      />
    </li>
  </ul>
</template>

<script setup>
import Color from '@/components/Color.vue';

defineProps({
  palette: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.colors-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 12px;
}
</style>
