/**
 * Forwards a change on the nested input element to the host element.
 * In this way an event triggered in the ShadowDOM can cross its boundary and can be listened on the host component.
 */
export function forwardInnerEventToHost(event: Event, host: HTMLElement): void {
  const eventConstructor = Object.getPrototypeOf(event).constructor;
  const copiedEvent: Event = new eventConstructor(event.type, {
    ...event,
    composed: true,
    bubbles: true,
    // TODO: Check if it really should be composed and bubbling
  });
  host.dispatchEvent(copiedEvent);
}
