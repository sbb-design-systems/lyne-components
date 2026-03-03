/** @entrypoint */
import { SbbSeatReservationGraphicElement } from './seat-reservation-graphic/seat-reservation-graphic.component.ts';

export * from './seat-reservation-graphic/seat-reservation-graphic.component.ts';

SbbSeatReservationGraphicElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/seat-reservation/seat-reservation-graphic.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/seat-reservation.js' or '@sbb-esta/elements-experimental/seat-reservation.pure.js' instead.`);
