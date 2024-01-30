The `sbb-button-link` component provides the same functionality as a native `<a>`,
despite its appearance as a button enhanced with the SBB Design.

```html
<sbb-button-link href="https://www.sbb.ch">Button text</sbb-button-link>
```

## Slots

The text is provided via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
At least one is mandatory, so you can have a `sbb-button-link` with icon only, text only, or with both.

```html
<sbb-button-link href="https://www.sbb.ch" icon-name="info"> Button text </sbb-button-link>

<sbb-button-link href="https://www.sbb.ch">
  <sbb-icon slot="icon" name="info"></sbb-icon>
  Button text
</sbb-button-link>

<sbb-button-link
  href="https://www.sbb.ch"
  icon-name="info"
  aria-label="Click for more information."
></sbb-button-link>
```

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

If `isStatic` is set, the component will be rendered as a span without any user interaction.
The `isStatic` is only considered during initial rendering (connectedCallback), later configuration changes are ignored.
Please note that if the `sbb-button-link` is placed inside another anchor tag,
it is internally rendered as a span in order to not break HTML functionality.
If the component is placed inside an `sbb-form-field`, it renders with the correct styling.

```html
<sbb-button-link href="https://github.com/lyne-design-system/lyne-components" target="_blank">
  Go to site
</sbb-button-link>
```

## Style

The component has four color variants that can be set using the `variant` property (default: `primary`),
and it has also a negative one which can be set using the `negative` property.

There are two different sizes (`m` and `l`, which is the default) that can be set using the `size` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-button-link href="https://www.sbb.ch" variant="secondary">Button</sbb-button-link>
<sbb-button-link href="https://www.sbb.ch" variant="tertiary">Button</sbb-button-link>
<sbb-button-link href="https://www.sbb.ch" variant="transparent">Button</sbb-button-link>

<sbb-button-link href="https://www.sbb.ch" size="m">Button</sbb-button-link>

<sbb-button-link href="https://www.sbb.ch" disabled>Button</sbb-button-link>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the css var on `sbb-button-link` or any parent element:

```css
sbb-button-link {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the accessibility properties in case of an icon-only button to describe the purpose of the `sbb-button-link` for screen-reader users.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                                    | Default     | Description                                                                                                                                            |
| ---------- | ----------- | ------- | --------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variant`  | `variant`   | public  | `SbbButtonVariant`                      | `'primary'` | Variant of the button, like primary, secondary etc.                                                                                                    |
| `size`     | `size`      | public  | `SbbButtonSize \| undefined`            | `'l'`       | Size variant, either l or m.                                                                                                                           |
| `isStatic` | `is-static` | public  | `boolean`                               | `false`     | Set this property to true if you want only a visual representation of a button, but no interaction (a span instead of a link/button will be rendered). |
| `negative` | `negative`  | public  | `boolean`                               | `false`     | Negative coloring variant flag.                                                                                                                        |
| `disabled` | `disabled`  | public  | `boolean`                               | `false`     | Whether the button is disabled.                                                                                                                        |
| `iconName` | `icon-name` | public  | `string \| undefined`                   |             | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                       |
| `href`     | `href`      | public  | `string \| undefined`                   |             | The href value you want to link to.                                                                                                                    |
| `target`   | `target`    | public  | `LinkTargetType \| string \| undefined` |             | Where to display the linked URL.                                                                                                                       |
| `rel`      | `rel`       | public  | `string \| undefined`                   |             | The relationship of the linked URL as space-separated link types.                                                                                      |
| `download` | `download`  | public  | `boolean \| undefined`                  |             | Whether the browser will show the download dialog on click.                                                                                            |

## Slots

| Name   | Description                                             |
| ------ | ------------------------------------------------------- |
|        | Use the unnamed slot to add content to the button-link. |
| `icon` | Slot used to display the icon, if one is set            |
