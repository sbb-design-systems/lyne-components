The `seat-reservation-place-control` is a component that renders a control element for a seat or a bicycle space. Type, status and place test can be defined through properties. Other properties such as dimension and rotation can be defined via style custom properties. The graphic is integrated via [sbb-seat-reservation-graphic](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-graphic--docs). An event `selectplace` is emitted on click.

```html
<seat-reservation-place-control></seat-reservation-place-control>
```

## Style Custom Properties

| Name                                                    | Type       | Default | Description                 |
| ------------------------------------------------------- | ---------- | ------- | --------------------------- |
| `--sbb-seat-reservation-place-control-width`            | `<number>` | 16      | Place control width         |
| `--sbb-seat-reservation-place-control-height`           | `<number>` | 16      | Place control height        |
| `--sbb-seat-reservation-place-control-rotation`         | `<number>` | 0       | Place control rotation      |
| `--sbb-seat-reservation-place-control-text-rotation`    | `<number>` | 0       | Place control text rotation |
| `--sbb-seat-reservation-place-control-text-scale-value` | `<number>` | 1       | Place control text scaling  |

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute       | Privacy | Type         | Default     | Description                                                     |
| --------------- | --------------- | ------- | ------------ | ----------- | --------------------------------------------------------------- |
| `coachIndex`    | `coach-index`   | public  | `number`     | `null!`     | Coach Index Prop to identifier the right place to coach         |
| `deckIndex`     | `deck-index`    | public  | `number`     | `null!`     | Deck Index Prop to identifier the right place to deck           |
| `keyfocus`      | `keyfocus`      | public  | `string`     | `'unfocus'` | Set the place focus outline style                               |
| `placeType`     | `type`          | public  | `PlaceType`  | `'SEAT'`    | placeType of the place, e.g. 'SEAT', 'BICYCLE'                  |
| `preventClick`  | `prevent-click` | public  | `boolean`    | `false`     | Prevent click prop prevent any place action                     |
| `propertyIds`   | `propertyIds`   | public  | `string[]`   | `[]`        | property ids of the place, to display more info about the place |
| `showTitleInfo` | `showTitleInfo` | public  | `boolean`    | `false`     | Disable the mouse over title information                        |
| `state`         | `state`         | public  | `PlaceState` | `'FREE'`    | state of the place, e.g. 'FREE', 'SELECTED', 'BLOCKED'          |
| `text`          | `text`          | public  | `string`     | `''`        | label of the place, e.g. '1A', '2B'                             |

## Events

| Name          | Type                          | Description                                                                                                                | Inherited From |
| ------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `selectplace` | `CustomEvent<PlaceSelection>` | Emits when a place was selected via user interaction and returns a PlaceSelection object with necessary place information. |                |
