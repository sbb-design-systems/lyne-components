### sbb-tag-group

The `sbb-tag-group` component is used as a container for one or multiple `sbb-tag` components,
which are projected inside the unnamed slot.

To work properly, it's mandatory to provide a value to each `sbb-tag`.
See [its documentation](/docs/elements-sbb-tag-sbb-tag--docs) for more details.

```html
<sbb-tag-group>
  <sbb-tag value="all">All</sbb-tag>
  <sbb-tag value="phones">Phones</sbb-tag>
  <sbb-tag value="computer">Computer</sbb-tag>
  <sbb-tag value="laptop">Laptop</sbb-tag>
</sbb-tag-group>
```

## Style

The component has a `size` property which can be used to change the size of all the inner `sbb-tag`.
Two values are available, `s` and `m`, which is the default.

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

By default, `sbb-tag-group` acts like a radio-button group: only one item can be selected.
In this mode, the value of the `sbb-tag-group` will reflect the value of the selected `sbb-tag`.

Setting `multiple` property to `true` allows multiple items to be selected (checkbox behavior).
In this mode the value of the `sbb-tag-group` is an array containing all values of the selected `sbb-tag` items.

```html
<sbb-tag-group multiple>
  <sbb-tag value="all">All</sbb-tag>
  <sbb-tag value="phones" checked>Phones</sbb-tag>
  <sbb-tag value="computer" checked>Computer</sbb-tag>
  <sbb-tag value="laptop">Laptop</sbb-tag>
</sbb-tag-group>
```

### Changing multiple property during run time

There is no support for changing multiple mode during run time (e.g., update value automatically).
So this flag should be provided at component's instantiation time.

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

The component can disable all slotted `sbb-tag`s by setting the `disabled` property to `true`.

## Accessibility

The property `listAccessibilityLabel` is forwarded as `aria-label` to the inner list that the component uses to display the tags,
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



### sbb-tag

The `sbb-tag` is a component that can be used as a filter in order to categorize a large amount of information.
It's intended to be used inside the [sbb-tag-group](/docs/elements-sbb-tag-sbb-tag-group--docs) component.

```html
<sbb-tag value="All">All</sbb-tag>
```

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

## States

The component can be displayed in `checked` or `disabled` state using the self-named property.

```html
<sbb-tag checked value="All" amount="123">All</sbb-tag>

<sbb-tag disabled value="All" icon-name="circle-information-small">All</sbb-tag>
```

## Style

The component has two sizes, named `m` (default) and `s`. The `size` property can also be set on the `sbb-tag-group` where it will be applied to all tags inside the group.

```html
<sbb-tag value="All" size="m">All</sbb-tag>

<sbb-tag value="All" size="s">All</sbb-tag>
```

## Events

Consumers can listen to the native `change` and `input` events on the `sbb-tag`.
The current state can be read from `event.target.checked`, while the value from `event.target.value`.
It's recommended to check the parent's `sbb-tag-group` for the value.

## Accessibility

The component imitates an `button` element to provide an accessible experience.
The state is reflected via `aria-pressed` attribute.

### Interactive disabled buttons

Native disabled elements cannot receive focus and do not dispatch any events. This can
be problematic in some cases because it can prevent the app from telling the user why the button is
disabled. Consumers can use the `disabledInteractive` property to style the button as disabled but allow for
it to receive focus and dispatch events. The button will have `aria-disabled="true"` for assistive
technology. It is the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

**Note:** Using the `disabledInteractive` property can result in buttons that previously prevented
actions to no longer do so, for example a submit button in a form. When using this input, you should
guard against such cases in your component.

### Disabled elements

Generally speaking, `disabled` elements are considered a bad pattern for accessibility. They are invisible to assistive
technology and do not provide the reason for which they are disabled.
To partially address the problem, disabled elements are kept focusable (other interactions are still prevented).
However, it is still the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbTag<T>`.

```html
<sbb-tag .value=${{value: 'value', name: 'name'}} name="name">Option</sbb-tag>
```

