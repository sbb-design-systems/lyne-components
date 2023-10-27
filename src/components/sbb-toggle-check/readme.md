The `sbb-toggle-check` is a component which provides the same functionality as a native `<input type="checkbox"/>`
enhanced with the SBB Design.

```html
<sbb-toggle-check value="single-checkbox">Example</sbb-toggle-check>
```

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
using the `iconName` property or via custom content using the `icon` slot. 
The icon can be at the component start or end based on the value of the `labelPosition` property (default: `after`).

```html
<sbb-toggle-check value="single-checkbox" icon-name='pie-small'>
  Example
</sbb-toggle-check>

<sbb-toggle-check value="single-checkbox" icon-name='pie-small' label-position='start'>
  Another example
</sbb-toggle-check>
```

## States

The component can be displayed in `checked` or `disabled` states using the self-named properties.

```html
<sbb-toggle-check value="Value" checked>Option</sbb-toggle-check>

<sbb-toggle-check value="Value" disabled>Option</sbb-toggle-check>
```

## Events

Consumers can listen to the native `change` event on the `sbb-toggle-check` component to intercept the input's change;
the current state can be read from `event.target.checked` and the value from `event.target.value`.

## Accessibility

The `sbb-toggle-check` component uses an internal `<input type="checkbox"/>` to provide an accessible experience.
This internal checkbox receives focus and is automatically labelled by the text content of the `sbb-toggle-check` element. 
Avoid adding other interactive controls into the content of `sbb-toggle-check`, as this degrades the experience for users of assistive technology.

If you don't want the label to appear next to the `sbb-toggle-check` component,
you can not provide it and then use `aria-label` to specify an appropriate label for screen-readers.

```html
<sbb-toggle-check aria-label="Subscribed to email message" />
```

<!-- Auto Generated Below --> 
 

## Properties 

| Name            | Attribute            | Privacy | Type                               | Default        | Description                                                    |
| --------------- | --------------- | ------- | ---------------------------------- | -------------- | -------------------------------------------------------------- |
| `checked`       | `checked`       | public  | `boolean`                          | `false`        | Whether the toggle-check is checked.                           |
| `value`         | `value`         | public  | `string \| undefined`              |                | Value of toggle-check.                                         |
| `name`          | `name`          | public  | `string \| undefined`              |                | Name of the toggle-check.                                      |
| `size`          | `size`          | public  | `'s' \| 'm'`                       | `'s'`          | Size variant, either m or s.                                   |
| `iconName`      | `icon-name`      | public  | `string`                           | `'tick-small'` | The svg name for the true state - default -> 'tick-small'      |
| `disabled`      | `disabled`      | public  | `boolean`                          | `false`        | The disabled prop for the disabled state.                      |
| `required`      | `required`      | public  | `boolean`                          | `false`        | The required prop for the required state.                      |
| `labelPosition` | `label-position` | public  | `'before' \| 'after' \| undefined` | `'after'`      | The label position relative to the toggle. Defaults to 'after' |

## Methods

| Name                | Privacy | Description                                                                                                            | Parameters     | Return | Inherited From |
| ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- | -------------- | ------ | -------------- |
| `handleChangeEvent` | public  |                                                                                                                        | `event: Event` | `void` |                |
| `handleInputEvent`  | public  | Method triggered on checkbox input event.&#xA;If not indeterminate, inverts the value; otherwise sets checked to true. |                | `void` |                |

## Slots

| Name      | Description                                                                         |
| --------- | ----------------------------------------------------------------------------------- |
| `unnamed` | Use this slot to provide the toggle label.                                          |
| `icon`    | Use this slot to provide an icon. If \`icon-name\` is set, a sbb-icon will be used. |

