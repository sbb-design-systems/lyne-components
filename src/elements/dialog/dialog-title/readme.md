The `sbb-dialog-title` component extends the [sbb-title](/docs/elements-sbb-title--docs) component.
Use it in combination with the [sbb-dialog](/docs/elements-sbb-dialog-sbb-dialog--docs) to display a header in the dialog.

```html
<sbb-dialog>
  <sbb-dialog-title>A describing title of the dialog</sbb-dialog-title>
</sbb-dialog>
```

## States

The title can have a `negative` state which is automatically synchronized with the negative state of the dialog.

<!-- Auto Generated Below -->

## Properties

| Name          | Attribute      | Privacy | Type                    | Default | Description                                                                        |
| ------------- | -------------- | ------- | ----------------------- | ------- | ---------------------------------------------------------------------------------- |
| `level`       | `level`        | public  | `SbbTitleLevel`         | `'2'`   | Title level                                                                        |
| `negative`    | `negative`     | public  | `boolean`               | `false` | Negative coloring variant flag.                                                    |
| `visualLevel` | `visual-level` | public  | `SbbTitleLevel \| null` | `'3'`   | Visual level for the title. Optional, if not set, the value of level will be used. |

## Slots

| Name | Description                                               |
| ---- | --------------------------------------------------------- |
|      | Use the unnamed slot for the content of the dialog-title. |
