<template>
  <div class="palette bg-white rounded-lg shadow-md p-4">
    <div class="palette__header mb-3">
      <div class="palette__about">
        <h2 class="palette__title" contenteditable @blur="updateName">
          {{ palette.name }}
        </h2>
      </div>

      <ul class="palette__options flex flex-col lg:flex-row lg:justify-center">
        <li>
          <CFormGroup v-slot="{ ids }" as="div" class="flex items-center">
            <CLabel class="palette__option-label mr-3"> Hue </CLabel>
            <Slider
              :id="ids.field"
              v-model.number="palette.h"
              :min="0"
              :max="360"
              variant="hue"
            />
          </CFormGroup>
        </li>
        <li class="mt-2 lg:mt-0 lg:ml-6">
          <CFormGroup v-slot="{ ids }" as="div" class="flex items-center">
            <CLabel class="palette__option-label mr-3"> Saturation </CLabel>
            <Slider
              :id="ids.field"
              v-model.number="palette.s"
              :min="0"
              :max="100"
            />
          </CFormGroup>
        </li>
      </ul>

      <div class="palette__actions">
        <CBtn
          class="group hover:text-red-700 focus:text-red-700"
          title="Remove palette"
          @click="removePalette"
        >
          <CIcon id="bin" class="mr-1 opacity-65" />
          Remove
        </CBtn>
      </div>
    </div>
    <ColorsList v-model:palette="palette" />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';

import { palettes } from '@/store';

import ColorsList from '@/components/ColorsList.vue';
import Slider from '@/components/Slider.vue';

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const palette = computed(() => palettes.value[props.index]);

watch(
  () => palette.value?.s,
  () => {
    if (!palette.value) return;

    palette.value.tints = palette.value.tints.map((tint) => {
      tint.s = palette.value.s;
      return tint;
    });
  }
);

const updateName = (e) => {
  palette.value.name = e.target.textContent;
};

const removePalette = () => {
  palettes.value.splice(props.index, 1);
};
</script>

<style scoped>
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
  @apply text-2xl;
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
