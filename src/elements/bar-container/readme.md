The `sbb-bar-container` is a component that wraps its content with a red background/band, while keeping/maintaining the default page spacing.

```html
<sbb-bar-container>
  <sbb-block-link icon-name="arrow-left-small" href="/" negative>Back</sbb-block-link>
  <sbb-card> ... </sbb-card>
</sbb-bar-container>
```

## Style

By default `sbb-bar-container` uses the page spacing and grid defined in the [layout documentation](/docs/styles-layout--docs).

The component has two color variants, `milk` and `white` (default), that can be set using the `color` property.

```html
<sbb-bar-container color="milk"> ... </sbb-bar-container>
```

As the `sbb-bar-container` is including the grid, custom alignments of the content on the grid are possible.

**Sass example of how to align content on the grid:**

```scss
@use '@sbb-esta/lyne-elements' as sbb;

:is(sbb-block-link, sbb-link, sbb-card) {
  grid-column: 1/-1;

  @include sbb.mq($from: large) {
    grid-column: 2/-2;
  }
  @include sbb.mq($from: ultra) {
    grid-column: 4/-4;
  }
}

// Whenever a shadow is needed, it can easily be added.
sbb-card {
  box-shadow: var(--sbb-box-shadow-level-5-hard);
}
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
