# sbb-navigation-action

The `<sbb-navigation-action>` component is an action element contained by a [sbb-navigation-list](../sbb-navigation-list/readme.md) component or a [sbb-navigation-marker](../sbb-navigation-marker/readme.md) component. 

As the [sbb-link](../sbb-link/readme.md), it can be internally rendered as a button or as a link, depending on the value of the `href` property.

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                | Description                                                                                                                                                                                                                     | Type                                                            | Default     |
| ----------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------- |
| `accessibilityControls` | `accessibility-controls` | When an interaction of this button has an impact on another element(s) in the document, the id of that element(s) needs to be set. The value will be forwarded to the 'aria-controls' attribute to the relevant nested element. | `string`                                                        | `undefined` |
| `accessibilityHaspopup` | `accessibility-haspopup` | If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.                                                                                   | `"dialog" \| "grid" \| "listbox" \| "menu" \| "tree" \| "true"` | `undefined` |
| `accessibilityLabel`    | `accessibility-label`    | This will be forwarded as aria-label to the relevant nested element.                                                                                                                                                            | `string`                                                        | `undefined` |
| `active`                | `active`                 | Whether the action is active.                                                                                                                                                                                                   | `boolean`                                                       | `false`     |
| `download`              | `download`               | Whether the browser will show the download dialog on click.                                                                                                                                                                     | `boolean`                                                       | `undefined` |
| `href`                  | `href`                   | The href value you want to link to (if it is not present, navigation action becomes a button).                                                                                                                                  | `string`                                                        | `undefined` |
| `name`                  | `name`                   | The name attribute to use for the button.                                                                                                                                                                                       | `string`                                                        | `undefined` |
| `rel`                   | `rel`                    | The relationship of the linked URL as space-separated link types.                                                                                                                                                               | `string`                                                        | `undefined` |
| `size`                  | `size`                   | Action size variant.                                                                                                                                                                                                            | `"l" \| "m" \| "s"`                                             | `'l'`       |
| `target`                | `target`                 | Where to display the linked URL.                                                                                                                                                                                                | `string`                                                        | `undefined` |
| `type`                  | `type`                   | The type attribute to use for the button.                                                                                                                                                                                       | `"button" \| "reset" \| "submit"`                               | `undefined` |
| `value`                 | `value`                  | The value attribute to use for the button.                                                                                                                                                                                      | `string`                                                        | `undefined` |


----------------------------------------------


