The `sbb-teaser` is a component which can display an image with a caption, and it behaves like a link on user interaction.

## Slots

The component displays the `image`, the `title` and the `description` in the self-named slots.

```html
<sbb-teaser href="https://www.sbb.ch">
  <img slot="image" src="..." alt="400x300" />
  <span slot="title"> Title </span>
  <span slot="description"> A brief description. </span>
</sbb-teaser>
```

The title level can be set by the consumer using the `titleLevel` property.

## Accessibility

It's important to set the `accessibilityLabel` property, which describes the `sbb-teaser` for screen-reader users.

The description text is wrapped into an `<p>` element to guarantee the semantic meaning.

Avoid slotting block elements (e.g. `<div>`) as this violates semantic rules and can have negative effects on screen readers.

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type                                                 | Default | Description                                                                                                                   |
| ------------ | ------------- | ------- | ---------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `isStacked`  | `is-stacked`  | public  | `boolean`                                            |         | Teaser variant - when this is true the text-content will be under the image otherwise it will be displayed next to the image. |
| `titleLevel` | `title-level` | public  | `TitleLevel`                                         | `'5'`   | Heading level of the sbb-title element (e.g. h1-h6).                                                                          |
| `href`       | `href`        | public  | `string \| undefined`                                |         | The href value you want to link to.                                                                                           |
| `target`     | `target`      | public  | `LinkTargetType \| string \| undefined \| undefined` |         | Where to display the linked URL.                                                                                              |
| `rel`        | `rel`         | public  | `string \| undefined \| undefined`                   |         | The relationship of the linked URL as space-separated link types.                                                             |

## Slots

| Name          | Description                         |
| ------------- | ----------------------------------- |
| `image`       | Slot used to render the image       |
| `title`       | Slot used to render the title       |
| `description` | Slot used to render the description |
