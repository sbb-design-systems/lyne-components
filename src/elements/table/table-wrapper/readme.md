The `sbb-table-wrapper` is a wrapper for a table. Its goal is to enhance/automate the native table capabilities.

Currently, it only handles overflow (vertical and horizontal).

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

## Style

See the [Table](/docs/styles-table--docs) style section.

The component has a `negative` variant which can be set with the self-named property.

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

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type      | Default | Description                     |
| ---------- | ---------- | ------- | --------- | ------- | ------------------------------- |
| `negative` | `negative` | public  | `boolean` | `false` | Negative coloring variant flag. |

## Slots

| Name | Description                            |
| ---- | -------------------------------------- |
|      | Use the unnamed slot to add the table. |
