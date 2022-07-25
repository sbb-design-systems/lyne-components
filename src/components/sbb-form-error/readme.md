# sbb-form-error

The `sbb-form-error` component can be used to provide an error message.

## Usage

The examples below shows how the component is used:

```html
<sbb-form-error>This field is required!</sbb-form-error>

<!-- It is possible to override the default icon -->
<sbb-form-error>
    <span slot="icon">
      <sbb-icon name="pie-small" />
    </span>
    This is a required field.
  </sbb-form-error>
```



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                           | Type                     | Default     |
| ------------ | ------------- | ----------------------------------------------------- | ------------------------ | ----------- |
| `errorSpace` | `error-space` | Add a specific space if the `<sbb-error>` is present. | `"default" \| "reserve"` | `'default'` |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-form-error --> sbb-icon
  style sbb-form-error fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


