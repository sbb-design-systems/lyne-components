The `sbb-form-field` component is intended to be used as a form input wrapper with label and errors.

```html
<sbb-form-field>
  <label>Example</label>
  <input />
</sbb-form-field>

<sbb-form-field>
  <label>Example</label>
  <input required />
  <sbb-error>This field is required!</sbb-error>
</sbb-form-field>
```

In this document, "form field" refers to the wrapper component `sbb-form-field` and
"form field control" refers to the component that the `sbb-form-field` is wrapping
(e.g., the input, select, etc.)

The following components are designed to work inside a `sbb-form-field`:

- `<input>`
- `<select>`
- `<textarea>`
- [sbb-datepicker](/docs/elements-sbb-datepicker-sbb-datepicker--docs) and its associated components
- [sbb-select](/docs/elements-sbb-select--docs)
- [sbb-slider](/docs/elements-sbb-slider--docs)
- [sbb-time-input](/docs/elements-sbb-time-input--docs)
- [sbb-autocomplete](/docs/elements-sbb-autocomplete--docs)

## Slots

### Label

Use a `<label>` element to provide a label for a form input. The
`sbb-form-field` will automatically configure the reference between label and input.

It's possible to use the `floatingLabel` property to display the label inside the input.
When using it and setting the value programmatically to empty or from empty to a specific value,
it's mandatory to call the `reset()` method of the `sbb-form-field` to update the state of the floating label.

```html
<sbb-form-field>
  <label>Example</label>
  <input />
</sbb-form-field>
```

### Error messages

Error messages can be shown under the form field by adding `sbb-error` elements inside the form field.
The component will automatically assign them to the `slot='error'`.

```html
<sbb-form-field floating-label>
  <label>Example</label>
  <input required />
  <sbb-error>This field is required!</sbb-error>
</sbb-form-field>
```

In order to avoid the layout from "jumping" when an error is shown, the option of setting `error-space="reserve"`
on the `sbb-form-field` will reserve space for a single line of an error message.

It is also possible to provide a custom icon to the `sbb-error` component via the icon slot:

```html
<sbb-error>
  <sbb-icon name="pie-small" slot="icon"></sbb-icon>
  This is a required field.
</sbb-error>
```

### Prefix & Suffix

It is possible to add content as a prefix or suffix in a `sbb-form-field`.
This can be done via the `prefix` and `suffix` slots.

```html
<sbb-form-field>
  <label>Example</label>
  <sbb-icon slot="prefix" name="pie-small"></sbb-icon>
  <input />
  <sbb-icon slot="suffix" name="circle-information-small"></sbb-icon>
</sbb-form-field>
```

It's also possible to slot an icon-only button using the [sbb-mini-button](/docs/elements-sbb-button-sbb-mini-button--docs).
Please note that only this component is correctly supported when slotting buttons in `negative` mode.

```html
<sbb-form-field>
  <label>Example</label>
  <input />
  <sbb-mini-button slot="suffix" icon-name="pen-small"></sbb-mini-button>
</sbb-form-field>
```

Some components, like the [sbb-form-field-clear](/docs/elements-sbb-form-field-sbb-form-field-clear--docs) or the
[sbb-slider](/docs/elements-sbb-slider--docs), when used within the form field, will automatically occupy
one or both of these slots.
Please refer to their documentation for more details.

### Clear Button

The `sbb-form-field-clear` component can be used to provide the possibility to display a button
which can clear the input value.

```html
<sbb-form-field>
  <label>Label</label>
  <input type="text" placeholder="Input placeholder" value="Input value" />
  <sbb-form-field-clear></sbb-form-field-clear>
</sbb-form-field>
```

**Note:** it currently works with simple inputs and does not support, for example, `select` inputs.

## Style

The component has a `size` property, which accepts three different values: `s`, `m` (default) and `l`.

```html
<sbb-form-field size="s">
  <label>Example</label>
  <input />
</sbb-form-field>

<sbb-form-field size="l">
  <label>Example</label>
  <input required />
  <sbb-error>This field is required!</sbb-error>
</sbb-form-field>
```

