The `sbb-mini-button-group` component displays a set of [sbb-mini-button](/docs/elements-sbb-button-sbb-mini-button--docs) optionally separated by a [sbb-divider](/docs/elements-sbb-divider--docs).

```html
<sbb-mini-button-group>
  <sbb-mini-button icon-name="..."></sbb-mini-button>
  <sbb-mini-button icon-name="..."></sbb-mini-button>
  <sbb-divider orientation="vertical"></sbb-divider>
  <sbb-mini-button icon-name="..."></sbb-mini-button>
</sbb-mini-button-group>
```

## Style

The component has a negative variant which can be set using the `negative` property.

There are four available sizes: `s`, `m` (default), `l` and `xl`.

```html
<sbb-mini-button-group negative size="l"> ... </sbb-mini-button-group>
```

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                     | Default | Description                                                          |
| -------------------- | --------------------- | ------- | ------------------------ | ------- | -------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string \| undefined`    |         | This will be forwarded as aria-label to the relevant nested element. |
| `negative`           | `negative`            | public  | `boolean`                | `false` | Negative coloring variant flag.                                      |
| `size`               | `size`                | public  | `SbbMiniButtonGroupSize` | `'m'`   | Size variant, either s, m, l or xl.                                  |

## Slots

| Name | Description                                                               |
| ---- | ------------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-mini-button` and `sbb-divider` elements. |
