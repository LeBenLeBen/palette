<template>
  <div class="group w-full">
    <input
      :value="modelValue"
      type="range"
      class="slider"
      :class="{ 'slider--hue': variant === 'hue' }"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="relative mx-[9px]">
      <div
        class="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 px-1 pb-0.5 absolute z-10 bottom-7 text-white text-sm font-bold transform -translate-x-1/2 bg-gray-700 bg-opacity-80 rounded-sm transition-opacity pointer-events-none"
        :style="tooltipStyle"
      >
        {{ modelValue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { computed, useAttrs } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  variant: {
    type: String,
    default: null,
  },
});

defineEmits(['update:modelValue']);

const attrs = useAttrs();
const tooltipStyle = computed(() => {
  const range = attrs.max - attrs.min;
  const correctedStartValue = props.modelValue - attrs.min;
  const percentage = (correctedStartValue * 100) / range;

  return { left: `${percentage}%` };
});
</script>

<style scoped>
.slider {
  @apply appearance-none block w-full p-0 bg-transparent;

  &,
  * {
    @apply cursor-pointer;
  }

  &::-webkit-slider-thumb {
    @apply appearance-none block;
    width: 18px;
    height: 18px;
    margin-top: -5px;

    @apply relative;

    @apply bg-gray-500 border-2 border-solid border-white rounded-full shadow;
  }

  &::-moz-range-thumb {
    @apply block;
    width: 14px;
    height: 14px;

    @apply bg-gray-500 border-2 border-solid border-white rounded-full shadow;
  }

  &::-webkit-slider-runnable-track {
    @apply w-full;
    height: 8px;

    @apply bg-gray-300 rounded-full;
  }

  &::-moz-range-track {
    @apply w-full;
    height: 8px;

    @apply bg-gray-300 rounded-full;
  }

  &::-moz-focus-outer {
    @apply border-0;
  }

  &:focus {
    @apply outline-none;

    &::-webkit-slider-thumb {
      @apply bg-gray-700;
    }
    &::-moz-range-thumb {
      @apply bg-gray-700;
    }
  }
}

.slider--hue {
  &::-webkit-slider-runnable-track {
    background-image: linear-gradient(
      90deg,
      red 0,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      red
    );
  }
  &::-moz-range-track {
    background-image: linear-gradient(
      90deg,
      red 0,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      red
    );
  }
}
</style>
