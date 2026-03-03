/** @entrypoint */
import { SbbSeatReservationNavigationServicesElement } from './seat-reservation-navigation-services/seat-reservation-navigation-services.component.ts';

export * from './seat-reservation-navigation-services/seat-reservation-navigation-services.component.ts';

SbbSeatReservationNavigationServicesElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/seat-reservation/seat-reservation-navigation-services.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/seat-reservation.js' or '@sbb-esta/elements-experimental/seat-reservation.pure.js' instead.`);
