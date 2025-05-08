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

```typescript
type SeatReservation = {
  vehicleType: VehicleType;
  deckCoachIndex: number;
  coachItems: CoachItem[];
};
```

#### CoachItem

```typescript
type CoachItem = {
  id: string;
  number: string;
  dimension: ElementDimension;
  type?: CoachType;
  places?: Place[];
  graphicElements?: BaseElement[];
  serviceElements?: BaseElement[];
  travelClass: PlaceTravelClass[];
  propertyIds?: string[];
};
```

#### Place

```typescript
interface Place extends BaseElement {
  number: string;
  state: PlaceState;
  type: PlaceType;
  travelClass?: PlaceTravelClass;
  remarkId?: string;
  propertyIds?: string[];
  selected?: boolean;
}
```

#### ElementDimension

```typescript
type ElementDimension = {
  w: number;
  h: number;
};
```

#### ElementPosition

```typescript
type ElementPosition = {
  x: number;
  y: number;
  z: number;
};
```

#### PlaceSelection

```typescript
type PlaceSelection = {
  id: string;
  number: string;
  coachIndex: number;
  state: PlaceState;
};
```

#### SeatReservationPlaceSelection

```typescript
type SeatReservationPlaceSelection = {
  id: string;
  coachId: string;
  coachNumber: string;
  coachIndex: number;
  placeNumber: string;
  placeType: PlaceType;
  placeTravelClass: PlaceTravelClass;
  propertyIds: string[];
};
```

#### Other

```typescript
const elementMountingOptions = <const>[
  'FREE',
  'UPPER_BORDER',
  'LOWER_BORDER',
  'UPPER_TO_LOWER_BORDER',
];

type ElementMounting = (typeof elementMountingOptions)[number];
type ElementDirection = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';
type PlaceType = 'SEAT' | 'BICYCLE';
type CoachType = 'RESTAURANT_COACH' | 'BICYCLE_COACH' | 'LUGGAGE_COACH' | 'TRAIN_HEAD';
type PlaceState = 'FREE' | 'ALLOCATED' | 'RESTRICTED' | 'SELECTED';
type PlaceTravelClass = 'FIRST' | 'SECOND' | 'ANY_CLASS';
type VehicleType = 'TRAIN' | 'BUS';
```

#### BaseElement

```typescript
type BaseElement = {
  icon?: string | null;
  rotation?: number;
  position: ElementPosition;
  dimension: ElementDimension;
};
```

## Customizing

### Coloring place by css properties

Custom CSS properties allow you to customize the style of the place. Depending on the current state of the place ("FREE", "SELECTED") and the current state of the place-button ("default," "hover," "focus"), the colors for the background color, backrest, and text of the place can be customized. The currently specified values ​​(var(--sbb-color-black)) are the built-in default values.

By using the pseudo element ::part(sbb-seat-reservation-place-part) in your own css, the individual custom properties can be overwritten.

```css
::part(sbb-seat-reservation-place-part) {

  // Color definition for text with state FREE
  --sbb-reservation-place-control-free-text-default: var(--sbb-color-black);

  // Color background definition for place with state FREE
  --sbb-reservation-place-control-free-background-default: var(--sbb-color-white);
  --sbb-reservation-place-control-free-background-hover: var(--sbb-color-cloud);
  --sbb-reservation-place-control-free-background-focus: var(--sbb-color-silver);

  // Color background definition for backrest with state FREE
  --sbb-reservation-place-control-free-backrest-background-default: var(--sbb-color-black);
  --sbb-reservation-place-control-free-backrest-background-hover: var(--sbb-color-black);
  --sbb-reservation-place-control-free-backrest-background-focus: var(--sbb-color-black);

  // Color background definition for place with state SELECTED
  --sbb-reservation-place-control-selected-background-default: var(--sbb-color-red);
  --sbb-reservation-place-control-selected-background-hover: var(--sbb-color-red125);
  --sbb-reservation-place-control-selected-background-focus: var(--sbb-color-red150);

  // Color background definition for backrest with state SELECTED
  --sbb-reservation-place-control-selected-backrest-background-default: var(--sbb-color-red150);
  --sbb-reservation-place-control-selected-backrest-background-hover: #7d000f;
  --sbb-reservation-place-control-selected-backrest-background-focus: #5a000b;
}
```

<!-- Auto Generated Below -->
