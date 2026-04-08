<!-- #region table-docs -->

For working with tables, the native `table` and its related elements should be used.
With the `sbb-table` CSS class, styling the native element is possible.

The `<sbb-table-wrapper>` is a wrapper for a table. Its goal is to enhance/automate the native table capabilities.

```html
<sbb-table-wrapper>
  <table class="sbb-table">
    <thead>
      ...
    </thead>
    <tbody>
      ...
    </tbody>
  </table>
</sbb-table-wrapper>
```

<!-- #endregion -->

## Style

The `sbb-table` class is designed to handle the styling of common table use cases, ensuring a consistent and visually appealing presentation of tabular data.
This guide will walk you through the various customization options and advanced scenarios for styling tables within our design system.

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
</table
```

### Size

The available sizes are `m` (default), `s` and `xs`. Use the respective `sbb-table-*size*` classes to specify it:

```html
<table class="sbb-table-s"></table>
<table class="sbb-table-m"></table>
<table class="sbb-table-xs"></table>
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

**Note:** The Angular wrapper also has the groupWithNext property on a cell.

### Header subtitle

To display a subtitle below a column header, add an element with the `sbb-table-header-subtitle`
class inside a `th` element:

```html
<table class="sbb-table">
  <thead>
    <tr>
      <th>
        Person
        <div class="sbb-table-header-subtitle">Subtitle</div>
      </th>
      <th>
        Most interest in
        <div class="sbb-table-header-subtitle">Subtitle</div>
      </th>
      <th>
        Age
        <div class="sbb-table-header-subtitle">Subtitle</div>
      </th>
    </tr>
  </thead>
  ...
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

### Sticky Table

The `<sbb-table-wrapper>` provide classes and some utilities to implement a table with sticky header and columns.
It is the consumer responsibility to set the correct style/classes to the template.

**Note:** The Angular wrapper takes care of most of the sticky table setup. Please refer to the Lyne Angular examples.

### Negative Table

The component has a `negative` variant which can be set with the self-named property.
Note: Due to technical limitations, consumer has to use set the `negative` property and the `sbb-table--negative` class.

```html
<sbb-table-wrapper negative>
  <table class="sbb-table sbb-table--negative">
    ...
  </table>
</sbb-table-wrapper>
```

## Accessibility

Always provide an accessible label for your tables via `aria-label` or `aria-labelledby` on the table element.

```html
<sbb-table-wrapper>
  <table class="sbb-table" aria-label="Table caption">
    ...
  </table>
</sbb-table-wrapper>
```

### Keyboard navigation

Please verify that the focus outline for keyboard navigation has the correct color.
E.g. when the table-wrapper is placed inside a dark container, the focus outline color should be set to dark
(`--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark)`).

```html
<div style="background: black; --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark)">
  <sbb-table-wrapper>
    <table>
      ...
    </table>
  </sbb-table-wrapper>
</div>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbTableWrapperElement`, `sbb-table-wrapper`

#### Properties

| Name        | Attribute   | Privacy | Type      | Default | Description                             |
| ----------- | ----------- | ------- | --------- | ------- | --------------------------------------- |
| `focusable` | `focusable` | public  | `boolean` | `false` | Whether the table wrapper is focusable. |
| `negative`  | `negative`  | public  | `boolean` | `false` | Negative coloring variant flag.         |

#### Slots

| Name | Description                            |
| ---- | -------------------------------------- |
|      | Use the unnamed slot to add the table. |
