The `sbb-bar-container` is a component that displays its content with a leading red band and the default page spacing.

```html
<sbb-bar-container>
  <sbb-block-link icon-name="arrow-left-small" href="/" negative>Zurich</sbb-block-link>
  <sbb-card> ... </sbb-card>
</sbb-bar-container>
```

## Style

By default `sbb-bar-container` uses the `page spacing` defined in the [layout documentation](/docs/styles-layout--docs).

The component has two color variants that can be set using the `color` property (default: `white`).

```html
<sbb-bar-container color="milk"> ... </sbb-bar-container>
```

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                | Default   | Description                                              |
| ------- | --------- | ------- | ------------------- | --------- | -------------------------------------------------------- |
| `color` | `color`   | public  | `'white' \| 'milk'` | `'white'` | Background color of container. Either `white` or `milk`. |

## Slots

| Name | Description                                               |
| ---- | --------------------------------------------------------- |
|      | Use the unnamed slot to add content to the bar container. |
