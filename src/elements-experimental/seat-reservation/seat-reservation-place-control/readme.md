The `seat-reservation-place-control` is a component that renders a control element for a seat or a bicycle space. Type, status, dimensions, and transformations can be defined through properties. The graphic is integrated via [sbb-seat-reservation-graphic](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-graphic--docs). An event `selectPlace` is emitted on click.

```html
<seat-reservation-place-control></seat-reservation-place-control>
```

## Events

> @event selectPlace - Emits when select a place and returns a PlaceSelection object with necessary place information

<!-- Auto Generated Below -->

## Properties

| Name           | Attribute       | Privacy | Type         | Default     | Description                                            |
| -------------- | --------------- | ------- | ------------ | ----------- | ------------------------------------------------------ |
| `coachIndex`   | `coach-index`   | public  | `number`     | `null!`     | Coach Index Prop to identifer the right place to coach |
| `height`       | `height`        | public  | `number`     | `32`        | Height Prop                                            |
| `keyfocus`     | `keyfocus`      | public  | `string`     | `'unfocus'` | Set the place focus outline style                      |
| `placeType`    | `type`          | public  | `PlaceType`  | `'SEAT'`    | Type Prop                                              |
| `preventClick` | `prevent-click` | public  | `boolean`    | `false`     | Prevent click prop prevent any place action            |
| `propertyIds`  | `propertyIds`   | public  | `string[]`   | `[]`        | Place Property Ids Prop                                |
| `rotation`     | `rotation`      | public  | `number`     | `0`         | Rotation Prop                                          |
| `state`        | `state`         | public  | `PlaceState` | `'FREE'`    | State Prop                                             |
| `text`         | `text`          | public  | `string`     | `''`        | Text Prop                                              |
| `textRotation` | `text-rotation` | public  | `number`     | `0`         | TextRotation Prop                                      |
| `width`        | `width`         | public  | `number`     | `32`        | Width Prop                                             |

## Events

| Name          | Type                          | Description                                                                                          | Inherited From |
| ------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------- | -------------- |
| `selectPlace` | `CustomEvent<PlaceSelection>` | Emits when a place was selected and returns a PlaceSelection object with necessary place information |                |
