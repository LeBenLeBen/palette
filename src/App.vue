<template>
  <div class="app min-h-screen flex flex-col">
    <header
      class="flex justify-between items-center px-4 md:px-6 py-4 bg-gray-800 text-white"
    >
      <h1 class="text-xl uppercase font-bold tracking-widest">Palette</h1>
      <div class="btn-group -my-2">
        <Btn
          variant="primary"
          size="small"
          :class="{ active: !exporting }"
          @click="exporting = false"
        >
          <Icon
            id="pencil"
            :scale="0.75"
            class="hidden sm:inline-block text-gray-400 mr-2"
          />
          Edit
        </Btn>
        <Btn
          variant="primary"
          size="small"
          :class="{ active: exporting }"
          @click="exporting = true"
        >
          <Icon
            id="share"
            :scale="0.75"
            class="hidden sm:inline-block text-gray-400 mr-2"
          />
          Export
        </Btn>
      </div>
    </header>

    <main class="flex-grow p-4 md:px-6 md:py-8">
      <div v-if="error" class="text-center mb-6">
        <span
          class="inline-block px-4 py-3 bg-red-200 text-red-700 font-bold rounded cursor-pointer"
          tabindex="0"
          @click="error = null"
        >
          {{ error }}
        </span>
      </div>

      <Exporter
        v-if="exporting"
        :export-type-id="exportTypeId"
        :palettes="palettes"
        @setExportTypeId="setExportTypeId"
      />
      <template v-else>
        <ul v-if="palettes.length">
          <li v-for="(palette, i) in palettes" :key="i" class="mb-8 last:mb-0">
            <Palette :palette.sync="palette" @remove="removePalette(i)" />
          </li>
        </ul>

        <div v-else class="text-xl text-center text-gray-500 my-6">
          No colors.
        </div>

        <AddPaletteForm class="mt-10" @add="handleFormAdd" />
      </template>
    </main>

    <footer
      class="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-6 text-gray-700 bg-gray-300"
    >
      <div class="mb-2 md:mb-0 md:mr-2">
        An app by <a href="http://benoitburgener.ch/">LeBen</a>
      </div>
      <div>
        Browse <a href="https://github.com/LeBenLeBen/palette">the code</a> on
        GitHub
      </div>
    </footer>
  </div>
</template>

<script>
import convertColor from 'color-convert';
import queryString from 'query-string';
import LZString from 'lz-string';

import { getColorName } from '@/helpers/colors';
import Exporter from '@/components/Exporter';
import Palette from '@/components/Palette';
import AddPaletteForm from '@/components/AddPaletteForm';

export default {
  name: 'App',

  components: {
    Exporter,
    Palette,
    AddPaletteForm,
  },

  data() {
    const query = queryString.parse(location.search);
    let palettes = [];
    let error = null;

    // Restore potential data from the URL
    if (query.c) {
      try {
        const config = JSON.parse(
          LZString.decompressFromEncodedURIComponent(query.c)
        );

        if (config.version === parseInt(process.env.VUE_APP_SCHEMA_VERSION)) {
          palettes = config.palettes;
        } else {
          error = 'Data schema version is too old and could not be restored.';
        }
      } catch (e) {
        error = 'Data are corrupted, the palettes could not be restored.';
      }
    }

    return {
      palettes,
      error,
      exporting: false,
      exportTypeId: localStorage.getItem('exportTypeId') || 'css',
    };
  },

  watch: {
    // Whenever the palettes change, update the URL with the new data
    palettes: {
      handler(value) {
        const json = JSON.stringify({
          version: parseInt(process.env.VUE_APP_SCHEMA_VERSION),
          palettes: value,
        });
        const c = LZString.compressToEncodedURIComponent(json);

        history.replaceState(
          value,
          '',
          value.length ? `?c=${c}` : window.location.origin
        );
      },
      deep: true,
    },
  },

  mounted() {
    if (!this.palettes.length) {
      this.addPalette(50);
      this.addPalette(5);
    }
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
          { s, l: 95 },
          { s, l: 85 },
          { s, l: 75 },
          { s, l: 65 },
          { s, l: 55 },
          { s, l: 45 },
          { s, l: 35 },
          { s, l: 25 },
          { s, l: 15 },
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

    setExportTypeId(id) {
      this.exportTypeId = id;
      localStorage.setItem('exportTypeId', id);
    },
  },
};
</script>
