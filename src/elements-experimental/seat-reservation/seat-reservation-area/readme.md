The component `sbb-seat-reservation-area` represents a gray or white background area within a wagon and is currently integrated directly into [sbb-seat-reservation](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation--docs). The dimension properties of the area can be defined via style custom properties. It is still unclear whether areas will be defined in the data once, and an icon will then be automatically included, or if the data for an icon will need to be passed separately and drawn independently. In the first scenario, it would be useful to be able to include a sbb-seat-reservation-graphic through a slot or by passing an icon code within the [sbb-seat-reservation-area](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-graphic--docs).

```html
<sbb-seat-reservation-area></sbb-seat-reservation-area>
```

## Style Custom Properties

| Name                                 | Type       | Default | Description |
| ------------------------------------ | ---------- | ------- | ----------- |
| `--sbb-seat-reservation-area-width`  | `<number>` | -       | Area width  |
| `--sbb-seat-reservation-area-height` | `<number>` | -       | Area height |

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute    | Privacy | Type                                                                    | Default   | Description                |
| ------------ | ------------ | ------- | ----------------------------------------------------------------------- | --------- | -------------------------- |
| `background` | `background` | public  | `'light' \| 'dark'`                                                     | `'light'` | the background of the area |
| `mounting`   | `mounting`   | public  | `'free' \| 'upper-border' \| 'lower-border' \| 'upper-to-lower-border'` | `'free'`  | Mounting Prop              |
