/**
 * Forwards an event to the element provided.
 * This way, an event triggered in the Shadow DOM can cross its boundary and can be listened on e.g. the host component.
 */
export function forwardEvent(event: Event, element: HTMLElement | Document): void {
  const eventConstructor = Object.getPrototypeOf(event).constructor;
  const copiedEvent: Event = new eventConstructor(event.type, event);
  element.dispatchEvent(copiedEvent);
}
