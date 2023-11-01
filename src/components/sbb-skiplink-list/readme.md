The `sbb-skiplink-list` is a component that can be used to collect one or more hidden [sbb-link](/docs/components-sbb-link--docs)s,
which become visible only when focused, e.g., using the `Tab` key. 

When the component contains multiple link elements, only one of them is shown (the focused one), while the others stay visually hidden.

It has an optional `sbb-title` element, which is visually hidden too, but it's read from screen-readers, 
and it can be set using the `title-content` property.

```html
<sbb-skiplink-list title-level="2" title-content="Title text">
  <sbb-link href='https://www.sbb.ch/'>Content</sbb-link>
  <sbb-link href='https://www.sbb.ch/en/help-and-contact.html'>Contact</sbb-link>
  ...
</sbb-skiplink-list>
```

## Style

The default `z-index` of the component is set to `1000`; 
to specify a custom stack order, the `z-index` can be changed by defining the CSS variable `--sbb-skiplink-z-index`.

<!-- Auto Generated Below --> 
 

## Properties 

| Name           | Attribute           | Privacy | Type                      | Default | Description                                      |
| -------------- | -------------- | ------- | ------------------------- | ------- | ------------------------------------------------ |
| `titleContent` | `title-content` | public  | `string \| undefined`     |         | The title text we want to place before the list. |
| `titleLevel`   | `title-level`   | public  | `TitleLevel \| undefined` | `'2'`   | The semantic level of the title, e.g. 2 = h2.    |

## Attributes

| Name            | Field        | Inherited From |
| --------------- | ------------ | -------------- |
| `title-content` | titleContent |                |
| `title-level`   | titleLevel   |                |

## Slots

| Name | Description                                                              |
| ---- | ------------------------------------------------------------------------ |
|      | Use the unnamed slot to add \`sbb-link\` elements to this skiplink list. |

