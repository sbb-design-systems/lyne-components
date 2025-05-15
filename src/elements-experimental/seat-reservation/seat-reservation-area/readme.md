The component `sbb-seat-reservation-area` represents a gray or white background area within a wagon and is currently integrated directly into [sbb-seat-reservation](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation--docs). It is still unclear whether areas will be defined in the data once, and an icon will then be automatically included, or if the data for an icon will need to be passed separately and drawn independently. In the first scenario, it would be useful to be able to include an sbb-seat-reservation-graphic through a slot or by passing an icon code within the [sbb-seat-reservation-area](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-graphic--docs).

```html
<sbb-seat-reservation-area></sbb-seat-reservation-area>
```

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute    | Privacy | Type                  | Default | Description                        |
| ------------ | ------------ | ------- | --------------------- | ------- | ---------------------------------- |
| width        | `width`      | public  | `number`              | `0`     | Width of the element in px         |
| `height`     | `height`     | public  | `number`              | `0`     | Height of the element in px        |
| `rotation`   | `rotation`   | public  | `number`              | `0`     | Rotation of the element in degrees |
| `mounting`   | `mounting`   | public  | `ElementMounting`     | `FREE`  | Position/Type of the mounting      |
| `background` | `background` | public  | `AreaBackgroundState` | `DARK`  | white or grey background           |
