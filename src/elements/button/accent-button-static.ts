/** @entrypoint */
import { SbbAccentButtonStaticElement } from '../button.pure.ts';

export * from './accent-button-static/accent-button-static.component.ts';

SbbAccentButtonStaticElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/button/accent-button-static.js' has been deprecated.
Use either '@sbb-esta/elements/button.js' or '@sbb-esta/elements/button.pure.js' instead.`);
