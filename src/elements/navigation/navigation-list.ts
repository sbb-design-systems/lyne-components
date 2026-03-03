/** @entrypoint */
import { SbbNavigationListElement } from './navigation-list/navigation-list.component.ts';

export * from './navigation-list/navigation-list.component.ts';

SbbNavigationListElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/navigation/navigation-list.js' has been deprecated.
Use either '@sbb-esta/elements/navigation.js' or '@sbb-esta/elements/navigation.pure.js' instead.`);
