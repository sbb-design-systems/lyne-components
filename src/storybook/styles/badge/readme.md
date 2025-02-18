## Badge

The `sbb-badge` attribute can be applied to every element, but is mainly designed to be placed on an `sbb-icon`.

### API

| CSS attribute name   | Type                        | Description                                                                  |
| -------------------- | --------------------------- | ---------------------------------------------------------------------------- |
| `sbb-badge`          | `string`                    | Content displayed in badge.                                                  |
| `sbb-badge-position` | `before \| middle \| after` | Positioning of the badge relative to the element where the badge is applied. |

Moreover, we provide the Sass mixin `badge` which contains the badge styling for general usage.

### Usage

```html
<sbb-icon icon-name="controls-small" sbb-badge="2" sbb-badge-position="after"></sbb-icon>
```

## Using the mixin

```scss
@use '@sbb-esta/lyne-elements' as sbb;

.some-element {
  @include sbb.badge;
}
```
