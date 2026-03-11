/** @entrypoint */
import { SbbSeatReservationPlaceControlElement } from './seat-reservation-place-control/seat-reservation-place-control.component.ts';

export * from './seat-reservation-place-control/seat-reservation-place-control.component.ts';

SbbSeatReservationPlaceControlElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/seat-reservation/seat-reservation-place-control.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/seat-reservation.js' or '@sbb-esta/elements-experimental/seat-reservation.pure.js' instead.`);
