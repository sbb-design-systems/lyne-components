/**
 * Trims unit and converts result to number.
 * @param {string} value - value with unit (eg. '16px' / '100ms' / '1em' / ... )
 * @returns {number} value without unit (eg. 16 / 100 / 1 / ... )
 */
export const convertToNumber = (value: string): number => parseInt(value, 10);

/**
 * Used to retrieve from the computed CSS style
 * the correct design-token for the `--animation-duration` properties.
 * @param {CSSStyleDeclaration} styleDeclaration - computed CSS to read from
 * @param {string} property - the property to search for
 * @throws {Error} property must be an `--animation-duration-Nx`
 * @returns {number} duration in ms without unit
 */
export const getAnimationDurationVariableSafeValue = (styleDeclaration: CSSStyleDeclaration, property: string): number => {
  if (!property.startsWith('--animation-duration')) {
    throw new Error('Property must start with "--animation-duration". If not, use the window "getPropertyValue" API.');
  }

  return convertToNumber(styleDeclaration.getPropertyValue(property));
};
