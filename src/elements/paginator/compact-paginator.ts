/** @entrypoint */
import { SbbCompactPaginatorElement } from './compact-paginator/compact-paginator.component.ts';

export * from './compact-paginator/compact-paginator.component.ts';

SbbCompactPaginatorElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/paginator/compact-paginator.js' has been deprecated.
Use either '@sbb-esta/elements/paginator.js' or '@sbb-esta/elements/paginator.pure.js' instead.`);
