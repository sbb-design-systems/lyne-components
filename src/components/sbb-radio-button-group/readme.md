# sbb-radio-button-group

Radio buttons should be used within a `sbb-radio-button-group`. Pressing a radio checks it and unchecks the previously selected radio, if any. They can also be controlled programmatically by setting the value property of the parent radio group to the value of the radio.

## Usage

Within a group of radio buttons, only one radio button can be selected at a time. If you need to select more than one item, it is recommended to use checkboxes.

```html
<!-- The first option will be selected by default -->
<sbb-radio-button name="radio-group-name" value="Value one">
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
  <sbb-radio-button value="Value three">Option three</sbb-radio-button>
</sbb-radio-button>
```
### States

The radio group can have different states:

- can be completely disabled by setting the property `disabled`;
- can be required by setting the property `required`.

```html
<!-- All child radio buttons will be disabled -->
<sbb-radio-button name="radio-group-name" value="Value one" disabled>
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button>

<!-- The radio group and all child radio buttons will be marked as required -->
<sbb-radio-button name="radio-group-name" value="Value one" required>
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button>
```

### Deselecting Radios​

In order to deselect a radio inside the group you can use the `allowEmptySelection` property on the parent radio group, which enables the radios to be deselected (by default, a selected cannot be deselected).

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                   | Description                                                          | Type      | Default                                |
| ----------------------- | --------------------------- | -------------------------------------------------------------------- | --------- | -------------------------------------- |
| `allowEmptySelection`   | `allow-empty-selection`     | Whether the radios can be deselected.                                | `boolean` | `false`                                |
| `disabled`              | `disabled`                  | Whether the radio group is disabled.                                 | `boolean` | `false`                                |
| `name`                  | `name`                      | Id of the radio group element - default name will be auto-generated. | `string`  | ``${this.sbbRadioButtonGroupId}-name`` |
| `required`              | `required`                  | Whether the radio group is required.                                 | `boolean` | `false`                                |
| `sbbRadioButtonGroupId` | `sbb-radio-button-group-id` | Id of the radio group element.                                       | `string`  | ``sbb-radio-button-group-${++nextId}`` |
| `value`                 | `value`                     | The value of the radio group.                                        | `any`     | `undefined`                            |


## Events

| Event                               | Description                                   | Type               |
| ----------------------------------- | --------------------------------------------- | ------------------ |
| `sbb-radio-button-group_did-change` | Emits whenever the radio group value changes. | `CustomEvent<any>` |


## Slots

| Slot        | Description                  |
| ----------- | ---------------------------- |
| `"unnamed"` | Use this to document a slot. |


----------------------------------------------


