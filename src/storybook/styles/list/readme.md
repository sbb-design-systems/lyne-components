# List styles

## sbb-list

| css class  | sass mixin |
| ---------- | ---------- |
| `sbb-list` | `list`     |

The list styling can be applied to any ordered or unordered list.
Nesting lists is also supported without redefining the css class.

### Usage

```html
<ul class="sbb-list sbb-text-m">
  <li>Content</li>
</ul>
```

## sbb-step-list

| css class       | sass mixin  |
| --------------- | ----------- |
| `sbb-step-list` | `step-list` |

The step list can only be used as ordered variant.
To achieve a correct styling, it is important to also define the font-size
by using the predefined classes (e.g. `sbb-text-s`).

```html
<ol class="sbb-step-list sbb-text-m">
  <li>Content</li>
</ol>
```
