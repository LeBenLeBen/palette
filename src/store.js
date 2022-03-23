import { ref } from 'vue';
import { useLocalStorage, useSessionStorage } from '@vueuse/core';
import convertColor from 'color-convert';

import { getColorName } from '@/helpers/colors';

export const palettes = ref([]);

export const addPalette = (s = Math.floor(Math.random() * 100)) => {
  const h = Math.floor(Math.random() * 360);
  const hex = convertColor.hsl.hex(h, s, 50);

  palettes.value.push({
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
      { s, l: 92 },
      { s, l: 97 },
    ],
  });
};

export const targetColorMode = useLocalStorage('targetColorMode', 'hsl');

export const currentView = useSessionStorage('currentView', 'edit');
