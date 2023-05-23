The `<sbb-skiplink-list>` is a collection of hidden `sbb-link`s that become visible only when focused, 
for example using the <kbd>Tab</kbd> button.  It has an optional `<sbb-title>` element, which is visually hidden too, 
but it's read from screen-readers.

When `<sbb-skiplink-list>` contains multiple link elements, only one of them is shown (the focused one), while the others stay visually hidden.

The default `z-index` of the component is set to `1000`; 
to specify a custom stack order, the `z-index` can be changed by defining the CSS variable `--sbb-skiplink-z-index`.

## Usage

```html
<sbb-skiplink-list title-level="2" title-content="Title text">
  <sbb-link href='https://www.sbb.ch/'>Content</sbb-link>
  <sbb-link href='https://www.sbb.ch/en/help-and-contact.html'>Contact</sbb-link>
  ...
</sbb-sliplink-list>
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                      | Type                                     | Default     |
| -------------- | --------------- | ------------------------------------------------ | ---------------------------------------- | ----------- |
| `titleContent` | `title-content` | The title text we want to place before the list. | `string`                                 | `undefined` |
| `titleLevel`   | `title-level`   | The semantic level of the title, e.g. 2 = h2.    | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `'2'`       |


## Slots

| Slot        | Description                             |
| ----------- | --------------------------------------- |
| `"unnamed"` | Use this to provide links for the list. |


## Dependencies

### Depends on

- [sbb-title](../sbb-title)

### Graph
```mermaid
graph TD;
  sbb-skiplink-list --> sbb-title
  style sbb-skiplink-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


