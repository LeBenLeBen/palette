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

<style lang="scss">
.icon {
  display: inline-block;
  vertical-align: middle;
  pointer-events: none;

  position: relative;
  top: -0.1em; // Properly align with text

  fill: currentColor;
  will-change: transform; // Prevent cropped/blurry icons on Firefox
}
</style>

<docs>
This component is available globally, you don't have to have to import it.

```vue
<Icon id="bus" :scale="2" />
```
</docs>
