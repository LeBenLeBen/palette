<template>
  <div class="app">
    <header class="app-header flex align-items-center justify-content-between">
      <h1 class="mrgv0">Palette</h1>
      <ul class="list-inline">
        <li class="btn-group">
          <button
            type="button"
            :class="['btn btn--dark', { active: mode === 'edit' }]"
            @click="mode = 'edit'"
          >
            Edit
          </button>
          <button
            type="button"
            :class="['btn btn--dark', { active: mode === 'use' }]"
            @click="mode = 'use'"
          >
            Use
          </button>
        </li>
      </ul>
    </header>
    <main class="app-content">
      <ul v-if="palettes.length" class="list-stacked list-stacked--large">
        <li v-for="(palette, i) in palettes" :key="i">
          <Palette
            :palette.sync="palette"
            :mode="mode"
            @remove="removePalette(i)"
          />
        </li>
      </ul>
      <div v-else class="text-large text-center mrgv">
        No palettes.
      </div>
      <AddPaletteForm :mode="mode" class="mrgt+" @add="handleFormAdd" />
    </main>
  </div>
</template>

<script>
import convertColor from 'color-convert';

import { getColorName } from '@/helpers/colors';
import Palette from '@/components/Palette';
import AddPaletteForm from '@/components/AddPaletteForm';

export default {
  name: 'App',

  components: {
    Palette,
    AddPaletteForm,
  },

  data() {
    return {
      mode: 'edit',
      palettes: [],
    };
  },

  mounted() {
    this.addPalette(50);
    this.addPalette(5);
  },

  methods: {
    addPalette(s = Math.floor(Math.random() * 100)) {
      const h = Math.floor(Math.random() * 360);
      const hex = convertColor.hsl.hex(h, s, 50);

      this.palettes.push({
        name: getColorName(hex),
        h,
        s,
        tints: [
          { s, l: 10 },
          { s, l: 20 },
          { s, l: 30 },
          { s, l: 40 },
          { s, l: 50 },
          { s, l: 60 },
          { s, l: 70 },
          { s, l: 80 },
          { s, l: 90 },
          { s, l: 95 },
        ],
      });
    },

    removePalette(index) {
      this.$delete(this.palettes, index);
    },

    handleFormAdd(palette) {
      if (palette) {
        this.palettes.push(palette);
      } else {
        this.addPalette();
      }
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: $alt-color-lighter;
}

.app {
  min-height: 100vh;
}

.app-header {
  padding: $spacing-unit-small $spacing-unit-default;

  color: white;

  background-color: $alt-color-darker;
}

.app-content {
  padding: $spacing-unit-default;
}
</style>
