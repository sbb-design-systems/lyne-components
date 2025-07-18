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

#### SeatReservationCoachSelection

```typescript
type SeatReservationCoachSelection = {
  coachId: string;
  coachNumber: string;
  coachIndex: number;
  coachType?: CoachType;
  coachTravelClass: PlaceTravelClass[];
  coachPropertyIds?: string[];
};
```

#### Other

```typescript
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

Custom CSS properties allows you to customize the style of the place. Depending on the current state of the place ("FREE", "SELECTED") and the current state of the place-button ("default," "hover," "focus"), the colors of the background, the backrest and textcolor of the place can be customized. The currently specified values var(--sbb-color-black)) are the built-in default values.

By using the pseudo-element ::part(sbb-sr-place-part) in your own css, the individual custom properties can be overwritten.

```css
::part(sbb-sr-place-part) {

  // Color definition for text
  --sbb-seat-reservation-place-control-default-text: var(--sbb-color-black);
  --sbb-seat-reservation-place-control-hover-text: var(--sbb-color-iron);
  --sbb-seat-reservation-place-control-focus-text: var(--sbb-color-anthracite);
  --sbb-seat-reservation-place-control-allocated-text: var(--sbb-color-smoke);

  // Color background definition for place with state FREE
  --sbb-seat-reservation-place-control-free-background-default: var(--sbb-color-white);
  --sbb-seat-reservation-place-control-free-background-hover: var(--sbb-color-cloud);
  --sbb-seat-reservation-place-control-free-background-focus: var(--sbb-color-silver);

  // Color background definition for backrest with state FREE
  --sbb-seat-reservation-place-control-free-backrest-background-default: var(--sbb-color-black);
  --sbb-seat-reservation-place-control-free-backrest-background-hover: var(--sbb-color-black);
  --sbb-seat-reservation-place-control-free-backrest-background-focus: var(--sbb-color-black);

  // Color background definition for place with state SELECTED
  --sbb-seat-reservation-place-control-selected-background-default: var(--sbb-color-red);
  --sbb-seat-reservation-place-control-selected-background-hover: var(--sbb-color-red125);
  --sbb-seat-reservation-place-control-selected-background-focus: var(--sbb-color-red150);

  // Color background definition for backrest with state SELECTED
  --sbb-seat-reservation-place-control-selected-backrest-background-default: var(--sbb-color-red150);
  --sbb-seat-reservation-place-control-selected-backrest-background-hover: #7d000f;
  --sbb-seat-reservation-place-control-selected-backrest-background-focus: #5a000b;

  // Color background definition for place with state ALLOCATED
  --sbb-seat-reservation-place-control-allocated-background-default: var(--sbb-color-milk);
}
```

### Example of customizing CASA (blue)

```css
::part(sbb-sr-place-part) {
  --sbb-seat-reservation-place-control-selected-background-default: var(--casa-blue);
  --sbb-seat-reservation-place-control-selected-background-hover: var(--casa-blue);
  --sbb-seat-reservation-place-control-selected-background-focus: var(--casa-blue);
  --sbb-seat-reservation-place-control-selected-backrest-background-default: var(--casa-blue-hover);
  --sbb-seat-reservation-place-control-selected-backrest-background-hover: var(--casa-blue-hover);
  --sbb-seat-reservation-place-control-selected-backrest-background-focus: var(--casa-blue-hover);
}
```

## Accessibility

The `sbb-seat-reservation` component is designed to be accessible. It uses ARIA roles and
properties to ensure that screen readers can interpret the seat reservation structure correctly.
Each seat and coach is represented with appropriate roles, and the component emits custom events
to communicate user interactions.

Keyboard navigation is supported, allowing users to navigate through the seat reservation navigation
with TAB and arrow keys. The component also provides visual focus indicators to help users understand
their current position within the reservation area.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute             | Privacy | Type              | Default | Description                                                       |
| ------------------- | --------------------- | ------- | ----------------- | ------- | ----------------------------------------------------------------- |
| `alignVertical`     | `align-vertical`      | public  | `boolean`         | `false` | The seat reservation area is aligned vertically                   |
| `baseGridSize`      | `base-grid-size`      | public  | `number`          | `16`    | The seat reservation area's base grid size                        |
| `hasNavigation`     | `has-navigation`      | public  | `boolean`         | `true`  | The seat reservation navigation can be toggled by this property   |
| `height`            | `height`              | public  | `number`          | `null!` | The seat reservation area's width                                 |
| `maxReservations`   | `max-reservations`    | public  | `number`          | `null!` | Maximal number of possible clickable seats                        |
| `preventPlaceClick` | `prevent-place-click` | public  | `boolean`         | `false` | Any click functionality is prevented                              |
| `seatReservation`   | `seat-reservation`    | public  | `SeatReservation` | `null!` | The seat reservation object which contains all coaches and places |

## Events

| Name             | Type                                                     | Description                                                                         | Inherited From             |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------- |
| `selectedcoach`  | `CustomEvent<SeatReservationCoachSelection>`             | Emits when a coach was selected and returns a CoachSelection                        | SeatReservationBaseElement |
| `selectedplaces` | `CustomEvent<SeatReservationSelectedPlacesEventDetails>` | Emits when a place was selected and returns a Place array with all selected places. | SeatReservationBaseElement |
