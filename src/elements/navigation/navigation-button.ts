/** @entrypoint */
import { SbbNavigationButtonElement } from './navigation-button/navigation-button.component.ts';

export * from './navigation-button/navigation-button.component.ts';

SbbNavigationButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/navigation/navigation-button.js' has been deprecated.
Use either '@sbb-esta/elements/navigation.js' or '@sbb-esta/elements/navigation.pure.js' instead.`);
