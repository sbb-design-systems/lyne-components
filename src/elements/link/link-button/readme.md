The `sbb-link-button` component provides the same functionality as a native `<button>`,
despite its appearance as a link enhanced with the SBB Design.

## Slots

The text is provided via an unnamed slot.

```html
<sbb-link-button value="help"> Help </sbb-link-button>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-link-button disabled>Refunds</sbb-link-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-link-button name="tickets" form="buy" value="tickets">
  Travel-cards and tickets
</sbb-link-button>
```

## Accessibility

### Interactive disabled buttons

Native disabled elements cannot receive focus and do not dispatch any events. This can
be problematic in some cases because it can prevent the app from telling the user why the button is
disabled. Consumers can use the `disabledInteractive` property to receive focus and dispatch events.
The button will have `aria-disabled="true"` for assistive technology.
It is the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

**Note:** Using the `disabledInteractive` property can result in buttons that previously prevented
actions to no longer do so, for example a submit button in a form. When using this input, you should
guard against such cases in your component.

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute              | Privacy | Type                      | Default             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ---------------------- | ------- | ------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `disabled`            | `disabled`             | public  | `boolean`                 | `false`             | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                 | `false`             | Whether the button should be aria-disabled but stay interactive.                                                                                                                                                                                                                                                                                                                                                                                       |
| `form`                | `form`                 | public  | `HTMLFormElement \| null` |                     | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `name`                | `name`                 | public  | `string`                  |                     | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                            |
| `negative`            | `negative`             | public  | `boolean`                 | `false`             | Negative coloring variant flag.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `size`                | `size`                 | public  | `SbbLinkSize`             | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.                                                                                                                                                                                                                                                                                                                             |
| `type`                | `type`                 | public  | `SbbButtonType`           | `'button'`          | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `validationMessage`   | -                      | public  | `string`                  |                     | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also a custom validity message (see below) has precedence over native validation messages. |
| `validity`            | -                      | public  | `ValidityState`           |                     | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `value`               | `value`                | public  | `string \| null`          | `null`              | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `willValidate`        | -                      | public  | `boolean`                 |                     | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                            |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

## Slots

| Name | Description                                                   |
| ---- | ------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-link-button`. |
