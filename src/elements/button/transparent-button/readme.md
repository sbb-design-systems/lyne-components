The `sbb-transparent-button` component provides the same functionality as a native `<button>`
enhanced with the SBB Design in the 'transparent' variant.

```html
<sbb-transparent-button>Button text</sbb-transparent-button>
```

## Slots

The button text is provided via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
At least one is mandatory, so you can have a `sbb-transparent-button` with icon only, text only, or with both.

```html
<sbb-transparent-button icon-name="info"> Button text </sbb-transparent-button>

<sbb-transparent-button>
  <sbb-icon slot="icon" name="info"></sbb-icon>
  Button text
</sbb-transparent-button>

<sbb-transparent-button
  icon-name="info"
  aria-label="Click for more information."
></sbb-transparent-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-transparent-button type="submit" name="tickets" form="buy" value="tickets">
  Buy tickets
</sbb-transparent-button>
```

## Style

The component has a negative variant which can be set using the `negative` property.

There are two different sizes (`m` and `l`, which is the default) that can be set using the `size` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-transparent-button negative>Button</sbb-transparent-button>

<sbb-transparent-button size="m">Button</sbb-transparent-button>

<sbb-transparent-button disabled>Button</sbb-transparent-button>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the CSS var on `sbb-transparent-button` or any parent element:

```css
sbb-transparent-button {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the accessibility properties in case of an icon-only button to describe the purpose of the `sbb-transparent-button` for screen-reader users.

### Interactive disabled buttons

Native disabled elements cannot receive focus and do not dispatch any events. This can
be problematic in some cases because it can prevent the app from telling the user why the button is
disabled. Consumers can use the `disabledInteractive` property to style the button as disabled but allow for
it to receive focus and dispatch events. The button will have `aria-disabled="true"` for assistive
technology. It is the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

**Note:** Using the `disabledInteractive` property can result in buttons that previously prevented
actions to no longer do so, for example a submit button in a form. When using this input, you should
guard against such cases in your component.

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute              | Privacy | Type                      | Default            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ---------------------- | ------- | ------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `disabled`            | `disabled`             | public  | `boolean`                 | `false`            | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                 | `false`            | Whether the button should be aria-disabled but stay interactive.                                                                                                                                                                                                                                                                                                                                                                                       |
| `form`                | `form`                 | public  | `HTMLFormElement \| null` |                    | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `iconName`            | `icon-name`            | public  | `string`                  | `''`               | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                                                                                                                                                                                                                                                                                       |
| `name`                | `name`                 | public  | `string`                  |                    | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                            |
| `negative`            | `negative`             | public  | `boolean`                 | `false`            | Negative coloring variant flag.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `size`                | `size`                 | public  | `SbbButtonSize`           | `'l' / 's' (lean)` | Size variant, either l, m or s.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `type`                | `type`                 | public  | `SbbButtonType`           | `'button'`         | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `validationMessage`   | -                      | public  | `string`                  |                    | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also a custom validity message (see below) has precedence over native validation messages. |
| `validity`            | -                      | public  | `ValidityState`           |                    | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `value`               | `value`                | public  | `string \| null`          | `null`             | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `willValidate`        | -                      | public  | `boolean`                 |                    | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                            |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

## Slots

| Name   | Description                                                    |
| ------ | -------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the transparent-button. |
| `icon` | Slot used to display the icon, if one is set                   |
