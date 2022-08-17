# sbb-link

The `<sbb-link>` implements the design of the Lyne Link. It can both be used as a anchor (`<a>`)
(if the href property is set) or as a button (`<button>`). If the `<sbb-link>` is placed inside another
anchor or button tag, it is internally rendered as a span in order to not break HTML functionality.
  
<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                   | Description                                                                                                                                                                                | Type                              | Default     |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ----------- |
| `accessibilityDescribedby` | `accessibility-describedby` | This will be forwarded as aria-describedby to the relevant nested element.                                                                                                                 | `string`                          | `undefined` |
| `accessibilityLabel`       | `accessibility-label`       | This will be forwarded as aria-label to the relevant nested element.                                                                                                                       | `string`                          | `undefined` |
| `accessibilityLabelledby`  | `accessibility-labelledby`  | This will be forwarded as aria-labelledby to the relevant nested element.                                                                                                                  | `string`                          | `undefined` |
| `disabled`                 | `disabled`                  | Disabled attribute if link is used as button (optional)                                                                                                                                    | `boolean`                         | `undefined` |
| `download`                 | `download`                  | If set to true, the browser will show the download dialog on click (optional).                                                                                                             | `boolean`                         | `undefined` |
| `eventId`                  | `event-id`                  | Id which is sent in the click event payload                                                                                                                                                | `string`                          | `undefined` |
| `form`                     | `form`                      | Form attribute if link is used as button (optional)                                                                                                                                        | `string`                          | `undefined` |
| `href`                     | `href`                      | The href value you want to link to (if its not present link becomes a button)                                                                                                              | `string`                          | `undefined` |
| `icon`                     | `icon`                      | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/ (optional). Inline variant doesn't support icons. | `string`                          | `undefined` |
| `iconPlacement`            | `icon-placement`            | The icon can either be place before or after the text.                                                                                                                                     | `"end" \| "start"`                | `'start'`   |
| `idValue`                  | `id-value`                  | Pass in an id, if you need to identify the link element (optional).                                                                                                                        | `string`                          | `undefined` |
| `name`                     | `name`                      | Name attribute if link is used as button (optional)                                                                                                                                        | `string`                          | `undefined` |
| `negative`                 | `negative`                  | Negative coloring variant flag                                                                                                                                                             | `boolean`                         | `undefined` |
| `textSize`                 | `text-size`                 | Text size, the link should get in the non button variation. With inline variant, the text size adapts to where it is used.                                                                 | `"m" \| "s" \| "xs"`              | `'s'`       |
| `type`                     | `type`                      | Type attribute if link is used as button (optional)                                                                                                                                        | `"button" \| "reset" \| "submit"` | `'button'`  |
| `variant`                  | `variant`                   | Applies link inline styles (underline, inherit coloring/font-size etc).                                                                                                                    | `"block" \| "inline"`             | `'block'`   |


## Events

| Event                   | Description                                                                                                          | Type               |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `sbb-link-button_click` | Emits whenever the native button click event triggers. TODO: similar to the one in sbb-button. To be fixed together. | `CustomEvent<any>` |


## Slots

| Slot     | Description                                  |
| -------- | -------------------------------------------- |
| `"icon"` | Slot used to display the icon, if one is set |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-link --> sbb-icon
  style sbb-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


