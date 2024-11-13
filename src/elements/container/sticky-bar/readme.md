The `sbb-sticky-bar` is a component meant to be slotted inside a `sbb-container` component.
It is displayed with sticky positioning at the bottom of the container that contains it.

```html
<sbb-container>
  <sbb-sticky-bar>
    <!-- Sticky bar content. -->
  </sbb-sticky-bar>
</sbb-container>
```

## Opening and closing

`Opened` in terms of the sticky bar means that the sticky bar has `position: sticky`.
If closed, the sticky bar has `position: relative` which means that it can't get sticky anymore.
As the opening and closing are animated, consumers can in certain situations control the state of the sticky bar
by calling `close()` or `open()` to e.g. fade the sticky bar out and remove it
from DOM afterward by listening to `didClose` event.
Whenever the sticky bar is not sticky, changing the state doesn't have any visual effect.

## Slots

The `sbb-sticky-bar` content is provided via an unnamed slot.

## Style

The `sbb-sticky-bar` inherits its variant from the `sbb-container` it's placed in.
Optionally the user can set the `color` property on the `sbb-sticky-bar` in order to override the one inherited by the `sbb-container`. The color is only applied when the sticky bar is sticking, and will become transparent once it settles on the bottom of the container.

<!-- Auto Generated Below -->

## Properties

| Name     | Attribute | Privacy | Type                        | Default | Description                                          |
| -------- | --------- | ------- | --------------------------- | ------- | ---------------------------------------------------- |
| `color`  | `color`   | public  | `'white' \| 'milk' \| null` | `null`  | Color of the container, like transparent, white etc. |
| `isOpen` | -         | public  | `boolean`                   |         | Whether the element is open.                         |

## Methods

| Name    | Privacy | Description                                                  | Parameters | Return | Inherited From          |
| ------- | ------- | ------------------------------------------------------------ | ---------- | ------ | ----------------------- |
| `close` | public  | Animates `position: sticky` to normal content flow position. |            | `void` | SbbOpenCloseBaseElement |
| `open`  | public  | Animates from content flow position to `position: sticky`.   |            | `void` | SbbOpenCloseBaseElement |

## Events

| Name        | Type                | Description                                               | Inherited From          |
| ----------- | ------------------- | --------------------------------------------------------- | ----------------------- |
| `didClose`  | `CustomEvent<void>` | Emits when the closing animation ends.                    | SbbOpenCloseBaseElement |
| `didOpen`   | `CustomEvent<void>` | Emits when the opening animation ends.                    | SbbOpenCloseBaseElement |
| `willClose` | `CustomEvent<void>` | Emits when the closing animation starts. Can be canceled. | SbbOpenCloseBaseElement |
| `willOpen`  | `CustomEvent<void>` | Emits when the opening animation starts. Can be canceled. | SbbOpenCloseBaseElement |

## CSS Properties

| Name                                         | Default                            | Description                                                                                                                                                                                     |
| -------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-sticky-bar-bottom-overlapping-height` | `0px`                              | Define an additional area where the sticky bar overlaps the following content on the bottom. This area becomes visible when the sticky bar transitions from sticky to the normal document flow. |
| `--sbb-sticky-bar-padding-block`             | `var(--sbb-spacing-responsive-xs)` | Block padding of the sticky bar.                                                                                                                                                                |
| `--sbb-sticky-bar-z-index`                   |                                    | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable.                                                                                                 |

## Slots

| Name | Description                                            |
| ---- | ------------------------------------------------------ |
|      | Use the unnamed slot to add content to the sticky bar. |
