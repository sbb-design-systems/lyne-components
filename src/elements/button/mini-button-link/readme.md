The `sbb-mini-button-link` component provides the same functionality as a native anchor tag enhanced with the SBB Design.
It's mainly designed to be used within the `sbb-mini-button-group`.

```html
<sbb-mini-button-link icon-name="external-link-small"></sbb-mini-button-link>
```

## Slots

The component can display a `sbb-icon` using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-mini-button-group>
  <sbb-mini-button-link
    icon-name="info"
    accessibility-label="Click for more information."
  ></sbb-mini-button-link>

  <sbb-mini-button-link accessibility-label="Click for more information.">
    <sbb-icon slot="icon" name="info"></sbb-icon>
  </sbb-mini-button-link>
</sbb-mini-button-group>
```

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

```html
<sbb-mini-button-link href="https://github.com/sbb-design-systems/lyne-components" target="_blank">
  Go to site
</sbb-mini-button-link>
```

## Style

The component has a negative variant which can be set using the `negative` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-mini-button-link icon-name="external-link-small" negative></sbb-mini-button-link>

<sbb-mini-button-link icon-name="external-link-small" disabled></sbb-mini-button-link>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the CSS var on `sbb-mini-button-link` or any parent element:

```css
sbb-mini-button-link {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the `accessibility-label` property to describe the purpose of the `sbb-mini-button-link` for screen-reader users.

<!-- Auto Generated Below -->

## Properties

| Name                   | Attribute               | Privacy | Type                       | Default | Description                                                                                                                      |
| ---------------------- | ----------------------- | ------- | -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityCurrent` | `accessibility-current` | public  | `string`                   | `''`    | This will be forwarded as aria-current to the inner anchor element.                                                              |
| `accessibilityLabel`   | `accessibility-label`   | public  | `string`                   | `''`    | This will be forwarded as aria-label to the inner anchor element.                                                                |
| `disabled`             | `disabled`              | public  | `boolean`                  | `false` | Whether the component is disabled.                                                                                               |
| `disabledInteractive`  | `disabled-interactive`  | public  | `boolean`                  | `false` | Whether the button should be aria-disabled but stay interactive.                                                                 |
| `download`             | `download`              | public  | `boolean`                  | `false` | Whether the browser will show the download dialog on click.                                                                      |
| `href`                 | `href`                  | public  | `string`                   | `''`    | The href value you want to link to.                                                                                              |
| `iconName`             | `icon-name`             | public  | `string`                   | `''`    | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `negative`             | `negative`              | public  | `boolean`                  | `false` | Negative coloring variant flag.                                                                                                  |
| `rel`                  | `rel`                   | public  | `string`                   | `''`    | The relationship of the linked URL as space-separated link types.                                                                |
| `target`               | `target`                | public  | `LinkTargetType \| string` | `''`    | Where to display the linked URL.                                                                                                 |

## Slots

| Name   | Description                                             |
| ------ | ------------------------------------------------------- |
|        | Use the unnamed slot to add a label to the mini-button. |
| `icon` | Slot used to display the icon, if one is set            |
