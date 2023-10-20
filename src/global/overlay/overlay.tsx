import { h, JSX } from '@stencil/core';
import { toggleDatasetEntry } from '../dom';

export type SbbOverlayState = 'closed' | 'opening' | 'opened' | 'closing';
const IS_OPEN_OVERLAY_QUERY = `:is(sbb-dialog, sbb-navigation, sbb-menu)[data-state='opened']`;

/**
 * Used to create the "wrapping" effect around the anchor for overlays (es. autocomplete)
 * Works in conjunction with the 'overlayGapFixCorners()' function in 'overlay.tsx'
 */
export function overlayGapFixCorners(): JSX.Element {
  return [
    <div class="sbb-gap-fix-wrapper">
      <div class="sbb-gap-fix-corner" id="left"></div>
    </div>,
    <div class="sbb-gap-fix-wrapper">
      <div class="sbb-gap-fix-corner" id="right"></div>
    </div>,
  ];
}

/**
 * Returns all the ancestors of the overlay.
 */
const getAncestors = (overlay: HTMLElement, root: HTMLElement): HTMLElement[] => {
  let el = overlay.parentElement;
  const ancestors: HTMLElement[] = [];
  while (el) {
    ancestors.push(el);
    el = el !== root && el.parentElement;
  }
  return ancestors;
};

/**
 * Set the inert and the data-sbb-inert attributes.
 */
const setSbbInert = (el: HTMLElement): void => {
  if (!el.inert) {
    el.inert = true;
    if (el.matches(IS_OPEN_OVERLAY_QUERY)) {
      el.dataset.sbbInert = `${+el.dataset.sbbInert + 1 || 0}`;
    } else {
      toggleDatasetEntry(el, 'sbbInert', true);
    }
  }

  if (!el.hasAttribute('aria-hidden')) {
    el.setAttribute('aria-hidden', 'true');
    toggleDatasetEntry(el, 'sbbAriaHidden', true);
  }
};

/**
 * Removes the inert and the data-sbb-inert attributes.
 */
const removeSbbInert = (el: HTMLElement): void => {
  if (el.hasAttribute('data-sbb-inert')) {
    el.inert = false;
    toggleDatasetEntry(el, 'sbbInert', false);
  }

  if (el.hasAttribute('data-sbb-aria-hidden')) {
    el.removeAttribute('aria-hidden');
    toggleDatasetEntry(el, 'sbbAriaHidden', false);
  }
};

/**
 * Applies inert to every other element on the page except the overlay.
 */
export function applyInertMechanism(overlay: HTMLElement): void {
  removeSbbInert(overlay);

  const overlayRoot = overlay.closest('body > *') as HTMLElement;
  const documentChildren = Array.from(document.querySelectorAll('body > *')).filter(
    (el) => el !== overlayRoot,
  ) as HTMLElement[];

  documentChildren.forEach((el) => setSbbInert(el));

  let children: HTMLElement[] = [];
  const ancestors = getAncestors(overlay, overlayRoot);

  for (const el of ancestors) {
    children = children.concat(
      Array.from(el.children).filter(
        (el: HTMLElement) => el !== overlay && !ancestors.includes(el),
      ) as HTMLElement[],
    );
    if (el.matches(IS_OPEN_OVERLAY_QUERY)) {
      el.dataset.sbbInert = `${+el.dataset.sbbInert + 1 || 0}`;
    }
  }

  children.forEach((el) => setSbbInert(el));
}

export function removeInertMechanism(): void {
  const openOverlays = Array.from(
    document.documentElement.querySelectorAll(IS_OPEN_OVERLAY_QUERY),
  ) as HTMLElement[];

  if (openOverlays.length) {
    openOverlays.forEach((el) => {
      el.dataset.sbbInert = `${+el.dataset.sbbInert - 1}`;
      if (el.dataset.sbbInert && +el.dataset.sbbInert < 0) {
        removeSbbInert(el);
        Array.from(el.children).forEach((el: HTMLElement) => removeSbbInert(el));
      }
    });
    return;
  }

  Array.from(document.documentElement.querySelectorAll('[data-sbb-inert]')).forEach(
    (el: HTMLElement) => removeSbbInert(el),
  );
}
