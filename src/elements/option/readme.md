### sbb-option-hint

The `sbb-option-hint` is a component used to show a hint message within a [sbb-autocomplete](/docs/elements-sbb-autocomplete--docs)
or a [sbb-select](/docs/elements-sbb-select--docs) component.

```html
<sbb-autocomplete>
  <sbb-option value="1"> Option 1 </sbb-option>
  ...
  <sbb-divider></sbb-divider>
  <sbb-option-hint>42 more hits</sbb-option-hint>
</sbb-autocomplete>
```

## Style

The `sbb-option-hint` has a `negative` property which will be automatically inherited from the parent `sbb-autocomplete | sbb-select`.

```html
<sbb-autocomplete>
  <sbb-option value="1">Option 1</sbb-option>
  ...
  <sbb-option-hint>42 more hits</sbb-option-hint>
</sbb-autocomplete>
```

## A11y

By default, the `sbb-option-hint` is treated as a simple text from screen readers, and it is not easily accessible by screen reader users.

If deemed necessary, the `sbb-option-hint` can be marked with the [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live) attribute.



### sbb-option

The `sbb-option` is a component which can be used to display items in components like
[sbb-autocomplete](/docs/elements-sbb-autocomplete--docs) or a [sbb-select](/docs/elements-sbb-select--docs).

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-option>Option label</sbb-option>

<sbb-option icon-name="info">Option label</sbb-option>
```

## States

Like the native `option`, the component has a `value` property.

The `selected` and `disabled` properties are connected to the self-named states.
When disabled, the selection via click is prevented.
If the `sbb-option` is nested in a `sbb-optgroup` component, it inherits from the parent the `disabled` state.

```html
<sbb-option value="value" selected>Option label</sbb-option>

<sbb-option value="value" disabled>Option label</sbb-option>
```

## Events

Consumers can listen to the `optionSelected` event on the `sbb-option` component to intercept the selected value;
the event is triggered if the element has been selected by some user interaction. Alternatively,
the `selectionChange` event can be listened to, which is triggered if the element has been both selected or deselected.

## Style

If the label slot contains only a **text node**, it is possible to search for text in the `sbb-option` using the
`highlight` method, passing the desired text; if the text is present it will be highlighted in bold.

```html
<!-- Supported scenario -->
<sbb-option> Highlightable caption</sbb-option>

<!-- Not supported scenarios -->
<sbb-option>
  <span>Not highlightable caption</span>
</sbb-option>

<sbb-option>
  <img src="..." />
  Highlightable caption
</sbb-option>
```

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbOption<T>`.

```html
<sbb-option .value=${{value: 'value', name: 'name'}}>Option</sbb-option>
```



### sbb-optgroup

The `sbb-optgroup` is a component used to group more [sbb-option](/docs/elements-sbb-option-sbb-option--docs)
within a [sbb-autocomplete](/docs/elements-sbb-autocomplete--docs)
or a [sbb-select](/docs/elements-sbb-select--docs) component.

A [sbb-divider](/docs/elements-sbb-divider--docs) is displayed at the bottom of the component.

## Slots

It is possible to provide a set of `sbb-option` via an unnamed slot;
the component has also a `label` property as name of the group.

```html
<sbb-optgroup label="Group">
  <sbb-option value="1" selected>1</sbb-option>
  <sbb-option value="2">2</sbb-option>
  <sbb-option value="3">3</sbb-option>
</sbb-optgroup>
```

## States

The component has a `disabled` property which sets all the `sbb-option` in the group as disabled.

```html
<sbb-optgroup label="Disabled group" disabled>
  <sbb-option value="A">A</sbb-option>
  <sbb-option value="B">B</sbb-option>
  <sbb-option value="C">C</sbb-option>
</sbb-optgroup>
```

