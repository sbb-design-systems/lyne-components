import {
  InterfaceHTMLLyneOverlayElement, InterfaceOverlay
} from './overlays-interface';
import {
  AnimationBuilder, InterfaceAnimation
} from '../animations/animation-interface';
import { componentOnReady } from '../../../helpers/request-animation-frame';

let lastId = 0;

export const BACKDROP = 'backdrop';

/**
 * TODO replace the tags in the next lines with the correct ones for Lyne
 */
export const GET_OVERLAYS_DEFAULT_SELECTOR = 'lyne-alert,lyne-action-sheet,lyne-loading,lyne-modal,lyne-picker,lyne-popover,lyne-toast';
export const GET_OVERLAYS_TRAP_FOCUS_SELECTOR = 'lyne-alert,lyne-action-sheet,lyne-loading,lyne-modal,lyne-picker,lyne-popover';

export const activeAnimations = new WeakMap<InterfaceOverlay, InterfaceAnimation[]>();

/**
 * TODO replace the tag in the next line with the correct ones for Lyne
 */
const getAppRoot = (doc: Document): HTMLElement => doc.querySelector('lyne-app') || doc.body;

const isOverlayHidden = (overlay: Element): boolean => overlay.classList.contains('overlay-hidden');

export const getOverlays = (doc: Document, selector: string = GET_OVERLAYS_DEFAULT_SELECTOR): InterfaceHTMLLyneOverlayElement[] => {
  const overlays = Array.from(doc.querySelectorAll(selector)) as InterfaceHTMLLyneOverlayElement[];

  return overlays.filter((c: InterfaceHTMLLyneOverlayElement) => c.overlayIndex > 0);
};

/**
 * Returns an overlay element
 * @param doc The document to find the element within.
 * @param overlayTag The selector for the overlay.
 * @param id The unique identifier for the overlay instance.
 * @returns The overlay element or `undefined` if no overlay element is found.
 */
export const getOverlay = (doc: Document, overlayTag?: string, id?: string): InterfaceHTMLLyneOverlayElement | undefined => {
  const overlays = getOverlays(doc, overlayTag)
    .filter((o: InterfaceHTMLLyneOverlayElement) => !isOverlayHidden(o));

  return (id === undefined)
    ? overlays[overlays.length - 1]
    : overlays.find((o: InterfaceHTMLLyneOverlayElement) => o.id === id);
};

/**
 * TODO verify those strings
 */
const focusableQueryString = '[tabindex]:not([tabindex^="-"]), input:not([type=hidden]):not([tabindex^="-"]), textarea:not([tabindex^="-"]), button:not([tabindex^="-"]), select:not([tabindex^="-"]), .lyne-focusable:not([tabindex^="-"])';
const innerFocusableQueryString = 'input:not([type=hidden]), textarea, button, select';

export const focusFirstDescendant = (ref: Element, overlay: InterfaceHTMLLyneOverlayElement): void => {
  let firstInput = ref.querySelector(focusableQueryString) as HTMLElement | null;

  const shadowRoot = firstInput && firstInput.shadowRoot;

  if (shadowRoot) {
    // If there are no inner focusable elements, just focus the host element.
    firstInput = shadowRoot.querySelector(innerFocusableQueryString) || firstInput;
  }

  if (firstInput) {
    firstInput.focus();
  } else {
    // Focus overlay instead of letting focus escape
    overlay.focus();
  }
};

const focusLastDescendant = (ref: Element, overlay: InterfaceHTMLLyneOverlayElement): void => {
  const inputs = Array.from(ref.querySelectorAll(focusableQueryString)) as HTMLElement[];
  let lastInput = inputs.length > 0
    ? inputs[inputs.length - 1]
    : null;

  const shadowRoot = lastInput && lastInput.shadowRoot;

  if (shadowRoot) {
    // If there are no inner focusable elements, just focus the host element.
    lastInput = shadowRoot.querySelector(innerFocusableQueryString) || lastInput;
  }

  if (lastInput) {
    lastInput.focus();
  } else {
    // Focus overlay instead of letting focus escape
    overlay.focus();
  }
};

