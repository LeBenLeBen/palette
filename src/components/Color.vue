<template>
  <div>
    <div class="text-sm font-bold mb-2">
      {{ number }}
    </div>

    <CBtn
      class="color w-full"
      :style="swatchStyle"
      aria-label="Copy color to clipboard"
      @click="copy()"
    />

    <CFormGroup v-slot="{ ids }">
      <CLabel class="sr-only">Saturation</CLabel>
      <Slider
        :id="ids.field"
        :model-value="tint.s"
        :min="0"
        :max="100"
        class="mt-3 mb-2"
        @update:model-value="(s) => $emit('update:saturation', parseInt(s))"
      />
    </CFormGroup>

    <CFormGroup v-slot="{ ids }">
      <CLabel class="sr-only">Lightness</CLabel>
      <Slider
        :id="ids.field"
        :model-value="tint.l"
        :min="minLightness"
        :max="maxLightness"
        @update:model-value="(l) => $emit('update:lightness', parseInt(l))"
      />
    </CFormGroup>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';

import { targetColorMode } from '@/store';

import { convertToCSSColor } from '@/helpers/colors';

import Slider from '@/components/Slider.vue';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  hue: {
    type: Number,
    required: true,
  },
  tint: {
    type: Object,
    required: true,
  },
});

defineEmits(['update:saturation', 'update:lightness']);

const hex = computed(() =>
  convertToCSSColor(
    { h: props.hue, s: props.tint.s, l: props.tint.l },
    targetColorMode.value
  )
);
const { copy, copied } = useClipboard({ source: hex });
const text = computed(() => (copied.value ? 'Copied!' : 'Copy'));
const number = computed(
  () => [900, 800, 700, 600, 500, 400, 300, 200, 100, 50][props.index]
);
const minLightness = computed(
  () => [10, 20, 30, 40, 50, 60, 70, 80, 90, 95][props.index]
);
const maxLightness = computed(
  () => [20, 30, 40, 50, 60, 70, 80, 90, 95, 100][props.index]
);
const swatchStyle = computed(() => ({
  backgroundColor: hex.value,
  '--text': `'${text.value}'`,
}));
</script>

<style scoped>
.color {
  @apply flex flex-col items-center justify-center;
  @apply h-20 mb-2 overflow-hidden;
  @apply rounded shadow-inner;
  transition: none;

  &::before {
    content: var(--text);
    @apply hidden;
    @apply py-1 px-2;
    @apply text-white text-xs;

    background-color: rgba(0, 0, 0, 0.3);
    @apply rounded;
  }

  &:hover,
  &:focus {
    &::before {
      @apply inline-block;
    }
  }
}
</style>
