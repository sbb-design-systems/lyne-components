The `sbb-tab-nav-bar` provides a tab-like UI for navigating between routes.

```html
<sbb-tab-nav-bar>
  <a href="..." class="sbb-active" aria-current="page">Nav item 1</a>
  <a href="...">Nav item 2</a>
  <a href="...">Nav item 3</a>
</sbb-tab-nav-bar>
```

As the `sbb-tab-label` component, it supports a prefix icon and an amount.

```html
<sbb-tab-nav-bar>
  <a href="..." class="sbb-active" aria-current="page">Nav item 1</a>
  ...

  <!-- With icon and amount -->
  <a href="...">
    <sbb-icon name="pie-small"></sbb-icon>
    Nav item 4
    <p class="sbb-tab-amount">42</p>
  </a>
</sbb-tab-nav-bar>
```

Please note that the amount should be wrapped with a `<p>` tag to better support screen readers.

## States

### Active

Add the `sbb-active` class to display the tab as active.
To indicate the active state to the assistive technologies, `aria-current="page"`
should be set whenever the CSS class `sbb-active` is set.

```html
<sbb-tab-nav-bar>
  <a href="..." class="sbb-active" aria-current="page"> Nav item 1 </a>
  ...
</sbb-tab-nav-bar>
```

### Disabled

Be aware that anchors do not support a `disabled` state. To achieve an equivalent one, consumer needs to:

- Add the `sbb-disabled` class;
- Mark the anchor with `aria-disabled="true"`.
- Remove the `href` attribute.
- Add `role="link"` to better support the case for assistive technologies

```html
<sbb-tab-nav-bar>
  ...
  <a class="sbb-disabled" aria-disabled="true" role="link"> Nav item 4 </a>
</sbb-tab-nav-bar>
```

<!-- Auto Generated Below -->

## Properties

| Name   | Attribute | Privacy | Type                 | Default            | Description                      |
| ------ | --------- | ------- | -------------------- | ------------------ | -------------------------------- |
| `size` | `size`    | public  | `'s' \| 'l' \| 'xl'` | `'l' / 's' (lean)` | Size variant, either s, l or xl. |

## Slots

| Name | Description                          |
| ---- | ------------------------------------ |
|      | Use the unnamed slot to add anchors. |
