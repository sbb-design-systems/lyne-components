/** @entrypoint */
import { SbbMiniButtonGroupElement } from '../button.pure.ts';

export * from './mini-button-group/mini-button-group.component.ts';

SbbMiniButtonGroupElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/mini-button-group.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
