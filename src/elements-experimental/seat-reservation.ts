/** @entrypoint */
import {
  SbbSeatReservationAreaElement,
  SbbSeatReservationElement,
  SbbSeatReservationGraphicElement,
  SbbSeatReservationNavigationCoachElement,
  SbbSeatReservationNavigationServicesElement,
  SbbSeatReservationPlaceControlElement,
  SbbSeatReservationScopedElement,
} from './seat-reservation.pure.ts';

export * from './seat-reservation.pure.ts';

SbbSeatReservationElement.define();
SbbSeatReservationAreaElement.define();
SbbSeatReservationGraphicElement.define();
SbbSeatReservationNavigationCoachElement.define();
SbbSeatReservationNavigationServicesElement.define();
SbbSeatReservationPlaceControlElement.define();
SbbSeatReservationScopedElement.define();
