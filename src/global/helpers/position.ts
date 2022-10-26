export type Alignment = { horizontal: 'start' | 'center' | 'end'; vertical: 'above' | 'below' };

export type ElementRectangle = Pick<
  Element,
  'scrollHeight' | 'clientHeight' | 'scrollWidth' | 'clientWidth'
>;

export interface ElementPositionInfos {
  top: number;
  left: number;
  maxHeight: string;
  alignment: Alignment;
}

/**
 * Gets height and width of an element even if it's hidden (`display: none`).
 */
export function getElementRectangle(el: HTMLElement): ElementRectangle {
  const elementStyle = window.getComputedStyle(el),
    elementDisplay = elementStyle.display,
    elementMaxHeight = parseInt(elementStyle.maxHeight, 10).toString();

  // If it is not hidden we just return normal height
  if (elementDisplay !== 'none' && elementMaxHeight !== '0') {
    return {
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    };
  }

  // The element is hidden so:
  // make the el block in order to measure its height but still be hidden
  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';

  const scrollHeight = el.scrollHeight,
    clientHeight = el.clientHeight,
    scrollWidth = el.scrollWidth,
    clientWidth = el.clientWidth;

  // Reverting to the original values
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
 * @param properties Properties to take into account in calculations (optional).
 * @param properties.verticalOffset The distance to be added between the element and the trigger (optional).
 * @param properties.horizontalOffset The horizontal offset to be applied to the element (optional).
 * @param properties.centered Whether the element should be placed in the center by default (optional).
 * @returns Returns an object containing the left position, the top position, the maximum height
 * of the element and the current alignment object.
 */
export function getElementPosition(
  element: HTMLElement,
  trigger: HTMLElement,
  properties?: { verticalOffset?: number; horizontalOffset?: number; centered?: boolean }
): ElementPositionInfos {
  const VERTICAL_OFFSET = properties.verticalOffset || 0;
  const HORIZONTAL_OFFSET = properties.horizontalOffset || 0;

  const triggerRec = trigger.getBoundingClientRect();
  const elementRec = getElementRectangle(element);

  const triggerLeft = triggerRec.left;
  const triggerTop = triggerRec.top;

  const availableSpaceRight = window.innerWidth - (triggerLeft + triggerRec.width);
  const availableSpaceAbove = triggerTop - VERTICAL_OFFSET;
  const availableSpaceBelow =
    window.innerHeight - (triggerTop + triggerRec.height + VERTICAL_OFFSET);

  // Default element alignment is "start/below"
  let elementXPosition = triggerLeft;
  let elementYPosition = triggerTop + triggerRec.height + VERTICAL_OFFSET;
  let elementXOverflow = elementRec.clientWidth - triggerRec.width;
  const alignment: Alignment = { horizontal: 'start', vertical: 'below' };

  // Calculate element max-height
  let elementMaxHeight = `${availableSpaceBelow - VERTICAL_OFFSET}px`;

  // Check if horizontal alignment needs to be changed to "center"
  if (
    properties.centered &&
    triggerLeft + triggerRec.width / 2 > elementRec.clientWidth / 2 &&
    availableSpaceRight > elementXOverflow / 2
  ) {
    elementXPosition -= elementXOverflow /= 2;
    alignment.horizontal = 'center';
  }

  // Check if horizontal alignment needs to be changed to "end"
  if (availableSpaceRight < elementXOverflow && triggerLeft > elementXOverflow) {
    elementXPosition = elementXPosition - elementXOverflow;
    alignment.horizontal = 'end';
  }

  // Add horizontal offset
  if (
    HORIZONTAL_OFFSET &&
    alignment.horizontal !== 'center' &&
    triggerRec.width / 2 < HORIZONTAL_OFFSET
  ) {
    elementXPosition += HORIZONTAL_OFFSET * (alignment.horizontal === 'start' ? -1 : 1);
  }

  // Check whether there is sufficient space on both sides
  if (triggerLeft < elementXOverflow && availableSpaceRight < elementXOverflow) {
    elementXPosition = window.innerWidth / 2 - elementRec.clientWidth / 2;
  }

  // Check if vertical alignment needs to be changed to "above":
  if (
    availableSpaceBelow < elementRec.clientHeight &&
    (availableSpaceAbove > elementRec.clientHeight || availableSpaceAbove > availableSpaceBelow)
  ) {
    elementYPosition =
      availableSpaceAbove < elementRec.clientHeight
        ? elementYPosition - triggerRec.height - availableSpaceAbove - VERTICAL_OFFSET
        : triggerTop - elementRec.clientHeight - VERTICAL_OFFSET;

    elementMaxHeight = `${availableSpaceAbove - VERTICAL_OFFSET}px`;
    alignment.vertical = 'above';
  }

  return {
    top: elementYPosition,
    left: elementXPosition,
    maxHeight: elementMaxHeight,
    alignment: alignment,
  };
}
