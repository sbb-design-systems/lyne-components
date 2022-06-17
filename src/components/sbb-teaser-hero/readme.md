# sbb-teaser-hero



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute              | Description                                                                                                                                                           | Type                | Default     |
| ------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `buttonText` _(required)_ | `button-text`          | Button text property for sbb-panel. See sbb-panel for additional info                                                                                                 | `string`            | `undefined` |
| `imageLoading`            | `image-loading`        | Image loading property. See sbb-image for additional info                                                                                                             | `"eager" \| "lazy"` | `'eager'`   |
| `imageSrc` _(required)_   | `image-src`            | Image source property for sbb-image. See sbb-image for additional info                                                                                                | `string`            | `undefined` |
| `link` _(required)_       | `link`                 | Link to open if the teaser is clicked/pressed.                                                                                                                        | `string`            | `undefined` |
| `newWindowInfoText`       | `new-window-info-text` | If `openInNewWindow` is set, you should provide according information which will be read aloud for screenreader users (e.g. "Link target will open in a new window"). | `string`            | `undefined` |
| `openInNewWindow`         | `open-in-new-window`   | If set, the link will be opened in a new window.                                                                                                                      | `boolean`           | `undefined` |
| `text` _(required)_       | `text`                 | Text property for sbb-panel. See sbb-panel for additional info                                                                                                        | `string`            | `undefined` |


## Dependencies

### Depends on

- [sbb-image](../sbb-image)
- [sbb-panel](../sbb-panel)

### Graph
```mermaid
graph TD;
  sbb-teaser-hero --> sbb-image
  sbb-teaser-hero --> sbb-panel
  sbb-panel --> sbb-button
  style sbb-teaser-hero fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


