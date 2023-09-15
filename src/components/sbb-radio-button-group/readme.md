The `sbb-radio-button-group` is a component which can be used as a wrapper for a collection of `sbb-radio-button`,
or, alternatively, for a collection of `sbb-selection-panel`.
Pressing a `sbb-radio-button` checks it and unchecks the previously selected one, if any. 
They can also be controlled programmatically by setting the value property of the parent radio group to the value of the radio.

```html
<!-- The first option will be selected by default -->
<sbb-radio-button-group value="Value one" aria-label="Radio group label">
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
  <sbb-radio-button value="Value three">Option three</sbb-radio-button>
</sbb-radio-button-group>
```

Please note that within a `sbb-radio-button-group`, only one `sbb-radio-button` can be selected at a time;
if you need to select more than one item, it is recommended to use the `sbb-checkbox-group` component.

### States

The radio group can have different states:

- can be completely disabled by setting the property `disabled`;
- can be required by setting the property `required`.

```html
<!-- All child radio buttons will be disabled -->
<sbb-radio-button-group value="Value one" aria-label="Radio group label" disabled>
  ...
</sbb-radio-button-group>

<!-- The radio group and all child radio buttons will be marked as required -->
<sbb-radio-button-group value="Value one" aria-label="Radio group label" required>
  ...
</sbb-radio-button-group>
```

### Deselecting Radios

In order to deselect a `sbb-radio-button` inside the `sbb-radio-button-group`,
you can use the `allowEmptySelection` property, which will be proxied to the inner `sbb-radio-button` 
enabling their deselection (by default, a selected `sbb-radio-button` cannot be deselected).

```html
<sbb-radio-button-group allow-empty-selection>
  ...
</sbb-radio-button-group>
```

### Orientation

The `orientation` property is used to set item orientation. Possible values are `horizontal` (default) and `vertical`.
The optional property `horizontalFrom` can be used in combination with `orientation='vertical'` to
indicate the minimum breakpoint from which the orientation changes to `horizontal`.

```html
<sbb-radio-button-group orientation="vertical" horizontal-from="large">
  ...
</sbb-radio-button-group>
```

### Events

Consumers can listen to the native `change`/`input` event on the `sbb-radio-button-group` component 
to intercept the selection's change; the current value can be read from `event.detail.value`.

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


