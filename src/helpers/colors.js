import nearestColor from 'nearest-color';
import colorNameList from 'color-name-list/dist/colornames.esm.js';
import convertColor from 'color-convert';

// Nearest Color need objects of type { name: hex } as input
const colors = colorNameList.reduce(
  (o, { name, hex }) => Object.assign(o, { [name]: hex }),
  {}
);

const nearest = nearestColor.from(colors);

/**
 * Return a name from `color-name-list` for a given color
 *
 * @export
 * @param {String} hex An hexadecimal color code
 * @returns {String} The color name
 */
export function getColorName(hex) {
  return nearest(hex).name;
}

/**
 * Convert a given color type to another
 *
 * @export
 * @param {Object} { h, s, l } Hue, Saturation, Lightness
 * @param {String} format hsl, rvb, hex, hwb
 * @returns
 */
export function convertToCSSColor({ h, s, l }, format) {
  const hsl = `hsl(${h}, ${s}%, ${l}%)`;
  let code = format === 'hsl' ? hsl : convertColor.hsl[format](h, s, l);

  switch (format) {
    case 'hex':
      code = `#${code}`;
      break;
    case 'rgb':
      code = `rgb(${code[0]}, ${code[1]}, ${code[2]})`;
      break;
    case 'hwb':
      code = `hwb(${code[0]} ${code[1]}% ${code[2]}%)`;
      break;
  }

  return code;
}
