The `sbb-table` class is designed to handle the styling of common table use cases, ensuring a consistent and visually appealing presentation of tabular data.
This guide will walk you through the various customization options and advanced scenarios for styling tables within our design system.

In most of the cases, you might want to also use the [sbb-table-wrapper](/docs/elements-table--docs).

### Basic usage

```html
<table class="sbb-table">
  <thead>
    <th>...</th>
    ...
  </thead>
  <tbody>
    <tr>
      <td>...</td>
      ...
    </tr>
    ...
  </tbody>
  <caption>
    ...
  </caption>
</table>
```

### Striped table

By default, tables are styled with alternating row stripes to enhance readability. To remove this striping, add the `sbb-table--unstriped` class:

```html
<table class="sbb-table sbb-table--unstriped">
  ...
</table>
```

### Size

The available sizes are `m` (default), `s` and `xs`. Use the respective `sbb-table-*size*` classes to specify it:

```html
<table class="sbb-table-s">
  ...
</table>

<!-- Or -->

<table class="sbb-table-m">
  ...
</table>

<!-- Or -->

<table class="sbb-table-xs">
  ...
</table>
```

### Negative variant

For a negative color scheme, apply the `sbb-table--negative` class:

```html
<table class="sbb-table sbb-table--negative">
  ...
</table>
```

### Grouping columns

To visually group two adjacent columns, apply the `sbb-table-group-with-next` class to the `th` or `td` that precedes the next column in the group.
This removes the border between the two columns, making them appear as one logical unit:

```html
<table class="sbb-table">
  <thead>
    <tr>
      <th class="sbb-table-group-with-next">First Name</th>
      <th>Last Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="sbb-table-group-with-next">Chris</td>
      <td>Evans</td>
      <td>22</td>
    </tr>
  </tbody>
</table>
```

### Text alignment

By default, table cells are left-aligned.
Use the following classes to change the text alignment of individual cells or columns.
The classes can be applied on the table or on individual `th` or `td` elements,
depending on the desired scope of the alignment.

| CSS class                 | Description       |
| ------------------------- | ----------------- |
| `sbb-table-align-start`   | Align text start  |
| `sbb-table-align-center`  | Align text center |
| `sbb-table-align-end`     | Align text end    |
| `sbb-table-align-justify` | Justify text      |

### Iron theme

For the iron theme, apply the `sbb-table--theme-iron` class.
This scheme changes the text color of the cells to `sbb-color-iron`.

```html
<table class="sbb-table sbb-table--theme-iron">
  ...
</table>
```

### Mixins and classes

In advanced scenarios, predefined classes might not suffice.
Therefore, we provide mixins you can build on top of:

| Sass Mixin           | CSS class                   | Description                                 |
| -------------------- | --------------------------- | ------------------------------------------- |
| `table`              | `sbb-table`                 | The table style (equivalent to `table-m`)   |
| `table--m`           | `sbb-table-m`               | Medium size table style                     |
| `table--s`           | `sbb-table-s`               | Small size table style                      |
| `table--xs`          | `sbb-table-xs`              | Smallest size table style                   |
| `table--negative`    | `sbb-table--negative`       | Negative variant style                      |
| `table--striped`     | `sbb-table--striped`        | Striped table style                         |
| `table--unstriped`   | `sbb-table--unstriped`      | Non-striped table style                     |
| `table-row--striped` | `sbb-table-row--striped`    | Force the striped state on a `tr`           |
| `table-header-row`   | `sbb-table-header-row`      | Header `tr` element style                   |
| `table-header-cell`  | `sbb-table-header-cell`     | `th` element style                          |
| `table-data-cell`    | `sbb-table-data-cell`       | `td` element style                          |
| `table-caption`      | `sbb-table-caption`         | `caption` element style                     |
| `table-filter`       | `sbb-table-filter`          | `th` element that contains an inline filter |
| –                    | `sbb-table-group-with-next` | Removes the border to the next column       |
| –                    | `sbb-table-align-start`     | Aligns cell text to the start               |
| –                    | `sbb-table-align-center`    | Aligns cell text to the center              |
| –                    | `sbb-table-align-end`       | Aligns cell text to the end                 |
| –                    | `sbb-table-align-justify`   | Justifies cell text                         |
