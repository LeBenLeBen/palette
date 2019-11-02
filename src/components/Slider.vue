<template>
  <!--
    min/max attributes are explicitely provided otherwise
    it prevents the initial value from going beyond 100 for some reasons
  -->
  <input
    :value="value"
    type="range"
    class="slider"
    :min="$attrs.min"
    :max="$attrs.max"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
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
    margin-top: -2px;

    @apply relative;

    @apply bg-gray-500 border-2 border-white rounded-full shadow;
  }

  &::-moz-range-thumb {
    @apply block;
    width: 14px;
    height: 14px;

    @apply bg-gray-500 border-2 border-white rounded-full shadow;
  }

  &::-webkit-slider-runnable-track {
    @apply w-full;
    height: 14px;

    @apply bg-gray-300 rounded-full;
  }

  &::-moz-range-track {
    @apply w-full;
    height: 14px;

    @apply bg-gray-300 rounded-full;
  }

  &::-moz-focus-outer {
    @apply border-0;
  }

  &:focus {
    @apply outline-none;

    &::-webkit-slider-thumb {
      @apply shadow-outline;
    }
    &::-moz-range-thumb {
      @apply shadow-outline;
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
