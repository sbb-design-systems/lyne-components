The `sbb-tab-nav-bar` provides a tab-like UI for navigating between routes.

```html
<sbb-tab-nav-bar>
  <a href="..." class="sbb-active"> Nav item 1 </a>
  <a href="..."> Nav item 2 </a>
  <a href="..."> Nav item 3 </a>
</sbb-tab-nav-bar>
```

## States

### Active

Add the `sbb-active` class to display the tab as active.

```html
<sbb-tab-nav-bar>
  <a href="..." class="sbb-active"> Nav item 1 </a>
  ...
</sbb-tab-nav-bar>
```

### Disabled

Be aware that anchors do not support a `disabled` state. To achieve an equivalent one, consumer needs to:

- Add the `sbb-disabled` class;
- Mark the anchor with `aria-disabled="true"`.
- Remove the `href` attribute.

```html
<sbb-tab-nav-bar>
  ...
  <a class="sbb-disabled" aria-disabled="true"> Nav item 4 </a>
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
