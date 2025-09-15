The `sbb-sidebar-title` component extends the [sbb-title](/docs/elements-sbb-title--docs) component.

Use it inside the [sbb-sidebar](/docs/elements-sbb-sidebar-sbb-sidebar--docs)
to display a header in the sidebar with a title.
The slot `title-section` is automatically assigned to be properly positioned on the `sbb-sidebar`.

```html
<sbb-sidebar role="navigation">
  <sbb-sidebar-title>A describing title of the sidebar</sbb-sidebar-title>
</sbb-sidebar>
```

## Style

In scenarios where the visual representation needs to be different from the semantic meaning of the title level,
it is possible to use the `visualLevel` property (default value: `5`).

<!-- Auto Generated Below -->

## Properties

| Name          | Attribute      | Privacy | Type                    | Default | Description                 |
| ------------- | -------------- | ------- | ----------------------- | ------- | --------------------------- |
| `level`       | `level`        | public  | `SbbTitleLevel`         | `'2'`   | Title level                 |
| `visualLevel` | `visual-level` | public  | `SbbTitleLevel \| null` | `'5'`   | Visual level for the title. |

## Slots

| Name | Description                                                |
| ---- | ---------------------------------------------------------- |
|      | Use the unnamed slot for the content of the sidebar-title. |
