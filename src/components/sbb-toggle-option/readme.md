# sbb-toggle-option

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                              | Type      | Default                           |
| ---------------- | ------------------ | ------------------------------------------------------------------------ | --------- | --------------------------------- |
| `checked`        | `checked`          | Whether the toggle-option is checked.                                    | `boolean` | `false`                           |
| `disabled`       | `disabled`         | Whether the toggle option is disabled.                                   | `boolean` | `false`                           |
| `name`           | `name`             | Name of the toggle-option.                                               | `string`  | `undefined`                       |
| `required`       | `required`         | Whether the toggle-option is required.                                   | `boolean` | `false`                           |
| `toggleOptionId` | `toggle-option-id` | Id of the internal input element - default id will be set automatically. | `string`  | ``sbb-toggle-option-${++nextId}`` |
| `value`          | `value`            | Value of toggle-option.                                                  | `string`  | `undefined`                       |


## Events

| Event                          | Description                                     | Type               |
| ------------------------------ | ----------------------------------------------- | ------------------ |
| `sbb-toggle-option_did-select` | Emits whenever the toggle-option value changes. | `CustomEvent<any>` |


## Methods

### `select() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                       |
| ----------- | ------------------------------------------------- |
| `"unnamed"` | Use this slot to provide the toggle-option label. |


----------------------------------------------


