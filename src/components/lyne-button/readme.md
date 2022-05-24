# lyne-button



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                                                                                     | Type                                                                                                                                                           | Default     |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `ariaHaspopup`     | `aria-haspopup`      | If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.   | `"dialog" \| "grid" \| "listbox" \| "menu" \| "tree" \| "true"`                                                                                                | `undefined` |
| `disabled`         | `disabled`           | Set to true to get a disabled button                                                                                                            | `boolean`                                                                                                                                                      | `false`     |
| `eventId`          | `event-id`           | Id which is sent in the click event payload                                                                                                     | `string`                                                                                                                                                       | `undefined` |
| `icon`             | `icon`               | Define if icon should be shown or not                                                                                                           | `boolean`                                                                                                                                                      | `false`     |
| `iconDescription`  | `icon-description`   | If you use an icon without a label, you must provide an iconDescription                                                                         | `string`                                                                                                                                                       | `undefined` |
| `label`            | `label`              | Label text to show on the button                                                                                                                | `string`                                                                                                                                                       | `''`        |
| `name`             | `name`               | The name attribute to use for the button                                                                                                        | `string`                                                                                                                                                       | `undefined` |
| `size`             | `size`               | Size variant, either l or m.                                                                                                                    | `"l" \| "m"`                                                                                                                                                   | `'l'`       |
| `type`             | `type`               | The type attribute to use for the button                                                                                                        | `"button" \| "reset" \| "submit"`                                                                                                                              | `'button'`  |
| `value`            | `value`              | The value attribute to use for the button                                                                                                       | `string`                                                                                                                                                       | `undefined` |
| `variant`          | `variant`            | Variant of the button, like primary, secondary etc.                                                                                             | `"primary" \| "primary-negative" \| "secondary" \| "secondary-negative" \| "translucent" \| "translucent-negative" \| "transparent" \| "transparent-negative"` | `'primary'` |
| `visualButtonOnly` | `visual-button-only` | Set this property to true if you want only a visual represenation of a button, but no interaction (a div instead of a button will be rendered). | `boolean`                                                                                                                                                      | `undefined` |


## Events

| Event               | Description                                                                                                                | Type               |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `lyne-button_click` | Emits whenever the native button click event triggers. TODO: Switch to a better event type during refactoring lyne-button. | `CustomEvent<any>` |


## Slots

| Slot        | Description                                            |
| ----------- | ------------------------------------------------------ |
| `"unnamed"` | Slot to render svg icon. You must pass an svg-element. |


## Dependencies

### Used by

 - [lyne-panel](../lyne-panel)

### Graph
```mermaid
graph TD;
  lyne-panel --> lyne-button
  style lyne-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


