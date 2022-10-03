/**
 * Looks for the closest element matching the given selector starting from the given element.
 * Returns null, if none of the ancester match.
 *
 * @param selector The selector to match ancester against.
 * @param element The base element from which to start the search.
 * @returns The closest element matching the selector or null if none is found.
 */
export function hostContext(selector: string, element: Element): Element | null {
  while (element && (element as any) !== document && (element as any) !== window) {
    const match = element.closest(selector);
    if (match) {
      return match;
    }

    element = (element.getRootNode() as ShadowRoot).host;
  }

  return null;
}

export const ACTION_ELEMENTS = 'a,button,sbb-card,sbb-teaser-hero,sbb-teaser';
