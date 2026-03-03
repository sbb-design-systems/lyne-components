/** @entrypoint */
import { SbbNavigationSectionElement } from './navigation-section/navigation-section.component.ts';

export * from './navigation-section/navigation-section.component.ts';

SbbNavigationSectionElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/navigation/navigation-section.js' has been deprecated.
Use either '@sbb-esta/elements/navigation.js' or '@sbb-esta/elements/navigation.pure.js' instead.`);
