The `<sbb-date-input>` is an input component for a date. It is comparable to the
`<input type="date">` element, however without a datepicker attached (See
`<sbb-datepicker>` to provide a datepicker dropdown with the
`<sbb-date-input>`).

It supports a `value` attribute/property and a `valueAsDate` property.
The `valueAsDate` provides a date object (`Date` per default,
depending on the used `DateAdapter`), if `value` is parseable
to a valid date and null otherwise.

Both `value` and `valueAsDate` also work as setters and the other
property will be updated accordingly.

```html
<sbb-date-input value="2024-12-12"></sbb-date-input>
```

```html
<sbb-form-field>
  <label>Date</label>
  <sbb-date-input value="2024-12-12"></sbb-date-input>
</sbb-form-field>
```

## Validation

The `<sbb-date-input>` implements native form validation:
https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation

The validation state can be checked via the `validityState` property.

### min/max

It is possible to set a min and/or max date. Dates outside this range will
be marked as an error. The dates must either be passed via ISO strings
as attributes or as date objects via property access.

```html
<sbb-date-input min="2000-01-01" max="2050-12-31"></sbb-date-input>
```

An attached `<sbb-datepicker>` will also respect these limits.

### dateFilter

You can pass a function to the `dateFilter` property, which will
be used to validate the given date.

```ts
const input = document.querySelector('sbb-date-input');
// Exclude Saturday and Sunday
input.dateFilter = (d: Date): boolean => d.getDay() !== 6 && d.getDay() !== 0;
```

An attached `<sbb-datepicker>` will also use this function to
calculate selectable dates.

Important Note: Always use a `min` ad `max` value when using
`dateFilter` with a `<sbb-datepicker>` attached, as the calculation
for previous/next available date can become extremely expensive.

### setCustomValidity()

It is possible to set a custom validity for this component, similar to
native form elements. Use the `setCustomValidity(message: string)`
method to set a custom error message as the state and pass an empty
string to reset the error state.

```ts
const input = document.querySelector('sbb-date-input');
// Set error state/message
input.setCustomValidity('My custom error message');
// Remove error state/message
input.setCustomValidity('');
```

See e.g. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity

### Validation table

| Attribute  | Property                             | Description                                                                          | ValidityState flag |
| ---------- | ------------------------------------ | ------------------------------------------------------------------------------------ | ------------------ |
| `required` | `required`                           | Requires the input not to be empty                                                   | `valueMissing`     |
| `value`    | `value`/`valueAsDate`                | Requires the given/entered value to be a valid date                                  | `badInput`         |
| `min`      | `min`                                | Requires the given/entered value to not be before the defined min date               | `rangeUnderflow`   |
| `max`      | `max`                                | Requires the given/entered value to not be after the defined min date                | `rangeOverflow`    |
|            | `dateFilter`                         | Requires the given/entered value to return true, when passed to the defined function | `sbbDateFilter`    |
|            | `setCustomValidity(message: string)` | If passed a non-empty string, assigns error state to the component                   | `customError`      |

## Weekday style

Due to business rules, a formatted date is always displayed with an abbreviated
weekday (e.g. `Th, 12.12.2024`).
To prevent this, set the `weekday-style` attribute to `none`.

```html
<sbb-date-input value="2024-12-12" weekday-style="none"></sbb-date-input>
```

## Events

Similar to the native `<input>` element, the `sbb-date-input` component
dispatches the usual `input`, `change`, `blur`, `invalid` and keyboard
and focus related events.

<!-- Auto Generated Below -->

## Static Methods

| Name                 | Privacy | Description                                                           | Parameters                                      | Return | Inherited From |
| -------------------- | ------- | --------------------------------------------------------------------- | ----------------------------------------------- | ------ | -------------- |
| `resolveAssociation` | public  | Attempts to resolve the associated date input with the given element. | `host: HTMLElement & SbbDateInputAssociated<T>` | `void` |                |

## Properties

| Name                | Attribute       | Privacy | Type                              | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | --------------- | ------- | --------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateFilter`        | -               | public  | `(date: T \| null) => boolean`    |           | A function used to filter out dates. It is strongly recommended to use min and max dates alongside this filter.                                                                                                                                                                                                                                                                                                                                         |
| `datepicker`        | -               | public  | `SbbDatepickerElement<T> \| null` |           | Gets the associated datepicker, if any. The sbb-date-input and the sbb-datepicker are assumed to be in the same parent container.                                                                                                                                                                                                                                                                                                                       |
| `disabled`          | `disabled`      | public  | `boolean`                         | `false`   | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `form`              | -               | public  | `HTMLFormElement \| null`         |           | Returns the form owner of this element.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `max`               | `max`           | public  | `T \| null`                       | `null`    | The maximum valid date. Accepts a date object or null. Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.                                                                                                                                                                                                                                                                                                                              |
| `min`               | `min`           | public  | `T \| null`                       | `null`    | The minimum valid date. Accepts a date object or null. Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.                                                                                                                                                                                                                                                                                                                              |
| `name`              | `name`          | public  | `string`                          |           | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `placeholder`       | -               | public  | `string`                          |           |                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `readOnly`          | `readonly`      | public  | `boolean`                         | `false`   | Whether the component is readonly.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `required`          | `required`      | public  | `boolean`                         | `false`   | Whether the component is required.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `type`              | -               | public  | `string`                          | `'text'`  | Form type of element.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `validationMessage` | -               | public  | `string`                          |           | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -               | public  | `ValidityState`                   |           | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`             | `value`         | public  | `string`                          | `''`      | The value of the input. Reflects the current text value of this input.                                                                                                                                                                                                                                                                                                                                                                                  |
| `valueAsDate`       | -               | public  | `T \| null`                       |           | Formats the current input's value as date.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `weekdayStyle`      | `weekday-style` | public  | `'short' \| 'none'`               | `'short'` | How to format the displayed date. `short`: Two letter abbreviation of the week day (e.g. Fr). `none`: The weekday is not displayed.                                                                                                                                                                                                                                                                                                                     |
| `willValidate`      | -               | public  | `boolean`                         |           | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters              | Return    | Inherited From              |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | --------- | --------------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                         | `boolean` | SbbFormAssociatedMixin      |
| `focus`             | public  |                                                                                                                                                                                            | `options: FocusOptions` | `void`    | SbbFormAssociatedInputMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                         | `boolean` | SbbFormAssociatedMixin      |
| `select`            | public  | Makes the selection equal to the current object.                                                                                                                                           |                         | `void`    | SbbFormAssociatedInputMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string`       | `void`    | SbbFormAssociatedMixin      |

## Events

| Name     | Type         | Description                                                                                                                                                                        | Inherited From              |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `change` | `Event`      | The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value. | SbbFormAssociatedInputMixin |
| `input`  | `InputEvent` | The input event fires when the value has been changed as a direct result of a user action.                                                                                         | SbbFormAssociatedInputMixin |