By default, the component has a defined width and min-width. However, this behavior can be overridden by setting
the `width` property to `collapse`: in this way the component adapts its width to the inner slotted input component.
This is useful, for example, for the [sbb-time-input](/docs/elements-sbb-time-input--docs) component.
However, as the width-styles are exposed to the host,
it's possible to apply any desired width by setting just the `width` and `min-width` CSS properties.

```html
<sbb-form-field width="collapse">
  <sbb-time-input value="13:30"></sbb-time-input>
</sbb-form-field>
```

### Reflected state from input

The form field reflects certain states as custom states. This includes `focus`, `disabled`,
`readonly`, `empty`, `has-error`, `has-popup-open` and `input-type-{tag name of the input}`.

This can be targeted via CSS via the `:state()` pseudo-class:

```css
sbb-form-field:state(disabled) {
  // Additional rules to apply when the input of the form field is disabled
}
```

### Error state

The form field is displayed in an error state when an input element has been interacted with
and is in an error state. This checks both for the native validity state (which can be set
on `<input>`, `<select>` and `<textarea>` via validation attributes like `required` or
via the `setCustomValidity(message)` method) and for the Angular Forms state classes.

If you want to manually set the error state, you can add the `sbb-invalid` CSS class
to the input element.

If you want to directly show the error state without having had an interaction, you can use the
`sbb-show-errors` class on an ancestor (e.g. `<form>`).

## Custom form control

The form field looks for native form controls (i.e. `<input>`, `<select>`
or `<textarea>`) or form associated custom elements. If nothing matches,
it assumes the first slotted element is the form control (excluding
`<label>` and elements with a `slot="*"` attribute).

Once connected, the form field primarily observes the attributes `readonly`,
`disabled`, `form`, `class` and listens to the `input` and `invalid` event
on the connected form control to update the internal state accordingly.

If you want to use a custom form control that does not follow that convention
(e.g. Angular), you need to provide an integration layer, which is defined
as the `SbbFormFieldElementControl` interface.

To initially connect the custom form control and to update the state, whenever
one of the property of the interface changes, the `SbbFormFieldControlEvent`
needs to be dispatched on the `<sbb-form-field>` instance.

### Angular

In `@sbb-esta/lyne-angular` we have an adaption layer to easily define a custom form control.
Please consume the documentation of `@sbb-esta/lyne-angular` for an example.

### Example

If you are using another framework, or you are using an existing library
that you need to connect, you can write the integration yourself.

```ts
import {
  SbbFormFieldElementControl,
  SbbFormFieldControlEvent,
} from '@sbb-esta/lyne-elements/form-field.js';

const formField = document.getElementsByTagName('sbb-form-field')[0];
const myControl = document.getElementsByTagName('my-form-control')[0];

function onFormControlChange(): void {
  formField.dispatchEvent(
    new SbbFormFieldControlEvent({
      id: myControl.id,
      disabled: myControl.disabled,
      empty: myControl.isEmpty,
      readOnly: myControl.readOnly,
      onContainerClick: (): void => myControl.focus(),
    }),
  );
}

myControl.addEventListener('custom-change-event', onFormControlChange);
```

## Accessibility

By itself, the `sbb-form-field` does not apply any additional accessibility treatment to a form
element. However, several of the form field's optional features interact with the form element
contained within the form field.

When you provide a label, the `sbb-form-field` automatically
associates this label with the form element using the `for`
attribute to reference the control's ID.
When using a non-native form element, the `aria-labelledby` is used to connect the
form element with the label, by setting an id on the label and referencing this id in the
`aria-labelledby` attribute placed on the form element.
Please note that only one `<label>` element is supported. Additionally, if you place the `<label>`
element outside the `sbb-form-field`, the automatic assignment is skipped, and it is up to the
consumer to use the correct id references.
If you like to visually hide a label, but still present it with screen readers, use the `hiddenLabel` property.

When you provide informational text via `sbb-error`, it automatically adds these elements' IDs
to the form element's `ariaErrorMessageElements` property (or `aria-errormessage` attribute as fallback).
