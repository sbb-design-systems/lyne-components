/**
 * Used to retrieve from the computed CSS style
 * the correct design-token for the `--animation-duration` properties,
 * by trimming the unit & converting to number.
 * @param {CSSStyleDeclaration} styleDeclaration - computed CSS to read from
 * @param {string} property - the property to search for
 * @throws {Error} property must be an `--animation-duration-Nx`
 * @returns {number} duration without unit in ms
 */
export const getAnimationDurationVariableSafeValue = (styleDeclaration: CSSStyleDeclaration, property: string): number => {
  if (!property.startsWith('--animation-duration')) {
    throw new Error('Property must start with "--animation-duration". If not, use the window "getPropertyValue" API.');
  }

  return Number(styleDeclaration
    .getPropertyValue(property)
    .replace('ms', ''));
};
