The `sbb-accent-button-static` component mimics the look of the `<sbb-accent-button>`,
and it's meant to be used whenever is required to nest one button inside another without breaking the HTML functionality.

```html
<sbb-accent-button-static>Fake button</sbb-accent-button-static>
```

## Slots

The button text is provided via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
At least one is mandatory, so you can have a `sbb-accent-button-static` with icon only, text only, or with both.

```html
<sbb-accent-button-static icon-name="info"> Button text </sbb-accent-button-static>

<sbb-accent-button-static>
  <sbb-icon slot="icon" name="info"></sbb-icon>
  Button text
</sbb-accent-button-static>

<sbb-accent-button-static
  icon-name="info"
  aria-label="Click for more information."
></sbb-accent-button-static>
```

## Style

The component has a negative variant which can be set using the `negative` property.

There are two different sizes (`m` and `l`, which is the default) that can be set using the `size` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-accent-button-static negative>Button</sbb-accent-button-static>

<sbb-accent-button-static size="m">Button</sbb-accent-button-static>

<sbb-accent-button-static disabled>Button</sbb-accent-button-static>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the CSS var on `sbb-button-static` or any parent element:

```css
sbb-accent-button-static {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the accessibility properties in case of an icon-only button to describe the purpose of the `sbb-accent-button-static` for screen-reader users.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type            | Default            | Description                                                                                                                      |
| ---------- | ----------- | ------- | --------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `disabled`  | public  | `boolean`       | `false`            | Whether the component is disabled.                                                                                               |
| `iconName` | `icon-name` | public  | `string`        | `''`               | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `negative` | `negative`  | public  | `boolean`       | `false`            | Negative coloring variant flag.                                                                                                  |
| `size`     | `size`      | public  | `SbbButtonSize` | `'l' / 's' (lean)` | Size variant, either l, m or s.                                                                                                  |

## Slots

| Name   | Description                                                      |
| ------ | ---------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the accent-button-static. |
| `icon` | Slot used to display the icon, if one is set                     |
