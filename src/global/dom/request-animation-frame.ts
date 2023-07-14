// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __zone_symbol__requestAnimationFrame: any;
declare const requestAnimationFrame: any;

/**
 * Patched version of requestAnimationFrame that avoids ngzone
 * Use only when you know ngzone should not run
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const raf = (h: any): any => {
  if (typeof __zone_symbol__requestAnimationFrame === 'function') {
    return __zone_symbol__requestAnimationFrame(h);
  }
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(h);
  }

  return setTimeout(h);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const componentOnReady = (el: any, callback: any): any => {
  if (el.componentOnReady) {
    el.componentOnReady().then((resolvedEl: any) => callback(resolvedEl));
  } else {
    raf(() => callback(el));
  }
};
