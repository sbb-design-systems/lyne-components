> Explain the use and the purpose of the component; add minor details if needed and provide a basic example.<br>
> If you reference other components, link their documentation at least once (the path must start from _/docs/..._ ).<br>
> For the examples, use triple backticks with file extension (` ```html <code here>``` `).<br>
> The following list of paragraphs is only suggested; remove, create and adapt as needed.

The `sbb-timetable-form-field` is a component . . .

```html
<sbb-timetable-form-field></sbb-timetable-form-field>
```

## Slots

> Describe slot naming and usage and provide an example of slotted content.

## States

> Describe the component states (`disabled`, `readonly`, etc.) and provide examples.

## Style

> Describe the properties which change the component visualization (`size`, `negative`, etc.) and provide examples.

## Interactions

> Describe how it's possible to interact with the component (open and close a `sbb-dialog`, dismiss a `sbb-alert`, etc.) and provide examples.

## Events

> Describe events triggered by the component and possibly how to get information from the payload.

## Keyboard interaction

> If the component has logic for keyboard navigation (as the `sbb-calendar` or the `sbb-select`) describe it.

| Keyboard       | Action        |
| -------------- | ------------- |
| <kbd>Key</kbd> | What it does. |

## Accessibility

> Describe how accessibility is implemented and if there are issues or suggested best-practice for the consumers.

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type                                                           | Default      | Description                                                                                                                                                           |
| --------------- | ---------------- | ------- | -------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `borderless`    | `borderless`     | public  | `boolean`                                                      | `true`       | Whether to display the form field without a border.                                                                                                                   |
| `errorSpace`    | `error-space`    | public  | `'none' \| 'reserve'`                                          | `'none'`     | Whether to reserve space for an error message. `none` does not reserve any space. `reserve` does reserve one row for an error message.                                |
| `floatingLabel` | `floating-label` | public  | `boolean`                                                      | `true`       | Whether the label should float. If activated, the placeholder of the input is hidden.                                                                                 |
| `hiddenLabel`   | `hidden-label`   | public  | `boolean`                                                      | `false`      | Whether to visually hide the label. If hidden, screen readers will still read it.                                                                                     |
| `inputElement`  | -                | public  | `HTMLInputElement \| HTMLSelectElement \| HTMLElement \| null` |              | Returns the input element.                                                                                                                                            |
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

| Name                              | Default | Description                           |
| --------------------------------- | ------- | ------------------------------------- |
| `--sbb-form-field-outline-offset` |         | To override the focus outline offset, |

## Slots

| Name     | Description                                                                |
| -------- | -------------------------------------------------------------------------- |
|          | Use this slot to render an input/select or a supported non-native element. |
| `error`  | Use this slot to render an error.                                          |
| `label`  | Use this slot to render a label.                                           |
| `prefix` | Use this slot to render an icon on the left side of the input.             |
| `suffix` | Use this slot to render an icon on the right side of the input.            |
