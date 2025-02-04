The `<sbb-icon-sidebar-button>` component provides the same functionality as a native `<button>`
enhanced with the design of the icon sidebar button.
The `<sbb-icon-sidebar-button>` is intended to be used inside `<sbb-icon-sidebar>`.

```html
<sbb-icon-sidebar-button
  icon-name="glass-cocktail-small"
  aria-label="Go to the party"
></sbb-icon-sidebar-button>
```

As an alternative, the icon can be slotted:

```html
<sbb-icon-sidebar-button aria-label="Go to the party">
  <sbb-icon name="glass-cocktail-small" slot="icon"></sbb-icon>
</sbb-icon-sidebar-button>
```

## Accessibility

The definition of a meaningful `aria-label` is mandatory as only an icon is displayed.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                      | Default    | Description                                                                                                                      |
| ---------- | ----------- | ------- | ------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `form`     | `form`      | public  | `HTMLFormElement \| null` |            | The `<form>` element to associate the button with.                                                                               |
| `iconName` | `icon-name` | public  | `string`                  | `''`       | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `name`     | `name`      | public  | `string`                  |            | Name of the form element. Will be read from name attribute.                                                                      |
| `type`     | `type`      | public  | `SbbButtonType`           | `'button'` | The type attribute to use for the button.                                                                                        |
| `value`    | `value`     | public  | `string \| null`          | `null`     | Value of the form element.                                                                                                       |

## Slots

| Name   | Description                    |
| ------ | ------------------------------ |
| `icon` | Slot used to display the icon. |
