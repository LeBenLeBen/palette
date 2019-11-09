<template>
  <div class="max-w-4xl mx-auto sm:px-4 sm:flex">
    <div class="sm:w-1/3">
      <ul class="mb-5 sm:my-6">
        <li
          v-for="type in exportTypes"
          :key="type.id"
          class="sm:text-right sm:mb-1 last:mb-0"
        >
          <Btn
            variant="bare"
            class="py-3 px-5 w-full sm:w-auto sm:text-right hover:text-gray-900 leading-tight rounded sm:rounded-r-none hover:bg-gray-300"
            :class="{
              'text-gray-900 bg-gray-400 hover:bg-gray-400':
                exportTypeId === type.id,
              'text-gray-600': exportTypeId !== type.id,
            }"
            @click="$emit('setExportTypeId', type.id)"
          >
            {{ type.label }}
          </Btn>
        </li>
      </ul>
    </div>
    <div class="sm:w-2/3">
      <div class="box p-4 sm:p-6 min-h-full">
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
          <div v-if="exportType.download">
            <Btn
              tag="a"
              :href="downloadUrl"
              variant="primary"
              download="palette.sketchpalette"
            >
              <Icon id="download" :scale="0.75" class="mr-2 text-gray-400" />
              Download
            </Btn>
          </div>
          <div v-else>
            <pre
              class="overflow-x-auto bg-gray-100 p-4 text-sm rounded shadow-inner"
            ><code v-html="code"></code></pre>

            <Btn v-clipboard="code" variant="primary" class="mt-6">
              <Icon id="copy" :scale="0.75" class="mr-2 text-gray-400" />
              Copy to clipboard
            </Btn>
          </div>
        </template>
        <p v-else class="text-xl text-gray-500 text-center">
          No colors.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import convertColor from 'color-convert';
import { slugify } from '@/helpers/string';

export default {
  props: {
    palettes: {
      type: Array,
      required: true,
    },
    exportTypeId: {
      type: String,
      required: true,
    },
  },

  computed: {
    exportTypes() {
      return [
        { id: 'css', label: 'CSS Custom Properties' },
        { id: 'scss', label: 'SCSS Variables' },
        { id: 'sass', label: 'Sass Variables' },
        {
          id: 'tailwind',
          label: 'Tailwind',
          help:
            'Add the following code to your <code>tailwind.config.js</code> file, see <a href="https://tailwindcss.com/docs/customizing-colors/" target="_blank">customizing colors</a> for details.',
        },
        {
          id: 'sketch',
          label: 'Sketch',
          help:
            'Download and import the file in Sketch with the <a href="https://github.com/andrewfiorillo/sketch-palettes" target="_blank">Palettes plugin</a>.',
          download: true,
        },
      ];
    },

    exportType() {
      return this.exportTypes.find(type => type.id === this.exportTypeId);
    },

    palettesColors() {
      return this.palettes.map(palette => {
        return {
          name: slugify(palette.name),
          tints: palette.tints.map((tint, i) => {
            return {
              level: i * 100 + 100,
              code: `#${convertColor.hsl.hex(palette.h, tint.s, tint.l)}`,
            };
          }),
        };
      });
    },

    code() {
      switch (this.exportTypeId) {
        case 'sass':
          return this.palettesColors
            .map(palette =>
              palette.tints
                .map(tint => `$${palette.name}-${tint.level}: ${tint.code}`)
                .join('\n')
            )
            .join('\n\n');
        case 'scss':
          return this.palettesColors
            .map(palette =>
              palette.tints
                .map(tint => `$${palette.name}-${tint.level}: ${tint.code};`)
                .join('\n')
            )
            .join('\n\n');
        case 'css':
          return this.palettesColors
            .map(palette =>
              palette.tints
                .map(tint => `--${palette.name}-${tint.level}: ${tint.code};`)
                .join('\n')
            )
            .join('\n\n');
        case 'tailwind': {
          const obj = {};

          this.palettesColors.forEach(palette => {
            obj[palette.name] = {};
            palette.tints.forEach(tint => {
              obj[palette.name][tint.level] = tint.code;
            });
          });

          return obj;
        }
        case 'sketch': {
          const obj = {
            compatibleVersion: '2.0',
            pluginVersion: '2.22',
            colors: [],
            gradients: [],
            images: [],
          };

          this.palettesColors.forEach(palette => {
            palette.tints.forEach(tint => {
              const color = convertColor.hex.rgb(tint.code);
              obj.colors.push({
                name: `${palette.name}-${tint.level}`,
                red: (color[0] / 255) * 1,
                green: (color[1] / 255) * 1,
                blue: (color[2] / 255) * 1,
                alpha: 1,
              });
            });
          });

          return obj;
        }
        default:
          return '';
      }
    },

    downloadUrl() {
      const data = new Blob([JSON.stringify(this.code, null, 2)], {
        type: 'application/json',
      });
      return window.URL.createObjectURL(data);
    },
  },
};
</script>
