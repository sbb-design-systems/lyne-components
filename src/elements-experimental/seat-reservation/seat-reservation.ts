/** @entrypoint */
import { SbbSeatReservationElement } from './seat-reservation/seat-reservation.component.ts';

export * from './seat-reservation/seat-reservation.component.ts';
export * from './seat-reservation/seat-reservation-base-element.ts';

SbbSeatReservationElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/seat-reservation/seat-reservation.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/seat-reservation.js' or '@sbb-esta/elements-experimental/seat-reservation.pure.js' instead.`);
