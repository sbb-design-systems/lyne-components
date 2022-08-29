export interface ElementPositionInfos {
  top: number;
  left: number;
  overflows: boolean;
  maxHeight: string;
}

export function getOffset(el): { top: number; left: number } {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

export function getElementPosition(
  element,
  trigger,
  properties: { elementOffset: number }
): ElementPositionInfos {
  const triggerRec = trigger.getBoundingClientRect();
  const elementRec = element.getBoundingClientRect();

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
  const overflows = element.scrollHeight > element.clientHeight;

  // check if horizontal alignment needs to be changed to "end"
  if (window.innerWidth < elementXPosition + elementRec.width) {
    elementXPosition = elementXPosition - (elementRec.width - triggerRec.width);
  }

  // check if vertical alignment needs to be changed to "above":
  if (
    // if there is enough space above the trigger
    triggerRec.top > element.scrollHeight + properties.elementOffset &&
    // if there is not enough space below the trigger
    window.innerHeight < triggerRec.bottom + element.scrollHeight + properties.elementOffset * 2
  ) {
    elementYPosition = triggerTop - element.scrollHeight - properties.elementOffset;
    elementMaxHeight = 'fit-content';
  }

  return {
    top: elementYPosition,
    left: elementXPosition,
    overflows: overflows,
    maxHeight: elementMaxHeight,
  };
}
