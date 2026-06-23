The `<sbb-download>` is a component that displays a downloadable document, styled as a
[sbb-card](/docs/elements-card--docs). The whole area is rendered as a link with the download
behavior always enabled, so activating it triggers the browser download dialog.

```html
<sbb-download href="annual-report.pdf">
  <sbb-download-info size="1234567" changed="2026-12-24"></sbb-download-info>
</sbb-download>
```

The `label` shown as the title defaults to the file name extracted from the `href`,
but can be set explicitly.

It's possible to set the link related properties `href`, `rel` and `target`.

```html
<sbb-download href="files/2026/annual-report.pdf" label="Annual report"></sbb-download>
```

## Icon

An icon is automatically derived from the `href` file extension. The following extensions
are mapped to a dedicated document icon; any other (or missing) extension falls back to the
generic `document-standard-small` icon.

| File extension                                   | Icon                      |
| ------------------------------------------------ | ------------------------- |
| `.pdf`                                           | `document-pdf-small`      |
| `.xls`, `.xlsx`                                  | `document-xls-small`      |
| `.ppt`, `.pptx`                                  | `document-ppt-small`      |
| `.doc`, `.docx`                                  | `document-doc-small`      |
| `.zip`                                           | `document-zip-small`      |
| `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp` | `document-image-small`    |
| _anything else / no extension_                   | `document-standard-small` |

A custom icon can be set with the `iconName` property or via the `icon` slot, which overrides
the automatic derivation.

```html
<sbb-download href="document.pdf" icon-name="circle-information-small"></sbb-download>
```

## Content

The content of the unnamed slot and the `<sbb-download-info>` block are both optional and
independent. You can render custom content, a `<sbb-download-info>`, both, or none of them.

A `<sbb-download-info>` placed in the unnamed slot is automatically moved to the dedicated
`info` slot, so it always renders in the correct position. The `<sbb-download-info>` assigns
itself to the `info` slot in its `connectedCallback`, which only runs on the client; during
server-side rendering the element stays in the unnamed slot until it is hydrated.

```html
<sbb-download href="report.pdf" label="Annual report">
  <span>Custom description for the downloadable document.</span>
  <sbb-download-info type="PDF" size="123 KB" changed="2026-12-24"></sbb-download-info>
</sbb-download>
```

## Document metadata

Use the optional `<sbb-download-info>` component to display the document's metadata.
The information is rendered in the order `type`, `size`, non-accessible, `changed`,
skipping any value that has not been provided.

- `type` falls back to the file extension of the parent `sbb-download`.
- `size`, if it contains only digits, is interpreted as a number of bytes and shortened to the
  closest unit (e.g. `1234567` becomes `1 MB`); otherwise it is displayed as is.
- `changed` accepts an ISO 8601 date string and is rendered as a localized date.
- `nonAccessible` renders a localized "not accessible" hint.

```html
<sbb-download href="report.pdf">
  <sbb-download-info
    type="PDF"
    size="123 KB"
    changed="2026-12-24"
    non-accessible
  ></sbb-download-info>
</sbb-download>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbDownloadElement`, `sbb-download`

#### Properties

| Name                   | Attribute               | Privacy | Type                                                   | Default   | Description                                                                                                                                          |
| ---------------------- | ----------------------- | ------- | ------------------------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityCurrent` | `accessibility-current` | public  | `string`                                               | `''`      | This will be forwarded as aria-current to the inner anchor element.                                                                                  |
| `accessibilityLabel`   | `accessibility-label`   | public  | `string`                                               | `''`      | This will be forwarded as aria-label to the inner anchor element.                                                                                    |
| `color`                | `color`                 | public  | `'white' \| 'milk'`                                    | `'white'` | Option to set the component's background color.                                                                                                      |
| `download`             | `download`              | public  | `boolean`                                              | `true`    | The download behavior is always enabled and handled internally, therefore this property cannot be disabled and is not reflected to the host element. |
| `fileExtension`        | -                       | public  | `string`                                               |           | The lower-cased file extension extracted from the `href` (e.g. `pdf`), if any.                                                                       |
| `fileName`             | -                       | public  | `string`                                               |           | The file name extracted from the `href` (e.g. `report.pdf`).                                                                                         |
| `href`                 | `href`                  | public  | `string`                                               | `''`      | The href value you want to link to.                                                                                                                  |
| `iconName`             | `icon-name`             | public  | `string`                                               | `''`      | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                     |
| `label`                | `label`                 | public  | `string`                                               | `''`      | The label of the download. Defaults to the file name of the `href`.                                                                                  |
| `rel`                  | `rel`                   | public  | `string`                                               | `''`      | The relationship of the linked URL as space-separated link types.                                                                                    |
| `target`               | `target`                | public  | `'_blank' \| '_self' \| '_parent' \| '_top' \| string` | `''`      | Where to display the linked URL.                                                                                                                     |

#### Slots

| Name   | Description                                                                                                                                |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
|        | Use the unnamed slot to add custom content. Optional.                                                                                      |
| `icon` | Use this slot to display a custom icon, by providing a `sbb-icon` component. Optional.                                                     |
| `info` | Slot used to render a `sbb-download-info`. A `sbb-download-info` placed in the unnamed slot is automatically moved to this slot. Optional. |

### class: `SbbDownloadInfoElement`, `sbb-download-info`

#### Properties

| Name            | Attribute        | Privacy | Type      | Default | Description                                                                                                                                                                      |
| --------------- | ---------------- | ------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `changed`       | `changed`        | public  | `string`  | `''`    | The date of the latest change of the document, as an ISO 8601 string.                                                                                                            |
| `nonAccessible` | `non-accessible` | public  | `boolean` | `false` | Whether the document is not accessible.                                                                                                                                          |
| `size`          | `size`           | public  | `string`  | `''`    | The size of the document. If the value contains non-numeric characters it is rendered as is, otherwise it is interpreted as a number of bytes and shortened to the closest unit. |
| `type`          | `type`           | public  | `string`  | `''`    | The type of the document (e.g. `PDF`). Falls back to the extension of the parent `sbb-download`.                                                                                 |
