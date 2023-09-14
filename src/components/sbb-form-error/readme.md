The `sbb-form-error` component can be used to provide an error message.

### Slots

It is possible to provide the error message via an unnamed slot; 
the component displays an icon by default, and it can be changed using the `icon` slot.

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

| Property   | Attribute  | Description                     | Type      | Default |
| ---------- | ---------- | ------------------------------- | --------- | ------- |
| `negative` | `negative` | Negative coloring variant flag. | `boolean` | `false` |


----------------------------------------------


