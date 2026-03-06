The link components from Lyne provide the same functionality as a native `anchor (a)` element
enhanced with SBB Design, accepting its associated properties (`href`, `target`, `rel` and `download`).

Note: In contrast with other modules, each link component has its own entry point
(e.g. `@sbb-esta/lyne-elements/link/link.js`). This is due to the amount of button variants.

```html
<sbb-link href="http://www.sbb.ch">Link text</sbb-link>
<sbb-block-link href="http://www.sbb.ch">Link text</sbb-block-link>
```

For every variant there is also a button version, equivalent to a native `button` element.

```html
<sbb-link-button href="http://www.sbb.ch">Link text</sbb-link-button>
<sbb-block-link-button href="http://www.sbb.ch">Link text</sbb-block-link-button>
```

Additionally for every variant there is a static version that can be used inside another
interactive element (e.g. an `anchor (a)`).

```html
<sbb-link-static href="http://www.sbb.ch">Link text</sbb-link-static>
<sbb-block-link-static href="http://www.sbb.ch">Link text</sbb-block-link-static>
```

Block links can optionally display an icon, which can be provided via the `iconName` property
or via custom content using the `icon` slot.

```html
<sbb-block-link href="https://www.sbb.ch" icon-name="chevron-small-right-small">
  Help
</sbb-block-link>

<sbb-block-link
  href="https://www.sbb.ch"
  icon-name="chevron-small-left-small"
  icon-placement="start"
>
  Contact
</sbb-block-link>
```

## States

The component can be displayed in `disabled` state using the corresponding property.

```html
<sbb-link href="https://www.sbb.ch" disabled>Refunds</sbb-link>
```

## Style

Block links have three sizes (`xs`, `s`, which is the default, and `m`).

```html
<sbb-block-link href="https://www.sbb.ch" size="m">Refunds</sbb-block-link>
```

### Active state

To show a currently active link, the CSS class `sbb-active` can be placed on the `sbb-block-link`.
One possible use case would be to use it within the `sbb-sidebar`.

```html
<sbb-block-link class="sbb-active" accessibility-current="page">Refunds</sbb-block-link>
```
