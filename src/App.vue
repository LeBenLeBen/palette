<template>
  <div class="app min-h-screen flex flex-col">
    <Header />

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

      <Exporter v-if="currentView === 'export'" />
      <template v-else>
        <ul v-if="palettes.length">
          <li v-for="(palette, i) in palettes" :key="i" class="mb-8 last:mb-0">
            <Palette :index="i" />
          </li>
        </ul>

        <div v-else class="text-xl text-center text-gray-500 my-6">
          No colors.
        </div>

        <AddPaletteForm class="mt-10" />
      </template>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import LZString from 'lz-string';
import { useDebounceFn } from '@vueuse/core';

import { palettes, currentView, addPalette } from '@/store';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Exporter from '@/components/Exporter.vue';
import Palette from '@/components/Palette.vue';
import AddPaletteForm from '@/components/AddPaletteForm.vue';

const query = new URLSearchParams(location.search);
const error = ref(null);

// Restore potential data from the URL
if (query.get('c')) {
  try {
    const config = JSON.parse(
      LZString.decompressFromEncodedURIComponent(query.get('c'))
    );

    if (config.version === parseInt(import.meta.env.VITE_APP_SCHEMA_VERSION)) {
      palettes.value = config.palettes;
    } else {
      error.value = 'Data schema version is too old and could not be restored.';
    }
  } catch (e) {
    error.value = 'Data are corrupted, the palettes could not be restored.';
  }
}

onMounted(() => {
  if (!palettes.value.length) {
    addPalette(50);
    addPalette(5);
  }
});

const updateUrl = () => {
  const json = JSON.stringify({
    version: parseInt(import.meta.env.VITE_APP_SCHEMA_VERSION),
    palettes: palettes.value,
  });
  const c = LZString.compressToEncodedURIComponent(json);

  history.replaceState(
    {},
    '',
    palettes.value.length
      ? `?c=${c}`
      : `${window.location.origin}${window.location.pathname}`
  );
};

// Whenever the palettes change, update the URL with the new data
watch(() => palettes.value, useDebounceFn(updateUrl, 250), { deep: true });
</script>
