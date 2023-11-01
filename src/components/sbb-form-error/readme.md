The `sbb-form-error` component can be used to provide an error message in inputs components like the
[sbb-checkbox-group](/docs/components-sbb-checkbox-sbb-checkbox-group--docs) and
[sbb-radio-button-group](/docs/components-sbb-radio-button-sbb-radio-button-group--docs),
or within the [sbb-form-field](/docs/components-sbb-form-field-sbb-form-field--docs).

## Slots

It is possible to provide the error message via an unnamed slot; 
the component displays an icon by default, that can be changed using the `icon` slot.

```html
<sbb-form-error>
  This is a required field.
</sbb-form-error>

<sbb-form-error>
  <sbb-icon name="pie-small" slot="icon"/>
  This is a required field.
</sbb-form-error>
```

<!-- Auto Generated Below --> 
 

## Properties 

| Name       | Attribute  | Privacy | Type      | Default | Description                     |
| ---------- | ---------- | ------- | --------- | ------- | ------------------------------- |
| `negative` | `negative` | public  | `boolean` | `false` | Negative coloring variant flag. |

