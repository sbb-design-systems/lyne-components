to be documented...

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                                     | Default     |
| ------------------ | ------------------- | ----------- | ---------------------------------------- | ----------- |
| `color`            | `color`             |             | `"milk" \| "white"`                      | `'white'`   |
| `disableAnimation` | `disable-animation` |             | `boolean`                                | `false`     |
| `disabled`         | `disabled`          |             | `boolean`                                | `false`     |
| `expanded`         | `expanded`          |             | `boolean`                                | `false`     |
| `level`            | `level`             |             | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `undefined` |


## Events

| Event        | Description                                                    | Type                |
| ------------ | -------------------------------------------------------------- | ------------------- |
| `did-close`  | Emits whenever the autocomplete is closed.                     | `CustomEvent<void>` |
| `did-open`   | Emits whenever the autocomplete is opened.                     | `CustomEvent<void>` |
| `will-close` | Emits whenever the autocomplete begins the closing transition. | `CustomEvent<void>` |
| `will-open`  | Emits whenever the autocomplete starts the opening transition. | `CustomEvent<void>` |


## Slots

| Slot        | Description                                        |
| ----------- | -------------------------------------------------- |
| `"content"` | Use this to render the sbb-expansion-panel-content |
| `"header"`  | Use this to render the sbb-expansion-panel-header  |


----------------------------------------------


