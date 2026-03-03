/** @entrypoint */
import { SbbStickyBarElement } from './sticky-bar/sticky-bar.component.ts';

export * from './sticky-bar/sticky-bar.component.ts';

SbbStickyBarElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/container/sticky-bar.js' has been deprecated.
Use either '@sbb-esta/elements/container.js' or '@sbb-esta/elements/container.pure.js' instead.`);
