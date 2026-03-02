The `sbb-calendar-day` is a component used to display a day button
inside the [sbb-calendar](/docs/elements-sbb-calendar-sbb-calendar--docs).
The slot name is mandatory, and it requires a date in ISO8601 format (e.g. 2025-01-01).

```html
<sbb-calendar-day slot="2025-01-01"></sbb-calendar-day>
```

If extra content is needed, consumers can customize the component and slot it in the `sbb-calendar`.

## Slots

A custom content can be provided via an unnamed slot; it is displayed right below the day.
Styling the content is on consumer side.

```html
<style>
  .my-custom-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: light-dark(var(--sbb-color-metal), var(--sbb-color-smoke));
  }
</style>

<sbb-calendar-day slot="2025-01-01">
  <span class="sbb-text-xxs my-custom-content"> 9.99 </span>
</sbb-calendar-day>
```

## States

The component has a `current` state, which is set if the slot name matches the current day.

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
| `slot`              | `slot`     | public  | `string`                  |         |                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `validationMessage` | -          | public  | `string`                  |         | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -          | public  | `ValidityState`           |         | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`             | -          | public  | `T \| null`               | `null`  | Value of the calendar-day element.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `willValidate`      | -          | public  | `boolean`                 |         | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

## Slots

| Name | Description                                                 |
| ---- | ----------------------------------------------------------- |
|      | Use the unnamed slot to add some custom content to the day. |
