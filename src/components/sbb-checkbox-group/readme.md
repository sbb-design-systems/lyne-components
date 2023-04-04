The `<sbb-checkbox-group>` component is used as a container for one or multiple `<sbb-checkbox>` components, 
which are projected inside an unnamed slot. 

The `orientation` property is used to set items orientation. Possible values are `horizontal` (default) and `vertical`.
The optional property `horizontalFrom` can be used in combination with `orientation='vertical'` to 
indicate the minimum breakpoint from which the orientation changes to `horizontal`.

It is possible to mark the entire group as disabled or required using the properties `disabled` and `required`.

The component can display one or more `<sbb-form-error>` components right below the `<sbb-checkbox-group>` using the `error` slot.

## Usage

Basic usage:

```html
<sbb-checkbox-group>
  <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
  <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
  <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
</sbb-checkbox-group>
```

Required `sbb-checkbox-group` with error message:

```html
<!-- All the child checkboxes will be marked as required-->
<sbb-checkbox-group required>
  <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
  <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
  <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
  <sbb-form-error slot="error">You must accept all the terms and conditions.</sbb-form-error>
</sbb-checkbox-group>
```

Disabled `sbb-checkbox-group` with vertical orientation below `large` breakpoint and horizontal above:

```html
<!-- All the child checkboxes will be disabled-->
<sbb-checkbox-group disabled orientation="vertical" horizontal-from="large">
  <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
  <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
  <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
</sbb-checkbox-group>
```

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                    | Type                                                                       | Default        |
| ---------------- | ----------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | -------------- |
| `disabled`       | `disabled`        | Whether the checkbox group is disabled.                                        | `boolean`                                                                  | `false`        |
| `horizontalFrom` | `horizontal-from` | Overrides the behaviour of `orientation` property.                             | `"large" \| "medium" \| "micro" \| "small" \| "ultra" \| "wide" \| "zero"` | `undefined`    |
| `orientation`    | `orientation`     | Indicates the orientation of the checkboxes inside the `<sbb-checkbox-group>`. | `"horizontal" \| "vertical"`                                               | `'horizontal'` |
| `required`       | `required`        | Whether the checkbox group is required.                                        | `boolean`                                                                  | `false`        |
| `size`           | `size`            | Size variant, either m or s.                                                   | `"m" \| "s"`                                                               | `'m'`          |


## Slots

| Slot        | Description                                                               |
| ----------- | ------------------------------------------------------------------------- |
| `"error"`   | Slot used to render the <sbb-form-error> inside the <sbb-checkbox-group>. |
| `"unnamed"` | Slot used to render the <sbb-checkbox> inside the <sbb-checkbox-group>.   |


----------------------------------------------


