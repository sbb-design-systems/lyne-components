The `sbb-link` component provides the same functionality as a native `<a>` enhanced with the SBB Design.

## Slots

The text is provided via an unnamed slot; the component can optionally display a `sbb-icon` using
the `iconName` property or via custom content using the `icon` slot.
By default, the icon is placed at the component's end, but this can be changed using the `iconPlacement` property.

```html
<sbb-link href="https://www.sbb.ch" icon-name="chevron-small-right-small"> Help </sbb-link>

<sbb-link href="https://www.sbb.ch" icon-name="chevron-small-left-small" icon-placement="start">
  Contact
</sbb-link>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-link href="https://www.sbb.ch" disabled>Refunds</sbb-link>
```

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

If `isStatic` is set, the component will be rendered as a link without any user interaction.
The `isStatic` is only considered during initial rendering (connectedCallback), later configuration changes are ignored.
Please note that if the `href` is not provider or `sbb-link` is placed inside another anchor tag,
it is internally rendered as a span in order to not break HTML functionality.

```html
<sbb-link href="https://github.com/lyne-design-system/lyne-components" target="_blank">
  Travel-cards and tickets
</sbb-link>
```

## Style

The component has two variants (`block`, which is the default, and `inline`), that can be set using the `variant` property,
and it has also three sizes (`xs`, `s`, which is the default, and `m`) that are relevant only in `variant='block`'.

```html
<sbb-link href="https://www.sbb.ch" size="m">Refunds</sbb-link>

<p>
  Some informative text.
  <sbb-link variant="inline" href="#info">Show more.</sbb-link>
</p>
```

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type                                    | Default   | Description                                                                                                                                          |
| --------------- | ---------------- | ------- | --------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`       | `variant`        | public  | `'block' \| 'inline'`                   | `'block'` | Variant of the link (block or inline).                                                                                                               |
| `size`          | `size`           | public  | `SbbLinkSize`                           | `'s'`     | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.                           |
| `isStatic`      | `is-static`      | public  | `boolean`                               | `false`   | Set this property to true if you want only a visual representation of a link, but no interaction (a span instead of a link/button will be rendered). |
| `iconPlacement` | `icon-placement` | public  | `SbbIconPlacement \| undefined`         | `'start'` | Moves the icon to the end of the component if set to true.                                                                                           |
| `negative`      | `negative`       | public  | `boolean`                               | `false`   | Negative coloring variant flag.                                                                                                                      |
| `disabled`      | `disabled`       | public  | `boolean`                               | `false`   | Whether the component is disabled.                                                                                                                   |
| `iconName`      | `icon-name`      | public  | `string \| undefined`                   |           | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                     |
| `href`          | `href`           | public  | `string \| undefined`                   |           | The href value you want to link to.                                                                                                                  |
| `target`        | `target`         | public  | `LinkTargetType \| string \| undefined` |           | Where to display the linked URL.                                                                                                                     |
| `rel`           | `rel`            | public  | `string \| undefined`                   |           | The relationship of the linked URL as space-separated link types.                                                                                    |
| `download`      | `download`       | public  | `boolean \| undefined`                  |           | Whether the browser will show the download dialog on click.                                                                                          |

## Slots

| Name   | Description                                            |
| ------ | ------------------------------------------------------ |
|        | Use the unnamed slot to add content to the `sbb-link`. |
| `icon` | Slot used to display the icon, if one is set.          |
