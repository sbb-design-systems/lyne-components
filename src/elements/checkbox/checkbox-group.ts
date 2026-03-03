/** @entrypoint */
import { SbbCheckboxGroupElement } from '../checkbox-group/checkbox-group.component.ts';

export * from '../checkbox-group/checkbox-group.component.ts';

SbbCheckboxGroupElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/checkbox/checkbox-group.js' has been deprecated.
Use either '@sbb-esta/elements/checkbox.js' or '@sbb-esta/elements/checkbox.pure.js' instead.`);
