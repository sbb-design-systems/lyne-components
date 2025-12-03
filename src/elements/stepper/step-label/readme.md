Use the `sbb-step-label` with the `sbb-stepper` to display a step label.

```html
<sbb-step-label>Step label</sbb-step-label>
```

## Slots

It has an implicit slot named `step-label`.

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-step-label disabled>Step label</sbb-step-label>
```

## Style

If it is used in an `sbb-stepper` and no `icon-name` is specified, it displays a counter in the label prefix to keep track of the step number.

```html
<!-- Displays a tick icon in the prefix circle -->
<sbb-step-label icon-name="tick-small">Step label</sbb-step-label>

<!-- Displays a number in the prefix circle -->
<sbb-step-label>Step label</sbb-step-label>
```

## Accessibility

The accessibility properties `aria-controls`, `aria-setsize`, `aria-posinset` are set automatically.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute   | Privacy | Type                        | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ----------- | ------- | --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`          | `disabled`  | public  | `boolean`                   | `false`    | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `form`              | `form`      | public  | `HTMLFormElement \| null`   |            | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `iconName`          | `icon-name` | public  | `string`                    | `''`       | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                                                                                                                                                                                                                                                                                        |
| `name`              | `name`      | public  | `string`                    |            | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `step`              | -           | public  | `SbbStepElement \| null`    | `null`     | The step controlled by the label.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `stepper`           | -           | public  | `SbbStepperElement \| null` |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `type`              | `type`      | public  | `SbbButtonType`             | `'button'` | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `validationMessage` | -           | public  | `string`                    |            | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -           | public  | `ValidityState`             |            | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`             | `value`     | public  | `string`                    | `''`       | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `willValidate`      | -           | public  | `boolean`                   |            | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

## Slots

| Name   | Description                                      |
| ------ | ------------------------------------------------ |
|        | Use the unnamed slot to provide a label.         |
| `icon` | Use this to display an icon in the label bubble. |
