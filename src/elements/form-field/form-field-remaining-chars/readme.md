The `sbb-form-field-remaining-chars` is a component that displays the remaining characters count for input or textarea elements with a `maxlength` attribute within an `sbb-form-field`.

## Usage

Place the component inside an `sbb-form-field` that contains an `input` or `textarea` with a `maxlength` attribute. The component will automatically detect the input element via the form field's `inputElement` property and display the remaining character count.

```html
<sbb-form-field>
  <label>Description</label>
  <textarea maxlength="200"></textarea>
  <sbb-form-field-remaining-chars></sbb-form-field-remaining-chars>
</sbb-form-field>
```

```html
<sbb-form-field>
  <label>Username</label>
  <input maxlength="20" />
  <sbb-form-field-remaining-chars></sbb-form-field-remaining-chars>
</sbb-form-field>
```

## Behavior

- The component automatically uses the form field's `inputElement` property
- It works with both `input` and `textarea` elements that have a `maxlength` attribute
- It displays the remaining characters count based on the element's `maxlength` attribute
- If the input/textarea is `disabled` or `readonly`, the output is suppressed
- If no input element is present or no `maxlength` is set, nothing is displayed
- The text is automatically translated to all supported languages (de, en, fr, it)
- When not displaying content, the component takes up no space (`:empty` selector)

## States

The component inherits the `negative` state from its parent `sbb-form-field`.
