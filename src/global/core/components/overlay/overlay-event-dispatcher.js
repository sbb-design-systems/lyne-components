/**
 * In the *.stories.js files, components rendered via the overlay system
 * are not immediately available in the storybook template,
 * but are loaded via js, appending the element to the DOM
 * and calling the `present(...)` method on the element
 * (for example by clicking on a button).
 *
 * As a result, storybookjs fails to intercept the onPresent / onDismiss events
 * on an initially absent element; it is therefore necessary to forward them
 * from the overlay element to an element created in the DOM from the storybook.
 * This way you can view them in the 'Action' tab.
 *
 * @param {HTMLElement} storybookElement - Target HTMLElement in storybook
 * @param {HTMLElement} overlayElement - Source HTMLElement in the overlay
 * @param {string} eventName - Name of the event to forward.
 */
export const propagateOverlayEventToStorybook = (storybookElement, overlayElement, eventName) => {
  const handler = (event) => {
    storybookElement.dispatchEvent(new CustomEvent(eventName, event));
    overlayElement.removeEventListener(eventName, handler);
  };

  overlayElement.addEventListener(eventName, handler);
};
