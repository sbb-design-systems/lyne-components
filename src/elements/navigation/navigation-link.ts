/** @entrypoint */
import { SbbNavigationLinkElement } from './navigation-link/navigation-link.component.ts';

export * from './navigation-link/navigation-link.component.ts';

SbbNavigationLinkElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/navigation/navigation-link.js' has been deprecated.
Use either '@sbb-esta/elements/navigation.js' or '@sbb-esta/elements/navigation.pure.js' instead.`);
