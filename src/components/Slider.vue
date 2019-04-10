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

<style lang="scss" scoped>
.slider {
  -webkit-appearance: none;

  display: block;
  width: 100%;
  padding: 0;

  background: transparent;

  &,
  * {
    cursor: pointer;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    display: block;
    width: 18px;
    height: 18px;
    margin-top: -2px;

    position: relative;

    background-color: $alt-color-light;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  }

  &::-moz-range-thumb {
    display: block;
    width: 14px;
    height: 14px;

    background-color: $alt-color-light;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 14px;

    background: $alt-color-lighter;
    border-radius: 10px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 14px;

    background: $alt-color-lighter;
    border-radius: 10px;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &:focus {
    outline: none;

    &::-webkit-slider-thumb {
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);
    }
    &::-moz-range-thumb {
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);
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
