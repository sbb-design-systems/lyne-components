to be documented...

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                     | Type      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `ariaCurrent` | `aria-current` |                                                                                                                                                                                 | `string`  | `undefined` |
| `download`    | `download`     | Whether the browser will show the download dialog on click.                                                                                                                     | `boolean` | `undefined` |
| `href`        | `href`         | The href value you want to link to.                                                                                                                                             | `string`  | `undefined` |
| `iconName`    | `icon-name`    | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/. Inline variant doesn't support icons. | `string`  | `undefined` |
| `rel`         | `rel`          | The relationship of the linked URL as space-separated link types.                                                                                                               | `string`  | `undefined` |
| `target`      | `target`       | Where to display the linked URL.                                                                                                                                                | `string`  | `undefined` |


## Slots

| Slot        | Description                                |
| ----------- | ------------------------------------------ |
| `"icon"`    | Use this to display an icon as breadcrumb. |
| `"unnamed"` | Use this to slot the breadcrumb's text.    |


## Dependencies

### Used by

 - [sbb-breadcrumb-group](../sbb-breadcrumb-group)

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-breadcrumb --> sbb-icon
  sbb-breadcrumb-group --> sbb-breadcrumb
  style sbb-breadcrumb fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


