The `sbb-seat-reservation` is a visualized seat/bicycle parking space reservation component, with which the user can view the position of a seat as well as its status (FREE, SELECTED, ALLOCATED, RESTRICTED) within a means of transport/wagon and select it accordingly.
Currently, these components are available for all wagons of a means of transport, but only represent one level of it.
For the entire presentation, navigation and functionality of such a seat reservation, this main component includes the following child components:

> [sbb-seat-reservation-navigation](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-navigation--docs) => Enables quick navigation between individual wagons

> [sbb-seat-reservation-place-control](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-place-control--docs) => Representation of a seat

> [sbb-seat-reservation-area](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-area--docs) => For the representation of certain areas within a wagon

> [sbb-seat-reservation-graphics](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-graphics--docs) => Contains various graphics that are required to render a wagon

```html
<sbb-seat-reservation seatReservation="seatReservationObj<SeatReservation>"></sbb-seat-reservation>
```

## Data structure of SeatReservation

#### SeatReservation

```json
SeatReservation {
  vehicleType: VehicleType;
  deckCoachIndex: number;
  coachItems: CoachItem[];
}
```

#### CoachItem

```json
CoachItem {
  id: string;
  number: string;
  dimension: ElementDimension;
  type?: CoachType;
  places?: Place[];
  signs?: SignElement[];
  graphicElements?: BaseElement[];
  compartmentNumbers?: CompartmentNumberElement[];
  travelClass: PlaceTravelClass[];
  propertyIds?: string[];
}
```

#### Place

```json
Place extends BaseElement {
  number: string;
  state: PlaceState;
  type: PlaceType;
  travelClass?: PlaceTravelClass;
  remarkId?: string;
  propertyIds?: string[];
  selected?: boolean;
}
```

#### SignElement

```json
SignElement extends BaseElement {
  direction?: ElementDirection | null;
}
```

#### CompartmentNumberElement

```json
CompartmentNumberElement extends BaseElement {
  number: string;
}
```

#### BaseElement

```json
BaseElement {
  icon?: string | null;
  rotation?: number;
  position: ElementPosition;
  dimension: ElementDimension;
};
```

<!-- Auto Generated Below -->
