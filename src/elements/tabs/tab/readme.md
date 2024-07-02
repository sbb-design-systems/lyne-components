The `sbb-tab` is a component used to provide content to a `sbb-tab-group`
(see [sbb-tab-group](/docs/elements-sbb-tab-sbb-tab-group--docs) for more details).

```html
<sbb-tab> Content </sbb-tab>
```

## Slots

The content is projected in an unnamed slot.
Use a semantic element as a content wrapper (`p`, `article`, `section` and so on)
to improve screen-reader usability due to its implicit role.

```html
<sbb-tab>
  <section>Content</section>
</sbb-tab>
```

## Accessibility

The role and the id for the `aria-controls` attribute is managed directly by the `sbb-tab-group` component.

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                         | Default | Description                                  |
| ------- | --------- | ------- | ---------------------------- | ------- | -------------------------------------------- |
| `label` | -         | public  | `SbbTabLabelElement \| null` | `null`  | The `sbb-tab-label` associated with the tab. |

## Slots

| Name | Description                              |
| ---- | ---------------------------------------- |
|      | Use the unnamed slot to provide content. |
