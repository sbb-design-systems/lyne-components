## Badge

The `sbb-badge` attribute can be applied to every element, but is mainly designed to be placed on an `sbb-icon`.

### API

| CSS attribute name   | Type              | Description                                                                  |
| -------------------- | ----------------- | ---------------------------------------------------------------------------- |
| `sbb-badge`          | `string`          | Content displayed in badge.                                                  |
| `sbb-badge-position` | `before \| after` | Positioning of the badge relative to the element where the badge is applied. |

Moreover, we provide the Sass mixin `badge` which contains the badge styling for general usage.

### Usage

#### standard / after

```html
<sbb-icon icon-name="controls-small" sbb-badge="2"></sbb-icon>
<sbb-screen-reader-only>Currently 2 settings changed.</sbb-screen-reader-only>
```

#### before

```html
<sbb-icon icon-name="controls-small" sbb-badge="2" sbb-badge-position="before"></sbb-icon>
<sbb-screen-reader-only>Currently 2 settings changed.</sbb-screen-reader-only>
```

### Accessibility

For screen readers it's important to output the meaning of the badge. This attribute itself doesn't
output anything to screen readers. Setting an `aria-label`s or the `<sbb-screen-reader-only>` element can be helpful.

## Using the mixin

```scss
@use '@sbb-esta/lyne-elements' as sbb;

.some-element {
  @include sbb.badge;
}
```
