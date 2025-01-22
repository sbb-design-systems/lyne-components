The `sbb-chip-group` component is used as a container for one or multiple `sbb-chip`.
Generally, it is used in combination with a `sbb-form-field` to allow the input of multiple textual values.

```html
<sbb-form-field>
  <label>Field label</label>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input />
  </sbb-chip-group>
</sbb-form-field>
```

## Slots

Use the unnamed slot to provide the `sbb-chip` and the `input` field

## Interactions

### Use with Autocomplete

### Use with forms

The `sbb-chip-group` is a form associated element and can be part of a form.

**Note:** The `name` must be set on the `sbb-chip-group`, not on the `input`

```html
<form>
  <sbb-form-field>
    <sbb-chip-group name="field-name">
      <sbb-chip value="Value 1"></sbb-chip>
      ...
      <input />
    </sbb-chip-group>
  </sbb-form-field>
</form>
```

## Keyboard interaction

Users can move through the chips using the arrow keys

| Keyboard       | Action        |
| -------------- | ------------- |
| <kbd>Key</kbd> | What it does. |

## Accessibility

> Describe how accessibility is implemented and if there are issues or suggested best-practice for the consumers.

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                      | Default | Description                                                    |
| ------- | --------- | ------- | ------------------------- | ------- | -------------------------------------------------------------- |
| `form`  | -         | public  | `HTMLFormElement \| null` |         | Returns the form owner of the internals of the target element. |
| `name`  | `name`    | public  | `string`                  |         | Name of the form element. Will be read from name attribute.    |
| `value` | `value`   | public  | `string \| null`          | `null`  | Value of the form element.                                     |

## Events

| Name     | Type                | Description                                      | Inherited From |
| -------- | ------------------- | ------------------------------------------------ | -------------- |
| `change` | `CustomEvent<void>` | Notifies that the component's value has changed. |                |
| `input`  | `CustomEvent<void>` | Notifies that the component's value has changed. |                |

## Slots

| Name | Description                                      |
| ---- | ------------------------------------------------ |
|      | Use the unnamed slot to add `sbb-chip` elements. |
