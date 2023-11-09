The `sbb-footer` component is used to display page related information like copyright, contact or other
content related links; for these, the [sbb-link-list](/docs/components-sbb-link-list--docs) component can be used.

## Variants

There are two variants of the footer: the `variant='default'`, which displays the slotted content in regular
block element approach and the `variant='clock-columns'`, which uses a css-grid for displaying the content over different
breakpoints.

**Note:**
Content, like `sbb-link-list` that could come along with a button, needs to be wrapped with a `<div>` element with a helper
class (`class="sbb-link-list-button-group"`) to be displayed correctly.

```html
<!-- 'default' variant -->
<sbb-footer accessibility-title="Footer">
  <sbb-link-list title-level="2" title-content="List title text">
    <sbb-link href="#">Link 1</sbb-link>
    <sbb-link href="#">Link 2</sbb-link>
    <sbb-link href="#">Link 3</sbb-link>
    <sbb-link href="#">Link 4</sbb-link>
    <sbb-link href="#">Link 5</sbb-link>
  </sbb-link-list>
</sbb-footer>

<!--'clock-columns' variant -->
<sbb-footer accessibility-title="Footer" variant="clock-columns">
  <div class="sbb-link-list-button-group">
    <sbb-link-list title-level="2" title-content="Help &amp; Contact.">
      <sbb-link href="#">Refunds</sbb-link>
      <sbb-link href="#">Lost property office</sbb-link>
      <sbb-link href="#">Complaints</sbb-link>
      <sbb-link href="#">Praise</sbb-link>
      <sbb-link href="#">Report property damage</sbb-link>
    </sbb-link-list>
    <sbb-button href="#" variant="primary">All help topics</sbb-button>
  </div>
  <sbb-link-list title-level="2" title-content="More SBB.">
    <sbb-link href="#">Jobs & careers</sbb-link>
    <sbb-link href="#">Rail traffic information</sbb-link>
    <sbb-link href="#">SBB News</sbb-link>
    <sbb-link href="#">SBB Community</sbb-link>
    <sbb-link href="#">Company</sbb-link>
  </sbb-link-list>
  ...
  <sbb-divider></sbb-divider>
  <sbb-link-list size="xs" horizontal-from="large">
    <sbb-link href="#">Refunds</sbb-link>
    <sbb-link href="#">Lost property office</sbb-link>
    <sbb-link href="#">Complaints</sbb-link>
    <sbb-link href="#">Praise</sbb-link>
    <sbb-link href="#">Report property damage</sbb-link>
  </sbb-link-list>
</sbb-footer>
```

## Style

It's possible to display the footer in `negative` variant; please also apply the negative attribute
to the content where needed (e.g. `sbb-link-list`, `sbb-link` and `sbb-divider`).

```html
<sbb-footer negative accessibility-title="Footer">
  <sbb-link-list negative title-level="2" title-content="Help &amp; Contact.">
    <sbb-link negative href="#">Refunds</sbb-link>
    <sbb-link negative href="#">Lost property office</sbb-link>
    <sbb-link negative href="#">Complaints</sbb-link>
    <sbb-link negative href="#">Praise</sbb-link>
    <sbb-link negative href="#">Report property damage</sbb-link>
  </sbb-link-list>
</sbb-footer>
```

<!-- Auto Generated Below -->

## Properties

| Name                      | Attribute                   | Privacy | Type                           | Default     | Description                                                                                                                                                                                    |
| ------------------------- | --------------------------- | ------- | ------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`                 | `variant`                   | public  | `'default' \| 'clock-columns'` | `'default'` | Variants to display the footer. The default, displays the content in regular block element approach. The clock-columns, used a css-grid for displaying the content over different breakpoints. |
| `negative`                | `negative`                  | public  | `boolean`                      | `false`     | Negative coloring variant flag.                                                                                                                                                                |
| `expanded`                | `expanded`                  | public  | `boolean`                      | `false`     | Whether to allow the footer content to stretch to full width. By default, the content has the appropriate page size.                                                                           |
| `accessibilityTitle`      | `accessibility-title`       | public  | `string \| undefined`          |             | Footer title text, visually hidden, necessary for screen readers.                                                                                                                              |
| `accessibilityTitleLevel` | `accessibility-title-level` | public  | `TitleLevel`                   | `'1'`       | Level of the accessibility title, will be rendered as heading tag (e.g. h1). Defaults to level 1.                                                                                              |

## Slots

| Name | Description                                                                                     |
| ---- | ----------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add elements like `sbb-link`, `sbb-link-list`, `sbb-divider` and so on. |
