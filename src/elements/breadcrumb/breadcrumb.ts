/** @entrypoint */
import { SbbBreadcrumbElement } from './breadcrumb/breadcrumb.component.ts';

export * from './breadcrumb/breadcrumb.component.ts';

SbbBreadcrumbElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/breadcrumb/breadcrumb.js' has been deprecated.
Use either '@sbb-esta/elements/breadcrumb.js' or '@sbb-esta/elements/breadcrumb.pure.js' instead.`);
