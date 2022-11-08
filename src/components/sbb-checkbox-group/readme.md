# sbb-checkbox-group
`<sbb-checkbox-group>` is a component used as a conteiner to wrap the `<sbb-checkbox>` component.

# Usage

The examples below show how to render the component:

```html
<sbb-checkbox-group name='checkbox-group-1'>
    <sbb-checkbox name="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
    <sbb-checkbox name="checkbox-2" value="checkbox-2">Label 2</sbb-checkbox>
    <sbb-checkbox name="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
</sbb-checkbox-group>
```

# States
The `<sbb-checkbox-group>` can have different states:

- can be completely disabled by setting the property `disabled`;
- can be required by setting the property `required`.

```html
<!-- All the child checkboxes will be disabled-->
<sbb-checkbox-group name='checkbox-group-1' disabled>
    <sbb-checkbox name="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
    <sbb-checkbox name="checkbox-2" value="checkbox-2">Label 2</sbb-checkbox>
    <sbb-checkbox name="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
</sbb-checkbox-group>
```

```html
<!-- All the child checkboxes will be marked as required-->
<sbb-checkbox-group name='checkbox-group-1'>
    <sbb-checkbox name="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
    <sbb-checkbox name="checkbox-2" value="checkbox-2">Label 2</sbb-checkbox>
    <sbb-checkbox name="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
</sbb-checkbox-group>
```

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description                                                             | Type      | Default                             |
| -------------------- | ----------------------- | ----------------------------------------------------------------------- | --------- | ----------------------------------- |
| `disabled`           | `disabled`              | Whether the checkbox group is disabled.                                 | `boolean` | `false`                             |
| `name`               | `name`                  | Id of the checkbox group element - default name will be auto-generated. | `string`  | ``${this.sbbCheckboxGroupId}-name`` |
| `required`           | `required`              | Whether the checkbox group is required.                                 | `boolean` | `false`                             |
| `sbbCheckboxGroupId` | `sbb-checkbox-group-id` | Id of the checkbox group element.                                       | `string`  | ``sbb-checkbox-group-${++nextId}``  |


## Slots

| Slot        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `"error"`   | Slot use to render the <sbb-form-error> inside the <sbb-checkbox-group>. |
| `"unnamed"` | Slot used to render the <sbb-checkbox> inside the <sbb-checkbox-group>.  |


----------------------------------------------


