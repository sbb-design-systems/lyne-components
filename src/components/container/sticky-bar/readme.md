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
Optionally the user can set the `color` property on the `sbb-sticky-bar` in order to override the one inherited by the `sbb-container`. The color is only applied when the sticky bar is sticking, and will become transparent once it settles on the bottom of the container.

<!-- Auto Generated Below -->

## Properties

| Name               | Attribute           | Privacy | Type                             | Default | Description                                          |
| ------------------ | ------------------- | ------- | -------------------------------- | ------- | ---------------------------------------------------- |
| `color`            | `color`             | public  | `'white' \| 'milk' \| undefined` |         | Color of the container, like transparent, white etc. |
| `disableAnimation` | `disable-animation` | public  | `boolean`                        | `false` | Whether the animation is enabled.                    |

## Slots

| Name | Description                                            |
| ---- | ------------------------------------------------------ |
|      | Use the unnamed slot to add content to the sticky bar. |
