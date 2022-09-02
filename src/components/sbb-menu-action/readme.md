# sbb-menu-action

<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                   | Description                                                                | Type                              | Default                         |
| -------------------------- | --------------------------- | -------------------------------------------------------------------------- | --------------------------------- | ------------------------------- |
| `accessibilityDescribedby` | `accessibility-describedby` | This will be forwarded as aria-describedby to the relevant nested element. | `string`                          | `undefined`                     |
| `accessibilityLabel`       | `accessibility-label`       | This will be forwarded as aria-label to the relevant nested element.       | `string`                          | `undefined`                     |
| `accessibilityLabelledby`  | `accessibility-labelledby`  | This will be forwarded as aria-labelledby to the relevant nested element.  | `string`                          | `undefined`                     |
| `amount`                   | `amount`                    | Value shown as badge at component end.                                     | `string`                          | `undefined`                     |
| `disabled`                 | `disabled`                  | Whether the button is disabled.                                            | `boolean`                         | `undefined`                     |
| `download`                 | `download`                  | Whether the browser will show the download dialog on click.                | `boolean`                         | `undefined`                     |
| `eventId`                  | `event-id`                  | Id sent in the click event payload.                                        | `string`                          | `undefined`                     |
| `form`                     | `form`                      | The <form> element to associate the button with.                           | `string`                          | `undefined`                     |
| `href`                     | `href`                      | The href value you want to link to.                                        | `string`                          | `undefined`                     |
| `icon`                     | `icon`                      | The name property passed to `sbb-icon` component.                          | `string`                          | `undefined`                     |
| `menuActionId`             | `menu-action-id`            | This id will be forwarded to the relevant inner element.                   | `string`                          | ``sbb-menu-action-${++nextId}`` |
| `name`                     | `name`                      | The name of the button.                                                    | `string`                          | `undefined`                     |
| `type`                     | `type`                      | Default behaviour of the button.                                           | `"button" \| "reset" \| "submit"` | `undefined`                     |


## Events

| Event                   | Description                                | Type               |
| ----------------------- | ------------------------------------------ | ------------------ |
| `sbb-menu-action_click` | Emits whenever the menu action is clicked. | `CustomEvent<any>` |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-menu-action --> sbb-icon
  style sbb-menu-action fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


