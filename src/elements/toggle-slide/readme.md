<!-- keywords: form -->

The `<sbb-toggle-slide>` provides functionality similar to a native `<input type="checkbox" />`,
but requires the user to actively slide the button in order to change its state.
This deliberate interaction helps to prevent the state from being changed by accident,
which makes the component especially suitable for safety-relevant or hard-to-reverse actions
(e.g. confirming a check-in). Before activation or deactivation is finally confirmed,
the component dispatches a cancelable `validate` event, which allows consumers to prevent
or asynchronously confirm the state change.

```html
<sbb-toggle-slide aria-label="Journey check-in" name="check-in" value="checked-in">
  <sbb-toggle-slide-unchecked-label>To start pull right</sbb-toggle-slide-unchecked-label>
  <sbb-toggle-slide-checked-label>To stop pull left</sbb-toggle-slide-checked-label>
</sbb-toggle-slide>
```

## Slots

The two dedicated `<sbb-toggle-slide-unchecked-label>` and `<sbb-toggle-slide-checked-label>`
elements can be slotted into the unnamed slot to provide context-specific labels: the activation label
is displayed while the component is unchecked, and the deactivation label is displayed while the component is checked.

The slotted content is purely visual and is hidden from assistive technology.
Therefore, an accessible name must always be provided separately via `aria-label` or `aria-labelledby`
(see [Accessibility](#accessibility) below), regardless of what is slotted.

## States

The component can be displayed in `checked`, `disabled` or `readonly` states using the self-named properties.
Any programmatic change of the `checked` property immediately updates the visual position of the button,
even while the user is currently interacting with the component.

While the component is `readonly`, the user can no longer change its state.
A lock icon replaces the arrow or tick icon inside the button.
This is useful if a state change cannot be reverted.

```html
<sbb-toggle-slide readonly checked aria-label="Signal state">
  <sbb-toggle-slide-unchecked-label
    >To set signal to green pull right</sbb-toggle-slide-unchecked-label
  >
  <sbb-toggle-slide-checked-label>The signal is green!</sbb-toggle-slide-checked-label>
</sbb-toggle-slide>
```

A `readonly` state can also be set programmatically once a state change has been confirmed:

```ts
toggleSlide.addEventListener('change', () => {
  if (toggleSlide.checked) {
    toggleSlide.readOnly = true;
  }
});
```

Like a native checkbox, the component can be marked as `required`; while `required` and unchecked,
the component is `invalid` (see [Hint and error messages](#hint-and-error-messages) below).

## Style

The component has three different sizes (`s`, `m` and `l`), which can be changed using the `size` property.
If not set, the size defaults to `s` in the lean theme and to `m` in the standard theme.

```html
<sbb-toggle-slide size="l" aria-label="Confirm payment">
  <sbb-toggle-slide-unchecked-label>To confirm pull right</sbb-toggle-slide-unchecked-label>
</sbb-toggle-slide>
```

### Hint and error messages

As `<sbb-toggle-slide>` is not meant to be used inside a `<sbb-form-field>`,
the `sbb-form-information` CSS class can be applied to a wrapping element (e.g. a `<div>` or `<span>`)
to correctly arrange an `<sbb-hint>` and/or `<sbb-error>` below it, with the correct gap and indentation.
Only one of `<sbb-hint>` or `<sbb-error>` should be displayed at a time.
The `<sbb-error>` is typically toggled based on the component's validity (e.g. using the `validity`/`invalid` events or the
`validationMessage` property, see [setCustomValidity()](#setcustomvalidity) below).

For assistive technologies, the component's `aria-describedby` attribute should point to the ID of the hint or error message.

```html
<span class="sbb-form-information">
  <sbb-toggle-slide
    aria-label="Journey check-in"
    name="check-in"
    value="checked-in"
    aria-describedby="error"
  >
    <sbb-toggle-slide-unchecked-label>To start pull right</sbb-toggle-slide-unchecked-label>
    <sbb-toggle-slide-checked-label>To stop pull left</sbb-toggle-slide-checked-label>
  </sbb-toggle-slide>
  <sbb-error id="error">Backend check-in failed. Please try again.</sbb-error>
</span>
```

```html
<span class="sbb-form-information">
  <sbb-toggle-slide
    aria-label="Journey check-in"
    name="check-in"
    value="checked-in"
    aria-describedby="hint"
  >
    <sbb-toggle-slide-unchecked-label>To start pull right</sbb-toggle-slide-unchecked-label>
    <sbb-toggle-slide-checked-label>To stop pull left</sbb-toggle-slide-checked-label>
  </sbb-toggle-slide>
  <sbb-hint id="hint">Activate to start your journey.</sbb-hint>
</span>
```

For more details, see the [sbb-form-field documentation](/docs/elements-form-field--docs#standalone-hint--error-layout).

### Invalid state and custom validity

It is possible to set a custom validity for this component, similar to native form elements.
Use the `setCustomValidity(message: string)` method to set a custom error message as the state
and pass an empty string to reset the error state.
While a custom validity message is set, the component reflects the `invalid` state (e.g. showing the red border)
and `validationMessage` returns the provided message, which can be displayed via an `<sbb-error>` (see above).

```ts
const toggleSlide = document.querySelector('sbb-toggle-slide')!;
// Set error state/message
toggleSlide.setCustomValidity('Backend check-in failed. Please try again.');
// Remove error state/message
toggleSlide.setCustomValidity('');
```

## Interactions

The state of the component can only be changed with a deliberate interaction:

- **Slide**: the button can be dragged along the track; releasing it near the end of the track
  completes the state change, while releasing it before that point animates the button back to its
  original position. Note that only the button itself (not the surrounding track or labels) can be grabbed.
- **Press space**: pressing the <kbd>Space</kbd> key triggers the state change.

Unlike a native checkbox, a plain click or tap on the component does **not** change its state;
the state can only be changed via one of the deliberate interactions described above
(or their assistive technology equivalents described in [Screen reader usage](#screen-reader-usage) below).

Once a slide interaction is completed, the component dispatches a cancelable
`validate` event before actually changing the `checked` state (see [Events](#events) below).
This allows consumers to prevent or asynchronously confirm the state change,
e.g. to request a confirmation from a backend service.

### Confirmation dialog

For important scenarios (e.g. safety-relevant actions), a `<sbb-dialog>` can be linked via the
`confirmation-dialog` attribute (an id reference) or the `confirmationDialog` property.
When the user triggers the state change by keyboard or screen reader, the dialog is opened first
instead of changing the state directly. Sliding with a pointer is not affected, as it is already a deliberate interaction.

The dialog must contain a confirmation button that closes the dialog with a positive result
(`true` boolean or `'true'` string, e.g. `sbb-dialog-close="true"`). In this case, the state change is continued
and the `validate` event is dispatched as usual. Any other result (or dismissing the dialog) aborts the state change
and moves the focus back to the component.

```html
<sbb-toggle-slide
  confirmation-dialog="confirmation-dialog"
  aria-label="Should the signal become green?"
>
  <sbb-toggle-slide-unchecked-label
    >Pull right to set the signal to green</sbb-toggle-slide-unchecked-label
  >
  <sbb-toggle-slide-checked-label>The signal is green!</sbb-toggle-slide-checked-label>
</sbb-toggle-slide>
<sbb-dialog id="confirmation-dialog">
  <sbb-dialog-content id="confirmation"
    >Are you sure you want to set the signal to green?</sbb-dialog-content
  >
  <sbb-dialog-actions>
    <sbb-secondary-button
      sbb-dialog-close="false"
      sbb-focus-initial
      aria-describedby="confirmation"
    >
      Cancel
    </sbb-secondary-button>
    <sbb-button sbb-dialog-close="true" aria-describedby="confirmation">Confirm</sbb-button>
  </sbb-dialog-actions>
</sbb-dialog>
```

## Events

Consumers can listen to the native `change` event on the `<sbb-toggle-slide>` component to intercept the input's change;
the current state can be read from `event.target.checked` and the value from `event.target.value`.

The `validate` event is dispatched right before the `checked` state actually changes, once the user
has completed a slide interaction.
The event is cancelable, so consumers can call `preventDefault()` to synchronously reject the state change.
For asynchronous validation (e.g. waiting for a backend call), consumers can call
`preventDefaultConditionally()` with a `Promise<boolean>`;
while the promise is pending, the component displays a loading state,
and if the promise resolves to `false` or rejects, the state change is reverted.
Without any handling of the `validate` event, the state change is always immediately applied.

A programmatic change of `checked` (e.g. by a form reset) always takes precedence:
any ongoing slide, keyboard activation, open confirmation dialog or pending validation is aborted
and its result is ignored.

```ts
toggleSlide.addEventListener('validate', (event: SbbToggleSlideValidateEvent) => {
  event.preventDefaultConditionally(fetch('/api/confirm-check-in').then((response) => response.ok));
});
```

## Keyboard interaction

| Keyboard                          | Action                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Space</kbd> (press and hold) | Starts the sliding animation towards the opposite state. <br/>As soon as the end is reached, the activation is committed. |
| <kbd>Space</kbd> (release)        | Confirms the state change if the animation has completed; otherwise aborts it.                                            |

## Accessibility

The component has the role `switch` and reflects its state via `aria-checked`,
so it is announced by assistive technology in the same way as a native switch control.

### Screen reader usage

It's mandatory to provide an accessible name for the component, either via `aria-label` or `aria-labelledby`,
since the slotted labels are not exposed to assistive technology (see [Slots](#slots) above).

When using a screen reader on a touch device (e.g. VoiceOver on iOS or TalkBack), the state can be
changed with a double-tap gesture instead of sliding, like for a native switch.

For NVDA and JAWS on Windows, activating the component (e.g. via <kbd>Space</kbd> or
<kbd>Enter</kbd>) synthesizes a click event, which is handled the same way as the
double-tap gesture above and initiates the state change.

If a [confirmation dialog](#confirmation-dialog) is linked, it is opened before the state is changed.

The state is exposed via `aria-checked`. While the `validate` event is pending, the component
is marked as busy via `aria-busy`. A pending asynchronous validation and a failed validation are
announced by a live region.

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbToggleSlide<T>`.

```html
<sbb-toggle-slide .value=${{value: 'value', name: 'name'}} name="name" aria-label="Complex value">
  <sbb-toggle-slide-unchecked-label>To activate pull right</sbb-toggle-slide-unchecked-label>
  <sbb-toggle-slide-checked-label>To deactivate pull left</sbb-toggle-slide-checked-label>
</sbb-toggle-slide>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbToggleSlideCheckedLabelElement`, `sbb-toggle-slide-checked-label`

#### Slots

| Name | Description                                                                       |
| ---- | --------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add text content to the `sbb-toggle-slide-checked-label`. |

### class: `SbbToggleSlideElement`, `sbb-toggle-slide`

#### Properties

| Name                 | Attribute             | Privacy | Type                        | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | --------------------- | ------- | --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checked`            | `checked`             | public  | `boolean`                   | `false`      | Whether the checkbox is checked.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `confirmationDialog` | `confirmation-dialog` | public  | `SbbDialogElement \| null`  | `null`       | Optional dialog that is opened when the user tries to change the checked state by keyboard or screen reader. In order to activate the state, the dialog should contain a confirmation button that closes the dialog with a positive result (true boolean or 'true' string). The dialog is strongly recommended for important scenarios, e.g. safety relevant. For attribute usage, provide an id reference.                                             |
| `disabled`           | `disabled`            | public  | `boolean`                   | `false`      | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `form`               | -                     | public  | `HTMLFormElement \| null`   |              | Returns the form owner of this element.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `name`               | `name`                | public  | `string`                    |              | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `readOnly`           | `readonly`            | public  | `boolean`                   | `false`      | Whether the component is readonly.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `required`           | `required`            | public  | `boolean`                   | `false`      | Whether the component is required.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `size`               | `size`                | public  | `'s' \| 'm' \| 'l' \| null` | `null`       | Size variant, either s (lean theme default), m (standard theme default) or l.                                                                                                                                                                                                                                                                                                                                                                           |
| `type`               | -                     | public  | `string`                    | `'checkbox'` | Form type of element.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `validationMessage`  | -                     | public  | `string`                    |              | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`           | -                     | public  | `ValidityState`             |              | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`              | `value`               | public  | `(T = string) \| null`      | `null`       | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `willValidate`       | -                     | public  | `boolean`                   |              | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

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

| Name | Description                                                                                                     |
| ---- | --------------------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to place `sbb-toggle-slide-unchecked-label` and `sbb-toggle-slide-checked-label` elements. |

### class: `SbbToggleSlideUncheckedLabelElement`, `sbb-toggle-slide-unchecked-label`

#### Slots

| Name | Description                                                                         |
| ---- | ----------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add text content to the `sbb-toggle-slide-unchecked-label`. |
