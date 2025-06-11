The `seat-reservation-place-control` is a component that renders a control element for a seat or a bicycle space. Type, status, dimensions, and transformations can be defined through properties. The graphic is integrated via [sbb-seat-reservation-graphic](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-graphic--docs). An event `selectPlace` is emitted on click.

```html
<seat-reservation-place-control></seat-reservation-place-control>
```

## Events

> @event selectPlace - Emits when select a place and returns a PlaceSelection object with necessary place information

<!-- Auto Generated Below -->

## Properties

| Name           | Attribute       | Privacy | Type         | Default     | Description                                                     |
| -------------- | --------------- | ------- | ------------ | ----------- | --------------------------------------------------------------- |
| `coachIndex`   | `coach-index`   | public  | `number`     | `null!`     | Coach Index Prop to identifier the right place to coach         |
| `height`       | `height`        | public  | `number`     | `32`        | height of the place in pixels (without unit)                    |
| `keyfocus`     | `keyfocus`      | public  | `string`     | `'unfocus'` | Set the place focus outline style                               |
| `placeType`    | `type`          | public  | `PlaceType`  | `'SEAT'`    | placeType of the place, e.g. 'SEAT', 'BICYCLE'                  |
| `preventClick` | `prevent-click` | public  | `boolean`    | `false`     | Prevent click prop prevent any place action                     |
| `propertyIds`  | `propertyIds`   | public  | `string[]`   | `[]`        | property ids of the place, to display more info about the place |
| `rotation`     | `rotation`      | public  | `number`     | `0`         | rotation in degrees (without unit)                              |
| `state`        | `state`         | public  | `PlaceState` | `'FREE'`    | state of the place, e.g. 'FREE', 'SELECTED', 'BLOCKED'          |
| `text`         | `text`          | public  | `string`     | `''`        | label of the place, e.g. '1A', '2B'                             |
| `textRotation` | `text-rotation` | public  | `number`     | `0`         | Rotation of the text in degrees (without unit)                  |
| `width`        | `width`         | public  | `number`     | `32`        | width of the place in pixels (without unit)                     |

## Events

| Name          | Type                          | Description                                                                                          | Inherited From |
| ------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------- | -------------- |
| `selectPlace` | `CustomEvent<PlaceSelection>` | Emits when a place was selected and returns a PlaceSelection object with necessary place information |                |
