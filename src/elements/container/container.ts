/** @entrypoint */
import { SbbContainerElement } from './container/container.component.ts';

export * from './container/container.component.ts';

SbbContainerElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/container/container.js' has been deprecated.
Use either '@sbb-esta/elements/container.js' or '@sbb-esta/elements/container.pure.js' instead.`);
