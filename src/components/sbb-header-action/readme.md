# **name**

<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                   | Description                                                                | Type                                                                       | Default                           |
| -------------------------- | --------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------- |
| `accessibilityDescribedby` | `accessibility-describedby` | This will be forwarded as aria-describedby to the relevant nested element. | `string`                                                                   | `undefined`                       |
| `accessibilityLabel`       | `accessibility-label`       | This will be forwarded as aria-label to the relevant nested element.       | `string`                                                                   | `undefined`                       |
| `accessibilityLabelledby`  | `accessibility-labelledby`  | This will be forwarded as aria-labelledby to the relevant nested element.  | `string`                                                                   | `undefined`                       |
| `actionHeaderId`           | `action-header-id`          |                                                                            | `string`                                                                   | ``sbb-action-header.${++nextId}`` |
| `disabled`                 | `disabled`                  | Button: whether the button is disabled.                                    | `boolean`                                                                  | `undefined`                       |
| `download`                 | `download`                  | Link: whether the browser will show the download dialog on click.          | `boolean`                                                                  | `undefined`                       |
| `eventId`                  | `event-id`                  | Button: id sent in the click event payload.                                | `string`                                                                   | `undefined`                       |
| `expandFrom`               | `expand-from`               |                                                                            | `"large" \| "medium" \| "micro" \| "small" \| "ultra" \| "wide" \| "zero"` | `'medium'`                        |
| `form`                     | `form`                      | Button: form attribute.                                                    | `string`                                                                   | `undefined`                       |
| `href`                     | `href`                      | Link: the href value you want to link to.                                  | `string`                                                                   | `undefined`                       |
| `icon`                     | `icon`                      |                                                                            | `string`                                                                   | `undefined`                       |
| `name`                     | `name`                      | Button: name attribute.                                                    | `string`                                                                   | `undefined`                       |
| `type`                     | `type`                      | Button: type attribute.                                                    | `"button" \| "reset" \| "submit"`                                          | `undefined`                       |


## Events

| Event                            | Description             | Type               |
| -------------------------------- | ----------------------- | ------------------ |
| `sbb-header-action-button_click` | Button: click function. | `CustomEvent<any>` |


## Slots

| Slot        | Description                          |
| ----------- | ------------------------------------ |
| `"icon"`    | Slot used to render the action icon  |
| `"unnamed"` | Slot used to render the action label |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-header-action --> sbb-icon
  style sbb-header-action fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


