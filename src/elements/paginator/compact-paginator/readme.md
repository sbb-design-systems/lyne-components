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

<!-- Auto Generated Below -->

## Properties

| Name                             | Attribute                           | Privacy | Type               | Default            | Description                                                                                                                                         |
| -------------------------------- | ----------------------------------- | ------- | ------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityNextPageLabel`     | `accessibility-next-page-label`     | public  | `string`           | `''`               | Accessibility label for the next page. Defaults to `next page`. Can be set for cases like a carousel, where `slide` or `image` fits better.         |
| `accessibilityPageLabel`         | `accessibility-page-label`          | public  | `string`           | `''`               | Accessibility label for the page. Defaults to `page`. Can be set for cases like a carousel, where `slide` or `image` fits better.                   |
| `accessibilityPreviousPageLabel` | `accessibility-previous-page-label` | public  | `string`           | `''`               | Accessibility label for the previous page. Defaults to `previous page`. Can be set for cases like a carousel, where `slide` or `image` fits better. |
| `disabled`                       | `disabled`                          | public  | `boolean`          | `false`            | Whether the component is disabled.                                                                                                                  |
| `length`                         | `length`                            | public  | `number`           | `0`                | Total number of items.                                                                                                                              |
| `negative`                       | `negative`                          | public  | `boolean`          | `false`            | Negative coloring variant flag.                                                                                                                     |
| `pageIndex`                      | `page-index`                        | public  | `number`           | `0`                | Current page index.                                                                                                                                 |
| `pagerPosition`                  | `pager-position`                    | public  | `'start' \| 'end'` | `'start'`          | Position of the prev/next buttons.                                                                                                                  |
| `pageSize`                       | `page-size`                         | public  | `number`           | `10`               | Number of items per page.                                                                                                                           |
| `size`                           | `size`                              | public  | `'m' \| 's'`       | `'m' / 's' (lean)` | Size variant, either m or s.                                                                                                                        |

## Methods

| Name              | Privacy | Description                                                                                                                                                       | Parameters      | Return    | Inherited From                 |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------- | ------------------------------ |
| `firstPage`       | public  | Move to the first page if not already there.                                                                                                                      |                 | `void`    | SbbPaginatorCommonElementMixin |
| `hasNextPage`     | public  | Whether there is a next page.                                                                                                                                     |                 | `boolean` | SbbPaginatorCommonElementMixin |
| `hasPreviousPage` | public  | Whether there is a previous page.                                                                                                                                 |                 | `boolean` | SbbPaginatorCommonElementMixin |
| `lastPage`        | public  | Move to the last page if not already there.                                                                                                                       |                 | `void`    | SbbPaginatorCommonElementMixin |
| `nextPage`        | public  | Advances to the next page if it exists.                                                                                                                           |                 | `void`    | SbbPaginatorCommonElementMixin |
| `numberOfPages`   | public  | Calculates the current number of pages based on the `length` and the `pageSize`; value must be rounded up (e.g. `length = 21` and `pageSize = 10` means 3 pages). |                 | `number`  | SbbPaginatorCommonElementMixin |
| `previousPage`    | public  | Move back to the previous page if it exists.                                                                                                                      |                 | `void`    | SbbPaginatorCommonElementMixin |
| `selectPage`      | public  | Move to a specific page index.                                                                                                                                    | `index: number` | `void`    | SbbPaginatorCommonElementMixin |

## Events

| Name   | Type                                        | Description                                                                    | Inherited From                 |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------ |
| `page` | `CustomEvent<SbbPaginatorPageEventDetails>` | The page event is dispatched when the page index, length or page size changes. | SbbPaginatorCommonElementMixin |
