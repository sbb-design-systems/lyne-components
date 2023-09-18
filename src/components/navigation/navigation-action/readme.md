The `sbb-navigation-action` component is an action element contained by
a [sbb-navigation-list](/docs/components-sbb-navigation-sbb-navigation-list--docs) component
or a [sbb-navigation-marker](/docs/components-sbb-navigation-sbb-navigation-marker--docs) component.

## Link / button properties

As the [sbb-link](/docs/components-sbb-link--docs) and the [sbb-button](/docs/components-sbb-button--docs),
the component can be internally rendered as a button or as a link,
depending on the value of the `href` property, so the associated properties are available
(`href`, `target`, `rel` and `download` for link; `type`, `name`, `value` and `form` for button).

```html
<sbb-navigation-action href="#info" target="_blank">Link</sbb-navigation-action>

<sbb-navigation-action type="button" value="menu" name="menu">Button</sbb-navigation-action>
```

## Style

The component has three different sizes, which can be changed using the `size` property (`l`, which is the default, `m` and `s`).

```html
<sbb-navigation-action href="#info" size="m">Link</sbb-navigation-action>

<sbb-navigation-action type="button" value="menu" name="menu">Button</sbb-navigation-action>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type                                                 | Default | Description                                                                                    |
| ---------- | ---------- | ------- | ---------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `size`     | `size`     | public  | `'l' \| 'm' \| 's' \| undefined`                     | `'l'`   | Action size variant.                                                                           |
| `href`     | `href`     | public  | `string \| undefined`                                |         | The href value you want to link to (if it is not present, navigation action becomes a button). |
| `target`   | `target`   | public  | `LinkTargetType \| string \| undefined \| undefined` |         | Where to display the linked URL.                                                               |
| `rel`      | `rel`      | public  | `string \| undefined \| undefined`                   |         | The relationship of the linked URL as space-separated link types.                              |
| `download` | `download` | public  | `boolean \| undefined`                               |         | Whether the browser will show the download dialog on click.                                    |
| `type`     | `type`     | public  | `ButtonType \| undefined`                            |         | The type attribute to use for the button.                                                      |
| `active`   | `active`   | public  | `boolean`                                            |         | Whether the action is active.                                                                  |
| `name`     | `name`     | public  | `string \| undefined`                                |         | The name attribute to use for the button.                                                      |
| `value`    | `value`    | public  | `string \| undefined`                                |         | The value attribute to use for the button.                                                     |

## Slots

| Name | Description                                                         |
| ---- | ------------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-navigation-action`. |
