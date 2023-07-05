to be documented...

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                            | Type                                     | Default     |
| ------------------ | ------------------- | ---------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `borderless`       | `borderless`        | Whether the panel has no border.                                       | `boolean`                                | `false`     |
| `color`            | `color`             | The background color of the panel.                                     | `"milk" \| "white"`                      | `'white'`   |
| `disableAnimation` | `disable-animation` | Whether the animations should be disabled.                             | `boolean`                                | `false`     |
| `disabled`         | `disabled`          | Whether the panel is disabled, so its expanded state can't be changed. | `boolean`                                | `false`     |
| `expanded`         | `expanded`          | Whether the panel is expanded.                                         | `boolean`                                | `false`     |
| `level`            | `level`             | Title level; if unset, a `div` will be rendered.                       | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `undefined` |


## Events

| Event        | Description                                                           | Type                |
| ------------ | --------------------------------------------------------------------- | ------------------- |
| `did-close`  | Emits whenever the sbb-expansion-panel is closed.                     | `CustomEvent<void>` |
| `did-open`   | Emits whenever the sbb-expansion-panel is opened.                     | `CustomEvent<void>` |
| `will-close` | Emits whenever the sbb-expansion-panel begins the closing transition. | `CustomEvent<void>` |
| `will-open`  | Emits whenever the sbb-expansion-panel starts the opening transition. | `CustomEvent<void>` |


## Slots

| Slot        | Description                                        |
| ----------- | -------------------------------------------------- |
| `"content"` | Use this to render the sbb-expansion-panel-content |
| `"header"`  | Use this to render the sbb-expansion-panel-header  |


----------------------------------------------


