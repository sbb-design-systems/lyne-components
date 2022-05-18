# lyne-link-list



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                       | Type                                                    | Default      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------ |
| `listDirection` | `list-direction` | The direction in which the list will be shown. "-from-large" indicates that the list will be horizontal from above large breakpoint. Below it has the default behaviour which is a vertical list. | `"horizontal" \| "horizontal-from-large" \| "vertical"` | `'vertical'` |
| `titleLevel`    | `title-level`    | The semantic level of the title, e.g. 3 = h3                                                                                                                                                      | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"`                | `'2'`        |
| `titleText`     | `title-text`     | The title text we want to show before the list                                                                                                                                                    | `string`                                                | `undefined`  |
| `variant`       | `variant`        | Choose the link list style. This does not refer to light or dark mode, but the background color on which the list is placed. Light and dark mode styling will be applied differently.             | `"negative" \| "positive"`                              | `'positive'` |


## Slots

| Slot                | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `"link-list__item"` | Use this to render the list items with the links inside |


## Dependencies

### Depends on

- [lyne-title](../lyne-title)

### Graph
```mermaid
graph TD;
  lyne-link-list --> lyne-title
  style lyne-link-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


