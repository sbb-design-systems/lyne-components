<!-- keywords: form -->

The `<sbb-toggle-slide>` provides functionality similar to a native `<input type="checkbox" />`,
but requires the user to actively slide or press and hold the button in order to change its state.
This deliberate interaction helps to prevent the state from being changed by accident,
which makes the component especially suitable for safety-relevant or hard-to-reverse actions
(e.g. confirming a check-in). Before activation oder deactivation is finally confirmed,
the component dispatches a cancelable `validate` event, which allows consumers to prevent
or asynchronously confirm the state change.

```html
<sbb-toggle-slide aria-label="Journey check-in" name="checkin" value="checked-in">
  <sbb-toggle-slide-activation-label>To start pull right</sbb-toggle-slide-activation-label>
  <sbb-toggle-slide-deactivation-label>To stop pull left</sbb-toggle-slide-deactivation-label>
</sbb-toggle-slide>
```

## Slots

The two dedicated `<sbb-toggle-slide-activation-label>` and `<sbb-toggle-slide-deactivation-label>`
elements can be slotted into the unnamed slot to provide context-specific labels: the activation label
is displayed while the component is unchecked, and the deactivation label is displayed while the component is checked.

## States

The component can be displayed in `checked` or `disabled` states using the self-named properties.
Any programmatic change of the `checked` state is immediately applied and therefore
overrides an in-progress state change of a user.

## Style

The component has three different sizes (`s`, `m` and `l`), which can be changed using the `size` property.
If not set, the size defaults to `s` in the lean theme and to `m` in the standard theme.

```html
<sbb-toggle-slide size="l" aria-label="Confirm payment">
  <sbb-toggle-slide-activation-label>To confirm pull right</sbb-toggle-slide-activation-label>
</sbb-toggle-slide>
```

## Interactions

The state of the component can only be changed with a deliberate interaction:

- **Slide**: the button can be dragged along the track; releasing it near the end of the track
  completes the state change, while releasing it before that point animates the button back to its
  original position.
- **Press and hold**: pressing and holding the button (or the <kbd>Space</kbd> key, see below)
  triggers a slow sliding animation from the current state to the opposite one.
  Releasing before the animation completes aborts the action and the button animates back.

Once a slide or press-and-hold interaction is completed, the component dispatches a cancelable
`validate` event before actually changing the `checked` state (see [Events](#events) below).
This allows consumers to prevent or asynchronously confirm the state change,
e.g. to request a confirmation from a backend service.

## Events

Consumers can listen to the native `change` event on the `<sbb-toggle-slide>` component to intercept the input's change;
the current state can be read from `event.target.checked` and the value from `event.target.value`.

The `validate` event is dispatched right before the `checked` state actually changes, once the user
has completed a slide or press-and-hold interaction.
The event is cancelable, so consumers can call `preventDefault()` to synchronously reject the state change.
For asynchronous validation (e.g. waiting for a backend call), consumers can call
`preventDefaultConditionally()` with a `Promise<boolean>`;
while the promise is pending, the component displays a loading state,
and if the promise resolves to `false` or rejects, the state change is reverted.
Without any handling of the `validate` event, the state change is always immediately applied.

```ts
toggleSlide.addEventListener('validate', (event: SbbToggleSlideValidateEvent) => {
  event.preventDefaultConditionally(fetch('/api/confirm-checkin').then((response) => response.ok));
});
```

## Keyboard interaction

| Keyboard                          | Action                                                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd> (press and hold) | Starts the sliding animation towards the opposite state. <br/>As soon as the end is reached the activation is commited. |
| <kbd>Space</kbd> (release)        | Confirms the state change if the animation has completed; otherwise aborts it.                                          |

## Accessibility

The component has the role `switch` and reflects its state via `aria-checked`,
so it is announced by assistive technology in the same way as a native switch control.

### Screen reader usage

It's mandatory to provide an accessible name for the component, either via `aria-label` or `aria-labelledby`.

On touch devices, the state can be changed with a double tap gesture, like for a native switch.
A second double-tap while the action is in progress aborts it.

For NVDA and JAWS, the component behaves like a switch and change is triggered with a single <kbd>Space</kbd> key press.

For VoiceOver on macOS, the user is required to press and hold the <kbd>Space</kbd> key like without the screen reader.
This is announced as aria description, so the user knows how to interact with the component.

All state changes are announced by the screen reader.

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbToggleSlide<T>`.

```html
<sbb-toggle-slide .value=${{value: 'value', name: 'name'}} name="name">Toggle Slide</sbb-toggle-slide>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbToggleSlideActivationLabelElement`, `sbb-toggle-slide-activation-label`

#### Slots

| Name | Description                                                                          |
| ---- | ------------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add text content to the `sbb-toggle-slide-activation-label`. |

### class: `SbbToggleSlideDeactivationLabelElement`, `sbb-toggle-slide-deactivation-label`

#### Slots

| Name | Description                                                                            |
| ---- | -------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add text content to the `sbb-toggle-slide-deactivation-label`. |

### class: `SbbToggleSlideElement`, `sbb-toggle-slide`

#### Properties

| Name                | Attribute  | Privacy | Type                        | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ---------- | ------- | --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checked`           | `checked`  | public  | `boolean`                   | `false`      | Whether the checkbox is checked.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `disabled`          | `disabled` | public  | `boolean`                   | `false`      | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `form`              | -          | public  | `HTMLFormElement \| null`   |              | Returns the form owner of this element.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `name`              | `name`     | public  | `string`                    |              | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `required`          | `required` | public  | `boolean`                   | `false`      | Whether the component is required.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `size`              | `size`     | public  | `'s' \| 'm' \| 'l' \| null` | `null`       | Size variant, either s (lean theme default), m (standard theme default) or l.                                                                                                                                                                                                                                                                                                                                                                           |
| `type`              | -          | public  | `string`                    | `'checkbox'` | Form type of element.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `validationMessage` | -          | public  | `string`                    |              | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -          | public  | `ValidityState`             |              | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`             | `value`    | public  | `(T = string) \| null`      | `null`       | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `willValidate`      | -          | public  | `boolean`                   |              | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

#### Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

#### Events

| Name       | Type                          | Description                                                                                                                                                                                                                                                                                                        | Inherited From         |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `change`   | `Event`                       | The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.                                                                                                                                 |                        |
| `input`    | `InputEvent`                  | The input event fires when the value has been changed as a direct result of a user action.                                                                                                                                                                                                                         |                        |
| `validate` | `SbbToggleSlideValidateEvent` | An event that is dispatched when the user is about to change the checked state. The event is cancelable, so the consumer can prevent the state change by calling `preventDefault()`. For asynchronous validation, the consumer can call `preventDefaultConditionally()` with a promise that resolves to a boolean. |                        |
| `validity` | `Event`                       | The validity event is dispatched whenever the validity state of the element changes.                                                                                                                                                                                                                               | SbbFormAssociatedMixin |

#### Slots

| Name | Description                                                                                                           |
| ---- | --------------------------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to place `sbb-toggle-slide-activation-label` and `sbb-toggle-slide-deactivation-label` elements. |
