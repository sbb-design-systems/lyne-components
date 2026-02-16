The `sbb-option-hint` is a component used to show a hint message within a [sbb-autocomplete](/docs/elements-sbb-autocomplete--docs)
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
  <sbb-option value="1">Option 1</sbb-option>
  ...
  <sbb-option-hint>42 more hits</sbb-option-hint>
</sbb-autocomplete>
```

## A11y

By default, the `sbb-option-hint` is treated as a simple text from screen readers, and it is not easily accessible by screen reader users.

If deemed necessary, the `sbb-option-hint` can be marked with the [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live) attribute.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type      | Default | Description                     |
| ---------- | ---------- | ------- | --------- | ------- | ------------------------------- |
| `negative` | `negative` | public  | `boolean` | `false` | Negative coloring variant flag. |

## Slots

| Name | Description                                       |
| ---- | ------------------------------------------------- |
|      | Use the unnamed slot to display the hint message. |
