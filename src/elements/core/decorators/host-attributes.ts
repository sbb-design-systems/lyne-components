import { isServer, type ReactiveElement } from 'lit';

import type { AbstractConstructor } from '../mixins.js';

function applyAttributes(
  instance: ReactiveElement,
  attributes: Record<string, string | null>,
): void {
  for (const [name, value] of Object.entries(attributes)) {
    if (!value) {
      instance.toggleAttribute(name, value !== null);
    } else if (!instance.hasAttribute(name)) {
      instance.setAttribute(name, value);
    }
  }
}

/**
 * Applies the given attributes to the related element.
 * If an empty string is passed as a value, the attribute will be set
 * without value.
 *
 * @example
 *
 * @customElement('my-element)
 * @hostAttributes({
 *   role: 'region'
 * })
 * export class MyElement extends LitElement {
 *   ...
 * }
 *
 * @param attributes A record of attributes to apply to the element.
 */
export const hostAttributes =
  (attributes: Record<string, string | null>) => (target: AbstractConstructor<ReactiveElement>) =>
    (target as typeof ReactiveElement).addInitializer((instance: ReactiveElement) => {
      const instanceWithHostAttributes = instance as ReactiveElement & {
        hostAttributes: Record<string, string | null>;
        hostAttributeControllers: any[];
      };
      instanceWithHostAttributes.hostAttributes = {
        ...(instanceWithHostAttributes.hostAttributes ?? {}),
        ...attributes,
      };
      if (!instanceWithHostAttributes.hostAttributeControllers) {
        instanceWithHostAttributes.hostAttributeControllers = [];
      }

      if (isServer) {
        // TODO: Check whether we can accept having potential wrong attributes on SSR
        applyAttributes(instanceWithHostAttributes, instanceWithHostAttributes.hostAttributes);
      } else {
        // It is not allowed to set attributes during constructor phase. Due to this we use a
        // controller to assign the attributes during lit initialization phase.
        // HostConnected or hostUpdate can be called either order. Due to that we apply in the
        // first occurrence and directly remove the controller, so it's only called once.
        const controller = {
          hostConnected() {
            applyAttributes(instanceWithHostAttributes, instanceWithHostAttributes.hostAttributes);
            instanceWithHostAttributes.hostAttributeControllers.forEach((cont) =>
              instanceWithHostAttributes.removeController(cont),
            );
          },
          hostUpdate() {
            applyAttributes(instanceWithHostAttributes, instanceWithHostAttributes.hostAttributes);
            instanceWithHostAttributes.hostAttributeControllers.forEach((cont) =>
              instanceWithHostAttributes.removeController(cont),
            );
          },
        };
        instanceWithHostAttributes.addController(controller);
        instanceWithHostAttributes.hostAttributeControllers.push(controller);
      }
    });
