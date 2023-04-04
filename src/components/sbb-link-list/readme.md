The `<sbb-link-list>` is a collection of sbb-links. It has an optional title which is visually
shown as a level 5 `<sbb-title>`. The title is used as the aria-labelledby attribute of the ul
element. The list can be oriented vertically or horizontally. The title will not be display in the
horizontal orientation.

```html
<sbb-link-list title-level="2" title-content="Help &amp; Contact" horizontal-from="medium">
  <sbb-link href='https://www.sbb.ch/en/help-and-contact/refunds-compensation/ticket-refunds.html'>Refunds</sbb-link>
  <sbb-link href='https://www.sbb.ch/en/help-and-contact/lost-found-office/submit-loss-report.html'>Loss Report</sbb-link>
  ...
</sbb-link-list>
```
  
**NOTE**: `<sbb-link-list>` will automatically set variant `block` on nested `<sbb-link>` instances
 and will sync the `textSize` and `negative` property.

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                         | Type                                                                       | Default      |
| ---------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| `horizontalFrom` | `horizontal-from` | Selected breakpoint from which the list is rendered horizontally.                                                                                   | `"large" \| "medium" \| "micro" \| "small" \| "ultra" \| "wide" \| "zero"` | `undefined`  |
| `negative`       | `negative`        | Whether to render the link list and nested sbb-link instances as negative. This will overwrite the negative attribute of nested sbb-link instances. | `boolean`                                                                  | `undefined`  |
| `orientation`    | `orientation`     | The orientation in which the list will be shown vertical or horizontal.                                                                             | `"horizontal" \| "vertical"`                                               | `'vertical'` |
| `size`           | `size`            | Text size of the nested sbb-link instances. This will overwrite the size attribute of nested sbb-link instances.                                    | `"m" \| "s" \| "xs"`                                                       | `'s'`        |
| `titleContent`   | `title-content`   | The title text we want to show before the list.                                                                                                     | `string`                                                                   | `undefined`  |
| `titleLevel`     | `title-level`     | The semantic level of the title, e.g. 2 = h2.                                                                                                       | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"`                                   | `'2'`        |


## Dependencies

### Depends on

- [sbb-title](../sbb-title)

### Graph
```mermaid
graph TD;
  sbb-link-list --> sbb-title
  style sbb-link-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


