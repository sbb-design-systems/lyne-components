The `sbb-badge` attribute can be applied to every element, but is mainly designed to be placed on an `sbb-icon`.

## API

| CSS attribute name   | Type              | Description                                                                  |
| -------------------- | ----------------- | ---------------------------------------------------------------------------- |
| `sbb-badge`          | `string`          | Content displayed in badge.                                                  |
| `sbb-badge-position` | `before \| after` | Positioning of the badge relative to the element where the badge is applied. |

Moreover, we provide the Sass mixin `badge` which contains the badge styling for general usage.

## Usage

### Position default/after

```html
<sbb-icon
  name="controls-small"
  sbb-badge="2"
  aria-hidden="false"
  aria-label="Currently 2 settings changed."
></sbb-icon>
```

### Position before

```html
<sbb-icon
  name="controls-small"
  sbb-badge="2"
  sbb-badge-position="before"
  aria-hidden="false"
  aria-label="Currently 2 settings changed."
></sbb-icon>
```

### On img element

`<img>` elements don't support pseudo-elements. Therefore, placing a badge directly on the `<img>` element is not possible.

As workaround, a figure element can be used:

```html
<figure sbb-badge="5" class="sbb-figure">
  <img src="..." alt="Avatar Icon" />
</figure>
```

## Accessibility

For screen readers it's important to output the meaning of the badge. This attribute itself doesn't
output anything to screen readers. As an example, add `aria-label` text or `aria-describedby` references.
