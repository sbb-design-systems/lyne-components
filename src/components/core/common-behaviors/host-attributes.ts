import { isServer, type ReactiveElement } from 'lit';

function applyAttributes(instance: ReactiveElement, attributes: Record<string, string>): void {
  for (const [name, value] of Object.entries(attributes)) {
    if (value) {
      instance.setAttribute(name, value);
    } else {
      instance.toggleAttribute(name, true);
    }
  }
}

/**
 * Applies the given attibutes to the related element.
 * If an empty string is passed as a value, the attribute will be set
 * without value.
 *
 * @example
 *
 * @hostAttributes({
 *   role: 'region'
 * })
 * @customElement('my-element)
 * export class MyElement extends LitElement {
 *   ...
 * }
 *
 * @param attributes A record of attributes to apply to the element.
 */
export const hostAttributes =
  (attributes: Record<string, string>) => (target: typeof ReactiveElement) =>
    target.addInitializer((instance: ReactiveElement) => {
      if (isServer) {
        applyAttributes(instance, attributes);
      } else {
        // It is not allowed to set attributes during constructor phase. Due to this we use a
        // controller to assign the attributes during lit initialization phase.
        instance.addController({
          hostConnected() {
            applyAttributes(instance, attributes);
            instance.removeController(this);
          },
        });
      }
    });
