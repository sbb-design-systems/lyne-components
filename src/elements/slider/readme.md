The `sbb-slider` is an input component that allows for the selection of a value within a range.

This can be set using the `min` and `max` properties (default values are 0 and 100),
while the initial value can be set using the `value` property (string), or the `valueAsNumber` (number).
If no value is provided, by default it is set halfway between the minimum and maximum.

```html
<sbb-slider max="5" min="1"></sbb-slider>

<sbb-slider value="0"></sbb-slider>
```

## In `sbb-form-field`

The component can be used within a `sbb-form-field` component.

```html
<sbb-form-field>
  <label>Slider</label>
  <sbb-slider value="0"></sbb-slider>
</sbb-form-field>
```

## Slots

The component can optionally display two `sbb-icon`s at either end;
consumers could set one/both of them using the `startIcon` and `endIcon` properties,
or can provide their own using the two slots named `prefix` and `suffix`.

```html
<sbb-slider start-icon="circle-minus-small" end-icon="circle-plus-small"></sbb-slider>

<sbb-slider>
  <sbb-icon slot="prefix" name="battery-level-empty-small"></sbb-icon>
  <sbb-icon slot="suffix" name="battery-level-high-small"></sbb-icon>
</sbb-slider>
```

## States

It is possible to display the component in `disabled` or `readonly` state by using the self-named properties.

```html
<sbb-slider disabled></sbb-slider>

<sbb-slider readonly></sbb-slider>
```

## Events

Consumers can listen to the native `change` event on the `sbb-slider` component to intercept the input's change `event`;
the current value can be read from `event.target.value` or `event.target.valueAsNumber`.

## Keyboard interaction

The `sbb-slider` has the following behaviour on keypress when focused:

| Key         | Action                                            |
| ----------- | ------------------------------------------------- |
| Right arrow | Increment the slider value by one (or one step).  |
| Up arrow    | Increment the slider value by one (or one step).  |
| Left arrow  | Decrement the slider value by one (or one step).  |
| Down arrow  | Decrement the slider value by one (or one step).  |
| Page up     | Increment the slider value by ten (or ten steps). |
| Page down   | Decrement the slider value by ten (or ten steps). |
| End         | Set the value to the maximum.                     |
| Home        | Set the value to the minimum.                     |

<!-- Auto Generated Below -->

## Properties

| Name                | Attribute         | Privacy | Type                      | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ----------------- | ------- | ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`          | `disabled`        | public  | `boolean`                 | `false`   | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `endIcon`           | `end-icon`        | public  | `string`                  | `''`      | Name of the icon at component's end, which will be forward to the nested `sbb-icon`.                                                                                                                                                                                                                                                                                                                                                                    |
| `form`              | -                 | public  | `HTMLFormElement \| null` |           | Returns the form owner of this element.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `max`               | `max`             | public  | `string`                  | `'100'`   | Maximum acceptable value for the inner HTMLInputElement.                                                                                                                                                                                                                                                                                                                                                                                                |
| `min`               | `min`             | public  | `string`                  | `'0'`     | Minimum acceptable value for the inner HTMLInputElement.                                                                                                                                                                                                                                                                                                                                                                                                |
| `name`              | `name`            | public  | `string`                  |           | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `readOnly`          | `readonly`        | public  | `boolean`                 | `false`   | Whether the component is readonly.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `startIcon`         | `start-icon`      | public  | `string`                  | `''`      | Name of the icon at component's start, which will be forward to the nested `sbb-icon`.                                                                                                                                                                                                                                                                                                                                                                  |
| `type`              | -                 | public  | `string`                  | `'range'` | Form type of element.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `validationMessage` | -                 | public  | `string`                  |           | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -                 | public  | `ValidityState`           |           | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`             | `value`           | public  | `string`                  | `null`    | Value of the form element. If no value is provided, default is the middle point between min and max.                                                                                                                                                                                                                                                                                                                                                    |
| `valueAsNumber`     | `value-as-number` | public  | `number \| null`          |           | Numeric value for the inner HTMLInputElement.                                                                                                                                                                                                                                                                                                                                                                                                           |
| `willValidate`      | -                 | public  | `boolean`                 |           | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

## Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

## Events

| Name        | Type         | Description                                                                                                                                                                        | Inherited From |
| ----------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `change`    | `Event`      | The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value. |                |
| `didChange` | `Event`      | Deprecated. Mirrors change event for React. Will be removed once React properly supports change events.                                                                            |                |
| `input`     | `InputEvent` | The input event fires when the value has been changed as a direct result of a user action.                                                                                         |                |

## Slots

| Name     | Description                                                     |
| -------- | --------------------------------------------------------------- |
| `prefix` | Use this slot to render an icon on the left side of the input.  |
| `suffix` | Use this slot to render an icon on the right side of the input. |
