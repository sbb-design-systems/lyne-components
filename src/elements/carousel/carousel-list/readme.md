The `sbb-carousel-list` is a wrapper component for [sbb-carousel-item](/docs/elements-sbb-carousel-sbb-carousel-item--docs),
and it's meant to be used within a [sbb-carousel](/docs/elements-sbb-carousel-sbb-carousel--docs).

```html
<sbb-carousel-list>
  <sbb-carousel-item>
    <img src="../image-0.jpg" alt="SBB image" height="300" width="400" />
  </sbb-carousel-item>
  <sbb-carousel-item>
    <img src="../image-1.jpg" alt="SBB image" height="300" width="400" />
  </sbb-carousel-item>
  <sbb-carousel-item>
    <img src="../image-2.jpg" alt="SBB image" height="300" width="400" />
  </sbb-carousel-item>
</sbb-carousel-list>
```

## Slots

The content is projected in the unnamed slot.

## Style

The carousel determines its dimensions by reading the dimensions from the first slotted `sbb-carousel-item` element.
It is the consumers' responsibility to set the correct height and width of the items, and to ensure that they are all the same size.

These dimensions are read only once, when the component is first connected to the DOM or first becomes visible.
In special cases, such as when the carousel size needs to be responsive, it is recommended to manually
set the width and height CSS properties on the `sbb-carousel-list` element.
Manually set dimensions will take precedence over the automatically read dimensions.

## Events

The `sbb-carousel-list` component takes care of the emission of the `beforeshow` and `show` events on the slotted `sbb-carousel-item`s.

An `IntersectionController` manages the emission of both, with different thresholds (0.01 for `beforeshow` and 0.99 for `show`).

## Accessibility

Following the [ARIA carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/),
the component has `aria-atomic='true'` and `aria-live='polite'`.
If no `aria-label` is provided on the slotted `sbb-carousel-item`s, the component set a default value on them.

<!-- Auto Generated Below -->

## Slots

| Name | Description                                               |
| ---- | --------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-carousel-item` elements. |
