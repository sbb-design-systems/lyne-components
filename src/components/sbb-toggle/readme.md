# sbb-toggle
The `<sbb-toggle>` component offers the user to choose exact one option. Inside the component the `<sbb-toggle-option>` is used the render the options.

## Usage

```html
<sbb-toggle size="m" value="Value 1">
    <sbb-toggle-option value="Value 1">Bern</sbb-toggle-option>
    <sbb-toggle-option value="Value 2">Zurich</sbb-toggle-option>
</sbb-toggle>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                       | Type         | Default                    |
| ------------------ | ------------------- | --------------------------------- | ------------ | -------------------------- |
| `disableAnimation` | `disable-animation` | Whether the animation is enabled. | `boolean`    | `false`                    |
| `disabled`         | `disabled`          | Whether the toggle is disabled.   | `boolean`    | `false`                    |
| `even`             | `even`              | Set the width of the component.   | `boolean`    | `undefined`                |
| `sbbToggleId`      | `sbb-toggle-id`     | Id of the toggle element.         | `string`     | ``sbb-toggle-${++nextId}`` |
| `size`             | `size`              | Size variant, either m or s.      | `"m" \| "s"` | `'m'`                      |
| `value`            | `value`             | The value of the toggle.          | `any`        | `undefined`                |


## Events

| Event        | Description                              | Type               |
| ------------ | ---------------------------------------- | ------------------ |
| `did-change` | Emits whenever the toggle value changes. | `CustomEvent<any>` |


## Slots

| Slot        | Description                                    |
| ----------- | ---------------------------------------------- |
| `"unnamed"` | Slot used to render the `<sbb-toggle-option>`. |


----------------------------------------------


