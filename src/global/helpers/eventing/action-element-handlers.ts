import { IsStaticProperty, LinkButtonProperties } from '../../interfaces/link-button-properties';
import { HandlerAspect } from './handler-repository';
import { isEventPrevented } from './is-event-prevented';

/**
 * Trigger an anchor element click after the event has finished the bubbling phase and
 * preventDefault() has not been called for the event.
 */
async function triggerAnchorWhenNecessary(event: MouseEvent): Promise<void> {
  const target = event.target as Element;
  const composedTarget = event.composedPath()[0] as Element;
  // We only want to trigger a click event on the inner anchor element, if the host element is the
  // event origin, which means the inner anchor element has not actually been activated/clicked.
  if (
    !target.tagName.startsWith('SBB-') ||
    target !== composedTarget ||
    (await isEventPrevented(event))
  ) {
    return;
  }

  // We are using dispatchEvent here, instead of just .click() in order to
  // prevent another click event from bubbling up the DOM tree.
  // TODO: The CTRL case does not work exactly the same as with a use interaction PointerEvent
  // as the newly created tab immediately receives focus, instead of remaining on the current
  // page.
  const { altKey, ctrlKey, metaKey, shiftKey } = event;
  target.shadowRoot.querySelector('a')?.dispatchEvent(
    // We need to use a MouseEvent here, as PointerEvent does not work on Firefox.
    new MouseEvent('click', {
      altKey,
      ctrlKey,
      metaKey,
      shiftKey,
    })
  );
}

function handleLinkClick(event: MouseEvent): void {
  const element = event.target as HTMLElement & Partial<LinkButtonProperties & IsStaticProperty>;
  if (!element.isStatic && element.href) {
    triggerAnchorWhenNecessary(event);
  }
}

/** Handle the click logic for an action element. */
function handleLinkButtonClick(event: MouseEvent): void {
  const element = event.target as HTMLElement & Partial<LinkButtonProperties & IsStaticProperty>;
  if (element.isStatic) {
    return;
  } else if (element.disabled) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  } else if (element.href) {
    triggerAnchorWhenNecessary(event);
    return;
  } else if (!element.type || element.type === 'button') {
    return;
  }

  // Use querySelector with form and id selector, as the form property must
  // reference a valid <form> element
  const form = element.form
    ? (element.ownerDocument.querySelector(`form#${element.form}`) as HTMLFormElement)
    : element.closest('form');
  if (!form) {
    return;
  } else if (element.type === 'submit') {
    if (form.requestSubmit) {
      // `form.requestSubmit(element);` seems not to work for CustomElements, so the `element` parameter has been removed;
      // TODO: Check if solved in any way, see https://github.com/WICG/webcomponents/issues/814#issuecomment-1218452137
      form.requestSubmit();
    } else {
      form.submit();
    }
  } else if (element.type === 'reset') {
    form.reset();
  }
}

function isButtonSpaceKeyEvent(event: KeyboardEvent): boolean {
  return event.key === ' ' && !(event.target as Element & { href?: string }).href;
}

function dispatchClickEvent(event: KeyboardEvent): void {
  const { altKey, ctrlKey, metaKey, shiftKey } = event;
  (event.target as Element).dispatchEvent(
    new PointerEvent('click', {
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId: -1,
      pointerType: '',
      altKey,
      ctrlKey,
      metaKey,
      shiftKey,
    })
  );
}

/**
 * Prevents scrolling from pressing Space, when the event target is an action element.
 * Also sets data-active attribute.
 * @param event The origin event.
 */
function preventScrollWhenButtonAndSpaceKeydown(event: KeyboardEvent): void {
  if (isButtonSpaceKeyEvent(event)) {
    event.preventDefault();
    (event.target as HTMLElement).dataset.active = '';
  }
}

/**
 * Dispatches a 'click' PointerEvent, if the original keyboard event is a 'Enter' press.
 * As verified with the native button, when 'Enter' is pressed, a 'click' event is dispatched
 * after the 'keypress' event.
 * @param event The origin event.
 */
function dispatchClickEventWhenEnterKeypress(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === '\n') {
    dispatchClickEvent(event);
  }
}

function removeActiveMarker(event: Event): void {
  delete (event.target as HTMLElement).dataset.active;
}

/**
 * Dispatches a 'click' PointerEvent, if the original keyboard event is a 'Space' press.
 * As verified with the native button, when 'Space' is pressed, a 'click' event is dispatched
 * after the 'keyup' event.
 * @param event The origin event.
 */
function dispatchClickEventWhenButtonAndSpaceKeyup(event: KeyboardEvent): void {
  if (isButtonSpaceKeyEvent(event)) {
    removeActiveMarker(event);
    dispatchClickEvent(event);
  }
}

/** Adds event handlers to enable button/link-like functionality to a web component host. */
export const actionElementHandlerAspect: HandlerAspect = ({ host, signal }) => {
  const passiveOptions = { passive: true, signal };
  // capture is necessary here, as this event handler needs to be executed before any other
  // in order to stop immediate propagation in the disabled case.
  host.addEventListener('click', handleLinkButtonClick, { signal, capture: true });
  host.addEventListener('keydown', preventScrollWhenButtonAndSpaceKeydown, { signal });
  host.addEventListener('keypress', dispatchClickEventWhenEnterKeypress, passiveOptions);
  host.addEventListener('keyup', dispatchClickEventWhenButtonAndSpaceKeyup, passiveOptions);
  host.addEventListener('blur', removeActiveMarker, passiveOptions);
};

export const linkHandlerAspect: HandlerAspect = ({ host, signal }) => {
  host.addEventListener('click', handleLinkClick, { signal });
  host.addEventListener('keypress', dispatchClickEventWhenEnterKeypress, { passive: true, signal });
};
