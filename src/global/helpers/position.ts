type ElementRectangle = Pick<
  Element,
  'scrollHeight' | 'clientHeight' | 'scrollWidth' | 'clientWidth'
>;

export interface ElementPositionInfos {
  top: number;
  left: number;
  overflows: boolean;
  maxHeight: string;
}

/**
 * Gets the absolute position of an element relative to the page.
 */
export function getOffset(el: HTMLElement): { top: number; left: number } {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

/**
 * Gets height and width of an element even if it's hidden (`display: none`).
 */
export function getElementRectangle(el: HTMLElement): ElementRectangle {
  const elementStyle = window.getComputedStyle(el),
    elementDisplay = elementStyle.display,
    elementMaxHeight = parseInt(elementStyle.maxHeight, 10).toString();

  // if its not hidden we just return normal height
  if (elementDisplay !== 'none' && elementMaxHeight !== '0') {
    return {
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    };
  }

  // the element is hidden so:
  // make the el block in order to meassure its height but still be hidden
  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';

  const scrollHeight = el.scrollHeight,
    clientHeight = el.clientHeight,
    scrollWidth = el.scrollWidth,
    clientWidth = el.clientWidth;

  // reverting to the original values
  el.style.display = null;
  el.style.position = null;
  el.style.visibility = null;

  return { scrollHeight, clientHeight, scrollWidth, clientWidth };
}

/**
 * Determines whether an event is fired on a specific element.
 */
export function isEventOnElement(element: HTMLElement, event: MouseEvent | PointerEvent): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width
  );
}

/**
 * Determines the position of an element relative to a trigger element by evaluating
 * the optimal position based on the available space.
 *
 * @param element The element of which to calculate the position.
 * @param trigger The element relative to which to calculate the position.
 * @param properties Properties to take into account in calculations.
 * @param properties.elementOffset The distance to be added between the element in question and the trigger.
 * @returns Returns an object containing the left position, the top position, a boolean indicating whether
 * the element overflows or not the window, and the maximum height of the element.
 */
export function getElementPosition(
  element: HTMLElement,
  trigger: HTMLElement,
  properties: { elementOffset: number }
): ElementPositionInfos {
  const triggerRec = trigger.getBoundingClientRect();
  const elementRec = getElementRectangle(element);

  const triggerLeft = getOffset(trigger).left;
  const triggerTop = getOffset(trigger).top;

  // default element alignment is "start/below"
  let elementXPosition = triggerLeft;
  let elementYPosition = triggerTop + triggerRec.height + properties.elementOffset;

  // calculate element max-height
  let elementMaxHeight = `calc(100vh - ${
    triggerRec.top + triggerRec.height + properties.elementOffset * 2
  }px)`;

  // check if window does not contain element height
  const overflows = elementRec.scrollHeight > element.clientHeight;

  // check if horizontal alignment needs to be changed to "end"
  if (window.innerWidth < elementXPosition + elementRec.clientWidth) {
    elementXPosition = elementXPosition - (elementRec.clientWidth - triggerRec.width);
  }

  // check if vertical alignment needs to be changed to "above":
  if (
    // if there is enough space above the trigger
    triggerRec.top > elementRec.scrollHeight + properties.elementOffset &&
    // if there is not enough space below the trigger
    window.innerHeight < triggerRec.bottom + elementRec.scrollHeight + properties.elementOffset * 2
  ) {
    elementYPosition = triggerTop - elementRec.scrollHeight - properties.elementOffset;
    elementMaxHeight = 'fit-content';
  }

  return {
    top: elementYPosition,
    left: elementXPosition,
    overflows: overflows,
    maxHeight: elementMaxHeight,
  };
}
