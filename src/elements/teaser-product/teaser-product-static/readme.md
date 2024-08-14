The `sbb-teaser-product-static` is a component that can display a text and a footnote,
combined with an image as background, to tease a product.
It should be used if there is more than one interactive action,
otherwise, see [sbb-teaser-product](/docs/elements-sbb-teaser-sbb-teaser-product--docs).

```html
<sbb-teaser-product-static>
  <sbb-image slot="image" image-src="..."></sbb-image>

  <p class="sbb-teaser-product--spacing">Content ...</p>

  <p slot="footnote" class="sbb-teaser-product--spacing">...</p>
</sbb-teaser-product-static>
```

## Slots

Use the `image` slot to pass a `sbb-image` or an `img` that will be used as a background,
and use the optional `footnote` slot to add a text anchored to the bottom-end of the component.

The default slot is reserved for the main content: it could be a simple text or a text combined with more elements,
like a `sbb-title` or some interactive elements, like buttons or links within the `sbb-action-group` component.

```html
<sbb-teaser-product-static>
  <sbb-image slot="image" image-src="..."></sbb-image>
  <p class="sbb-teaser-product--spacing">Content ...</p>
</sbb-teaser-product-static>
```

If paragraphs, title and/or button are used, consumers can apply the helper class `sbb-teaser-product--spacing`
to display the components with the correct spacings.

```html
<sbb-teaser-product-static>
  <sbb-image slot="image" image-src="..."></sbb-image>
  <sbb-title level="3" class="sbb-teaser-product--spacing">
    Benefit from up to 70% discount
  </sbb-title>
  <p class="sbb-teaser-product--spacing">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus.
  </p>
  <sbb-action-group class="sbb-teaser-product--spacing">
    <sbb-button>Label</sbb-button>
    <sbb-secondary-button>Label</sbb-secondary-button>
  </sbb-action-group>
</sbb-teaser-product-static>
```

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

| Name             | Attribute         | Privacy | Type                  | Default   | Description                                                                                                                           |
| ---------------- | ----------------- | ------- | --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `imageAlignment` | `image-alignment` | public  | `'after' \| 'before'` | `'after'` | Whether the fully visible part of the image is aligned 'before' or 'after' the content. Only relevant starting from large breakpoint. |
| `negative`       | `negative`        | public  | `boolean`             | `false`   | Negative coloring variant flag.                                                                                                       |

## Slots

| Name       | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
|            | Use this slot to provide the main content.                          |
| `footnote` | Use this slot to provide a footnote.                                |
| `image`    | Use this slot to provide an image or a `sbb-image` as a background. |
