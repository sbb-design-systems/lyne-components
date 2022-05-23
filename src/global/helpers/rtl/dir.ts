/**
 * Check the element direction (ltr / rtl)
 * The host value will always take priority over the root document value.
 */
export const isRTL = (hostEl?: HTMLElement): boolean => {
  if (hostEl) {
    if (hostEl.dir === '') {
      const direction = window.getComputedStyle(hostEl)
        .getPropertyValue('direction');

      return direction.toLowerCase() === 'rtl';
    }

    return hostEl.dir.toLowerCase() === 'rtl';
  }

  return document?.dir.toLowerCase() === 'rtl';
};
