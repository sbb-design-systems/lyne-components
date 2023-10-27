The `sbb-tab-title` is a component which is meant to be used in combination with the 
[sbb-tab-group](/docs/components-sbb-tab-sbb-tab-group--docs) component 
in order to display a tab label within the tab bar.

```html
<sbb-tab-title>Tab Label</sbb-tab-title>
```

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

It's also possible to display a numeric amount at the component's end using the `amount` property or slot.

The label's heading tag can be changed using the `level` property.

```html
<sbb-tab-title icon-name="app-icon-small" amount="123">
  Tab Label
</sbb-tab-title>

<sbb-tab-title>
  <sbb-icon slot="icon" name="circle-information-small"></sbb-icon>
  Tab Label
  <span slot="amount">123</span>
</sbb-tab-title>
```

## States

It is possible to display the component in `disabled` state by using the self-named property.

```html
<sbb-tab-title disabled>
  Tab Label
</sbb-tab-title>
```

<!-- Auto Generated Below --> 
 

## Properties 

| Name       | Attribute       | Privacy | Type                      | Default | Description                                                                                                                                                       |
| ---------- | ---------- | ------- | ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `level`    | `level`    | public  | `TitleLevel \| undefined` | `'1'`   |                |
| `active`   | `active`   | public  | `boolean \| undefined`    |         |                |
| `disabled` | `disabled` | public  | `boolean \| undefined`    |         |                |
| `iconName` | `icon-name` | public  | `string \| undefined`     |         |                |
| `amount`   | `amount`   | public  | `string \| undefined`     |         |                |

## Slots

| Name      | Description                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------- |
| `unnamed` | This slot will show the provided tab title.                                                         |
| `icon`    | Use this slot to display an icon to the left of the title, by providing the \`sbb-icon\` component. |
| `amount`  | Provide a number to show an amount to the right of the title.                                       |

