The `sbb-chip` is a component meant to be used in combination with the `sbb-chip-group`

```html
<sbb-chip-group>
  <sbb-chip value="Value 1"></sbb-chip>
  ...
</sbb-chip-group>
```

## Slots

It is possible to provide a label via the unnamed slot. If not present, the `value` will be used.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type      | Default | Description                               |
| ---------- | ---------- | ------- | --------- | ------- | ----------------------------------------- |
| `disabled` | `disabled` | public  | `boolean` | `false` | Whether the component is disabled.        |
| `negative` | `negative` | public  | `boolean` | `false` | Negative coloring variant flag.           |
| `readonly` | `readonly` | public  | `boolean` | `false` | Whether the component is readonly         |
| `value`    | `value`    | public  | `string`  | `''`    | The value of chip. Will be used as label. |

## Methods

| Name    | Privacy | Description | Parameters | Return | Inherited From |
| ------- | ------- | ----------- | ---------- | ------ | -------------- |
| `focus` | public  |             |            | `void` |                |

## Slots

| Name | Description                                                                               |
| ---- | ----------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add the display value. If not provided, the 'value' will be used. |
