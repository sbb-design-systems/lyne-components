The component represents a button element contained by the [sbb-menu](/docs/components-sbb-menu-sbb-menu--docs) component.

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-menu-button>Text</sbb-menu-button>

<sbb-menu-button icon-name="pie-small">Another text</sbb-menu-button>
```

An amount can be rendered at the end of the action element as white text in a red circle via the `amount` property.

```html
<sbb-menu-button amount="123">Amount text</sbb-menu-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-menu-button type="button" value="menu" name="menu">Button</sbb-menu-button>
```

## Style

For cases where smaller outer paddings are needed,
you can set the css variable `--sbb-menu-action-outer-horizontal-padding` to your desired outer padding.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                      | Default | Description                                                                                                                      |
| ---------- | ----------- | ------- | ------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `amount`   | `amount`    | public  | `string \| undefined`     |         | Value shown as badge at component end.                                                                                           |
| `iconName` | `icon-name` | public  | `string \| undefined`     |         | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `disabled` | `disabled`  | public  | `boolean`                 | `false` | Whether the button is disabled.                                                                                                  |
| `type`     | `type`      | public  | `ButtonType \| undefined` |         | The type attribute to use for the button.                                                                                        |
| `name`     | `name`      | public  | `string \| undefined`     |         | The name attribute to use for the button.                                                                                        |
| `value`    | `value`     | public  | `string \| undefined`     |         | The value attribute to use for the button.                                                                                       |
| `form`     | `form`      | public  | `string \| undefined`     |         | The <form> element to associate the button with.                                                                                 |

## Slots

| Name   | Description                                                                         |
| ------ | ----------------------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the `sbb-menu-button`.                       |
| `icon` | Use this slot to provide an icon. If `icon-name` is set, a `sbb-icon` will be used. |
