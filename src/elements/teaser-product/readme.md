### sbb-teaser-product-static

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

Use the `image` slot to pass an `sbb-image` or an `img` that will be used as background.
Optionally, you can add an overlapping `sbb-chip-label` by wrapping the `sbb-image` in a `figure` tag (see [sbb-image doc](/docs/elements-sbb-image--docs#utility%classes)).

Use the optional `footnote` slot to add a text anchored to the bottom-end of the component.

The default slot is reserved for the main content: it could be a simple text or a text combined with more elements,
like a `sbb-title` or some interactive elements, like buttons or links within the `sbb-action-group` component.

```html
<sbb-teaser-product-static>
  <figure slot="image" class="sbb-figure">
    <sbb-image image-src="..."></sbb-image>
    <sbb-chip-label class="sbb-figure-overlap-start-start">Chip label</sbb-chip-label>
  </figure>

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



### sbb-teaser-product

The `sbb-teaser-product` is a component that can display a text and a footnote, combined with an image as background, to tease a product.
The whole component behaves like a link, and it is clickable; on small screens, the content follows the image.

The component can have at most a single interactive element in its static version (e.g. `sbb-button-static`).
If it has to include more than one interactive element, use the [sbb-teaser-product-static](/docs/elements-sbb-teaser-sbb-teaser-product-static--docs) instead.

```html
<sbb-teaser-product href="...">
  <sbb-image slot="image" image-src="..."></sbb-image>

  <p class="sbb-teaser-product--spacing">Content ...</p>

  <p slot="footnote" class="sbb-teaser-product--spacing">...</p>
</sbb-teaser-product>
```

## Slots

Use the `image` slot to pass an `sbb-image` or an `img` that will be used as background.
Optionally, you can add an overlapping `sbb-chip-label` by wrapping the `sbb-image` in a `figure` tag (see [sbb-image doc](/docs/elements-sbb-image--docs#utility%classes)).

Use the optional `footnote` slot to add a text anchored to the bottom-end of the component.

The default slot is reserved for the main content: it could be a simple text or a text combined with more elements,
like the `sbb-title` or an interactive element, like a button or a link (needs to be in static variant!).

```html
<sbb-teaser-product href="...">
  <figure slot="image" class="sbb-figure">
    <sbb-image image-src="..."></sbb-image>
    <sbb-chip-label class="sbb-figure-overlap-start-start">Chip label</sbb-chip-label>
  </figure>

  <p class="sbb-teaser-product--spacing">Content ...</p>
</sbb-teaser-product>
```

If paragraphs, title and/or button are used, consumers can apply the helper class `sbb-teaser-product--spacing`
to display the components with the correct spacings.

```html
<sbb-teaser-product href="...">
  <sbb-image slot="image" image-src="..."></sbb-image>
  <sbb-title level="3" class="sbb-teaser-product--spacing">
    Benefit from up to 70% discount
  </sbb-title>
  <p class="sbb-teaser-product--spacing">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus.
  </p>
  <sbb-button-static class="sbb-teaser-product--spacing">Label</sbb-button-static>
</sbb-teaser-product>
```

## Style

Use the `image-alignment` attribute to anchor the content `after` (on the left) or `before` (on the right).

```html
<sbb-teaser-product image-alignment="before"> ... </sbb-teaser-product>
```

Add the `negative` attribute to enable the negative variant.

```html
<sbb-teaser-product negative> ... </sbb-teaser-product>
```

## Accessibility

It's important to set the `accessibilityLabel` on the `<sbb-teaser-product>`, which describes the link for screen-reader users.

