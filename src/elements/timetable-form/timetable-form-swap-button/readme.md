The `sbb-timetable-form-swap-button` is an extension of [sbb-secondary-button](/docs/elements-sbb-button-sbb-secondary-button--docs) to be used inside the `sbb-timetable-form`.
When clicked, it swaps the value of the sibling inputs and dispatch the `input` and `change` events.

```html
<form class="sbb-timetable-form">
  ...
  <sbb-timetable-form>
    <sbb-timetable-form-field>...</sbb-timetable-form-field>
    <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
    <sbb-timetable-form-field>...</sbb-timetable-form-field>
    ...
  </sbb-timetable-form>
</form>
```

## Accessibility

The default `aria-label` value is 'Swap from and to', localized in the supported languages.

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute              | Privacy | Type                      | Default            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------- | ---------------------- | ------- | ------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`            | `disabled`             | public  | `boolean`                 | `false`            | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                 | `false`            | Whether the button should be aria-disabled but stay interactive.                                                                                                                                                                                                                                                                                                                                                                                        |
| `form`                | `form`                 | public  | `HTMLFormElement \| null` |                    | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `iconName`            | `icon-name`            | public  | `string`                  | `''`               | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                                                                                                                                                                                                                                                                                        |
| `loading`             | `loading`              | public  | `boolean`                 | `false`            | Whether the button indicates a loading state. The animation kicks in after a delay of 300ms, configurable with --sbb-button-loading-delay CSS variable.                                                                                                                                                                                                                                                                                                 |
| `name`                | `name`                 | public  | `string`                  |                    | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `negative`            | `negative`             | public  | `boolean`                 | `false`            | Negative coloring variant flag.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `size`                | `size`                 | public  | `SbbButtonSize`           | `'l' / 's' (lean)` | Size variant, either l, m or s.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `type`                | `type`                 | public  | `SbbButtonType`           | `'button'`         | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `validationMessage`   | -                      | public  | `string`                  |                    | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`            | -                      | public  | `ValidityState`           |                    | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`               | `value`                | public  | `string`                  | `''`               | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `willValidate`        | -                      | public  | `boolean`                 |                    | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

## CSS Properties

| Name                         | Default | Description                                                                                |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `--sbb-button-loading-delay` | `300ms` | The delay before the loading animation starts, when setting the button into loading state. |

## Slots

| Name   | Description                                                  |
| ------ | ------------------------------------------------------------ |
|        | Use the unnamed slot to add content to the secondary-button. |
| `icon` | Slot used to display the icon, if one is set.                |