/**
 * Traps keyboard focus inside of overlay components.
 * Based on
 * https://w3c.github.io/aria-practices/examples/dialog-modal/alertdialog.html
 * This includes the following components: Action Sheet, Alert, Loading, Modal,
 * Picker, and Popover.
 * Should NOT include: Toast
 */
const trapKeyboardFocus = (ev: Event, doc: Document): void => {

  const lastOverlay = getOverlay(doc, GET_OVERLAYS_TRAP_FOCUS_SELECTOR);
  const target = ev.target as HTMLElement | null;

  /**
   * If no active overlay, ignore this event.
   *
   * If this component uses the shadow dom,
   * this global listener is pointless
   * since it will not catch the focus
   * traps as they are inside the shadow root.
   * We need to add a listener to the shadow root
   * itself to ensure the focus trap works.
   */
  if (!lastOverlay || !target) {
    return;
  }

  /**
   * If the lyne-disable-focus-trap class
   * is present on an overlay, then this component
   * instance has opted out of focus trapping.
   * An example of this is when the sheet modal
   * has a backdrop that is disabled. The content
   * behind the sheet should be focusable until
   * the backdrop is enabled.
   *
   */
  if (lastOverlay.classList.contains('lyne-disable-focus-trap')) {
    return;
  }

  const trapScopedFocus = (): void => {

    /**
     * If we are focusing the overlay, clear
     * the last focused element so that hitting
     * tab activates the first focusable element
     * in the overlay wrapper.
     */
    if (lastOverlay === target) {
      lastOverlay.lastFocus = undefined;

      /**
       * Otherwise, we must be focusing an element
       * inside the overlay. The two possible options
       * here are an input/button/.. or the lyne-focus-trap
       * element. The focus trap element is used to prevent
       * the keyboard focus from leaving the overlay when
       * using Tab or screen assistants.
       */
    } else {

      /**
       * We do not want to focus the traps, so get the overlay
       * wrapper element as the traps live outside the wrapper.
       */

      const overlayRoot = lastOverlay.shadowRoot;

      if (!overlayRoot.contains(target)) {
        return;
      }

      const overlayWrapper = overlayRoot.querySelector('.lyne-overlay-wrapper');

      if (!overlayWrapper) {
        return;
      }

      /**
       * If the target is inside the wrapper, let the browser
       * focus as normal and keep a log of the last focused element.
       */
      if (overlayWrapper.contains(target)) {
        lastOverlay.lastFocus = target;
      } else {

        /**
         * Otherwise, we must have focused one of the focus traps.
         * We need to wrap the focus to either the first element
         * or the last element.
         */

        /**
         * Once we call `focusFirstDescendant` and focus the first
         * descendant, another focus event will fire which will
         * cause `lastOverlay.lastFocus` to be updated before
         * we can run the code after that. We will cache the value
         * here to avoid that.
         */
        const {
          lastFocus
        } = lastOverlay;

        // Focus the first element in the overlay wrapper
        focusFirstDescendant(overlayWrapper, lastOverlay);

        /**
         * If the cached last focused element is the
         * same as the active element, then we need
         * to wrap focus to the last descendant. This happens
         * when the first descendant is focused, and the user
         * presses Shift + Tab. The previous line will focus
         * the same descendant again (the first one), causing
         * last focus to equal the active element.
         */
        if (lastFocus === doc.activeElement) {
          focusLastDescendant(overlayWrapper, lastOverlay);
        }
        lastOverlay.lastFocus = doc.activeElement as HTMLElement;
      }
    }
  };
  const trapShadowFocus = (): void => {

    /**
     * If the target is inside the wrapper, let the browser
     * focus as normal and keep a log of the last focused element.
     */
    if (lastOverlay.contains(target)) {
      lastOverlay.lastFocus = target;
    } else {

      /**
       * Otherwise, we are about to have focus
       * go out of the overlay. We need to wrap
       * the focus to either the first element
       * or the last element.
       */

      /**
       * Once we call `focusFirstDescendant` and focus the first
       * descendant, another focus event will fire which will
       * cause `lastOverlay.lastFocus` to be updated before
       * we can run the code after that. We will cache the value
       * here to avoid that.
       */
      const {
        lastFocus
      } = lastOverlay;

      // Focus the first element in the overlay wrapper
      focusFirstDescendant(lastOverlay, lastOverlay);

      /**
       * If the cached last focused element is the
       * same as the active element, then we need
       * to wrap focus to the last descendant. This happens
       * when the first descendant is focused, and the user
       * presses Shift + Tab. The previous line will focus
       * the same descendant again (the first one), causing
       * last focus to equal the active element.
       */
      if (lastFocus === doc.activeElement) {
        focusLastDescendant(lastOverlay, lastOverlay);
      }
      lastOverlay.lastFocus = doc.activeElement as HTMLElement;
    }
  };

  if (lastOverlay.shadowRoot) {
    trapShadowFocus();
  } else {
    trapScopedFocus();
  }
};

