The `sbb-teaser-product` is a component which can displays a text and a footnote, combined with an image as background, to tease a product.
The whole component behaves like a link
On small screens, the content follows the image.

```html
<sbb-teaser-product>
  <sbb-image slot="image" image-src="..."></sbb-image>

  Content ...

  <span slot="footnote">...</span>
</sbb-teaser-product>
```

## Slots

The default slot is reserved for the main content. If it contains interactable elements, like buttons or links, use the `sbb-teaser-product-static TODO add link` instead.

Use the `image` slot to pass a `sbb-image` that will be used as background.

Use the optional `footnote` slot to add a text anchored to the bottom-end of the component.

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

| Name       | Description                                         |
| ---------- | --------------------------------------------------- |
|            | Use this slot to provide the main content.          |
| `footnote` | Use this slot to provide a footnote.                |
| `image`    | Use this slot to provide a sbb-image as background. |
