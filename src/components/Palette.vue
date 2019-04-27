<template>
  <div class="palette pdg-">
    <div class="palette__header mrgb-">
      <div class="palette__about">
        <h2 class="palette__title mrgv0" contenteditable @input="updateName">
          {{ palette.name }}
        </h2>
      </div>

      <ul
        v-if="mode === 'edit'"
        class="palette__options list flex flex-column lg-flex-row lg-justify-content-center"
      >
        <li>
          <div class="flex align-items-center">
            <label
              :for="`palette-${uid}-hue`"
              class="palette__option-label mrgr--"
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
        <li class="mrgt-- lg-mrgt0 lg-mrgl">
          <div class="flex align-items-center">
            <label
              :for="`palette-${uid}-saturation`"
              class="palette__option-label mrgr--"
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
        <button
          v-if="mode === 'edit'"
          type="button"
          class="btn btn--secondary btn--bare"
          title="Delete palette"
          @click="$emit('remove')"
        >
          <Icon id="bin" :scale="0.75" class="mrgr--" />
          Delete
        </button>
      </div>
    </div>
    <ColorsList :palette.sync="palette" :mode="mode" />
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
    mode: {
      type: String,
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

<style lang="scss" scoped>
.palette {
  background-color: white;
  border-radius: $border-radius-default;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.palette__header {
  display: grid;
  grid-template-areas: 'about actions' 'options options';
  grid-template-columns: 1fr auto;
  grid-gap: $spacing-unit-small;
  align-items: center;

  @include media('md') {
    grid-template-areas: 'about options actions';
    grid-template-columns: 1fr 2fr 1fr;
  }
}

.palette__about {
  grid-area: about;
}

.palette__title {
  display: inline-block;
  min-width: $spacing-unit-small;
  text-transform: capitalize;

  &:hover,
  &:focus {
    outline: none;
    background-color: $alt-color-lighter;
    box-shadow: 0 0 0 2px $alt-color-lighter;
  }
}

.palette__options {
  grid-area: options;
}

.palette__option-label {
  color: $alt-color-dark;
  font-size: rem(12px);
  font-weight: bold;
  text-transform: uppercase;
}

.palette__actions {
  grid-area: actions;
  justify-self: end;
}
</style>
