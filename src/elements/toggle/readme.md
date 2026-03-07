The `sbb-toggle` component is a wrapper for `sbb-toggle-option` elements
that can be selected by the user; it is useful for switching between views within the content.

```html
<sbb-toggle value="Value 1">
  <sbb-toggle-option value="Value 1" icon-name="arrow-right-small">Bern</sbb-toggle-option>
  <sbb-toggle-option value="Value 2" icon-name="arrows-right-left-small">Zürich</sbb-toggle-option>
</sbb-toggle>
```

## Configuration

### `sbb-toggle`

The `even` property can be used to let the component expand to the parent component or adapt to the label's width.

The component has two different sizes, `s` and `m` (default), which can be set using the `size` property.

```html
<sbb-toggle size="s" even> ... </sbb-toggle>
```

### `sbb-toggle-option`

It is possible to provide a label via an unnamed slot; the component can optionally display an `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
Text and icon are not exclusive and can be used together.

```html
<sbb-toggle-option value="Value" icon-name="app-icon-small"></sbb-toggle-option>

<sbb-toggle-option value="Value" icon-name="app-icon-small">Option</sbb-toggle-option>
```

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbToggle<T>`.

```ts
const values = [
  { value: 'value 1', name: 'Option 1' },
  { value: 'value 2', name: 'Option 2' },
];
```

```html
<sbb-toggle .value="${values[0]}" name="name">
  <sbb-toggle-option .value="${values[0]}">Option 1</sbb-toggle-option>
  <sbb-toggle-option .value="${values[1]}">Option 2</sbb-toggle-option>
</sbb-toggle>
```
