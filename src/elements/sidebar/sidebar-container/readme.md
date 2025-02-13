The `sbb-sidebar-container` is a component that holds together the `sbb-sidebar-content`
and one or two `sbb-sidebar` elements. The container is responsible for orchestrating opening and closing of the sidebars
depending on available space.

Inside the `sbb-sidebar-content` another `sbb-sidebar-container` can be placed
to achieve multiple nested icon sidebars.

```html
<sbb-sidebar-container>
  <sbb-sidebar>
    <sbb-sidebar-title>Start</sbb-sidebar-title>
    <sbb-sidebar-close-button></sbb-sidebar-close-button>
    Sidebar content
  </sbb-sidebar>
  <sbb-sidebar-content>Content</sbb-sidebar-content>
  <sbb-sidebar position="end">
    <sbb-sidebar-title>End</sbb-sidebar-title>
    <sbb-sidebar-close-button></sbb-sidebar-close-button>
    Sidebar content
  </sbb-sidebar>
</sbb-sidebar-container>
```

## Style

When the `sbb-sidebar-container` is placed after the `sbb-header`, an automatic `margin-block-start` is added.
In other contexts you may need to set the margin manually, e.g. `margin-block-start: var(--sbb-header-height);`.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute | Privacy | Type                        | Default | Description                                  |
| ---------- | --------- | ------- | --------------------------- | ------- | -------------------------------------------- |
| `end`      | -         | public  | `SbbSidebarElement \| null` |         | The sidebar child with the `end` position.   |
| `sidebars` | -         | public  | `SbbSidebarElement[]`       |         | The sidebar children.                        |
| `start`    | -         | public  | `SbbSidebarElement \| null` |         | The sidebar child with the `start` position. |

## Slots

| Name | Description                                                                   |
| ---- | ----------------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements. |
