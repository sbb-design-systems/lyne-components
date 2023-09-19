The `sbb-checkbox-group` component is used as a container for one or multiple `sbb-checkbox` components,
or, alternatively, for a collection of `sbb-selection-panel`, which are projected inside an unnamed slot.

```html
<sbb-checkbox-group>
  <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
  <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
  <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
</sbb-checkbox-group>
```

### Orientation

The `orientation` property is used to set item orientation. Possible values are `horizontal` (default) and `vertical`.
The optional property `horizontalFrom` can be used in combination with `orientation='vertical'` to 
indicate the minimum breakpoint from which the orientation changes to `horizontal`.

```html
<sbb-checkbox-group orientation="vertical" horizontal-from="large">
  ...
</sbb-checkbox-group>
```

### States

It is possible to mark the entire group as disabled or required using the properties `disabled` and `required`.
The component has a `size` property too, which can be used to change the size of all the inner `sbb-checkbox`.


```html
<!-- All the child sbb-checkbox will be marked as required. -->
<sbb-checkbox-group required>
  ...
</sbb-checkbox-group>

<!-- All the child sbb-checkbox will be marked as disabled. -->
<sbb-checkbox-group disabled>
  ...
</sbb-checkbox-group>

<!-- All the child sbb-checkbox will have size="s". -->
<sbb-checkbox-group size='s'>
  ...
</sbb-checkbox-group>
```

### Error

The component can display one or more `sbb-form-error` components right below the `sbb-checkbox-group` using the `error` slot.

```html
<sbb-checkbox-group required>
  <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
  <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
  <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
  <sbb-form-error slot="error">You must accept all the terms and conditions.</sbb-form-error>
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


