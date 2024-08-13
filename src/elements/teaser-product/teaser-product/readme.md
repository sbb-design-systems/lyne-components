The `sbb-teaser-product` is a component which can display a text and a footnote, combined with an image as background, to tease a product.
The whole component behaves like a link, and it is clickable; on small screens, the content follows the image.

```html
<sbb-teaser-product href="...">
  <sbb-image slot="image" image-src="..."></sbb-image>

  Content ...

  <span slot="footnote">...</span>
</sbb-teaser-product>
```

## Slots

Use the `image` slot to pass a `sbb-image` that will be used as a background,
and use the optional `footnote` slot to add a text anchored to the bottom-end of the component.

The default slot is reserved for the main content: it could be a simple text or a text combined with more elements,
like the `sbb-title` or an interactive element, like a button or a link.

```html
<sbb-teaser-product href="...">
  <sbb-image slot="image" image-src="..."></sbb-image>
  <p>Content ...</p>
</sbb-teaser-product>
```

If the content is text only, the `p` tag has the `margin` property automatically set to 0;
if title and/or button are used, consumers can apply the helper class `sbb-teaser-product--spacing`
to display the components with the correct spacings.

```html
<sbb-teaser-product href="...">
  <sbb-image slot="image" image-src="..."></sbb-image>
  <sbb-title level="3" class="sbb-teaser-product--spacing">
    Benefit from up to 70% discount
  </sbb-title>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus.
  </p>
  <div class="sbb-teaser-product--spacing">
    <sbb-button-static>Label</sbb-button-static>
  </div>
</sbb-teaser-product>
```

The component can have at most a single interactive element in its static version (e.g. `sbb-button-static`).

If it has to include more than one interactive element, use the [sbb-teaser-product-static](docs/elements-sbb-teaser-sbb-teaser-product-static) instead.

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

It's important to set the `accessibilityLabel` on the `<sbb-teaser-product>`, which describes it for screen-reader users.

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                                    | Default   | Description                                                              |
| -------------------- | --------------------- | ------- | --------------------------------------- | --------- | ------------------------------------------------------------------------ |
| `accessibilityLabel` | `accessibility-label` | public  | `string \| undefined`                   |           | This will be forwarded as aria-label to the inner anchor element.        |
| `download`           | `download`            | public  | `boolean \| undefined`                  |           | Whether the browser will show the download dialog on click.              |
| `href`               | `href`                | public  | `string \| undefined`                   |           | The href value you want to link to.                                      |
| `imageAlignment`     | `image-alignment`     | public  | `'after' \| 'before'`                   | `'after'` | Whether the content and footer are aligned 'before' or 'after' the image |
| `negative`           | `negative`            | public  | `boolean`                               | `false`   | Negative coloring variant flag.                                          |
| `rel`                | `rel`                 | public  | `string \| undefined`                   |           | The relationship of the linked URL as space-separated link types.        |
| `target`             | `target`              | public  | `LinkTargetType \| string \| undefined` |           | Where to display the linked URL.                                         |

## Slots

| Name       | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
|            | Use this slot to provide the main content.                          |
| `footnote` | Use this slot to provide a footnote.                                |
| `image`    | Use this slot to provide an image or a `sbb-image` as a background. |
