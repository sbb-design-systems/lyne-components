The `sbb-carousel` is a slideshow component that can be used to display a series of items, as images, once at a time,
allowing users to cycle through them via horizontal scrolling or using controls (e.g. a paginator).

The component must be used together with a [sbb-carousel-list](/docs/elements-sbb-carousel-sbb-carousel-list--docs),
which accepts one or more [sbb-carousel-item](/docs/elements-sbb-carousel-sbb-carousel-item--docs),
and a [sbb-compact-paginator](/docs/elements-sbb-paginator-sbb-compact-paginator--docs).

```html
<sbb-carousel>
  <sbb-carousel-list>
    <sbb-carousel-item>
      <img src="../img-1.jpg" alt="SBB image" height="300" width="400" />
    </sbb-carousel-item>
    <sbb-carousel-item>
      <img src="../img-2.jpg" alt="SBB image" height="300" width="400" />
    </sbb-carousel-item>
    <sbb-carousel-item>
      <img src="../img-3.jpg" alt="SBB image" height="300" width="400" />
    </sbb-carousel-item>
  </sbb-carousel-list>
  <sbb-compact-paginator></sbb-compact-paginator>
</sbb-carousel>
```

## Slots

The content is projected in an unnamed slot.

The `sbb-compact-paginator`'s properties are automatically set based on the number of slotted images.

## Interactions

No interaction or keyboard interaction is provided, except from the usage of the paginator to switch between items.

## Accessibility

Following the [ARIA carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/),
the component has `role="region"` and `aria-label="carousel"`.

<!-- Auto Generated Below -->

## Properties

| Name     | Attribute | Privacy | Type      | Default | Description                                        |
| -------- | --------- | ------- | --------- | ------- | -------------------------------------------------- |
| `shadow` | `shadow`  | public  | `boolean` | `false` | Used to display a box-shadow around the component. |

## Slots

| Name | Description                                                                             |
| ---- | --------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add the `sbb-carousel-list` and a `sbb-paginator` for controls. |