const connectListeners = (doc: Document): void => {
  if (lastId === 0) {
    lastId = 1;
    doc.addEventListener('focus', (ev: FocusEvent) => {
      trapKeyboardFocus(ev, doc);
    }, true);
    doc.addEventListener('keyup', (ev) => {
      if (ev.key === 'Escape') {
        const lastOverlay = getOverlay(doc);

        if (lastOverlay && lastOverlay.backdropDismiss) {
          lastOverlay.dismiss(undefined, BACKDROP);
        }
      }
    });
  }
};

export const prepareOverlay = <T extends InterfaceHTMLLyneOverlayElement>(el: T): void => {

  if (typeof document !== 'undefined') {
    connectListeners(document);
  }
  const overlayIndex = lastId++;

  el.overlayIndex = overlayIndex;
  if (!el.hasAttribute('id')) {
    el.id = `lyne-overlay-${overlayIndex}`;
  }
};

export const createOverlay = <T extends InterfaceHTMLLyneOverlayElement>(tagName: string, opts: Record<string, unknown> | undefined): Promise<T> => {

  if (typeof window !== 'undefined' && typeof window.customElements !== 'undefined') {
    return window.customElements.whenDefined(tagName)
      .then(() => {
        const element = document.createElement(tagName) as InterfaceHTMLLyneOverlayElement;

        element.classList.add('overlay-hidden');

        /**
         * Convert the passed in overlay options into props
         * that get past down into the new overlay.
         */
        Object.assign(element, {
          ...opts,
          hasController: true
        });

        // append the overlay element to the document body
        getAppRoot(document)
          .appendChild(element);

        return new Promise((resolve) => componentOnReady(element, resolve));
      });
  }

  return Promise.resolve() as any;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const dismissOverlay = (doc: Document, data: any, role: string | undefined, overlayTag: string, id?: string): Promise<boolean> => {
  const overlay = getOverlay(doc, overlayTag, id);

  if (!overlay) {
    return Promise.reject(new Error('overlay does not exist'));
  }

  return overlay.dismiss(data, role);
};

/**
 * When an overlay is presented, the main
 * focus is the overlay not the page content.
 * We need to remove the page content from the
 * accessibility tree otherwise when
 * users use "read screen from top" gestures with
 * TalkBack and VoiceOver, the screen reader will begin
 * to read the content underneath the overlay.
 *
 * We need a container where all page components
 * exist that is separate from where the overlays
 * are added in the DOM. For most apps, this element
 * is the top most lyne-router-outlet. In the event
 * that devs are not using a router,
 * they will need to add the "lyne-view-container-root"
 * id to the element that contains all of their views.
 *
 * TODO: If Framework supports having multiple top
 * level router outlets we would need to update this.
 * Example: One outlet for side menu and one outlet
 * for main content.
 *
 * TODO replace the tags in the next line with the correct ones for Lyne
 */
export const setRootAriaHidden = (hidden = false): void => {
  const root = getAppRoot(document);
  const viewContainer = root.querySelector('lyne-router-outlet, lyne-nav, #lyne-view-container-root');

  if (!viewContainer) {
    return;
  }

  if (hidden) {
    viewContainer.setAttribute('aria-hidden', 'true');
  } else {
    viewContainer.removeAttribute('aria-hidden');
  }
};

/**
 * When an overlay component is dismissed,
 * focus should be returned to the element
 * that presented the overlay. Otherwise,
 * focus will be set on the body which
 * means that people using screen readers
 * or tabbing will need to re-navigate
 * to where they were before they
 * opened the overlay.
 */
const focusPreviousElementOnDismiss: (overlayEl: any) => Promise<void> = async (overlayEl: any) => {
  let previousElement = document.activeElement as HTMLElement | null;

  if (!previousElement) {
    return;
  }

  const shadowRoot = previousElement && previousElement.shadowRoot;

  if (shadowRoot) {
    // If there are no inner focusable elements, just focus the host element.
    previousElement = shadowRoot.querySelector(innerFocusableQueryString) || previousElement;
  }

  await overlayEl.onDidDismiss();
  previousElement.focus();
};

const overlayAnimation = async (
  overlay: InterfaceOverlay,
  animationBuilder: AnimationBuilder,
  baseEl: any,
  opts: any
): Promise<boolean> => {
  // Make overlay visible in case it's hidden
  baseEl.classList.remove('overlay-hidden');

  const aniRoot = overlay.el;
  const animation = animationBuilder(aniRoot, opts);

  if (!overlay.animated) {
    animation.duration(0);
  }

  if (overlay.keyboardClose) {
    animation.beforeAddWrite(() => {
      const activeElement = baseEl.ownerDocument?.activeElement as HTMLElement;

      /**
       * TODO replace the tag in the next line with the correct ones for Lyne
       */
      if (activeElement && activeElement.matches('input, lyne-input, lyne-textarea')) {
        activeElement.blur();
      }
    });
  }

  const activeAni = activeAnimations.get(overlay) || [];

  activeAnimations.set(overlay, [
    ...activeAni,
    animation
  ]);

  await animation.play();

  return true;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const present = async (overlay: InterfaceOverlay, enterAnimation: AnimationBuilder, opts?: any): Promise<void> => {
  if (overlay.presented) {
    return;
  }

  setRootAriaHidden(true);

  overlay.presented = true;
  overlay.willPresent.emit();

  const animationBuilder = (overlay.enterAnimation)
    ? overlay.enterAnimation
    : enterAnimation;

  const completed = await overlayAnimation(overlay, animationBuilder, overlay.el, opts);

  if (completed) {
    overlay.didPresent.emit();
  }

  /**
   * When an overlay that steals focus
   * is dismissed, focus should be returned
   * to the element that was focused
   * prior to the overlay opening. Toast
   * does not steal focus and is excluded
   * from returning focus as a result.
   *
   * TODO replace the tag in the next line with the correct one for Lyne
   */
  //
  if (overlay.el.tagName !== 'LYNE-TOAST') {
    await focusPreviousElementOnDismiss(overlay.el);
  }

  if (overlay.keyboardClose) {
    overlay.el.focus();
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const dismiss = async (overlay: InterfaceOverlay, data: any | undefined, role: string | undefined, leaveAnimation: AnimationBuilder, opts?: any): Promise<boolean> => {
  if (!overlay.presented) {
    return false;
  }

  setRootAriaHidden(false);

  overlay.presented = false;

  try {
    // Overlay contents should not be clickable during dismiss
    overlay.el.style.setProperty('pointer-events', 'none');
    overlay.willDismiss.emit({
      data,
      role
    });

    const animationBuilder = overlay.leaveAnimation ?? leaveAnimation;

    // // If dismissed via gesture, no need to play leaving animation again
    if (role !== 'gesture') {
      await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
    }
    overlay.didDismiss.emit({
      data,
      role
    });

    activeAnimations.delete(overlay);

    /**
     * Make overlay hidden again in case it is being reused.
     * We can safely remove pointer-events: none as
     * overlay-hidden will set display: none.
     */
    overlay.el.classList.add('overlay-hidden');
    overlay.el.style.removeProperty('pointer-events');

  } catch (err) {
    console.error(err);
  }

  overlay.el.remove();

  return true;
};

