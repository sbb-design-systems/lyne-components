The `sbb-link-static` component mimics the look of the `<sbb-link>`,
and it's meant to be used whenever is required to nest one link inside another without breaking the HTML functionality.

```html
<sbb-link-static>Fake link</sbb-link-static>
```

## Slots

The text is provided via an unnamed slot; the component can optionally display a `sbb-icon` using
the `iconName` property or via custom content using the `icon` slot.
By default, the icon is placed at the component's end, but this can be changed using the `iconPlacement` property.

```html
<sbb-link-static icon-name="chevron-small-right-small"> Help </sbb-link-static>

<sbb-link-static icon-name="chevron-small-left-small" icon-placement="start">
  Contact
</sbb-link-static>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-link-static disabled>Refunds</sbb-link-static>
```

## Style

The component has two variants (`block`, which is the default, and `inline`), that can be set using the `variant` property,
and it has also three sizes (`xs`, `s`, which is the default, and `m`) that are relevant only in `variant='block`'.

```html
<sbb-link-static size="m">Refunds</sbb-link-static>

<p>
  Some informative text.
  <sbb-link-static variant="inline">Show more.</sbb-link-static>
</p>
```

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type                            | Default   | Description                                                                                                                      |
| --------------- | ---------------- | ------- | ------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `variant`       | `variant`        | public  | `'block' \| 'inline'`           | `'block'` | Variant of the link (block or inline).                                                                                           |
| `size`          | `size`           | public  | `SbbLinkSize`                   | `'s'`     | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.       |
| `iconPlacement` | `icon-placement` | public  | `SbbIconPlacement \| undefined` | `'start'` | Moves the icon to the end of the component if set to true.                                                                       |
| `negative`      | `negative`       | public  | `boolean`                       | `false`   | Negative coloring variant flag.                                                                                                  |
| `disabled`      | `disabled`       | public  | `boolean`                       | `false`   | Whether the component is disabled.                                                                                               |
| `iconName`      | `icon-name`      | public  | `string \| undefined`           |           | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |

## Slots

| Name   | Description                                                   |
| ------ | ------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the `sbb-link-static`. |
| `icon` | Slot used to display the icon, if one is set.                 |
