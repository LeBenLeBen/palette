<template>
  <div class="box p-4">
    <div class="palette__header mb-3">
      <div class="palette__about">
        <h2 class="palette__title" contenteditable @input="updateName">
          {{ palette.name }}
        </h2>
      </div>

      <ul class="palette__options flex flex-col lg:flex-row lg:justify-center">
        <li>
          <div class="flex items-center">
            <label
              :for="`palette-${uid}-hue`"
              class="palette__option-label mr-3"
              >Hue</label
            >
            <Slider
              :id="`palette-${uid}-hue`"
              v-model.number="palette.h"
              :min="0"
              :max="360"
              class="slider--hue"
            />
          </div>
        </li>
        <li class="mt-2 lg:mt-0 lg:ml-6">
          <div class="flex items-center">
            <label
              :for="`palette-${uid}-saturation`"
              class="palette__option-label mr-3"
              >Saturation</label
            >
            <Slider
              :id="`palette-${uid}-saturation`"
              v-model.number="palette.s"
              :min="0"
              :max="100"
            />
          </div>
        </li>
      </ul>

      <div class="palette__actions">
        <Btn
          variant="bare"
          class="hover:text-red-700 focus:text-red-700"
          title="Remove palette"
          @click="$emit('remove')"
        >
          <Icon id="bin" :scale="0.75" class="mr-1 text-gray-600" />
          Remove
        </Btn>
      </div>
    </div>
    <ColorsList :palette.sync="palette" />
  </div>
</template>

<script>
import nanoid from 'nanoid';

import ColorsList from '@/components/ColorsList';
import Slider from '@/components/Slider';

export default {
  components: {
    ColorsList,
    Slider,
  },

  props: {
    palette: {
      type: Object,
      required: true,
    },
  },

  computed: {
    uid() {
      return nanoid();
    },
  },

  watch: {
    'palette.s'() {
      this.palette.tints = this.palette.tints.map(tint => {
        tint.s = this.palette.s;
        return tint;
      });
    },
  },

  methods: {
    updateName(e) {
      this.palette.name = e.target.innerText;
    },
  },
};
</script>

<style lang="postcss" scoped>
.palette {
}

.palette__header {
  display: grid;
  grid-template-areas: 'about actions' 'options options';
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  align-items: center;

  @media (min-width: 600px) {
    grid-template-areas: 'about options actions';
    grid-template-columns: 1fr 2fr 1fr;
  }
}

.palette__about {
  grid-area: about;
}

.palette__title {
  @apply inline-block;
  @apply capitalize text-2xl;
  min-width: 10px;

  &:hover,
  &:focus {
    @apply outline-none;
    @apply bg-gray-200;
  }
}

.palette__options {
  grid-area: options;
}

.palette__option-label {
  @apply text-gray-600 text-sm font-bold uppercase;
}

.palette__actions {
  grid-area: actions;
  justify-self: end;
}
</style>
