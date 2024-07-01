import { isServer, type ReactiveElement } from 'lit';

import { SbbSlotStateController } from '../controllers.js';
import type { AbstractConstructor } from '../mixins.js';

/**
 * Adds the {@link SbbSlotStateController} to the related element.
 *
 * @example
 *
 * @customElement('my-element)
 * @slotState()
 * export class MyElement extends LitElement {
 *   ...
 * }
 *
 * @param attributes A record of attributes to apply to the element.
 */
export const slotState = () => (target: AbstractConstructor<ReactiveElement>) => {
  if (!isServer) {
    (target as typeof ReactiveElement).addInitializer(
      (instance: ReactiveElement) => new SbbSlotStateController(instance),
    );
  }
};
