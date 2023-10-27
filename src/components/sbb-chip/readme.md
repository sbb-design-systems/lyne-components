The `sbb-chip` is a visual component used to display compact information, like a filter's name or a tag.

```html
<sbb-chip>On sale</sbb-chip>
```

## Style

It's possible to choose among three different values for the `size` property (`s`, `xs` and `xxs`, which is the default), 
and four different values for the `color` property (`charcoal`, `granite`, `white` and `milk`, which is the default).

```html
<sbb-chip color="charcoal" size="s">Label</sbb-chip>

<sbb-chip color="granite" size="xs">Label</sbb-chip>

<sbb-chip color="white">Label</sbb-chip>
```

<!-- Auto Generated Below --> 
 

| Name    | Attribute    | Privacy | Type                                           | Default  | Description        |
| ------- | ------- | ------- | ---------------------------------------------- | -------- | ------------------ |
| `size`  | `size`  | public  | `'xxs' \| 'xs' \| 's'`                         | `'xxs'`  | Size of the chip.  |
| `color` | `color` | public  | `'milk' \| 'charcoal' \| 'white' \| 'granite'` | `'milk'` | Color of the chip. |

| Name    | Attribute    | Privacy | Type                                  | Default  | Description        |
| ------- | ------- | ------- | ------------------------------------- | -------- | ------------------ |
| `size`  | `size`  | public  | `InterfaceSbbChipAttributes['size']`  | `'xxs'`  | Size of the chip.  |
| `color` | `color` | public  | `InterfaceSbbChipAttributes['color']` | `'milk'` | Color of the chip. |

## Slots

| Name      | Description                 |
| --------- | --------------------------- |
| `unnamed` | Content / Label of the chip |

<hr/>

