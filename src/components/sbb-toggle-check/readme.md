# sbb-toggle-check



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                    | Description                                                    | Type                  | Default        |
| -------------------------- | ---------------------------- | -------------------------------------------------------------- | --------------------- | -------------- |
| `accessibilityDescribedBy` | `accessibility-described-by` | the aria-describedby prop for the hidden input                 | `string`              | `undefined`    |
| `accessibilityLabel`       | `accessibility-label`        | the aria-label prop for the hidden input                       | `string`              | `undefined`    |
| `accessibilityLabelledby`  | `accessibility-labelledby`   | the aria-labelledby prop for the hidden input                  | `string`              | `undefined`    |
| `checked`                  | `checked`                    | Whether the toggle-check is checked.                           | `boolean`             | `false`        |
| `disabled` _(required)_    | `disabled`                   | the disabled prop for the disabled state                       | `boolean`             | `undefined`    |
| `eventId`                  | `event-id`                   | Id which is sent in the change event payload                   | `string`              | `undefined`    |
| `icon`                     | `icon`                       | the svg name for the true state - default -> 'tick-small'      | `string`              | `'tick-small'` |
| `labelPosition`            | `label-position`             | The label position relative to the toggle. Defaults to 'after' | `"after" \| "before"` | `'after'`      |
| `name`                     | `name`                       | name of the toggle-check                                       | `string`              | `undefined`    |
| `toggleId`                 | `toggle-id`                  | id of the toggle-check                                         | `string`              | `undefined`    |


## Events

| Event     | Description                                     | Type                   |
| --------- | ----------------------------------------------- | ---------------------- |
| `changed` | event for emiting whenever selection is changed | `CustomEvent<boolean>` |


----------------------------------------------


