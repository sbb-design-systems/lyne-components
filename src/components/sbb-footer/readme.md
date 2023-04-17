The `<sbb-footer>` component is used to display page related information like copyright, contact or other 
content related links. There are two variants of the footer. The default, which displays the slotted content in regular 
block element approach and the clock-columns variant, which uses a css-grid for displaying the content over different 
breakpoints.

**Negative variant:**
If using the footer in negative variant, please also apply the negative attribute 
to the content where needed (e.g. `sbb-link-list`, `sbb-link` and `sbb-divider`).

**Note:** 
Content, like sbb-link-list that could come along with a button, needs to be wrapped with a `<div>` element with a helper 
class (`class="sbb-link-list-button-group"`) to be displayed correctly.

## Usage

Default

```html
<sbb-footer accessibility-title="Footer">
  <sbb-link-list title-level="2" title-content="List title text">
    <sbb-link href="#">Link 1</sbb-link>
    <sbb-link href="#">Link 2</sbb-link>
    <sbb-link href="#">Link 3</sbb-link>
    <sbb-link href="#">Link 4</sbb-link>
    <sbb-link href="#">Link 5</sbb-link>
  </sbb-link-list>
</sbb-footer>

```

Variant clock-columns with wrapped link-list with button:

```html
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
  <sbb-divider />  
  <sbb-link-list size="xs" horizontal-from="large">
    <sbb-link href="#">Refunds</sbb-link>
    <sbb-link href="#">Lost property office</sbb-link>
    <sbb-link href="#">Complaints</sbb-link>
    <sbb-link href="#">Praise</sbb-link>
    <sbb-link href="#">Report property damage</sbb-link>
  </sbb-link-list>

</sbb-footer>
```
<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                   | Description                                                                                                                                                                                    | Type                                     | Default     |
| ------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `accessibilityTitle`      | `accessibility-title`       | Footer title text, visually hidden, necessary for screen readers.                                                                                                                              | `string`                                 | `undefined` |
| `accessibilityTitleLevel` | `accessibility-title-level` | Level of the accessibility title, will be rendered as heading tag (e.g. h1). Defaults to level 1.                                                                                              | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `'1'`       |
| `expanded`                | `expanded`                  | Whether to allow the footer content to stretch to full width. By default, the content has the appropriate page size.                                                                           | `boolean`                                | `false`     |
| `negative`                | `negative`                  | Negative coloring variant flag.                                                                                                                                                                | `boolean`                                | `false`     |
| `variant`                 | `variant`                   | Variants to display the footer. The default, displays the content in regular block element approach. The clock-columns, used a css-grid for displaying the content over different breakpoints. | `"clock-columns" \| "default"`           | `'default'` |


----------------------------------------------


