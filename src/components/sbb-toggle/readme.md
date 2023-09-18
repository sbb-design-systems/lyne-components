The `sbb-toggle` component is a wrapper for two `sbb-toggle-option` that can be selected by the user. 

Their behavior is similar to `sbb-tab-group` or `sbb-radio-button-group`, where selecting an option deselects the previously selected one. 
The `sbb-toggle` component is useful for switching between views within the content.

```html
<sbb-toggle value="Value 1">
  <sbb-toggle-option value="Value 1">Bern</sbb-toggle-option>
  <sbb-toggle-option value="Value 2">Zürich</sbb-toggle-option>
</sbb-toggle>
```

### States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-toggle disabled>
  ...
</sbb-toggle>
```

### Style

The `even` property can be used to let the component expand to the parent component or adapt to the label's width.

The component has two different sizes, `s` and `m` (default), which can be set using the `size` property.

```html
<sbb-toggle size='s' even>
  ...
</sbb-toggle>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                      | Type         | Default     |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ----------- |
| `disableAnimation` | `disable-animation` | Whether the animation is enabled.                                                                                                                | `boolean`    | `false`     |
| `disabled`         | `disabled`          | Whether the toggle is disabled.                                                                                                                  | `boolean`    | `false`     |
| `even`             | `even`              | If true, set the width of the component fixed; if false, the width is dynamic based on the label of the sbb-toggle-option.                       | `boolean`    | `undefined` |
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


