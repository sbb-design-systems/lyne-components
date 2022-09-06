# sbb-card

The `sbb-card` component is a generic content container; its task is to contain HTML elements related to a single subject. The `sbb-card-badge` component can be used via slot to display a badge in the upper right corner.

## Usage

The example below show how to render the component with `<sbb-card-badge>`:

```html
<sbb-card>
    <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
  </sbb-card>
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                   | Type                                         | Default |
| -------- | --------- | --------------------------------------------- | -------------------------------------------- | ------- |
| `size`   | `size`    | Size variant, either xs, s, m, l, xl and xxl. | `"l" \| "m" \| "s" \| "xl" \| "xs" \| "xxl"` | `'m'`   |


## Slots

| Slot        | Description                        |
| ----------- | ---------------------------------- |
| `"badge"`   | Slot to render `<sbb-card-badge>`. |
| `"unnamed"` | Slot to render the content.        |


----------------------------------------------


