The `sbb-mini-calendar-day` is a component used to display a single day
in the [sbb-mini-calendar](/docs/elements-sbb-mini-calendar-sbb-mini-calendar--docs).

The component needs to be wrapped in a [sbb-mini-calendar-month](/docs/elements-sbb-mini-calendar-sbb-mini-calendar-month--docs),
and it requires a `date` property in ISOString format (YYYY-MM-DD).

```html
<sbb-mini-calendar>
  <sbb-mini-calendar-month date="2025-01">
    <sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>
    ...
  </sbb-mini-calendar-month>
</sbb-mini-calendar>
```

It's also possible to display a tooltip on hover using the `sbb-tooltip` attribute, passing the date with the desired format.
For better usability, it's suggested to set the `sbb-tooltip-open-delay` attribute too.

```html
<sbb-mini-calendar>
  <sbb-mini-calendar-month date="2025-01">
    <sbb-mini-calendar-day
      date="2025-01-01"
      sbb-tooltip="01.01.2025"
      sbb-tooltip-open-delay="200"
    ></sbb-mini-calendar-day>
    ...
  </sbb-mini-calendar-month>
</sbb-mini-calendar>
```

## Style

The component has a `color` property, which is used to change the dot color.
Default colors are provided for `charcoal`, `cloud`, `orange`, `red` and `sky` values;
moreover, consumers can write their own CSS rules for custom values.

```html
<!-- default style -->
<sbb-mini-calendar-day date="2025-01-01" color="orange"></sbb-mini-calendar-day>

<!-- custom value -->
<style>
  sbb-mini-calendar-day[color='my-custom-color'] {
    color: lightskyblue;
  }
</style>
<sbb-mini-calendar-day date="2025-01-01" color="my-custom-color"></sbb-mini-calendar-day>
```

Similarly, a property named `marker` determines the shape of the dot.
Default styles are provided for `target`, `circle`, `slash` and `cross` values.
Consumers can write their own CSS rules for different values.

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute | Privacy | Type                                                            | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | --------- | ------- | --------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`             | `color`   | public  | `'charcoal' \| 'cloud' \| 'orange' \| 'red' \| 'sky' \| string` | `''`       | The color of the marker.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `date`              | `date`    | public  | `string`                                                        | `''`       | Date as ISO string (YYYY-MM-DD)                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `form`              | `form`    | public  | `HTMLFormElement \| null`                                       |            | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `marker`            | `marker`  | public  | `'target' \| 'circle' \| 'slash' \| 'cross' \| string`          | `''`       | The type of the marker.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `name`              | `name`    | public  | `string`                                                        |            | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `type`              | `type`    | public  | `SbbButtonType`                                                 | `'button'` | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `validationMessage` | -         | public  | `string`                                                        |            | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -         | public  | `ValidityState`                                                 |            | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`             | `value`   | public  | `string`                                                        | `''`       | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `willValidate`      | -         | public  | `boolean`                                                       |            | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |
