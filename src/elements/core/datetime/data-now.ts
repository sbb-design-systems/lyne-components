/**
 * Reads the value of the data-now attribute and converts it to a number.
 * `undefined` results in NaN.
 * @param element
 */
export const readDataNow = (element: HTMLElement): number => {
  return +(element.getAttribute('data-now') ?? undefined)!;
};
