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

In order to correctly display the shadow of the header when scrolled, setting the `scrollOrigin`
property of the `<sbb-header>` is needed. The value should be either the id of the
`<sbb-sidebar-content>` / `<sbb-icon-sidebar-content>`
or the element reference itself. Note that when using nested sidebars, it's mandatory to
constantly update the `scrollOrigin` property with the
currently active `<sbb-sidebar-content>` / `<sbb-icon-sidebar-content>`. Also, depending
on how e.g. a routerOutlet (Angular) is used, it may also be necessary to update the `scrollOrigin`
property when the navigation changes.

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
