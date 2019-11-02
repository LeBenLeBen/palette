<template>
  <div class="app">
    <header class="bg-gray-800 text-white px-4 md:px-6 py-4">
      <h1 class="text-xl uppercase font-bold tracking-widest">Palette</h1>
    </header>

    <main class="p-4 md:p-6">
      <ul v-if="palettes.length">
        <li v-for="(palette, i) in palettes" :key="i" class="mb-6 last:mb-0">
          <Palette :palette.sync="palette" @remove="removePalette(i)" />
        </li>
      </ul>

      <div v-else class="text-xl text-center text-gray-500 my-6">
        No palettes.
      </div>

      <AddPaletteForm class="mt-10" @add="handleFormAdd" />
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
          { s, l: 15 },
          { s, l: 25 },
          { s, l: 35 },
          { s, l: 45 },
          { s, l: 55 },
          { s, l: 65 },
          { s, l: 75 },
          { s, l: 85 },
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

<style lang="postcss">
.app {
  min-height: 100vh;
}
</style>
