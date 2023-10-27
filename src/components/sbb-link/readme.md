The `sbb-link` component provides the same functionality as a native `<a>` enhanced with the SBB Design.

## Slots

The link text is provided via an unnamed slot; the component can optionally display a `sbb-icon` using 
the `iconName` property or via custom content using the `icon` slot. 
By default, the icon is placed at the component's end, but this can be changed using the `iconPlacement` property.

```html
<sbb-link href="https://www.sbb.ch" icon-name='chevron-small-right-small'>
  Help
</sbb-link>

<sbb-link href="https://www.sbb.ch" icon-name='chevron-small-left-small' icon-placement='start'>
  Contact
</sbb-link>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-link disabled>Refunds</sbb-link>
```

## Link / button properties

The component can be internally rendered as a button or as a link,
depending on the value of the `href` property, so the associated properties are available
(`href`, `target`, `rel` and `download` for link; `type`, `name`, `value` and `form` for button).
If `isStatic` is set, the component will be rendered as a link without any user interaction.
Please note that if the `sbb-link` is placed inside another anchor or button tag, 
it is internally rendered as a span in order to not break HTML functionality.

```html
<sbb-link href="https://github.com/lyne-design-system/lyne-components" target='_blank'>
  Travel-cards and tickets
</sbb-link>

<sbb-link type='button' name='tickets' form='buy' value='tickets'>
  Travel-cards and tickets
</sbb-link>
```
 
## Style

The component has two variants (`block`, which is the default, and `inline`), that can be set using the `variant` property,
and it has also three sizes (`xs`, `s`, which is the default, and `m`) that are relevant only in `variant='block`'.

```html
<sbb-link size='m'>Refunds</sbb-link>

<p>
  Some informative text.
  <sbb-link variant='inline' href='#info'>Show more.</sbb-link>
</p>
```

<!-- Auto Generated Below --> 
 

## Properties 

| Name            | Attribute            | Privacy | Type                                                    | Default   | Description                                                                                                                                                                         |
| --------------- | --------------- | ------- | ------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`       | `variant`       | public  | `InterfaceLinkAttributes['variant']`                    | `'block'` | Variant of the link (block or inline).                                                                                                                                              |
| `negative`      | `negative`      | public  | `boolean`                                               | `false`   | Negative coloring variant flag.                                                                                                                                                     |
| `size`          | `size`          | public  | `InterfaceLinkAttributes['size']`                       | `'s'`     | Text size, the link should get in the non-button variation.&#xA;With inline variant, the text size adapts to where it is used.                                                      |
| `isStatic`      | `is-static`      | public  | `boolean`                                               | `false`   | Set this property to true if you want only a visual representation of a&#xA;link, but no interaction (a span instead of a link/button will be rendered).                            |
| `iconName`      | `icon-name`      | public  | `string \| undefined`                                   |           |                |
| `iconPlacement` | `icon-placement` | public  | `InterfaceLinkAttributes['iconPlacement'] \| undefined` | `'start'` |                |
| `href`          | `href`          | public  | `string \| undefined`                                   |           |                |
| `target`        | `target`        | public  | `LinkTargetType \| string \| undefined \|           | Where to display the linked URL.                                                                                                                                                    |                |
| `rel`           | `rel`           | public  | `string \| undefined \| undefined`                      | The relationship of the linked URL as space-separated link types.                                                                                                                   |                |
| `download`      | `download`      | public  | `boolean \| undefined`                                  |           |                |
| `type`          | `type`          | public  | `ButtonType \| undefined`                               |           |                |
| `disabled`      | `disabled`      | public  | `boolean`                                               | `false`   | Whether the button is disabled.                                                                                                                                                     |
| `name`          | `name`          | public  | `string \| undefined`                                   |           |                |
| `value`         | `value`         | public  | `string \| undefined`                                   |           |                |
| `form`          | `form`          | public  | `string \| undefined`                                   |           |                |

## Slots

| Name      | Description                                  |
| --------- | -------------------------------------------- |
| `unnamed` | Link Content                                 |
| `icon`    | Slot used to display the icon, if one is set |

