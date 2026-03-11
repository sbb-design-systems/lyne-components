/** @entrypoint */
import { SbbBreadcrumbGroupElement } from './breadcrumb-group/breadcrumb-group.component.ts';

export * from './breadcrumb-group/breadcrumb-group.component.ts';

SbbBreadcrumbGroupElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/breadcrumb/breadcrumb-group.js' has been deprecated.
Use either '@sbb-esta/elements/breadcrumb.js' or '@sbb-esta/elements/breadcrumb.pure.js' instead.`);
