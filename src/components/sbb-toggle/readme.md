The `<sbb-toggle>` component consists of a group of related options that the user can select. 

Their behavior is similar to tabs or radio buttons, where selecting an option deselects the previously selected one. The `<sbb-toggle>` component is useful for switching between views within the content.

The `<sbb-toggle-option>` component is used inside the toggle component to render the options.

## Usage

```html
<sbb-toggle size="m" value="Value 1">
    <sbb-toggle-option value="Value 1">Bern</sbb-toggle-option>
    <sbb-toggle-option value="Value 2">Zürich</sbb-toggle-option>
</sbb-toggle>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                      | Type         | Default     |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ----------- |
| `disableAnimation` | `disable-animation` | Whether the animation is enabled.                                                                                                                | `boolean`    | `false`     |
| `disabled`         | `disabled`          | Whether the toggle is disabled.                                                                                                                  | `boolean`    | `false`     |
| `even`             | `even`              | If true set the width of the component fixed; if false the width is dynamic based on the label of the sbb-toggle-option.                         | `boolean`    | `undefined` |
| `size`             | `size`              | Size variant, either m or s.                                                                                                                     | `"m" \| "s"` | `'m'`       |
| `value`            | `value`             | The value of the toggle. It needs to be mutable since it is updated whenever a new option is selected (see the `onToggleOptionSelect()` method). | `any`        | `undefined` |


## Events

| Event       | Description                                                                                                                                                                      | Type               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `change`    | Emits whenever the radio group value changes.                                                                                                                                    | `CustomEvent<any>` |
| `didChange` | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/>Emits whenever the radio group value changes. | `CustomEvent<any>` |


## Slots

| Slot        | Description                                    |
| ----------- | ---------------------------------------------- |
| `"unnamed"` | Slot used to render the `<sbb-toggle-option>`. |


----------------------------------------------


