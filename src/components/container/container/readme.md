The `sbb-container` is a component that displays its content with the default page spacing. It also supports the slotting of a `sbb-sticky-bar`.

```html
<sbb-container>
  <!-- Any other kind of content. -->
  ...

  <!-- Sticky bar should go last. -->
  <sbb-sticky-bar> ... </sbb-sticky-bar>
</sbb-container>
```

## Style

The component has two spacing variants, that can be set using the `expanded` property (default: `false`). This spacing is applied to all of its content, including the `sbb-sticky-bar`.

```html
<sbb-container expanded> ... </sbb-container>
```

## Accessibility

Since the element's order in the DOM is also used to determine the keyboard navigation order, it's crucial to put the `sbb-sticky-bar` last in the slotted content.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type                                               | Default         | Description                                            |
| ---------- | ---------- | ------- | -------------------------------------------------- | --------------- | ------------------------------------------------------ |
| `expanded` | `expanded` | public  | `boolean`                                          | `false`         | Whether the container is expanded.                     |
| `variant`  | `variant`  | public  | `'transparent' \| 'white' \| 'milk' \| 'midnight'` | `'transparent'` | Variant of the container, like transparent, white etc. |

## Slots

| Name | Description                                            |
| ---- | ------------------------------------------------------ |
|      | Use the unnamed slot to add anything to the container. |
