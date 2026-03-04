### sbb-paginator

The `sbb-paginator` is a component which provides navigation for content split across multiple pages,
e.g. a table with many rows.

It can be controlled via the following properties:

- `length`: the total number of items being paged;
- `pageSize`: the number of items per page (default: `10`);
- `pageIndex`: the index of the current displayed page (default: `0`).

```html
<sbb-paginator length="100" page-size="20"></sbb-paginator>
```

By default, a [sbb-mini-button-group](/docs/elements-sbb-button-sbb-mini-button-group--docs) with two buttons is displayed,
which allows moving to the previous/next pages.
The positioning of this element relative to the page numbers is set using the `pagerPosition` property (default: `start`):

```html
<sbb-paginator length="100" page-size="20" pager-position="end"></sbb-paginator>
```

Users have the possibility to dynamically change the page size using a dropdown menu;
to do this, consumers must add the `pageSizeOptions` property, which accepts an array of number
that are set as `sbb-option`'s values within a `sbb-select`.
Consumers must be consistent, so the defined `pageSize` must be an element of the `pageSizeOptions` array.
The dropdown menu and the previous / next buttons are facing each other with the page numbers always in the center.

```html
<sbb-paginator length="100" page-size="20" page-size-options="[10, 20, 50]"></sbb-paginator>
```

## States

The component can be disabled by using the `disabled` property.

```html
<sbb-paginator length="100" page-size="20" disabled></sbb-paginator>
```

## Style

The component has two `size`, named `s` and `m` (default).

```html
<sbb-paginator length="100" page-size="20" size="s"></sbb-paginator>
```

## Events

Consumers can listen to the `page` event on the `sbb-paginator` component to intercept the page change event.
The `event.detail` contains both the information about the `pageIndex` and the `previousPageIndex`,
as well as the `length` and the `pageSize`.

## Accessibility

The component has `role="group"` to semantically group its child controls;
consumers should add an appropriate `aria-label` attribute with a text
that describes the content controlled by the paginator.

```html
<sbb-paginator aria-label="Select page" length="100" page-size="20"></sbb-paginator>
```



### sbb-compact-paginator

The `sbb-compact-paginator` provides an alternative to the `sbb-paginator`
as a navigation for content split across multiple pages, e.g. a table with many rows.
Differently from the `sbb-paginator`, it displays only the current page and the total number of pages
together with the `sbb-mini-button-group` to move to previous or next page.

It can be controlled via the following properties:

- `length`: the total number of items being paged;
- `pageSize`: the number of items per page (default: `10`);
- `pageIndex`: the index of the current displayed page (default: `0`).

```html
<sbb-compact-paginator length="100" page-size="20"></sbb-compact-paginator>
```

By default, a [sbb-mini-button-group](/docs/elements-sbb-button-sbb-mini-button-group--docs) with two buttons is displayed,
which allows moving to the previous/next pages.
The positioning of this element relative to the page numbers is set using the `pagerPosition` property (default: `start`):

```html
<sbb-compact-paginator length="100" page-size="20" pager-position="end"></sbb-compact-paginator>
```

## States

The component can be disabled by using the `disabled` property.

```html
<sbb-compact-paginator length="100" page-size="20" disabled></sbb-compact-paginator>
```

## Style

The component has two `size`, named `s` and `m` (default).

```html
<sbb-compact-paginator length="100" page-size="20" size="s"></sbb-compact-paginator>
```

## Events

Consumers can listen to the `page` event on the `sbb-compact-paginator` component to intercept the page change event.
The `event.detail` contains both the information about the `pageIndex` and the `previousPageIndex`,
as well as the `length` and the `pageSize`.

## Accessibility

The component has `role="group"` to semantically group its child controls;
consumers should add an appropriate `aria-label` attribute with a text
that describes the content controlled by the paginator.

```html
<sbb-compact-paginator aria-label="Select page" length="100" page-size="20"></sbb-compact-paginator>
```

