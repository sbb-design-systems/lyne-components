The `sbb-teaser-hero` is a component with a background image and an action call within a panel;
it should be an eye-catcher and should have an emotional effect on the user with its large image component.

## Slots

It is possible to provide the panel label via an unnamed slot,
while the link text can be provided using the `link-content` slot or the `linkContent` property;
similarly, the background image can be provided using the `image` slot or the `imageSrc` property.
Optionally a `sbb-chip` can be slotted in the `chip` slot, either together with the other slottable elements or alone.

```html
<sbb-teaser-hero
  href="https://www.sbb.ch"
  link-content="Find out more"
  image-src="https://path-to-source"
  image-alt="SBB CFF FFS Employee"
>
  Break out and explore castles and palaces.
</sbb-teaser-hero>

<sbb-teaser-hero href="https://www.sbb.ch">
  Break out and explore castles and palaces.
  <sbb-image slot="image" image-src="https://path-to-source" alt="SBB CFF FFS Employee"></sbb-image>
  <span slot="link-content">Find out more</span>
</sbb-teaser-hero>
```

## Accessibility

The description text is wrapped into an `p` element to guarantee the semantic meaning.

Avoid slotting block elements (e.g. `div`) as this violates semantic rules and can have negative effects on screen readers.

<!-- Auto Generated Below -->

## Properties

| Name                 | Attribute             | Privacy | Type                       | Default | Description                                                       |
| -------------------- | --------------------- | ------- | -------------------------- | ------- | ----------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                   | `''`    | This will be forwarded as aria-label to the inner anchor element. |
| `download`           | `download`            | public  | `boolean`                  | `false` | Whether the browser will show the download dialog on click.       |
| `href`               | `href`                | public  | `string`                   | `''`    | The href value you want to link to.                               |
| `imageAlt`           | `image-alt`           | public  | `string`                   | `''`    | Image alt text will be passed to `sbb-image`.                     |
| `imageSrc`           | `image-src`           | public  | `string`                   | `''`    | Image src will be passed to `sbb-image`.                          |
| `linkContent`        | `link-content`        | public  | `string`                   | `''`    | Panel link text.                                                  |
| `rel`                | `rel`                 | public  | `string`                   | `''`    | The relationship of the linked URL as space-separated link types. |
| `target`             | `target`              | public  | `LinkTargetType \| string` | `''`    | Where to display the linked URL.                                  |

## Slots

| Name           | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
|                | Use the unnamed slot to add text content to the panel              |
| `chip`         | The `sbb-chip` component that will be displayed on top-left corner |
| `image`        | The background image that can be a `sbb-image`                     |
| `link-content` | Link content of the panel                                          |
