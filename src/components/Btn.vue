<template>
  <component
    :is="tag"
    :class="classNames"
    v-bind="attributes"
    v-on="$listeners"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'Btn',

  inheritAttrs: false,

  props: {
    /**
     * The HTML tag used for the button.
     */
    tag: {
      type: String,
      default: 'button',
    },
    /**
     * The `type` attribute for input and button tags
     */
    type: {
      type: String,
      default: 'button',
    },
    /**
     * The style of the button:
     * `default, primary, bare`
     */
    variant: {
      type: String,
      default: null,
    },
    /**
     * The button size:
     * `small, large`
     */
    size: {
      type: String,
      default: null,
    },
    /**
     * Make the button takes 100% of the parent width
     */
    block: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    attributes() {
      return Object.assign(
        {},
        {
          // Set type attribute only on button/input tags and defaults to `button`
          ...(this.type &&
            ['input', 'button'].indexOf(this.tag) > -1 && { type: this.type }),
        },
        this.$attrs
      );
    },

    classNames() {
      return [
        'btn',
        { 'block w-full': this.block },
        { [`btn--${this.variant}`]: !!this.variant },
        { [`btn--${this.size}`]: !!this.size },
        { [this.disabledClass]: this.disabled },
      ];
    },
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply uppercase text-gray-800 font-semibold;
  transition: all 0.1s ease-out;

  &:hover,
  &:focus {
    @apply text-gray-600;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

.btn--default {
  @apply py-3 px-5;
  @apply uppercase text-gray-800 font-semibold;
  @apply bg-white shadow border border-transparent rounded;

  will-change: transform;

  &:hover,
  &:focus {
    @apply text-gray-800;
    @apply shadow-md;
  }

  &:active {
    @apply shadow-none;
  }
}
</style>
