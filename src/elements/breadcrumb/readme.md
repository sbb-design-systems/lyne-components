The `sbb-breadcrumb` and `sbb-breadcrumb-group` components are meant to represent the hierarchy of visited pages before arriving to the current one.

The `sbb-breadcrumb` is equivalent to a native [anchor (a)](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a) element.

```html
<sbb-breadcrumb-group aria-label="You are here:">
  <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
  <sbb-breadcrumb href="/work-with-us"> Work with us </sbb-breadcrumb>
  <sbb-breadcrumb href="/apply" target="_blank"> Apply </sbb-breadcrumb>
</sbb-breadcrumb-group>
```

## Slots

For the `sbb-breadcrumb` it is possible to provide a text via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.
Text and icon are not exclusive and can be used together.

```html
<sbb-breadcrumb href="/contact">Contact us</sbb-breadcrumb>

<sbb-breadcrumb href="/book-your-trip" icon-name="travel-backpack-medium"></sbb-breadcrumb>

<sbb-breadcrumb href="/info">
  Info
  <sbb-icon slot="icon" name="circle-information-small"></sbb-icon>
</sbb-breadcrumb>
```

## Link properties

It's possible to set all the link related properties (`download`, `href`, `rel` and `target`).

```html
<sbb-breadcrumb href="/info" target="_blank" rel="help">Info</sbb-breadcrumb>
```

## Style

If the width of all the nested `sbb-breadcrumb` exceeds the container width,
only the first and the last breadcrumb are displayed, and a new one with the ellipsis symbol appears between them.
Clicking on this `sbb-breadcrumb` will make the ellipsis disappear and will restore the full list
(the action is not reversible).

## Accessibility

<!-- TODO: Superfluous -->

The `accessibility-current` property should be used to make the breadcrumb read correctly by screen-readers when the component
is used in the `sbb-breadcrumb-group`.

By default, the `sbb-breadcrumb-group` component sets `accessibility-current="page"` on the last slotted `sbb-breadcrumb`.

It is strongly recommended to place an `aria-label` attribute on the `sbb-breadcrumb-group`, as in the example above,
to describe what context the breadcrumbs have.
Whenever the `sbb-breadcrumb` list within the component is loaded or updated,
the last element of the list receives the attribute `accessibility-current="page"`.
