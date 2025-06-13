The `sbb-option-hint` is a component used to show an hint message within a [sbb-autocomplete](/docs/elements-sbb-autocomplete--docs)
or a [sbb-select](/docs/elements-sbb-select--docs) component.

```html
<sbb-autocomplete>
  <sbb-option value="1"> Option 1 </sbb-option>
  ...
  <sbb-divider></sbb-divider>
  <sbb-option-hint>42 more hits</sbb-option-hint>
</sbb-autocomplete>
```

## Style

The `sbb-option-hint` has a `negative` property which will be automatically inherited from the parent `sbb-autocomplete | sbb-select`.

```html
<sbb-autocomplete>
  <sbb-option value="1"> Option 1 </sbb-option>
  ...
  <sbb-option-hint>42 more hits</sbb-option-hint>
</sbb-autocomplete>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type      | Default | Description                     |
| ---------- | ---------- | ------- | --------- | ------- | ------------------------------- |
| `negative` | `negative` | public  | `boolean` | `false` | Negative coloring variant flag. |

## Slots

| Name | Description                                       |
| ---- | ------------------------------------------------- |
|      | Use the unnamed slot to display the hint message. |
