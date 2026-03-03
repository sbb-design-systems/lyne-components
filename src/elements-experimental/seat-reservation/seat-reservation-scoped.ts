/** @entrypoint */
import { SbbSeatReservationScopedElement } from './seat-reservation-scoped/seat-reservation-scoped.component.ts';

export * from './seat-reservation-scoped/seat-reservation-scoped.component.ts';

SbbSeatReservationScopedElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/seat-reservation/seat-reservation-scoped.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/seat-reservation.js' or '@sbb-esta/elements-experimental/seat-reservation.pure.js' instead.`);
