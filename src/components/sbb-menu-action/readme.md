The component represents an action element contained by the [sbb-menu](/docs/components-sbb-menu-sbb-menu--docs) component.

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-menu-action>Text</sbb-menu-action>

<sbb-menu-action icon-name='pie-small'>Another text</sbb-menu-action>
```

An amount can be rendered at the end of the action element as white text in a red circle via the `amount` property.

```html
<sbb-menu-action amount='123'>Amount text</sbb-menu-action>
```

## Link / button properties

As the [sbb-link](/docs/components-sbb-link--docs) and the [sbb-button](/docs/components-sbb-button--docs),
the component can be internally rendered as a button or as a link,
depending on the value of the `href` property, so the associated properties are available
(`href`, `target`, `rel` and `download` for link; `type`, `name`, `value` and `form` for button).

```html
<sbb-menu-action href="#info" target='_blank'>Link</sbb-menu-action>

<sbb-menu-action type='button' value='menu' name='menu'>Button</sbb-menu-action>
```

## Style

For cases where smaller outer paddings are needed, 
you can set the css variable `--sbb-menu-action-outer-horizontal-padding` to your desired outer padding.

<!-- Auto Generated Below --> 
 
## Properties 

| Name       | Attribute   | Privacy | Type                                                 | Default | Description                                                                                                              |
| ---------- | ----------- | ------- | ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `iconName` | `icon-name` | public  | `string \| undefined \| undefined`                   |         | The name of the icon, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `amount`   | `amount`    | public  | `string \| undefined \| undefined`                   |         | Value shown as badge at component end.                                                                                   |
| `href`     | `href`      | public  | `string \| undefined`                                |         | The href value you want to link to (if it is not present menu action becomes a button).                                  |
| `target`   | `target`    | public  | `LinkTargetType \| string \| undefined \| undefined` |         | Where to display the linked URL.                                                                                         |
| `rel`      | `rel`       | public  | `string \| undefined \| undefined`                   |         | The relationship of the linked URL as space-separated link types.                                                        |
| `download` | `download`  | public  | `boolean \| undefined`                               |         | Whether the browser will show the download dialog on click.                                                              |
| `type`     | `type`      | public  | `ButtonType \| undefined`                            |         | The type attribute to use for the button.                                                                                |
| `disabled` | `disabled`  | public  | `boolean`                                            | `false` | Whether the button is disabled.                                                                                          |
| `name`     | `name`      | public  | `string \| undefined`                                |         | The name attribute to use for the button.                                                                                |
| `value`    | `value`     | public  | `string \| undefined`                                |         | The value attribute to use for the button.                                                                               |
| `form`     | `form`      | public  | `string \| undefined`                                |         | The <form> element to associate the button with.                                                                         |

## Slots

| Name   | Description                                                                       |
| ------ | --------------------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the menu action.                           |
| `icon` | Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used. |
