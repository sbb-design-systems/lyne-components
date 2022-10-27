# sbb-radio-button

Use the `sbb-radio-button` tag in combination with the `sbb-radio-button-group` component in order to display a radio input within the radio group.

```html
<sbb-radio-button name="radio-group-name" value="Value one">
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button>
```

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                                                              | Type      | Default                          |
| --------------- | ----------------- | ------------------------------------------------------------------------ | --------- | -------------------------------- |
| `checked`       | `checked`         | Whether the radio button is checked.                                     | `boolean` | `false`                          |
| `disabled`      | `disabled`        | Whether the radio button is disabled.                                    | `boolean` | `false`                          |
| `name`          | `name`            | Name of the radio button.                                                | `string`  | `undefined`                      |
| `radioButtonId` | `radio-button-id` | Id of the internal input element - default id will be set automatically. | `string`  | ``sbb-radio-button-${++nextId}`` |
| `required`      | `required`        | Whether the radio button is required.                                    | `boolean` | `false`                          |
| `value`         | `value`           | Value of radio button.                                                   | `string`  | `undefined`                      |


## Slots

| Slot        | Description                               |
| ----------- | ----------------------------------------- |
| `"unnamed"` | Use this slot to provide the radio label. |


----------------------------------------------


