Tags categorize large amounts of information and filter content through user selection.

The `sbb-tag-group` is a container for one or more `sbb-tag` components.
Each `sbb-tag` must have a `value` property.

```html
<sbb-tag-group>
  <sbb-tag value="all">All</sbb-tag>
  <sbb-tag value="phones" amount="23">Phones</sbb-tag>
  <sbb-tag value="computer" amount="3">Computer</sbb-tag>
  <sbb-tag value="laptop" amount="99">Laptop</sbb-tag>
</sbb-tag-group>
```

## Style

The `size` property on `sbb-tag-group` (values: `m`, `s`) is applied to all contained `sbb-tag` elements.

```html
<sbb-tag-group size="m">
  <sbb-tag value="all">All</sbb-tag>
  <sbb-tag value="phones">Phones</sbb-tag>
  <sbb-tag value="computer">Computer</sbb-tag>
</sbb-tag-group>

<sbb-tag-group size="s">
  <sbb-tag value="all">All</sbb-tag>
  <sbb-tag value="phones">Phones</sbb-tag>
  <sbb-tag value="computer">Computer</sbb-tag>
</sbb-tag-group>
```

## Interactions

### Exclusive selection vs. multiple selection

By default, `sbb-tag-group` behaves like a radio button group: only one tag can be selected at a time.
The `value` of the `sbb-tag-group` reflects the `value` of the selected `sbb-tag`.

Set the `multiple` property to allow multiple selections (checkbox behavior).
In this mode, the `value` is an array containing all selected tag values.

```html
<sbb-tag-group multiple>
  <sbb-tag value="all">All</sbb-tag>
  <sbb-tag value="phones" checked>Phones</sbb-tag>
  <sbb-tag value="computer" checked>Computer</sbb-tag>
  <sbb-tag value="laptop">Laptop</sbb-tag>
</sbb-tag-group>
```

**Note:** Changing the `multiple` property at runtime is not supported. Set this property during initialization.

### Advanced usage: multiple and exclusive mixed

```ts
const uncheckAllTag = () => {
  document.getElementById('all').removeAttribute('checked');
};

const uncheckTags = () => {
  Array.from(document.querySelectorAll('sbb-tag'))
    .filter((e) => e.getAttribute('id') !== 'all' && !e.getAttribute('disabled'))
    .forEach((e) => e.removeAttribute('checked'));
};
```

```html
<sbb-tag-group aria-label="Select your desired device to filter it" multiple>
  <sbb-tag id="all" onchange="uncheckTags()" value="All" checked> All </sbb-tag>
  <sbb-tag value="phones" onchange="uncheckAllTag()">Phones</sbb-tag>
  <sbb-tag value="computer" onchange="uncheckAllTag()">Computer</sbb-tag>
  <sbb-tag value="laptop" onchange="uncheckAllTag()">Laptop</sbb-tag>
</sbb-tag-group>
```

## States

Tags support `checked` and `disabled` states. Set `disabled` on the `sbb-tag-group` to disable all contained tags.

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

It's also possible to display a numeric amount at the component's end using the `amount` property or slot.

```html
<sbb-tag value="All" icon-name="pie-small" amount="123"> All </sbb-tag>

<sbb-tag value="None">
  <sbb-icon slot="icon" name="pie-small"></sbb-icon>
  None
  <span slot="amount">123</span>
</sbb-tag>
```

## Complex Values

The `sbb-tag` element supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbTag<T>`.

```html
<sbb-tag .value=${{value: 'value', name: 'name'}} name="name">Option</sbb-tag>
```

## Events

Consumers can listen to the native `change` and `input` events on the `sbb-tag`.
The current state can be read from `event.target.checked`, while the value from `event.target.value`.
It's recommended to check the parent's `sbb-tag-group` for the value.

## Accessibility

The `sbb-tag` imitates a `button` element to provide an accessible experience.
The state is reflected via `aria-pressed` attribute.

The property `listAccessibilityLabel` on the `sbb-tag-group` is forwarded as `aria-label` to the
inner list that the component uses to display the tags,
to use the implicit `role="list"` of the `ul`.

If the `listAccessibilityLabel` property is not defined, the `sbb-tag-group` surrounding the buttons applies `role="group"`
to convey the association between the individual `sbb-tag`s.

When using the `role="group"`, each `sbb-tag-group` element should be given a label with `aria-label` or `aria-labelledby`,
that communicates the collective meaning of all `sbb-tag`s.

```html
<sbb-tag-group aria-label="Select your desired font styles to filter it">
  <sbb-tag value="all" checked>All</sbb-tag>
  <sbb-tag value="phones">Bold</sbb-tag>
  <sbb-tag value="computer">Italic</sbb-tag>
  <sbb-tag value="laptop">Underline</sbb-tag>
</sbb-tag-group>
```
