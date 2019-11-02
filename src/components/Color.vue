<template>
  <div>
    <div class="text-sm font-bold mb-2">
      {{ [900, 800, 700, 600, 500, 400, 300, 200, 100][index] }}
    </div>

    <Btn
      v-clipboard="hex"
      class="color"
      :style="swatchStyle"
      aria-label="Copy color to clipboard"
      block
      @click="handleCopy"
    />

    <label :for="`color-${uid}-saturation`" class="sr-only">
      Saturation
    </label>
    <Slider
      :id="`color-${uid}-saturation`"
      v-model.number="tint.s"
      :min="0"
      :max="100"
      class="mt-3 mb-2"
    />

    <label :for="`color-${uid}-lightness`" class="sr-only">
      Lightness
    </label>
    <Slider
      :id="`color-${uid}-lightness`"
      v-model.number="tint.l"
      :min="minLightness"
      :max="maxLightness"
    />
  </div>
</template>

<script>
import convertColor from 'color-convert';
import nanoid from 'nanoid';

import Slider from '@/components/Slider';

export default {
  components: {
    Slider,
  },

  props: {
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
  },

  data() {
    return {
      text: 'Copy',
    };
  },

  computed: {
    uid() {
      return nanoid();
    },

    minLightness() {
      return this.index === 0 ? 0 : this.index * 10;
    },

    maxLightness() {
      return this.index === 0 ? 10 : this.index * 10 + 10;
    },

    swatchStyle() {
      return {
        backgroundColor: this.hex,
        '--text': `'${this.text}'`,
      };
    },

    hex() {
      return `#${convertColor.hsl.hex(this.hue, this.tint.s, this.tint.l)}`;
    },
  },

  beforeDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },

  methods: {
    handleCopy() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.text = 'Copied!';
      this.timeout = setTimeout(() => {
        this.text = 'Copy';
      }, 2000);
    },
  },
};
</script>

<style lang="postcss" scoped>
.color {
  @apply flex flex-col items-center justify-center;
  @apply h-20 mb-2 overflow-hidden;
  @apply rounded shadow-inner;

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

  &:focus-visible {
    &::before {
      content: 'Copied!';
    }
  }
}

.color__action {
  @apply hidden;
  @apply absolute;
}
</style>
