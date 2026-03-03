/** @entrypoint */
import { SbbSeatReservationAreaElement } from './seat-reservation-area/seat-reservation-area.component.ts';

export * from './seat-reservation-area/seat-reservation-area.component.ts';

SbbSeatReservationAreaElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/seat-reservation/seat-reservation-area.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/seat-reservation.js' or '@sbb-esta/elements-experimental/seat-reservation.pure.js' instead.`);
