The `sbb-form-field-text-counter` is a component that displays the remaining characters count
for input or textarea elements with a `maxlength` attribute within an `sbb-form-field`.

If the input/textarea is `disabled` or `readonly`, the `sbb-form-field-text-counter` is hidden.

## Usage

Place the component inside an `sbb-form-field` that contains an `input` or `textarea` (or a custom element)
with a `maxlength` attribute. The component will automatically detect the input element
via the form field's `inputElement` property and display the remaining character count.

```html
<sbb-form-field>
  <label>Description</label>
  <textarea maxlength="200"></textarea>
  <sbb-form-field-text-counter></sbb-form-field-text-counter>
</sbb-form-field>
```

```html
<sbb-form-field>
  <label>Username</label>
  <input maxlength="20" />
  <sbb-form-field-text-counter></sbb-form-field-text-counter>
</sbb-form-field>
```

## States

The component inherits the `negative` state from its parent `sbb-form-field`.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type      | Default | Description                     |
| ---------- | ---------- | ------- | --------- | ------- | ------------------------------- |
| `negative` | `negative` | public  | `boolean` | `false` | Negative coloring variant flag. |

## Slots

| Name | Description                                                                  |
| ---- | ---------------------------------------------------------------------------- |
|      | Use the unnamed slot to display a custom description text after the counter. |
