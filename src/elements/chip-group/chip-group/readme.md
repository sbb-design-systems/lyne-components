The `sbb-chip-group` component is used as a container for one or multiple `sbb-chip`.
Generally, it is used in combination with a `sbb-form-field` to allow the input of multiple string values.

The `value` property is synced with the slotted chips. Adding a `sbb-chip` to the slot will update the `value` property (and vice versa).

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

## States

The `sbb-chip-group` has a `disabled` and a `readonly` state that is automatically synced to the respective `input` property.

```html
<sbb-form-field>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input disabled />
    <!-- Or -->
    <input readonly />
  </sbb-chip-group>
</sbb-form-field>
```

## Style

The `sbb-chip-group` has a `negative` variant. If within a `sbb-form-field`, the properties automatically sync.

```html
<sbb-form-field negative>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input />
  </sbb-chip-group>
</sbb-form-field>
```

## Usage

### Use within forms

The `sbb-chip-group` is a form associated element and can be part of a form. Its value is an array of strings.

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

### Use with Autocomplete

It is possible to combine the functionalities of `chip-group` and the [sbb-autocomplete](/docs/elements-sbb-autocomplete--docs).

In this scenario, selecting an option will create a new chip with the option value.

```html
<sbb-form-field>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input />
  </sbb-chip-group>
  <sbb-autocomplete>
    <sbb-option value="Option A">Option A</sbb-option>
    ...
  </sbb-autocomplete>
</sbb-form-field>
```

## Keyboard interaction

At any time, only a single chip (usually, the last one) is focusable and part of the tab order. Users can move between them using the arrow keys.

| Keyboard                    | Action                                                    |
| --------------------------- | --------------------------------------------------------- |
| <kbd>Enter</kbd>            | When the `input` is focused, add a new chip.              |
| <kbd>Backspace</kbd>        | When the `input` is empty & focused, focus the last chip. |
| <kbd>Backspace</kbd>        | When the `sbb-chip` focused, delete it.                   |
| <kbd>Left/Up Arrow</kbd>    | Move the next `sbb-chip`.                                 |
| <kbd>Right/Down Arrow</kbd> | Move the previous `sbb-chip`.                             |

## Accessibility

The `sbb-chip-group` follows the `grid` aria pattern.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type                      | Default | Description                                                    |
| ---------- | ---------- | ------- | ------------------------- | ------- | -------------------------------------------------------------- |
| `disabled` | `disabled` | public  | `boolean`                 | `false` | Whether the component is disabled.                             |
| `form`     | -          | public  | `HTMLFormElement \| null` |         | Returns the form owner of the internals of the target element. |
| `name`     | `name`     | public  | `string`                  |         | Name of the form element. Will be read from name attribute.    |
| `negative` | `negative` | public  | `boolean`                 | `false` | Negative coloring variant flag.                                |
| `value`    | `value`    | public  | `string[] \| null`        | `null`  | Value of the form element.                                     |

## Events

| Name     | Type                | Description                                      | Inherited From |
| -------- | ------------------- | ------------------------------------------------ | -------------- |
| `change` | `CustomEvent<void>` | Notifies that the component's value has changed. |                |
| `input`  | `CustomEvent<void>` | Notifies that the component's value has changed. |                |

## Slots

| Name | Description                                      |
| ---- | ------------------------------------------------ |
|      | Use the unnamed slot to add `sbb-chip` elements. |
