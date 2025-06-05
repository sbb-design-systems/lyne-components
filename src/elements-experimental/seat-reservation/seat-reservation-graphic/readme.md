The `seat-reservation-graphic` is a component used for integrating and displaying the available SVG graphics based on the OSDM code. Dimensions and transformations can be defined through properties.

```html
<seat-reservation-graphic></seat-reservation-graphic>
```

<!-- Auto Generated Below -->

## Properties

| Name              | Attribute          | Privacy | Type      | Default | Description                                                                             |
| ----------------- | ------------------ | ------- | --------- | ------- | --------------------------------------------------------------------------------------- |
| `height`          | `height`           | public  | `number`  | `null!` | height of the svg in pixels (without unit)                                              |
| `inverseRotation` | `inverse-roration` | public  | `number`  | `0`     | Inverse rotation for part of an SVG that can be rotated opposite to the normal rotation |
| `name`            | `name`             | public  | `string`  | `''`    | Name of the SVG graphic to be displayed.                                                |
| `rotation`        | `rotation`         | public  | `number`  | `0`     | handles the rotation of the SVG graphic                                                 |
| `stretch`         | `stretch`          | public  | `boolean` | `false` | if true, scale the graphic content of the given element non-uniformly if necessary      |
| `width`           | `width`            | public  | `number`  | `null!` | width of the svg in pixels (without unit)                                               |
