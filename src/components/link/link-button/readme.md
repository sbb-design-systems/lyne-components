The `sbb-link-button` component provides the same functionality as a native `<button>`,
despite its appearance as a link enhanced with the SBB Design.

## Slots

The text is provided via an unnamed slot; the component can optionally display a `sbb-icon` using
the `iconName` property or via custom content using the `icon` slot.
By default, the icon is placed at the component's end, but this can be changed using the `iconPlacement` property.

```html
<sbb-link-button value="hilfe"> Help </sbb-link-button>

<sbb-link-button value="contact" icon-name="chevron-small-left-small" icon-placement="start">
  Contact
</sbb-link-button>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-link-button disabled>Refunds</sbb-link-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

If `isStatic` is set, the component will be rendered as a button without any user interaction.
The `isStatic` is only considered during initial rendering (connectedCallback), later configuration changes are ignored.
Please note that if the `sbb-link-button` is placed inside another button tag,
it is internally rendered as a span in order to not break HTML functionality.

```html
<sbb-link-button type="button" name="tickets" form="buy" value="tickets">
  Travel-cards and tickets
</sbb-link-button>
```

## Style

The component has two variants (`block`, which is the default, and `inline`), that can be set using the `variant` property,
and it has also three sizes (`xs`, `s`, which is the default, and `m`) that are relevant only in `variant='block`'.

```html
<sbb-link-button size="m">Refunds</sbb-link-button>

<p>
  Some informative text.
  <sbb-link-button variant="inline">Show more.</sbb-link-button>
</p>
```

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type                            | Default   | Description                                                                                                                                          |
| --------------- | ---------------- | ------- | ------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`       | `variant`        | public  | `'block' \| 'inline'`           | `'block'` | Variant of the link (block or inline).                                                                                                               |
| `size`          | `size`           | public  | `SbbLinkSize`                   | `'s'`     | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.                           |
| `isStatic`      | `is-static`      | public  | `boolean`                       | `false`   | Set this property to true if you want only a visual representation of a link, but no interaction (a span instead of a link/button will be rendered). |
| `iconPlacement` | `icon-placement` | public  | `SbbIconPlacement \| undefined` | `'start'` | Moves the icon to the end of the component if set to true.                                                                                           |
| `negative`      | `negative`       | public  | `boolean`                       | `false`   | Negative coloring variant flag.                                                                                                                      |
| `disabled`      | `disabled`       | public  | `boolean \| undefined`          | `false`   | Whether the button is disabled.                                                                                                                      |
| `iconName`      | `icon-name`      | public  | `string \| undefined`           |           | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                     |
| `type`          | `type`           | public  | `ButtonType \| undefined`       |           | The type attribute to use for the button.                                                                                                            |
| `name`          | `name`           | public  | `string \| undefined`           |           | The name attribute to use for the button.                                                                                                            |
| `value`         | `value`          | public  | `string \| undefined`           |           | The value attribute to use for the button.                                                                                                           |
| `form`          | `form`           | public  | `string \| undefined`           |           | The <form> element to associate the button with.                                                                                                     |

## Slots

| Name   | Description                                                   |
| ------ | ------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the `sbb-link-button`. |
| `icon` | Slot used to display the icon, if one is set.                 |
