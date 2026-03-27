/** @entrypoint */
import { SbbButtonStaticElement } from '../button.pure.ts';

export * from './button-static/button-static.component.ts';

SbbButtonStaticElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/button-static.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
