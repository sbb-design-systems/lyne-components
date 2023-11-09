The `sbb-teaser` is a component which can display an image with a caption, and it behaves like a link on user interaction.

## Slots

The component displays the `image`, the `title` and the `description` in the self-named slots.
It's also possible to display a [sbb-chip](/docs/components-sbb-chip--docs) using the `chip` slot.
The title level can be set by the consumer using the `titleLevel` property.

```html
<sbb-teaser href="https://www.sbb.ch" title-level="2">
  <img slot="image" src="..." alt="400x300" />
  <span slot="title"> Title </span>
  <span slot="description"> A brief description. </span>
  <span slot="chip"> Chip label </span>
</sbb-teaser>
```

## Style

Using the `alignment` property, it is possible to change the text position respect to the image.
Possible values are `end-centered` (default), `end-top` and `bottom`.

```html
<sbb-teaser href="https://www.sbb.ch" aligment="bottom"> ... </sbb-teaser>
```

By default, the image dimensions are set using the width and the aspect ratio.
Default values are `300px` and `4/3`. Consumers can change these values.

## Accessibility

It's important to set the `accessibilityLabel` property, which describes the `sbb-teaser` for screen-reader users.

The description text is wrapped into an `<p>` element to guarantee the semantic meaning.

Avoid slotting block elements (e.g. `<div>`) as this violates semantic rules and can have negative effects on screen readers.

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type                                                 | Default | Description                                                               |
| ------------ | ------------- | ------- | ---------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| `alignment`  | `alignment`   | public  | `'after-centered' \| 'after' \| 'below'`             |         | Teaser variant - define the position and the alignment of the text block. |
| `titleLevel` | `title-level` | public  | `TitleLevel`                                         | `'5'`   | Heading level of the sbb-title element (e.g. h1-h6).                      |
| `href`       | `href`        | public  | `string \| undefined`                                |         | The href value you want to link to.                                       |
| `target`     | `target`      | public  | `LinkTargetType \| string \| undefined \| undefined` |         | Where to display the linked URL.                                          |
| `rel`        | `rel`         | public  | `string \| undefined \| undefined`                   |         | The relationship of the linked URL as space-separated link types.         |

## Slots

| Name          | Description                             |
| ------------- | --------------------------------------- |
| `image`       | Slot used to render the image.          |
| `chip`        | Slot used to render the sbb-chip label. |
| `title`       | Slot used to render the title.          |
| `description` | Slot used to render the description.    |
