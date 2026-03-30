/** @entrypoint */
import { SbbTransparentButtonStaticElement } from '../button.pure.ts';

export * from './transparent-button-static/transparent-button-static.component.ts';

SbbTransparentButtonStaticElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/transparent-button-static.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
