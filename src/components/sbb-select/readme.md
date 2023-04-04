# sbb-select

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                              | Type                 | Default     |
| ------------------ | ------------------- | ------------------------------------------------------------------------ | -------------------- | ----------- |
| `disableAnimation` | `disable-animation` | Whether the animation is disabled.                                       | `boolean`            | `false`     |
| `disabled`         | `disabled`          | Whether the select is disabled.                                          | `boolean`            | `false`     |
| `multiple`         | `multiple`          | Whether the select allows for multiple selection.                        | `boolean`            | `false`     |
| `placeholder`      | `placeholder`       | The placeholder used if no value has been selected.                      | `string`             | `undefined` |
| `readonly`         | `readonly`          | Whether the select is readonly.                                          | `boolean`            | `false`     |
| `required`         | `required`          | Whether the select is required.                                          | `boolean`            | `false`     |
| `value`            | `value`             | The value of the select component. If `multiple` is true, it's an array. | `string \| string[]` | `undefined` |


## Events

| Event        | Description                                                                                                                         | Type                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `change`     |                                                                                                                                     | `CustomEvent<any>`  |
| `did-close`  | Emits whenever the select is closed.                                                                                                | `CustomEvent<void>` |
| `did-open`   | Emits whenever the select is opened.                                                                                                | `CustomEvent<void>` |
| `didChange`  | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/> | `CustomEvent<any>`  |
| `input`      |                                                                                                                                     | `CustomEvent<any>`  |
| `will-close` | Emits whenever the select begins the closing transition.                                                                            | `CustomEvent<void>` |
| `will-open`  | Emits whenever the select starts the opening transition.                                                                            | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Closes the selection panel.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the selection panel.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                       |
| ----------- | --------------------------------- |
| `"unnamed"` | Use this slot to project options. |


----------------------------------------------


