The `sbb-timetable-form-field` is an extension of [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs) to be used inside the `sbb-timetable-form`.

It provides all the functionalities of a `sbb-form-field` and handles the specific styles of a `sbb-timetable-form`.

```html
<form class="sbb-timetable-form">
  <sbb-timetable-form>
    ...
    <sbb-timetable-form-field>
      <label>From</label>
      <input type="text" name="from" />
    </sbb-timetable-form-field>
    <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
    <sbb-timetable-form-field>
      <label>To</label>
      <input type="text" name="to" />
    </sbb-timetable-form-field>
    ...
  </sbb-timetable-form>
</form>
```

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type                                                           | Default      | Description                                                                                                                                                           |
| --------------- | ---------------- | ------- | -------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `borderless`    | `borderless`     | public  | `boolean`                                                      | `true`       | Whether to display the form field without a border.                                                                                                                   |
| `errorSpace`    | `error-space`    | public  | `'none' \| 'reserve'`                                          | `'none'`     | Whether to reserve space for an error message. `none` does not reserve any space. `reserve` does reserve one row for an error message.                                |
| `floatingLabel` | `floating-label` | public  | `boolean`                                                      | `true`       | Whether the label should float. If activated, the placeholder of the input is hidden.                                                                                 |
| `hiddenLabel`   | `hidden-label`   | public  | `boolean`                                                      | `false`      | Whether to visually hide the label. If hidden, screen readers will still read it.                                                                                     |
| `inputElement`  | -                | public  | `HTMLInputElement \| HTMLSelectElement \| HTMLElement \| null` |              | Returns the input element.                                                                                                                                            |
| `label`         | -                | public  | `HTMLLabelElement \| null`                                     |              | Reference to the slotted label.                                                                                                                                       |
| `negative`      | `negative`       | public  | `boolean`                                                      | `false`      | Negative coloring variant flag.                                                                                                                                       |
| `optional`      | `optional`       | public  | `boolean`                                                      | `false`      | Indicates whether the input is optional.                                                                                                                              |
| `size`          | `size`           | public  | `string`                                                       | `'l'`        | Size variant, either l, m or s.                                                                                                                                       |
| `width`         | `width`          | public  | `string`                                                       | `'collapse'` | Defines the width of the component: - `default`: the component has defined width and min-width; - `collapse`: the component adapts itself to its inner input content. |

## Methods

| Name    | Privacy | Description                                                                           | Parameters | Return | Inherited From      |
| ------- | ------- | ------------------------------------------------------------------------------------- | ---------- | ------ | ------------------- |
| `clear` | public  | Manually clears the input value. It only works for inputs, selects are not supported. |            | `void` | SbbFormFieldElement |
| `reset` | public  | Manually reset the form field. Currently, this only resets the floating label.        |            | `void` | SbbFormFieldElement |

## CSS Properties

| Name                                       | Default | Description                                            |
| ------------------------------------------ | ------- | ------------------------------------------------------ |
| `--sbb-form-field-focus-underline-z-index` |         | To override the z-index of the focus underline effect, |
| `--sbb-form-field-outline-offset`          |         | To override the focus outline offset,                  |

## Slots

| Name     | Description                                                                |
| -------- | -------------------------------------------------------------------------- |
|          | Use this slot to render an input/select or a supported non-native element. |
| `error`  | Use this slot to render an error.                                          |
| `label`  | Use this slot to render a label.                                           |
| `prefix` | Use this slot to render an icon on the left side of the input.             |
| `suffix` | Use this slot to render an icon on the right side of the input.            |
