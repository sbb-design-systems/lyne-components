/** @entrypoint */
import { SbbTableWrapperElement } from './table-wrapper/table-wrapper.component.ts';

export * from './table-wrapper/table-wrapper.component.ts';

SbbTableWrapperElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/table/table-wrapper.js' has been deprecated.
Use either '@sbb-esta/elements/table.js' or '@sbb-esta/elements/table.pure.js' instead.`);
