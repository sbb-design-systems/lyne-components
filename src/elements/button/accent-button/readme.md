The `sbb-accent-button` component provides the same functionality as a native `<button>`
enhanced with the SBB Design in the 'accent' variant.

```html
<sbb-accent-button>Button text</sbb-accent-button>
```

## Slots

The button text is provided via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
At least one is mandatory, so you can have a `sbb-accent-button` with icon only, text only, or with both.

```html
<sbb-accent-button icon-name="info"> Button text </sbb-accent-button>

<sbb-accent-button>
  <sbb-icon slot="icon" name="info"></sbb-icon>
  Button text
</sbb-accent-button>

<sbb-accent-button icon-name="info" aria-label="Click for more information."></sbb-accent-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-accent-button type="submit" name="tickets" form="buy" value="tickets">
  Buy tickets
</sbb-accent-button>
```

## Style

The component has a negative variant which can be set using the `negative` property.

There are two different sizes (`m` and `l`, which is the default) that can be set using the `size` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-accent-button negative>Button</sbb-accent-button>

<sbb-accent-button size="m">Button</sbb-accent-button>

<sbb-accent-button disabled>Button</sbb-accent-button>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the css var on `sbb-accent-button` or any parent element:

```css
sbb-accent-button {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the accessibility properties in case of an icon-only button to describe the purpose of the `sbb-accent-button` for screen-reader users.

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

| Name                  | Attribute              | Privacy | Type                      | Default            | Description                                                                                                                      |
| --------------------- | ---------------------- | ------- | ------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`            | `disabled`             | public  | `boolean`                 | `false`            | Whether the component is disabled.                                                                                               |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                 | `false`            | Whether the button should be aria-disabled but stay interactive.                                                                 |
| `form`                | `form`                 | public  | `HTMLFormElement \| null` |                    | Returns the form owner of the internals of the target element.                                                                   |
| `iconName`            | `icon-name`            | public  | `string`                  | `''`               | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `name`                | `name`                 | public  | `string`                  |                    | Name of the form element. Will be read from name attribute.                                                                      |
| `negative`            | `negative`             | public  | `boolean`                 | `false`            | Negative coloring variant flag.                                                                                                  |
| `size`                | `size`                 | public  | `SbbButtonSize`           | `'l' / 's' (lean)` | Size variant, either l, m or s.                                                                                                  |
| `type`                | `type`                 | public  | `SbbButtonType`           | `'button'`         | The type attribute to use for the button.                                                                                        |
| `value`               | `value`                | public  | `string \| null`          | `null`             | Value of the form element.                                                                                                       |

## Slots

| Name   | Description                                               |
| ------ | --------------------------------------------------------- |
|        | Use the unnamed slot to add content to the accent-button. |
| `icon` | Slot used to display the icon, if one is set              |