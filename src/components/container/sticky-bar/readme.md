The `sbb-sticky-bar` is a component meant to be slotted inside a `sbb-container` component.
It is displayed with sticky positioning at the bottom of the container that contains it.

```html
<sbb-container>
  <sbb-sticky-bar>
    <!-- Sticky bar content. -->
  </sbb-sticky-bar>
</sbb-container>
```

## Slots

The `sbb-sticky-bar` content is provided via an unnamed slot.

## Style

The `sbb-sticky-bar` inherits its variant from the `sbb-container` it's placed in.

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                                           | Default | Description                                          |
| ------- | --------- | ------- | ---------------------------------------------- | ------- | ---------------------------------------------------- |
| `color` | `color`   | public  | `'white' \| 'milk' \| 'midnight' \| undefined` |         | Color of the container, like transparent, white etc. |

## Slots

| Name | Description                                            |
| ---- | ------------------------------------------------------ |
|      | Use the unnamed slot to add content to the sticky bar. |
