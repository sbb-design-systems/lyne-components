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

```html
SeatReservation { vehicleType: VehicleType; deckCoachIndex: number; coachItems: CoachItem[]; }
```

#### CoachItem

```html
CoachItem { id: string; number: string; dimension: ElementDimension; type?: CoachType; places?:
Place[]; signs?: SignElement[]; graphicalElements?: BaseElement[]; compartmentNumbers?:
CompartmentNumberElement[]; }
```

#### Place

```html
Place extends BaseElement { number: string; state: PlaceState<'FREE' | 'ALLOCATED' | 'RESTRICTED'>;
type: PlaceType<'SEAT' | 'BICYCLE'>; rotation?: number; travelClass?: PlaceTravelClass<'FIRST' |
'SECOND' | 'ANY_CLASS'>; remarkId?: string; propertyIds?: string[]; selected?: boolean; }
```

#### SignElement

```html
SignElement extends BaseElement { direction?: ElementDirection <'TOP' | 'RIGHT' | 'BOTTOM' |
'LEFT'>; }
```

#### InternalElement

```html
InternalElement extends BaseElement { mounting?: ElementMounting<'FREE' | 'UPPER_BORDER' |
'LOWER_BORDER' | 'UPPER_TO_LOWER_BORDER'>; }
```

#### DirectedInternalElement

```html
DirectedInternalElement extends BaseElement { direction?: ElementDirection<'TOP' | 'RIGHT' |
'BOTTOM' | 'LEFT'>; }
```

#### CompartmentNumberElement

```html
CompartmentNumberElement extends BaseElement { number: string; }
```

#### BaseElement

```html
BaseElement { icon?: string; rotation?: number; position: ElementPosition; dimension:
ElementDimension; };
```

<!-- Auto Generated Below -->
