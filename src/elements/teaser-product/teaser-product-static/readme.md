The `sbb-teaser-product-static` is a component that can display a text and a footnote,
combined with an image as background, to tease a product.
It should be used if there is more than one interactive action,
otherwise, see [sbb-teaser-product](/docs/elements-sbb-teaser-sbb-teaser-product--docs).

```html
<sbb-teaser-product-static>
  <sbb-image slot="image" image-src="..."></sbb-image>

  Content ...

  <span slot="footnote">...</span>
</sbb-teaser-product-static>
```

## Slots

The default slot is reserved for the main content.
If it only contains a single interactable element, like a button or a link, use the [sbb-teaser-product](/docs/elements-sbb-teaser-sbb-teaser-product--docs) instead.

Use the `image` slot to pass a `sbb-image` that will be used as background.

Use the optional `footnote` slot to add a text anchored to the bottom-end of the component.

## Style

Use the `image-alignment` attribute to anchor the content `after` (on the left) or `before` (on the right).

```html
<sbb-teaser-product-static image-alignment="before"> ... </sbb-teaser-product-static>
```

Add the `negative` attribute to enable the negative variant.

```html
<sbb-teaser-product-static negative> ... </sbb-teaser-product-static>
```

<!-- Auto Generated Below -->

## Properties

| Name             | Attribute         | Privacy | Type                  | Default   | Description                                                              |
| ---------------- | ----------------- | ------- | --------------------- | --------- | ------------------------------------------------------------------------ |
| `imageAlignment` | `image-alignment` | public  | `'after' \| 'before'` | `'after'` | Whether the content and footer are aligned 'before' or 'after' the image |
| `negative`       | `negative`        | public  | `boolean`             | `false`   | Negative coloring variant flag.                                          |

## Slots

| Name       | Description                                         |
| ---------- | --------------------------------------------------- |
|            | Use this slot to provide the main content.          |
| `footnote` | Use this slot to provide a footnote.                |
| `image`    | Use this slot to provide a sbb-image as background. |
