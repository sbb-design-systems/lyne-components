The `sbb-chip` is a component meant to be used in combination with the [sbb-chip-group](/docs/elements-sbb-chip-sbb-chip-group--docs) to display a list of string user inputs.

```html
<sbb-chip-group>
  <sbb-chip value="Value 1"></sbb-chip>
  ...
</sbb-chip-group>
```

## Slots

It is possible to provide a label via the unnamed slot. If not present, the `value` will be used.

## States

The `disabled`/`readOnly` properties are controlled by the `sbb-chip-group`.

## Accessibility

Use the `accessibility-label` property to add info on the chip content.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type                   | Default | Description                                                     |
| ---------- | ---------- | ------- | ---------------------- | ------- | --------------------------------------------------------------- |
| `disabled` | `disabled` | public  | `boolean`              | `false` | Whether the component is disabled.                              |
| `negative` | `negative` | public  | `boolean`              | `false` | Negative coloring variant flag.                                 |
| `readOnly` | `readonly` | public  | `boolean`              | `false` | Whether the component is readonly.                              |
| `value`    | `value`    | public  | `(T = string) \| null` | `null`  | The value of chip. Will be used as label if nothing is slotted. |

## Slots

| Name | Description                                                                               |
| ---- | ----------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add the display value. If not provided, the 'value' will be used. |
