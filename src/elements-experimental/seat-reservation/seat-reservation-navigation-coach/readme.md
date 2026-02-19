The `sbb-seat-reservation-navigation-coach` is a component which represents one coach in
a train or bus coach layout. Additionally service icons are also generated in this
component if present in the incoming COACH_DATA.

The purpose of this component is to be used in the main [sbb-reservation-navigation](/docs/experimental-sbb-seat-reservation-navigation--docs) component

```html
<sbb-seat-reservation-navigation-coach
  index="0"
  ?selected="true"
  ?focused="false"
  ?hovered="false"
  ?nativeFocusActive="false"
  .coachItemDetails="{
    coachId: '80',
    freePlacesByType: {
      seats: 0,
      bicycles: 0
    },
    isDriverArea: false,
    travelClass: 'FIRST',
    propertyIds: ['WIFI', 'POWER_OUTLET']
  }"
  ?vertical="false"
>
</sbb-seat-reservation-navigation-coach>
```

## Events

> @event selectcoach - Emits when a coach was selected and returns the coach index number.
> @event focuscoach - Emits when a coach was focused

## Keyboard interaction

| Keyboard         | Action                                                                      |
| ---------------- | --------------------------------------------------------------------------- |
| <kbd>Enter</kbd> | Selects the coach as the active/selected coach and emits selectCoach Event. |

## Accessibility

> Component was successfully tested with different High-Contrast Modes

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute            | Privacy | Type               | Default                | Description                                                                             |
| ------------------- | -------------------- | ------- | ------------------ | ---------------------- | --------------------------------------------------------------------------------------- |
| `coachItemDetails`  | `coach-item-details` | public  | `CoachItemDetails` | `<CoachItemDetails>{}` |                                                                                         |
| `disable`           | `disable`            | public  | `boolean`          | `false`                | Disable the coach navigation                                                            |
| `focused`           | `focused`            | public  | `boolean`          | `false`                | Focus coach property                                                                    |
| `hovered`           | `hovered`            | public  | `boolean`          | `false`                | Hover coach property                                                                    |
| `index`             | `index`              | public  | `number`           | `0`                    |                                                                                         |
| `nativeFocusActive` | `nativeFocusActive`  | public  | `boolean`          | `true`                 | Native focus for this navigation coach is also set when the focused property is changed |
| `selected`          | `selected`           | public  | `boolean`          | `false`                | Select coach property                                                                   |
| `vertical`          | `vertical`           | public  | `boolean`          | `false`                | If the coach navigation should be displayed vertically                                  |

## Events

| Name          | Type                                   | Description                                                                                    | Inherited From |
| ------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------- |
| `focuscoach`  | `Event`                                | Emits when a nav coach has the focus                                                           |                |
| `selectcoach` | `CustomEvent<SelectCoachEventDetails>` | Emits when a coach within the navigation was selected and returns the clicked coach nav index. |                |
