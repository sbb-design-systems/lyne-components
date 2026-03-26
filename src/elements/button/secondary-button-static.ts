/** @entrypoint */
import { SbbSecondaryButtonStaticElement } from '../button.pure.ts';

export * from './secondary-button-static/secondary-button-static.component.ts';

SbbSecondaryButtonStaticElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/secondary-button-static.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
