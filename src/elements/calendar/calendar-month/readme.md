The `sbb-calendar-month` is an 'internal-use-only' component used to display a month button
inside the [sbb-calendar](/docs/elements-sbb-calendar-sbb-calendar--docs) in the month view.
The value of the month is set using the `value` property, which accepts a date in ISOString format (YYYY-MM).

```html
<sbb-calendar-month .value="2025-01"></sbb-calendar-month>
```

## States

The component has a `current` state, which is set if the provided value matches the current year.

Also, it has other states based on the properties of the parent `sbb-calendar`.
The disabled and the crossed-out states are based on the value of the `min`, `max` and `dateFilter` properties,
while the selected matches the parent `selected` properties, including the multiple variant.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute  | Privacy | Type                      | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ---------- | ------- | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`          | `disabled` | public  | `boolean`                 | `false` | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `form`              | -          | public  | `HTMLFormElement \| null` |         | Returns the form owner of this element.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `name`              | `name`     | public  | `string`                  |         | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `validationMessage` | -          | public  | `string`                  |         | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -          | public  | `ValidityState`           |         | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`             | -          | public  | `string \| null`          | `null`  | Value of the calendar-month element in ISO format (YYYY-MM).                                                                                                                                                                                                                                                                                                                                                                                            |
| `willValidate`      | -          | public  | `boolean`                 |         | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |
