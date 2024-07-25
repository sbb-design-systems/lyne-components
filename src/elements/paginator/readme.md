The `sbb-paginator` is a component used to split content across multiple pages, instead than scrolling it.

It can be controlled via the following properties:

- `length`: it's the total number of items that will be split between pages;
- `pageSize`: it's the number of items in a single page (default: `10`);
- `pageIndex`: it's the index of the current displayed page (default: `0`).

```html
<sbb-paginator length="100" page-size="20"></sbb-paginator>
```

[//]: # 'FIXME: add `sbb-mini-button-group` link'

By default, a `sbb-mini-button-group` with two buttons is displayed, which allows moving to the previous/next pages.
The positioning of this element is set using the `pagerPosition` parameter (default: `start`):

```html
<sbb-paginator length="100" page-size="20" pager-position="end"></sbb-paginator>
```

[//]: # 'FIXME: add `pageSizeOptions` logic'

## Style

The component has two sizes, named `m` (default) and `s`.

```html
<sbb-paginator size="s" length="100" page-size="20"></sbb-paginator>
```

## Events

Consumers can listen to the `pageChanged` event on the `sbb-paginator` component to intercept the page change event.
The `event.detail` contains both the information about the `currentPageIndex` and the `previousPageIndex`.

<!-- Auto Generated Below -->

## Properties

| Name              | Attribute           | Privacy | Type                    | Default   | Description                         |
| ----------------- | ------------------- | ------- | ----------------------- | --------- | ----------------------------------- |
| `length`          | `length`            | public  | `number`                | `0`       | Total number of items.              |
| `negative`        | `negative`          | public  | `boolean`               | `false`   | Negative coloring variant flag.     |
| `pageIndex`       | `page-index`        | public  | `number`                | `0`       | Current page index.                 |
| `pagerPosition`   | `pager-position`    | public  | `'start' \| 'end'`      | `'start'` | Position of the prev/next buttons.  |
| `pageSize`        | `page-size`         | public  | `number`                | `10`      | Number of items per page.           |
| `pageSizeOptions` | `page-size-options` | public  | `number[] \| undefined` |           | The available `pageSize` choices.   |
| `size`            | `size`              | public  | `'s' \| 'm'`            | `'m'`     | Size of the component (`s` or `m`). |

## Events

| Name          | Type                                   | Description                       | Inherited From |
| ------------- | -------------------------------------- | --------------------------------- | -------------- |
| `pageChanged` | `CustomEvent<SbbPaginatorPageChanged>` | Emits when the pageIndex changes. |                |
