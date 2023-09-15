The `sbb-radio-button` is a component which mimics the native `<input type="radio">`;
use multiple `sbb-radio-button` components inside a `sbb-radio-button-group` component 
in order to display a radio input within a group.

```html
<sbb-radio-button-group value="Value one" aria-label="Radio group label">
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button-group>
```

### States

It is possible to display the component in `disabled` or `checked` state by using the self-named property. 
The component has a `required` property, which can be useful for setting a custom `<sbb-form-error>` message within a `<sbb-form-field>`.
The `allowEmptySelection` property allows user to deselect the component.

```html
<sbb-radio-button value="One" disabled>Option one</sbb-radio-button>

<sbb-radio-button value="Two" required>Option two</sbb-radio-button>
```

### Style

The component has two different sizes, which can be changed using the `size` property (`m`, which is the default, and `s`).

```html
<sbb-radio-button value="small" size='s'>Size</sbb-radio-button>
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


