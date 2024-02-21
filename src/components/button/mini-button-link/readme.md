The `sbb-mini-button` component provides the same functionality as a native icon-only `<a>`
despite its appearance as a button enhanced with the SBB Design.
It's mainly designed to be used within the [sbb-form-field](/docs/components-sbb-form-field-sbb-form-field--docs)
in the `prefix` or `suffix` slot.

```html
<sbb-mini-button-link icon-name="pen-small"></sbb-mini-button-link>

<sbb-form-field>
  <input />
  <sbb-mini-button-link slot="prefix" icon-name="pen-small" href="/edit"></sbb-mini-button-link>
</sbb-form-field>
```

## Slots

The component can display a `sbb-icon` using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-mini-button-link
  icon-name="info"
  aria-label="Click for more information."
  href="/hilfe"
></sbb-mini-button-link>

<sbb-mini-button-link aria-label="Click for more information." href="/hilfe">
  <sbb-icon slot="icon" name="info"></sbb-icon>
</sbb-mini-button-link>
```

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

If the component is placed inside an `sbb-form-field`, it renders with the correct styling.

```html
<sbb-form-field label="Tickets">
  <input placeholder="Insert the number of tickets you want to purchase." />
  <sbb-mini-button-link
    slot="suffix"
    icon-name="info"
    aria-label="Go to help page"
    href="https://github.com/lyne-design-system/lyne-components"
    target="_blank"
  ></sbb-mini-button-link>
</sbb-form-field>
```

## Style

The component has a negative variant which can be set using the `negative` property.

There are two different sizes (`m` and `l`, which is the default) that can be set using the `size` property.

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-mini-button-link icon-name="pie-small" negative></sbb-mini-button-link>

<sbb-mini-button-link icon-name="pie-small" size="m"></sbb-mini-button-link>

<sbb-mini-button-link icon-name="pie-small" disabled></sbb-mini-button-link>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the css var on `sbb-mini-button-link` or any parent element:

```css
sbb-mini-button-link {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the accessibility properties to describe the purpose of the `sbb-mini-button-link` for screen-reader users.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                                    | Default | Description                                                                                                                      |
| ---------- | ----------- | ------- | --------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `size`     | `size`      | public  | `SbbButtonSize \| undefined`            | `'l'`   | Size variant, either l or m.                                                                                                     |
| `negative` | `negative`  | public  | `boolean`                               | `false` | Negative coloring variant flag.                                                                                                  |
| `iconName` | `icon-name` | public  | `string \| undefined`                   |         | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `disabled` | `disabled`  | public  | `boolean`                               | `false` | Whether the component is disabled.                                                                                               |
| `href`     | `href`      | public  | `string \| undefined`                   |         | The href value you want to link to.                                                                                              |
| `target`   | `target`    | public  | `LinkTargetType \| string \| undefined` |         | Where to display the linked URL.                                                                                                 |
| `rel`      | `rel`       | public  | `string \| undefined`                   |         | The relationship of the linked URL as space-separated link types.                                                                |
| `download` | `download`  | public  | `boolean \| undefined`                  |         | Whether the browser will show the download dialog on click.                                                                      |

## Slots

| Name   | Description                                  |
| ------ | -------------------------------------------- |
| `icon` | Slot used to display the icon, if one is set |
