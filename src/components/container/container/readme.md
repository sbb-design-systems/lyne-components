The `sbb-container` is a component that displays its content with the default page spacing. It also supports the slotting of a `sbb-sticky-bar`.

```html
<sbb-container>
  <!-- Any other kind of content. -->
  ...

  <!-- Sticky bar should go last. -->
  <sbb-sticky-bar> ... </sbb-sticky-bar>
</sbb-container>
```

## Slots

The `sbb-container` content is provided via an unnamed slot.

## Style

By default `sbb-container` uses the `page spacing` defined in the [layout documentation](/docs/styles-layout--docs). Optionally the user can use the `expanded` property (default: `false`) to switch to the `page spacing expanded` layout.
Spacing options are applied to all of the container's content, including the `sbb-sticky-bar`.
The component has also four color variants that can be set using the `variant` property (default: `transparent`).

```html
<sbb-container expanded variant="milk"> ... </sbb-container>
```

## Accessibility

Since the element's order in the DOM is also used to determine the keyboard navigation order, it's crucial to put the `sbb-sticky-bar` last in the slotted content.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type                                               | Default         | Description                                          |
| ---------- | ---------- | ------- | -------------------------------------------------- | --------------- | ---------------------------------------------------- |
| `expanded` | `expanded` | public  | `boolean`                                          | `false`         | Whether the container is expanded.                   |
| `color`    | `color`    | public  | `'transparent' \| 'white' \| 'milk' \| 'midnight'` | `'transparent'` | Color of the container, like transparent, white etc. |

## Slots

| Name         | Description                                            |
| ------------ | ------------------------------------------------------ |
|              | Use the unnamed slot to add anything to the container. |
| `sticky-bar` | The slot used by the sbb-sticky-bar component.         |
