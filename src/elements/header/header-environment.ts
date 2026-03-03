/** @entrypoint */
import { SbbHeaderEnvironmentElement } from './header-environment/header-environment.component.ts';

export * from './header-environment/header-environment.component.ts';

SbbHeaderEnvironmentElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/header/header-environment.js' has been deprecated.
Use either '@sbb-esta/elements/header.js' or '@sbb-esta/elements/header.pure.js' instead.`);
