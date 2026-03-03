/** @entrypoint */
import { SbbSeatReservationNavigationCoachElement } from './seat-reservation-navigation-coach/seat-reservation-navigation-coach.component.ts';

export * from './seat-reservation-navigation-coach/seat-reservation-navigation-coach.component.ts';

SbbSeatReservationNavigationCoachElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/seat-reservation/seat-reservation-navigation-coach.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/seat-reservation.js' or '@sbb-esta/elements-experimental/seat-reservation.pure.js' instead.`);
