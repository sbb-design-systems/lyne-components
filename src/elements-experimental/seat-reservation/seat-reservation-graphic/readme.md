The `seat-reservation-graphic` is a component used for integrating and displaying the available SVG graphics based on the OSDM code. Other properties such as dimension and rotation can be defined via style custom properties.

```html
<seat-reservation-graphic></seat-reservation-graphic>
```

## Style Custom Properties

| Name                                      | Type       | Default | Description      |
| ----------------------------------------- | ---------- | ------- | ---------------- |
| `--sbb-seat-reservation-graphic-width`    | `<number>` | 16      | Graphic width    |
| `--sbb-seat-reservation-graphic-height`   | `<number>` | 16      | Graphic height   |
| `--sbb-seat-reservation-graphic-rotation` | `<number>` | 0       | Graphic rotation |

<!-- Auto Generated Below -->

## Properties

| Name      | Attribute | Privacy | Type      | Default | Description                                                                        |
| --------- | --------- | ------- | --------- | ------- | ---------------------------------------------------------------------------------- |
| `name`    | `name`    | public  | `string`  | `''`    | Name of the SVG graphic to be displayed.                                           |
| `stretch` | `stretch` | public  | `boolean` | `false` | if true, scale the graphic content of the given element non-uniformly if necessary |
