Radio buttons should be used within a `sbb-radio-button-group`. 
Pressing a radio checks it and unchecks the previously selected radio, if any. 
They can also be controlled programmatically by setting the value property of the parent radio group to the value of the radio.

## Usage

Within a group of radio buttons, only one radio button can be selected at a time. 
If you need to select more than one item, it is recommended to use checkboxes.

```html
<!-- The first option will be selected by default -->
<sbb-radio-button-group value="Value one" aria-label="Radio group label">
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
  <sbb-radio-button value="Value three">Option three</sbb-radio-button>
</sbb-radio-button-group>
```
### States

The radio group can have different states:

- can be completely disabled by setting the property `disabled`;
- can be required by setting the property `required`.

```html
<!-- All child radio buttons will be disabled -->
<sbb-radio-button-group value="Value one" aria-label="Radio group label" disabled>
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button-group>

<!-- The radio group and all child radio buttons will be marked as required -->
<sbb-radio-button-group value="Value one" aria-label="Radio group label" required>
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button-group>
```

### Deselecting Radios

In order to deselect a radio inside the group you can use the `allowEmptySelection` property on the parent radio group, 
which enables the radios to be deselected (by default, a selected cannot be deselected).

### Accessibility

In order to ensure readability for screen-readers, please provide an `aria-label` attribute for the `sbb-radio-button-group`.

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                               | Type                                                                       | Default        |
| --------------------- | ----------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------- | -------------- |
| `allowEmptySelection` | `allow-empty-selection` | Whether the radios can be deselected.                     | `boolean`                                                                  | `false`        |
| `disabled`            | `disabled`              | Whether the radio group is disabled.                      | `boolean`                                                                  | `false`        |
| `horizontalFrom`      | `horizontal-from`       | Overrides the behaviour of `orientation` property.        | `"large" \| "medium" \| "micro" \| "small" \| "ultra" \| "wide" \| "zero"` | `undefined`    |
| `orientation`         | `orientation`           | Radio group's orientation, either horizontal or vertical. | `"horizontal" \| "vertical"`                                               | `'horizontal'` |
| `required`            | `required`              | Whether the radio group is required.                      | `boolean`                                                                  | `false`        |
| `size`                | `size`                  | Size variant, either m or s.                              | `"m" \| "s"`                                                               | `'m'`          |
| `value`               | `value`                 | The value of the radio group.                             | `any`                                                                      | `undefined`    |


## Events

| Event       | Description                                                                                                                                                                      | Type               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `change`    | Emits whenever the radio group value changes.                                                                                                                                    | `CustomEvent<any>` |
| `didChange` | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/>Emits whenever the radio group value changes. | `CustomEvent<any>` |
| `input`     | Emits whenever the radio group value changes.                                                                                                                                    | `CustomEvent<any>` |


## Slots

| Slot        | Description                                                      |
| ----------- | ---------------------------------------------------------------- |
| `"error"`   | Use this to provide a `sbb-form-error` to show an error message. |
| `"unnamed"` | Use this to provide radio buttons within the group.              |


----------------------------------------------


