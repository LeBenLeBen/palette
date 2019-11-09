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
  @apply inline-block;
  @apply py-3 px-5;

  @apply uppercase text-gray-800 font-semibold;
  text-decoration: none;

  transition-property: all;
  transition-duration: 0.1s;
  transition-timing-function: ease-out;
  will-change: transform;

  &:hover,
  &:focus {
    @apply text-gray-600;
  }
}

.btn--small {
  @apply py-2 px-4;
  @apply text-sm;
}

.btn--default {
  @apply bg-white shadow border border-transparent rounded;

  &:hover,
  &:focus {
    @apply shadow-md;
  }

  &:active {
    @apply shadow-none;
  }
}

.btn--primary {
  @apply text-white;
  @apply rounded bg-gray-700 shadow;

  &:hover,
  &:focus {
    @apply text-white;
    @apply bg-gray-600;
  }

  &:active,
  &.active {
    @apply bg-gray-900;
    @apply shadow-inner;
  }
}

.btn--bare {
  @apply p-0;
}
</style>
