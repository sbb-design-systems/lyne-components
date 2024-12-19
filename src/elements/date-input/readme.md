> Explain the use and the purpose of the component; add minor details if needed and provide a basic example.<br>
> If you reference other components, link their documentation at least once (the path must start from _/docs/..._ ).<br>
> For the examples, use triple backticks with file extension (` ```html <code here>``` `).<br>
> The following list of paragraphs is only suggested; remove, create and adapt as needed.

The `sbb-date-input` is a component . . .

```html
<sbb-date-input></sbb-date-input>
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

| Name           | Attribute       | Privacy | Type                                      | Default   | Description                                                                 |
| -------------- | --------------- | ------- | ----------------------------------------- | --------- | --------------------------------------------------------------------------- |
| `disabled`     | `disabled`      | public  | `boolean`                                 | `false`   | Whether the component is disabled.                                          |
| `form`         | -               | public  | `HTMLFormElement \| null`                 |           | Returns the form owner of the internals of the target element.              |
| `name`         | `name`          | public  | `string`                                  |           | Name of the form element. Will be read from name attribute.                 |
| `readOnly`     | `readonly`      | public  | `boolean`                                 | `false`   | Whether the component is readonly.                                          |
| `required`     | `required`      | public  | `boolean`                                 | `false`   | Whether the component is required.                                          |
| `type`         | -               | public  | `string`                                  | `'text'`  | Form type of element.                                                       |
| `value`        | `Accepts`       | public  | `string \| null`                          | `null`    | The value of the date input. Reflects the current text value of this input. |
| `valueAsDate`  | -               | public  | `T \| null`                               |           |                                                                             |
| `weekdayStyle` | `weekday-style` | public  | `'long' \| 'short' \| 'narrow' \| 'none'` | `'short'` |                                                                             |

## Events

| Name     | Type    | Description | Inherited From              |
| -------- | ------- | ----------- | --------------------------- |
| `change` | `Event` |             | SbbFormAssociatedInputMixin |
