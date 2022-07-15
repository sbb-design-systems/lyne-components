/**
 * Returns a function that can be used for a ref callback in JSX.
 * It checks whether the element has an id and if not, calls the id factory function
 * and assigns the resulting id to the element.
 *
 * @example
 *   <Host
 *     ref={assignId(() => `sbb-title-${++nextId}`)}
 */
export function assignId(idFactory: () => string): (element: HTMLElement) => void {
  return (element) => {
    if (!element.id) {
      element.id = idFactory();
    }
  };
}
