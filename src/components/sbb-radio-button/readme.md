Use multiple `sbb-radio-button` components inside a `sbb-radio-button-group` component in order to display a radio input within a group.

```html
<sbb-radio-button-group value="Value one" aria-label="Radio group label">
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button-group>
```

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                           | Type         | Default     |
| --------------------- | ----------------------- | ------------------------------------- | ------------ | ----------- |
| `allowEmptySelection` | `allow-empty-selection` | Whether the radio can be deselected.  | `boolean`    | `false`     |
| `checked`             | `checked`               | Whether the radio button is checked.  | `boolean`    | `false`     |
| `disabled`            | `disabled`              | Whether the radio button is disabled. | `boolean`    | `false`     |
| `required`            | `required`              | Whether the radio button is required. | `boolean`    | `false`     |
| `size`                | `size`                  | Label size variant, either m or s.    | `"m" \| "s"` | `'m'`       |
| `value`               | `value`                 | Value of radio button.                | `string`     | `undefined` |


## Events

| Event          | Description                                                                                                         | Type                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `state-change` | Internal event that emits whenever the state of the radio option in relation to the parent selection panel changes. | `CustomEvent<RadioButtonStateChangeChecked \| RadioButtonStateChangeDisabled>` |


## Methods

### `select() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `"subtext"` | Slot used to render a subtext under the label (only visible within a selection panel).          |
| `"suffix"`  | Slot used to render additional content after the label (only visible within a selection panel). |
| `"unnamed"` | Use this slot to provide the radio label.                                                       |


----------------------------------------------


