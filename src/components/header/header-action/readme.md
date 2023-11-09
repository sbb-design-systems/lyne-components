The component represents an action element contained by the [sbb-header](/docs/components-sbb-header-sbb-header--docs) component.

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-header-action>Text</sbb-header-action>

<sbb-header-action icon-name="pie-small">Another text</sbb-header-action>
```

If the component's icon is set, the property `expandFrom` can be used to define the minimum breakpoint
from which the label is displayed; below that, only the icon is visible.

```html
<sbb-header-action expand-from="medium">Text</sbb-header-action>
```

## Link / button properties

As the [sbb-link](/docs/components-sbb-link--docs) and the [sbb-button](/docs/components-sbb-button--docs),
the component can be internally rendered as a button or as a link,
depending on the value of the `href` property, so the associated properties are available
(`href`, `target`, `rel` and `download` for link; `type`, `name`, `value` and `form` for button).

```html
<sbb-header-action href="#info" target="_blank">Link</sbb-header-action>

<sbb-header-action type="button" value="menu" name="menu">Button</sbb-header-action>
```

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type                                                 | Default | Description                                                                                                                                                                              |
| ------------ | ------------- | ------- | ---------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expandFrom` | `expand-from` | public  | `SbbHorizontalFrom`                                  |         | Used to set the minimum breakpoint from which the text is displayed. E.g. if set to 'large', the text will be visible for breakpoints large, wide, ultra, and hidden for all the others. |
| `iconName`   | `icon-name`   | public  | `string \| undefined`                                |         | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                         |
| `href`       | `href`        | public  | `string \| undefined`                                |         | The href value you want to link to (if it is not present sbb-header-action becomes a button).                                                                                            |
| `target`     | `target`      | public  | `LinkTargetType \| string \| undefined \| undefined` |         | Where to display the linked URL.                                                                                                                                                         |
| `rel`        | `rel`         | public  | `string \| undefined \| undefined`                   |         | The relationship of the linked URL as space-separated link types.                                                                                                                        |
| `download`   | `download`    | public  | `boolean \| undefined`                               |         | Whether the browser will show the download dialog on click.                                                                                                                              |
| `type`       | `type`        | public  | `ButtonType \| undefined`                            |         | Type attribute if component is displayed as a button.                                                                                                                                    |
| `name`       | `name`        | public  | `string \| undefined`                                |         | Name attribute if component is displayed as a button.                                                                                                                                    |
| `value`      | `value`       | public  | `string \| undefined`                                |         | The value associated with button `name` when it's submitted with the form data.                                                                                                          |
| `form`       | `form`        | public  | `string \| undefined`                                |         | Form attribute if component is displayed as a button.                                                                                                                                    |

## Slots

| Name   | Description                                                     |
| ------ | --------------------------------------------------------------- |
| `icon` | Slot used to render the action icon.                            |
|        | Use the unnamed slot to add content to the `sbb-header-action`. |
