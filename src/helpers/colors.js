import nearestColor from 'nearest-color';
import namedColors from 'color-name-list';

// Nearest Color need objects of type { name: hex } as input
const colors = namedColors.reduce(
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
