<template>
  <svg
    :class="className"
    :style="styleObj"
    aria-hidden="true"
    focusable="false"
  >
    <use :xlink:href="url" />
  </svg>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    url() {
      return `${process.env.BASE_URL}assets/icons.svg#${this.id}`;
    },

    className() {
      return [`icon icon--${this.id}`, { [`icon--${this.size}`]: this.size }];
    },

    styleObj() {
      return {
        width: `${24 * this.scale}px`,
        height: `${24 * this.scale}px`,
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  pointer-events: none;

  position: relative;
  /* Properly align with text */
  top: -0.135em;

  fill: currentColor;
  /* Prevent cropped/blurry icons on Firefox */
  will-change: transform;
}
</style>
