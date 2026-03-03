/** @entrypoint */
import { SbbNavigationElement } from './navigation/navigation.component.ts';

export * from './navigation/navigation.component.ts';

SbbNavigationElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/navigation/navigation.js' has been deprecated.
Use either '@sbb-esta/elements/navigation.js' or '@sbb-esta/elements/navigation.pure.js' instead.`);
