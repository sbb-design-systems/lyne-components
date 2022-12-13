# sbb-link-list
The `<sbb-link-list>` is a collection of sbb-links. It has an optional title which stays visually always on level 5. The list can be oriented vertically or 
horizontally. The title will not be display in the horizontal orientation.

```html
<sbb-link-list title-level="2" title-content="Help &amp; Contact" horizontal-from="medium">
  <sbb-link href='https://www.sbb.ch/en/help-and-contact/refunds-compensation/ticket-refunds.html' text-size='s'>Refunds</sbb-link>
  <sbb-link href='https://www.sbb.ch/en/help-and-contact/lost-found-office/submit-loss-report.html' text-size='s'>Loss Report</sbb-link>
  ...
</sbb-link-list>
```
  
<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                             | Type                                                                       | Default      |
| ---------------- | ----------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------ |
| `horizontalFrom` | `horizontal-from` | Selected breakpoint from which the list is rendered horizontally.       | `"large" \| "medium" \| "micro" \| "small" \| "ultra" \| "wide" \| "zero"` | `undefined`  |
| `negative`       | `negative`        | Negative coloring variant flag.                                         | `boolean`                                                                  | `undefined`  |
| `orientation`    | `orientation`     | The orientation in which the list will be shown vertical or horizontal. | `"horizontal" \| "vertical"`                                               | `'vertical'` |
| `titleContent`   | `title-content`   | The title text we want to show before the list.                         | `string`                                                                   | `undefined`  |
| `titleLevel`     | `title-level`     | The semantic level of the title, e.g. 2 = h2.                           | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"`                                   | `'2'`        |


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


