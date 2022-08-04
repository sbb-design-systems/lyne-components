# sbb-button

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                                                                                                                                | Type                                                                                                                                                           | Default     |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `ariaHaspopup`     | `aria-haspopup`      | If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.                                              | `"dialog" \| "grid" \| "listbox" \| "menu" \| "tree" \| "true"`                                                                                                | `undefined` |
| `buttonType`       | `button-type`        | The type attribute to use for the button                                                                                                                                                   | `"button" \| "reset" \| "submit"`                                                                                                                              | `'button'`  |
| `disabled`         | `disabled`           | Set to true to get a disabled button                                                                                                                                                       | `boolean`                                                                                                                                                      | `false`     |
| `eventId`          | `event-id`           | Id which is sent in the click event payload                                                                                                                                                | `string`                                                                                                                                                       | `undefined` |
| `icon`             | `icon`               | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/ (optional). Inline variant doesn't support icons. | `string`                                                                                                                                                       | `undefined` |
| `iconDescription`  | `icon-description`   | If you use an icon without a label, you must provide an iconDescription                                                                                                                    | `string`                                                                                                                                                       | `undefined` |
| `label`            | `label`              | Label text to show on the button                                                                                                                                                           | `string`                                                                                                                                                       | `''`        |
| `name`             | `name`               | The name attribute to use for the button                                                                                                                                                   | `string`                                                                                                                                                       | `undefined` |
| `negative`         | `negative`           | Negative coloring variant flag                                                                                                                                                             | `boolean`                                                                                                                                                      | `undefined` |
| `showIcon`         | `show-icon`          | Define if icon should be shown or not                                                                                                                                                      | `boolean`                                                                                                                                                      | `false`     |
| `size`             | `size`               | Size variant, either l or m.                                                                                                                                                               | `"l" \| "m"`                                                                                                                                                   | `'l'`       |
| `type`             | `type`               |                                                                                                                                                                                            | `"a" \| "button" \| "span"`                                                                                                                                    | `'button'`  |
| `value`            | `value`              | The value attribute to use for the button                                                                                                                                                  | `string`                                                                                                                                                       | `undefined` |
| `variant`          | `variant`            | Variant of the button, like primary, secondary etc.                                                                                                                                        | `"primary" \| "primary-negative" \| "secondary" \| "secondary-negative" \| "translucent" \| "translucent-negative" \| "transparent" \| "transparent-negative"` | `'primary'` |
| `visualButtonOnly` | `visual-button-only` | Set this property to true if you want only a visual represenation of a button, but no interaction (a div instead of a button will be rendered).                                            | `boolean`                                                                                                                                                      | `undefined` |


## Events

| Event              | Description                                                                                                               | Type               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `sbb-button_click` | Emits whenever the native button click event triggers. TODO: Switch to a better event type during refactoring sbb-button. | `CustomEvent<any>` |


## Dependencies

### Used by

 - [sbb-panel](../sbb-panel)

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-button --> sbb-icon
  sbb-panel --> sbb-button
  style sbb-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


