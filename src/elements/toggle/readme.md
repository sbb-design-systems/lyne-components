### sbb-toggle-option

The `sbb-toggle-option` component is used inside the
[sbb-toggle](/docs/elements-sbb-toggle-sbb-toggle--docs) in order to render the toggle's options.

```html
<sbb-toggle-option value="Value">Option</sbb-toggle-option>
```

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
Text and icon are not exclusive and can be used together.

```html
<sbb-toggle-option value="Value" icon-name="app-icon-small"></sbb-toggle-option>

<sbb-toggle-option value="Value" icon-name="app-icon-small">Option</sbb-toggle-option>
```

## States

The component can be displayed in `checked` or `disabled` states using the self-named properties.

```html
<sbb-toggle-option value="Value" checked>Option</sbb-toggle-option>

<sbb-toggle-option value="Value" disabled>Option</sbb-toggle-option>
```



### sbb-toggle

The `sbb-toggle` component is a wrapper for a couple of [sbb-toggle-option](/docs/elements-sbb-toggle-sbb-toggle-option--docs)s
that can be selected by the user; it is useful for switching between views within the content.

Their behavior is similar to [sbb-tab-group](/docs/elements-sbb-tab-sbb-tab-group--docs)
or [sbb-radio-button-group](/docs/elements-sbb-radio-button-sbb-radio-button-group--docs),
where selecting an option deselects the previously selected one.

```html
<sbb-toggle value="Value 1">
  <sbb-toggle-option value="Value 1">Bern</sbb-toggle-option>
  <sbb-toggle-option value="Value 2">Zürich</sbb-toggle-option>
</sbb-toggle>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-toggle disabled> ... </sbb-toggle>
```

## Style

The `even` property can be used to let the component expand to the parent component or adapt to the label's width.

The component has two different sizes, `s` and `m` (default), which can be set using the `size` property.

```html
<sbb-toggle size="s" even> ... </sbb-toggle>
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

