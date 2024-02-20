The `sbb-navigation-button` component is an action element contained by
a [sbb-navigation-list](/docs/components-sbb-navigation-sbb-navigation-list--docs) component
or a [sbb-navigation-marker](/docs/components-sbb-navigation-sbb-navigation-marker--docs) component.

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-navigation-button value="menu" name="menu">Button</sbb-navigation-button>
```

## Style

The component has three different sizes, which can be changed using the `size` property (`l`, which is the default, `m` and `s`).

```html
<sbb-navigation-button value="menu" name="menu" size="m">Button</sbb-navigation-button>
```

<!-- Auto Generated Below -->

## Properties

| Name               | Attribute | Privacy | Type                                   | Default    | Description                                      |
| ------------------ | --------- | ------- | -------------------------------------- | ---------- | ------------------------------------------------ |
| `size`             | `size`    | public  | `SbbNavigationActionSize \| undefined` | `'l'`      | Action size variant.                             |
| `active`           | `active`  | public  | `boolean`                              | `false`    | Whether the action is active.                    |
| `navigationMarker` | -         | public  | `SbbNavigationMarkerElement \| null`   | `null`  |                                                  |
| `type`             | `type`    | public  | `SbbButtonType`                        | `'button'` | The type attribute to use for the button.        |
| `name`             | `name`    | public  | `string`                               |            | The name of the button element.                  |
| `value`            | `value`   | public  | `string`                               |            | The value of the button element.                 |
| `form`             | `form`    | public  | `string \| undefined`                  |            | The <form> element to associate the button with. |

## Slots

| Name | Description                                                         |
| ---- | ------------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-navigation-button`. |
