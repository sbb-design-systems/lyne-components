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

The content is projected in an unnamed slot.

The component gets its dimensions by setting the `--sbb-carousel-list-height` and `--sbb-carousel-list-width` variables
looking at the first slotted `sbb-carousel-item`.
It's a consumers' responsibility to set the correct height/width of the items, and make sure that they are all the same size.

## Events

The `sbb-carousel-list` component takes care of the emission of the `beforeshow` and `show` events on the slotted `sbb-carousel-item`s.

An `IntersectionController` manages the emission of both, with different thresholds (0.01 for `beforeshow` and 1 for `show`).

## Accessibility

Following the [ARIA carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/),
the component has `aria-atomic='false'` and `aria-live='polite'`.
If no `aria-label` is provided on the slotted `sbb-carousel-item`s, the component set a default value on them.

<!-- Auto Generated Below -->

## Slots

| Name | Description                                               |
| ---- | --------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-carousel-item` elements. |
