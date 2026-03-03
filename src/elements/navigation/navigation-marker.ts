/** @entrypoint */
import { SbbNavigationMarkerElement } from './navigation-marker/navigation-marker.component.ts';

export * from './navigation-marker/navigation-marker.component.ts';

SbbNavigationMarkerElement.define();

console.warn(`The entrypoint '@sbb-esta/elements/navigation/navigation-marker.js' has been deprecated.
Use either '@sbb-esta/elements/navigation.js' or '@sbb-esta/elements/navigation.pure.js' instead.`);
