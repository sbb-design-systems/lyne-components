The `sbb-message` component can be used to display a complex message.

## Slots

The title slot should be used to slot a `<sbb-title>` element.
Optionally, the user can provide other elements such as a subtitle paragraph via the `subtitle` slot,
a [sbb-image](/docs/elements-sbb-image--docs) to provide an image via the `image` slot,
a paragraph to provide an error code via the `legend` slot,
and a [sbb-button](/docs/elements-sbb-button-sbb-button--docs) to provide a custom action via the `action` slot.

```html
<sbb-message>
  <sbb-image slot="image" [...]></sbb-image>
  <sbb-title slot="title" level="3">Title</sbb-title>
  <p slot="subtitle">Subtitle</p>
  <p slot="legend">Error code: 0001</p>
  <sbb-button slot="action" [...]>Action</sbb-button>
</sbb-message>
```

<!-- Auto Generated Below -->

## Slots

| Name       | Description                                               |
| ---------- | --------------------------------------------------------- |
| `action`   | Use this slot to provide an `sbb-secondary-button`.       |
| `image`    | Use this slot to provide an `sbb-image` component.        |
| `legend`   | Use this slot to provide a legend, must be a paragraph.   |
| `subtitle` | Use this slot to provide a subtitle, must be a paragraph. |
| `title`    | Use this slot to provide an `sbb-title`.                  |
