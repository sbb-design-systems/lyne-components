/** @entrypoint */
import { SbbPaginatorElement } from './paginator/paginator.component.ts';

export * from './paginator/paginator.component.ts';

SbbPaginatorElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/paginator/paginator.js' has been deprecated.
Use either '@sbb-esta/elements/paginator.js' or '@sbb-esta/elements/paginator.pure.js' instead.`);
