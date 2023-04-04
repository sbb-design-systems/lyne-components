The `<sbb-toggle-option>` component is used inside the `<sbb-toggle>` in order to render the toggle's options. The component can render a label, a `<sbb-icon>` or both.

## Usage
```html
<!-- sbb-toggle-option with label only. -->
<sbb-toggle-option value="Value">Option</sbb-toggle-option>

<!-- sbb-toggle-option with icon only. -->
<sbb-toggle-option value="Value" icon-name="app-icon-small"></sbb-toggle-option>

<!-- sbb-toggle-option with label and icon. -->
<sbb-toggle-option value="Value" icon-name="app-icon-small">Option</sbb-toggle-option>
```
<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                            | Type      | Default     |
| ---------- | ----------- | -------------------------------------- | --------- | ----------- |
| `checked`  | `checked`   | Whether the toggle-option is checked.  | `boolean` | `false`     |
| `disabled` | `disabled`  | Whether the toggle option is disabled. | `boolean` | `false`     |
| `iconName` | `icon-name` | Name of the icon for `<sbb-icon>`.     | `string`  | `undefined` |
| `value`    | `value`     | Value of toggle-option.                | `string`  | `undefined` |


## Events

| Event          | Description                                                                                                 | Type                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `state-change` | Internal event that emits whenever the state of the toggle option in relation to the parent toggle changes. | `CustomEvent<ToggleOptionStateChangeChecked \| ToggleOptionStateChangeValue>` |


## Slots

| Slot        | Description                                         |
| ----------- | --------------------------------------------------- |
| `"icon"`    | Slot used to render the `<sbb-icon>`.               |
| `"unnamed"` | Slot used to render the label of the toggle option. |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-toggle-option --> sbb-icon
  style sbb-toggle-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


