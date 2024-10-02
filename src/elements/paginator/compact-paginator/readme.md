> Explain the use and the purpose of the component; add minor details if needed and provide a basic example.<br>
> If you reference other components, link their documentation at least once (the path must start from _/docs/..._ ).<br>
> For the examples, use triple backticks with file extension (` ```html <code here>``` `).<br>
> The following list of paragraphs is only suggested; remove, create and adapt as needed.

The `sbb-compact-paginator` is a component . . .

```html
<sbb-compact-paginator></sbb-compact-paginator>
```

## Slots

> Describe slot naming and usage and provide an example of slotted content.

## States

> Describe the component states (`disabled`, `readonly`, etc.) and provide examples.

## Style

> Describe the properties which change the component visualization (`size`, `negative`, etc.) and provide examples.

## Interactions

> Describe how it's possible to interact with the component (open and close a `sbb-dialog`, dismiss a `sbb-alert`, etc.) and provide examples.

## Events

> Describe events triggered by the component and possibly how to get information from the payload.

## Keyboard interaction

> If the component has logic for keyboard navigation (as the `sbb-calendar` or the `sbb-select`) describe it.

| Keyboard       | Action        |
| -------------- | ------------- |
| <kbd>Key</kbd> | What it does. |

## Accessibility

> Describe how accessibility is implemented and if there are issues or suggested best-practice for the consumers.

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type                        | Default   | Description                                                                                                                                                                      |
| --------------- | ---------------- | ------- | --------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `length`        | `length`         | public  | `number`                    | `0`       | Total number of items.                                                                                                                                                           |
| `negative`      | `negative`       | public  | `boolean`                   | `false`   | Negative coloring variant flag.                                                                                                                                                  |
| `pageIndex`     | `page-index`     | public  | `number`                    | `0`       | Current page index.                                                                                                                                                              |
| `pagerPosition` | `pager-position` | public  | `\| 'start'       \| 'end'` | `'start'` | Position of the prev/next buttons: if `pageSizeOptions` is set, the sbb-select for the pageSize change will be positioned oppositely with the page numbers always in the center. |
| `pageSize`      | `page-size`      | public  | `number`                    | `10`      | Number of items per page.                                                                                                                                                        |
| `size`          | `size`           | public  | `'m' \| 's'`                | `'m'`     | Size variant, either m or s.                                                                                                                                                     |

## Events

| Name   | Type                                        | Description                       | Inherited From |
| ------ | ------------------------------------------- | --------------------------------- | -------------- |
| `page` | `CustomEvent<SbbPaginatorPageEventDetails>` | Emits when the pageIndex changes. |                |
