The `sbb-button` component provides the same functionality as a native `<button>` enhanced with the SBB Design.

```html
<sbb-button>Button text</sbb-button>
```

## Slots

The button text is provided via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
At least one is mandatory, so you can have a `sbb-button` with icon only, text only, or with both.

```html
<sbb-button icon-name="info"> Button text </sbb-button>

<sbb-button>
  <sbb-icon slot="icon" name="info"></sbb-icon>
  Button text
</sbb-button>

<sbb-button icon-name="info" aria-label="Click for more information."></sbb-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

If `isStatic` is set, the component will be rendered as a span without any user interaction.
The `isStatic` is only considered during initial rendering (connectedCallback), later configuration changes are ignored.
Please note that if the `sbb-button` is placed inside another button tag,
it is internally rendered as a span in order to not break HTML functionality.
If the component is placed inside an `sbb-form-field`, it renders with the correct styling.

```html
<sbb-button type="button" name="tickets" form="buy" value="tickets"> Buy tickets </sbb-button>
```

## Style

The component has four color variants that can be set using the `variant` property (default: `primary`),
and it has also a negative one which can be set using the `negative` property.

There are two different sizes (`m` and `l`, which is the default) that can be set using the `size` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-button variant="secondary">Button</sbb-button>
<sbb-button variant="tertiary">Button</sbb-button>
<sbb-button variant="transparent">Button</sbb-button>

<sbb-button size="m">Button</sbb-button>

<sbb-button disabled>Button</sbb-button>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the css var on `sbb-button` or any parent element:

```css
sbb-button {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the accessibility properties in case of an icon-only button to describe the purpose of the `sbb-button` for screen-reader users.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                                                                           | Default     | Description                                                                                                                                            |
| ---------- | ----------- | ------- | ------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variant`  | `variant`   | public  | `\| 'primary'       \| 'secondary'       \| 'tertiary'       \| 'transparent'` | `'primary'` | Variant of the button, like primary, secondary etc.                                                                                                    |
| `size`     | `size`      | public  | `SbbButtonSize \| undefined`                                                   | `'l'`       | Size variant, either l or m.                                                                                                                           |
| `isStatic` | `is-static` | public  | `boolean`                                                                      | `false`     | Set this property to true if you want only a visual representation of a button, but no interaction (a span instead of a link/button will be rendered). |
| `negative` | `negative`  | public  | `boolean`                                                                      | `false`     | Negative coloring variant flag.                                                                                                                        |
| `disabled` | `disabled`  | public  | `boolean \| undefined`                                                         | `false`     | Whether the button is disabled.                                                                                                                        |
| `iconName` | `icon-name` | public  | `string \| undefined`                                                          |             | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                       |
| `type`     | `type`      | public  | `ButtonType \| undefined`                                                      |             | The type attribute to use for the button.                                                                                                              |
| `name`     | `name`      | public  | `string \| undefined`                                                          |             | The name attribute to use for the button.                                                                                                              |
| `value`    | `value`     | public  | `string \| undefined`                                                          |             | The value attribute to use for the button.                                                                                                             |
| `form`     | `form`      | public  | `string \| undefined`                                                          |             | The <form> element to associate the button with.                                                                                                       |

## Slots

| Name   | Description                                        |
| ------ | -------------------------------------------------- |
|        | Use the unnamed slot to add content to the button. |
| `icon` | Slot used to display the icon, if one is set       |
