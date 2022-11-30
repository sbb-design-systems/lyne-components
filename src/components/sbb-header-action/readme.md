# sbb-header-action

The component represents an action element contained by the [sbb-header](../sbb-header/readme.md) component.

As the [sbb-link](../sbb-link/readme.md), it can be internally rendered as a button or as a link.
Consumers can set the icon and the label; the property `expandFrom` defines the minimum breakpoint 
from which the label is displayed.

## Usage
Simple button

```html
<sbb-menu-action>Button text</sbb-menu-action>
```

Simple link

```html
<sbb-menu-action href="#info">Link text</sbb-menu-action>
```


<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                   | Description                                                                                                                                                                                                                     | Type                                                                       | Default                           |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------- |
| `accessibilityControls`    | `accessibility-controls`    | When an interaction of this button has an impact on another element(s) in the document, the id of that element(s) needs to be set. The value will be forwarded to the 'aria-controls' attribute to the relevant nested element. | `string`                                                                   | `undefined`                       |
| `accessibilityDescribedby` | `accessibility-describedby` | This will be forwarded as aria-describedby to the relevant nested element.                                                                                                                                                      | `string`                                                                   | `undefined`                       |
| `accessibilityHaspopup`    | `accessibility-haspopup`    | If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.                                                                                   | `"dialog" \| "grid" \| "listbox" \| "menu" \| "tree" \| "true"`            | `undefined`                       |
| `accessibilityLabel`       | `accessibility-label`       | This will be forwarded as aria-label to the relevant nested element.                                                                                                                                                            | `string`                                                                   | `undefined`                       |
| `accessibilityLabelledby`  | `accessibility-labelledby`  | This will be forwarded as aria-labelledby to the relevant nested element.                                                                                                                                                       | `string`                                                                   | `undefined`                       |
| `download`                 | `download`                  | Whether the browser will show the download dialog on click.                                                                                                                                                                     | `boolean`                                                                  | `undefined`                       |
| `expandFrom`               | `expand-from`               | Used to set the minimum breakpoint from which the text is displayed. E.g. if set to 'large', the text will be visible for breakpoints large, wide, ultra, and hidden for all the others.                                        | `"large" \| "medium" \| "micro" \| "small" \| "ultra" \| "wide" \| "zero"` | `'medium'`                        |
| `form`                     | `form`                      | Form attribute if component is displayed as a button.                                                                                                                                                                           | `string`                                                                   | `undefined`                       |
| `headerActionId`           | `header-action-id`          | Action element's id.                                                                                                                                                                                                            | `string`                                                                   | ``sbb-header-action-${++nextId}`` |
| `href`                     | `href`                      | The href value you want to link to (if it is not present sbb-header-action becomes a button).                                                                                                                                   | `string`                                                                   | `undefined`                       |
| `iconName`                 | `icon-name`                 | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/.                                                                                       | `string`                                                                   | `undefined`                       |
| `name`                     | `name`                      | Name attribute if component is displayed as a button.                                                                                                                                                                           | `string`                                                                   | `undefined`                       |
| `rel`                      | `rel`                       | The relationship of the linked URL as space-separated link types.                                                                                                                                                               | `string`                                                                   | `undefined`                       |
| `target`                   | `target`                    | Where to display the linked URL.                                                                                                                                                                                                | `string`                                                                   | `undefined`                       |
| `type`                     | `type`                      | Type attribute if component is displayed as a button.                                                                                                                                                                           | `"button" \| "reset" \| "submit"`                                          | `undefined`                       |
| `value`                    | `value`                     | The value associated with button `name` when it's submitted with the form data.                                                                                                                                                 | `string`                                                                   | `undefined`                       |


## Slots

| Slot        | Description                          |
| ----------- | ------------------------------------ |
| `"icon"`    | Slot used to render the action icon. |
| `"unnamed"` | Slot used to render the action text. |


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


