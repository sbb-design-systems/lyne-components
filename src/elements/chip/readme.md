The `sbb-chip-group` component is a container for one or multiple
`sbb-chip` instances.
Generally, it is used in combination with an `sbb-form-field` to allow the input of multiple string values.

The `value` property reflects the list of slotted chips. Adding or removing an `sbb-chip` updates the value property, and vice versa.

```html
<sbb-form-field>
  <label>Field label</label>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input />
  </sbb-chip-group>
</sbb-form-field>
```

The display value of an `sbb-chip` is either its content or the value
of the `value` property.

## States

The `sbb-chip-group` has a `disabled` and a `readonly` state and reacts to the respective `input` properties.
The `disabled`/`readonly` properties are proxied to the slotted `sbb-chip`s.

```html
<sbb-form-field>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input disabled />
    <!-- Or -->
    <input readonly />
  </sbb-chip-group>
</sbb-form-field>
```

## Style

The `sbb-chip-group` has a `negative` variant. If within an `sbb-form-field`, the properties automatically sync.

```html
<sbb-form-field negative>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input />
  </sbb-chip-group>
</sbb-form-field>
```

## Usage

By default, when the user presses `Enter`, the `sbb-chip-group` will create a new `sbb-chip` and add it to the slotted elements.

Consumers can customize or prevent this behavior by listening to the `chipinputtokenend` event.

```html
<!-- Preventing the event will stop the chip-group from converting the input value into a chip -->
<sbb-chip-group name="field-name" @chipinputtokenend="${(ev: Event) => ev.preventDefault()}">
  ...
  <input />
</sbb-chip-group>
```

```html
<!-- Use the event.detail object to override the default behavior -->
<sbb-chip-group
  name="field-name"
  @chipinputtokenend=${(ev: CustomEvent<SbbChipInputTokenEndEventDetails>) => {
    ev.detail.setValue(transformedValue);
    ev.detail.setLabel('Custom label');
  }}>
  ...
  <input />
</sbb-chip-group>
```

### Use within forms

The `sbb-chip-group` is a form-associated element that can be part of a form. Its value is an array of strings.

**Note:** The `name` must be set on the `sbb-chip-group`, not on the `input`

```html
<form>
  <sbb-form-field>
    <sbb-chip-group name="field-name">
      <sbb-chip value="Value 1"></sbb-chip>
      ...
      <input />
    </sbb-chip-group>
  </sbb-form-field>
</form>
```

### Use with Autocomplete

It is possible to combine the functionalities of `chip-group` and the [sbb-autocomplete](/docs/elements-sbb-autocomplete--docs).

In this scenario, selecting an option will create a new chip using the option value.

```html
<sbb-form-field>
  <sbb-chip-group name="field-name">
    <sbb-chip value="Value 1"></sbb-chip>
    ...
    <input />
  </sbb-chip-group>
  <sbb-autocomplete>
    <sbb-option value="Option A">Option A</sbb-option>
    ...
  </sbb-autocomplete>
</sbb-form-field>
```

### Custom 'separator-keys'

By default, the `sbb-chip-group` creates a new chip on `Enter` key press.

Consumers can customize the array of [keys](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values#special_values) that will trigger the chip creation by using the `separatorKeys` property.

```html
<sbb-chip-group name="field-name" separator-keys='["Enter", "Space"]'> ... </sbb-chip-group>
```

### Add on blur

By default, the `sbb-chip-group` does not create a chip when the input loses focus.

Consumers can enable this behavior by setting the `addOnBlur` property to `true`.
When enabled, a chip will be automatically created from the input value when the input loses focus.

```html
<sbb-chip-group add-on-blur> ... </sbb-chip-group>
```

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbChipGroup<T>`.

To render the complex value, the `displayWith` function can be used to map
the value to a string represented in the created chips.

Please note that the parameter is the assigned value of the selected option which does not necessarily
align with the type information.

```html
<sbb-form-field>
  <label>Label</label>
  <sbb-chip-group
    name="chip-group-1"
    .displayWith=${(value) => value.property}
    .value=${[{property: 'Option 1', otherProp: 'test'}]}
  >
    <input placeholder="Placeholder" />
  </sbb-chip-group>
  <sbb-autocomplete>
    <sbb-option .value=${{property: 'Option 3', otherProp: 'test'}}>Option 3</sbb-option>
    <sbb-option .value=${{property: 'Option 4', otherProp: 'test'}}>Option 4</sbb-option>
  </sbb-autocomplete>
</sbb-form-field>
```

## Keyboard interaction

At any time, only a single chip (usually, the last one) is focusable and part of the tab order. Users can move between them using the arrow keys.

| Keyboard                    | Action                                                    |
| --------------------------- | --------------------------------------------------------- |
| <kbd>Enter</kbd>            | When the `input` is focused, add a new chip.              |
| <kbd>Backspace</kbd>        | When the `input` is empty & focused, focus the last chip. |
| <kbd>Backspace</kbd>        | When the `sbb-chip` is focused, delete it.                |
| <kbd>Left/Up Arrow</kbd>    | Move the next `sbb-chip`.                                 |
| <kbd>Right/Down Arrow</kbd> | Move the previous `sbb-chip`.                             |

## Accessibility

The `sbb-chip-group` follows the `grid` aria pattern.
