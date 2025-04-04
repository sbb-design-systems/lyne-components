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

## Properties

| Name          | Attribute      | Privacy | Type      | Default | Description                                                                       |
| ------------- | -------------- | ------- | --------- | ------- | --------------------------------------------------------------------------------- |
| `index`       | `index`        | public  | `number`  | `false` | index number of the coach.                                                        |
| `selected`    | `selected`     | public  | `boolean` | `false` | Whether the coach is active/selected.                                             |
| `coachId`     | `coach-id`     | public  | `string`  | ''      | CoachItem id.                                                                     |
| `propertyIds` | `property-ids` | public  | `array`   | []      | CoachItem propertyIds.                                                            |
| `travelClass` | `travel-class` | public  | `string`  | ``      | Travelclass of the actual coach.                                                  |
| `driverArea`  | `driver-area`  | public  | `boolean` | `false` | Whether the coach is a driverarea and has therefore no additonal information.     |
| `first`       | `first`        | public  | `boolean` | `false` | Whether the coach is the first one of the train/bus and has custom border-radius. |
| `last`        | `last`         | public  | `boolean` | `false` | Whether the coach is the last one of the train/bus and has custom border-radius.  |

<!-- Auto Generated Below -->
