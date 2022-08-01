# sbb-card

The sbb-card is a container in which is possible to put other html tag. It provides a slot in which is possible to put the `<sbb-card-badge>`.

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


