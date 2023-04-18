`<sbb-toggle-check>` provides the same functionality as a native `<input type="checkbox">`
enhanced with the SBB Design.

Consumers can listen to the native `change` event on the `sbb-toggle-check` component to intercept the input's change;
the current state can be read from `event.target.checked` and the value from `event.target.value`.

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
`aria-label` to specify an appropriate label.

## Accessibility

`SbbToggleCheck` uses an internal `<input type="checkbox">` to provide an accessible experience.
This internal checkbox receives focus and is automatically labelled by the text content of the
`<sbb-toggle-check>` element. Avoid adding other interactive controls into the content of
`<sbb-toggle-check>`, as this degrades the experience for users of assistive technology.

Always provide an accessible label via `aria-label` for checkboxes without
descriptive text content.

```html
<sbb-toggle-check aria-label="Subscribed to email message" />
```

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                    | Type                  | Default        |
| --------------- | ---------------- | -------------------------------------------------------------- | --------------------- | -------------- |
| `checked`       | `checked`        | Whether the toggle-check is checked.                           | `boolean`             | `false`        |
| `disabled`      | `disabled`       | The disabled prop for the disabled state.                      | `boolean`             | `false`        |
| `iconName`      | `icon-name`      | The svg name for the true state - default -> 'tick-small'      | `string`              | `'tick-small'` |
| `labelPosition` | `label-position` | The label position relative to the toggle. Defaults to 'after' | `"after" \| "before"` | `'after'`      |
| `name`          | `name`           | Name of the toggle-check.                                      | `string`              | `undefined`    |
| `required`      | `required`       | The required prop for the required state.                      | `boolean`             | `false`        |
| `value`         | `value`          | Value of toggle-check.                                         | `string`              | `undefined`    |


## Events

| Event       | Description                                                                                                                         | Type               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `didChange` | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/> | `CustomEvent<any>` |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-toggle-check --> sbb-icon
  style sbb-toggle-check fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


