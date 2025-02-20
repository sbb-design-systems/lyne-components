The `sbb-icon-sidebar-container` is a component that holds together the `sbb-icon-sidebar-content`
and one or two `sbb-icon-sidebar` elements.

Inside the `sbb-icon-sidebar-content` another `sbb-icon-sidebar-container` can be placed
to achieve multiple nested icon sidebars.

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>
    <sbb-icon-sidebar-link
      accessibility-label="Go to the party"
      icon-name="glass-cocktail-small"
      href="#"
    ></sbb-icon-sidebar-link>
  </sbb-icon-sidebar>
  <sbb-icon-sidebar-content>Content</sbb-sidebar-content>
  <sbb-icon-sidebar position="end">
    <sbb-icon-sidebar-link
      accessibility-label="Go to the party"
      icon-name="glass-cocktail-small"
      href="#"
    ></sbb-icon-sidebar-link>
  </sbb-icon-sidebar>
</sbb-icon-sidebar-container>
```

## Style

When the `sbb-sidebar-container` is placed after the `sbb-header`, an automatic `margin-block-start` is added.
In other contexts you may need to set the margin manually, e.g. `margin-block-start: var(--sbb-header-height);`.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute | Privacy | Type                            | Default | Description                                       |
| ---------- | --------- | ------- | ------------------------------- | ------- | ------------------------------------------------- |
| `end`      | -         | public  | `SbbIconSidebarElement \| null` |         | The icon-sidebar child with the `end` position.   |
| `sidebars` | -         | public  | `SbbIconSidebarElement[]`       |         | The icon-sidebar children.                        |
| `start`    | -         | public  | `SbbIconSidebarElement \| null` |         | The icon-sidebar child with the `start` position. |

## Slots

| Name | Description                                                                   |
| ---- | ----------------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements. |
