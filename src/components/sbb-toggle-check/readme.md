
`<sbb-toggle-check>` provides the same functionality as a native `<input type="checkbox">`
enhanced with the SBB Design.

```html
<sbb-toggle-check
  value="single-checkbox"
  disabled="false"
  checked="false"
>
  Example
</sbb-toggle-check>
```

## Label

The label is provided as the content to the `<sbb-toggle-check>` element.
It can be displayed after or before the toggle-check.

If you don't want the label to appear next to the toggle-check, you can use
[`aria-label`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-label) or
[`aria-labelledby`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby) to
specify an appropriate label.

## Accessibility

`SbbToggleCheck` uses an internal `<input type="checkbox">` to provide an accessible experience.
This internal checkbox receives focus and is automatically labelled by the text content of the
`<sbb-toggle-check>` element. Avoid adding other interactive controls into the content of
`<sbb-toggle-check>`, as this degrades the experience for users of assistive technology.

Always provide an accessible label via `aria-label` or `aria-labelledby` for checkboxes without
descriptive text content. For dynamic labels, `SbbToggleCheck` provides input properties for binding
`aria-label`, `aria-labelledby` and `aria-labelledby`. This means that you should not use the `attr.` prefix when
binding these properties, as demonstrated below.

```html
<sbb-toggle-check aria-label="isSubscribedToEmailsMessage" />
```

<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                    | Description                                                              | Type                  | Default                      |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------ | --------------------- | ---------------------------- |
| `accessibilityDescribedBy` | `accessibility-described-by` | The aria-describedby prop for the hidden input.                          | `string`              | `undefined`                  |
| `accessibilityLabel`       | `accessibility-label`        | The aria-label prop for the hidden input.                                | `string`              | `undefined`                  |
| `accessibilityLabelledby`  | `accessibility-labelledby`   | The aria-labelledby prop for the hidden input.                           | `string`              | `undefined`                  |
| `checked`                  | `checked`                    | Whether the toggle-check is checked.                                     | `boolean`             | `false`                      |
| `disabled` _(required)_    | `disabled`                   | The disabled prop for the disabled state.                                | `boolean`             | `undefined`                  |
| `icon`                     | `icon`                       | The svg name for the true state - default -> 'tick-small'                | `string`              | `'tick-small'`               |
| `inputId`                  | `input-id`                   | Id of the internal input element - default id will be set automatically. | `string`              | ``sbb-checkbox-${++nextId}`` |
| `labelPosition`            | `label-position`             | The label position relative to the toggle. Defaults to 'after'           | `"after" \| "before"` | `'after'`                    |
| `name`                     | `name`                       | Name of the toggle-check.                                                | `string`              | `undefined`                  |
| `required`                 | `required`                   | The required prop for the required state.                                | `boolean`             | `undefined`                  |
| `value`                    | `value`                      | Value of toggle-check.                                                   | `string`              | `undefined`                  |


## Events

| Event       | Description                                      | Type               |
| ----------- | ------------------------------------------------ | ------------------ |
| `sbbChange` | Event for emiting whenever selection is changed. | `CustomEvent<any>` |


----------------------------------------------


