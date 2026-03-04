### sbb-expansion-panel-header

The `sbb-expansion-panel-header` is a component which is meant to be used as a header
in the [sbb-expansion-panel](/docs/elements-sbb-accordion-sbb-expansion-panel--docs),
acting as a control for an expanding / collapsing content, like a native `<summary>` tag.

```html
<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
```

## Slots

The component is internally rendered as a button, and it is possible to provide text via an unnamed slot.
On the left side, a toggle icon is displayed; it flips based on the host's `aria-expanded` property.

The component can optionally display a `sbb-icon` at the component start using the `iconName`
property or via custom content using the `icon` slot.
If using the SBB icons, the icon should be a medium size icon.

```html
<sbb-expansion-panel-header icon-name="swisspass-medium">Header</sbb-expansion-panel-header>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-expansion-panel-header disabled>Header</sbb-expansion-panel-header>
```

## Events

When the element is clicked, the `toggleexpanded` event is emitted.



### sbb-expansion-panel-content

The `sbb-expansion-panel-content` is a component which acts as a container for any element
that needs to be displayed in a [sbb-expansion-panel](/docs/elements-sbb-accordion-sbb-expansion-panel--docs).

```html
<sbb-expansion-panel-content>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <p>
    <span> Donec porttitor blandit odio, ut blandit libero cursus vel. </span>
    <span>
      Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur malesuada, nibh ac blandit
      vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac justo.
    </span>
  </p>
</sbb-expansion-panel-content>
```

## Style

When it's used in combination with a `sbb-expansion-panel-header` with an icon displayed via slot or `iconName` property,
the `sbb-expansion-panel-content` receives a padding on the left side in order to align it with the header label.



### sbb-expansion-panel

The `sbb-expansion-panel` is a component which acts as an expandable summary-details widget.

It can be used standalone or inside a [sbb-accordion](/docs/elements-sbb-accordion-sbb-accordion--docs).

## Slots

In order to correctly display the component, it must be used together with
a [sbb-expansion-panel-header](/docs/elements-sbb-accordion-sbb-expansion-panel-header--docs)
and a [sbb-expansion-panel-content](/docs/elements-sbb-accordion-sbb-expansion-panel-content--docs);
the first will work as a state controller, the last will act as the expandable content.

These two components automatically fill the two available slots, named `header` and `content`.

```html
<sbb-expansion-panel>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

## States

The visibility of the content is controlled by the value of the `expanded` property.

```html
<sbb-expansion-panel expanded> ... </sbb-expansion-panel>
```

The `disabled` state can be set using the self-named variable. In this state, the component can not be collapsed or expanded.

```html
<sbb-expansion-panel disabled> ... </sbb-expansion-panel>
```

## Style

The component has two background options (`milk` and `white`, which is the default) that can be set using the `color` variable.

```html
<sbb-expansion-panel color="milk"> ... </sbb-expansion-panel>
```

The component has two different sizes, `l` (default) and `s`, which can be changed using the `size` property.
The property is overridden when the component is used within a `sbb-accordion`.

```html
<sbb-expansion-panel size="s"> ... </sbb-expansion-panel>
```

It's also possible to display the `sbb-expansion-panel` without border by setting the `borderless` variable.

```html
<sbb-expansion-panel borderless> ... </sbb-expansion-panel>
```

Using the `titleLevel` variable, it's possible to wrap the `sbb-expansion-panel-header` in a heading tag;
if it's unset, a `<div>` is used as a wrapper.

```html
<sbb-expansion-panel level="4">
  <sbb-expansion-panel-header
    >This is the header, and it will be wrapped in a h4 tag.</sbb-expansion-panel-header
  >
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

## Accessibility

When the `sbb-expansion-panel-header` and the `sbb-expansion-panel-content` are slotted into the component,
they both receive an `id`, if not set; then, the content's `id` is set as `aria-controls` attribute of the header,
and the header's `id` is set as `aria-labelledby` attribute on the content.

The `expanded` attribute is used to correctly set the `aria-expanded` attribute on the header
and the `aria-hidden` attribute on the content.

### Disabled elements

Generally speaking, `disabled` elements are considered a bad pattern for accessibility. They are invisible to assistive
technology and do not provide the reason for which they are disabled.
To partially address the problem, disabled elements are kept focusable (other interactions are still prevented).
However, it is still the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

