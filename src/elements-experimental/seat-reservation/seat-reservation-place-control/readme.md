The `seat-reservation-place-control` is a component that renders a control element for a seat or a bicycle space. Type, status, dimensions, and transformations can be defined through properties. The graphic is integrated via [sbb-seat-reservation-graphic](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-graphic--docs). An event `selectPlace` is emitted on click.

```html
<seat-reservation-place-control></seat-reservation-place-control>
```

## Events

> @event selectPlace - Emits when select a place and returns a PlaceSelection object with necessary place information

<!-- Auto Generated Below -->

## Properties

| Name           | Attribute       | Privacy | Type         | Default   | Description                           |
| -------------- | --------------- | ------- | ------------ | --------- | ------------------------------------- |
| `type`         | `type`          | public  | `PlaceType`  | `SEAT`    | type of PlaceControl                  |
| `state`        | `state`         | public  | `PlaceState` | `FREE`    | state of PlaceControl                 |
| `propertyIds`  | `property-ids`  | public  | `array`      | `[]`      | Place Property of the Control         |
| `rotation`     | `rotation`      | public  | `number`     | `0`       | rotation of PlaceControl              |
| `width`        | `width`         | public  | `number`     | `32`      | width of PlaceControl                 |
| `height`       | `height`        | public  | `number`     | `32`      | height of PlaceControl                |
| `text`         | `text`          | public  | `string`     | ``        | text inside PlaceControl              |
| `textRotation` | `text-rotation` | public  | `number`     | `0`       | text-rotation inside PlaceControl     |
| `coachIndex`   | `coach-index`   | public  | `number`     | `null`    | coach index where the placeControl is |
| `preventClick` | `prevent-click` | public  | `boolean`    | `false`   | prevent click events                  |
| `keyfocus`     | `keyfocus`      | public  | `string`     | `unfocus` |                                       |
