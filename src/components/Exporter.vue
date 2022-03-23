<template>
  <div class="max-w-4xl mx-auto sm:px-4 sm:flex">
    <div class="sm:w-1/3">
      <ul class="mb-5 sm:my-6">
        <li
          v-for="type in exportTypes"
          :key="type.id"
          class="sm:text-right sm:mb-1 last:mb-0"
        >
          <CBtn
            variant="medium"
            class="w-full sm:w-auto sm:text-right hover:text-gray-900 leading-tight rounded sm:rounded-r-none hover:bg-gray-300"
            :class="{
              'text-gray-900 bg-gray-300 hover:bg-gray-400':
                exportTypeId === type.id,
              'text-gray-600': exportTypeId !== type.id,
            }"
            @click="exportTypeId = type.id"
          >
            {{ type.label }}
          </CBtn>
        </li>
      </ul>
    </div>
    <div class="sm:w-2/3">
      <div class="bg-white rounded-lg shadow-md p-4 sm:p-6 min-h-full">
        <template v-if="palettesColors.length">
          <div class="mb-4 text-gray-600 italic">
            You can change the color names in edit mode.
          </div>

          <!-- eslint-disable vue/no-v-html -->
          <div
            v-if="exportType.help"
            class="mb-4"
            v-html="exportType.help"
          ></div>

          <!-- eslint-disable vue/no-v-html -->
          <div>
            <pre
              class="overflow-x-auto bg-gray-100 p-4 text-sm rounded shadow-inner"
            ><code v-html="code"></code></pre>

            <CBtn
              variant="primary medium"
              class="mt-6 w-full sm:w-auto"
              @click="copy()"
            >
              <CIcon id="copy" class="mr-2 -my-1 text-gray-400" />
              Copy to clipboard
            </CBtn>
          </div>
        </template>
        <p v-else class="text-xl text-gray-500 text-center">No colors.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useClipboard, useLocalStorage } from '@vueuse/core';

import { palettes, targetColorMode } from '@/store';

import { slugify } from '@/helpers/string';
import { convertToCSSColor } from '@/helpers/colors';

const exportTypeId = useLocalStorage('exportTypeId', 'css');

const exportTypes = computed(() => {
  return [
    { id: 'css', label: 'CSS Custom Properties' },
    { id: 'scss', label: 'SCSS Variables' },
    { id: 'sass', label: 'Sass Variables' },
    {
      id: 'tailwind',
      label: 'Tailwind',
      help: 'Add the following code to your <code>tailwind.config.js</code> file, see <a href="https://tailwindcss.com/docs/customizing-colors/" target="_blank">customizing colors</a> for details.',
    },
  ];
});

const exportType = computed(() => {
  return exportTypes.value.find((type) => type.id === exportTypeId.value);
});

const palettesColors = computed(() => {
  return palettes.value.map((palette) => {
    const tints = Array.from(palette.tints);

    return {
      name: slugify(palette.name),
      tints: tints.reverse().map((tint, i) => {
        return {
          level: i === 0 ? 50 : i * 100,
          code: convertToCSSColor(
            { h: palette.h, s: tint.s, l: tint.l },
            targetColorMode.value
          ),
        };
      }),
    };
  });
});

const code = computed(() => {
  switch (exportTypeId.value) {
    case 'sass':
      return palettesColors.value
        .map((palette) =>
          palette.tints
            .map((tint) => `$${palette.name}-${tint.level}: ${tint.code}`)
            .join('\n')
        )
        .join('\n\n');

    case 'scss':
      return palettesColors.value
        .map((palette) =>
          palette.tints
            .map((tint) => `$${palette.name}-${tint.level}: ${tint.code};`)
            .join('\n')
        )
        .join('\n\n');

    case 'css':
      return palettesColors.value
        .map((palette) =>
          palette.tints
            .map((tint) => `--${palette.name}-${tint.level}: ${tint.code};`)
            .join('\n')
        )
        .join('\n\n');

    case 'tailwind': {
      const obj = {};

      palettesColors.value.forEach((palette) => {
        obj[palette.name] = {};
        palette.tints.forEach((tint) => {
          obj[palette.name][tint.level] = tint.code;
        });
      });

      return JSON.stringify(obj, null, 2);
    }

    default:
      return '';
  }
});

const { copy } = useClipboard({ source: code });
</script>
