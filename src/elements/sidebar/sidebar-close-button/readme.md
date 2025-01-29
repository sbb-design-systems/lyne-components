The `sbb-sidebar-close-button` component extends the [sbb-secondary-button](/docs/elements-sbb-button-sbb-secondary-button--docs) component.
Use it in inside the [sbb-sidebar](/docs/elements-sbb-sidebar-sbb-sidebar--docs)
to display a close button in the sidebar.

Clicking the close button closes the parent sidebar.

```html
<sbb-sidebar>
  <sbb-sidebar-close-button></sbb-sidebar-close-button>
  Content
</sbb-sidebar>
```

## Accessibility

An aria-label is automatically set. It's possible to override it.

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute              | Privacy | Type                      | Default         | Description                                                                                                                      |
| --------------------- | ---------------------- | ------- | ------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`            | `disabled`             | public  | `boolean`                 | `false`         | Whether the component is disabled.                                                                                               |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                 | `false`         | Whether the button should be aria-disabled but stay interactive.                                                                 |
| `form`                | `form`                 | public  | `HTMLFormElement \| null` |                 | The `<form>` element to associate the button with.                                                                               |
| `iconName`            | `icon-name`            | public  | `string`                  | `'cross-small'` | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `name`                | `name`                 | public  | `string`                  |                 | Name of the form element. Will be read from name attribute.                                                                      |
| `negative`            | `negative`             | public  | `boolean`                 | `false`         | Negative coloring variant flag.                                                                                                  |
| `size`                | `size`                 | public  | `SbbButtonSize`           | `'s'`           | Size variant, either l, m or s.                                                                                                  |
| `type`                | `type`                 | public  | `SbbButtonType`           | `'button'`      | The type attribute to use for the button.                                                                                        |
| `value`               | `value`                | public  | `string \| null`          | `null`          | Value of the form element.                                                                                                       |

## Slots

| Name   | Description                                                                                               |
| ------ | --------------------------------------------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the sidebar-close-button. Not intended to be used in this context. |
| `icon` | Slot used to display the icon, if one is set. Not intended to be used in this context.                    |
