The `sbb-seat-reservation-navigation-coach` is a component which represents one coach in
a train or bus coach layout. Additionally service icons are also generated in this
component if present in the incoming COACH_DATA.

The purpose of this component is to be used in the main [sbb-reservation-navigation](/docs/experimental-sbb-seat-reservation-navigation--docs) component

```html
<sbb-seat-reservation-navigation-coach
  index="0"
  ?selected="true"
  .coach-id="80"
  travel-class="SECOND"
  property-ids="[]"
  ?driverarea="false"
  ?first="false"
  ?last="false"
  role="listitem"
>
</sbb-seat-reservation-navigation-coach>
```

## Events

> @event selectCoach - Emits when a coach was selected and returns the coach index number.

## Keyboard interaction

> If the component has logic for keyboard navigation (as the `sbb-calendar` or the `sbb-select`) describe it.

| Keyboard         | Action                                                                      |
| ---------------- | --------------------------------------------------------------------------- |
| <kbd>Enter</kbd> | Selects the coach as the active/selected coach and emits selectCoach Event. |

## Accessibility

> Component was successfully tested with different High-Contrast Modes

<!-- Auto Generated Below -->

## Properties

| Name          | Attribute      | Privacy | Type                 | Default         | Description                                                                          |
| ------------- | -------------- | ------- | -------------------- | --------------- | ------------------------------------------------------------------------------------ |
| `coachId`     | `coach-id`     | public  | `string`             | `''`            | Coach ID, which is used to identify the coach in the navigation                      |
| `disable`     | `disable`      | public  | `boolean`            | `false`         | Disable the coach navigation                                                         |
| `driverArea`  | `driver-area`  | public  | `boolean`            | `false`         | If the coach is a driver/restricted area                                             |
| `first`       | `first`        | public  | `boolean`            | `false`         | If the coach is the first in the navigation                                          |
| `focused`     | `focused`      | public  | `boolean`            | `false`         |                                                                                      |
| `index`       | `index`        | public  | `number`             | `0`             |                                                                                      |
| `last`        | `last`         | public  | `boolean`            | `false`         | If the coach is the last in the navigation                                           |
| `propertyIds` | `property-ids` | public  | `string[]`           | `[]`            | Coach service property ids, which are used to display the services in the navigation |
| `selected`    | `selected`     | public  | `boolean`            | `false`         |                                                                                      |
| `travelClass` | `travel-class` | public  | `PlaceTravelClass[]` | `['ANY_CLASS']` | Travel class of the coach                                                            |
| `vertical`    | `vertical`     | public  | `boolean`            | `false`         | If the coach navigation should be displayed vertically                               |

## Events

| Name          | Type                                   | Description                                                                                    | Inherited From |
| ------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------- |
| `focusCoach`  | `Event`                                | Emits when a nav coach has the focus                                                           |                |
| `selectCoach` | `CustomEvent<SelectCoachEventDetails>` | Emits when a coach within the navigation was selected and returns the clicked coach nav index. |                |
