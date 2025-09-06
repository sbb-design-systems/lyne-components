The `sbb-carousel` is a slideshow component that can be used to display a series of items, as images, once at a time,
allowing users to cycle through them via horizontal scrolling or using controls (e.g. a paginator).

The component must be used together with a [sbb-compact-paginator](/docs/elements-sbb-paginator-sbb-compact-paginator--docs) and a [sbb-carousel-list](/docs/elements-sbb-carousel-sbb-carousel-list--docs),
which accepts one or more [sbb-carousel-item](/docs/elements-sbb-carousel-sbb-carousel-item--docs).

```html
<sbb-carousel>
  <sbb-carousel-list>
    <sbb-carousel-item>
      <img src="../img-1.jpg" alt="Image 1" height="300" width="400" />
    </sbb-carousel-item>
    <sbb-carousel-item>
      <img src="../img-2.jpg" alt="Image 2" height="300" width="400" />
    </sbb-carousel-item>
    <sbb-carousel-item>
      <img src="../img-3.jpg" alt="Image 3" height="300" width="400" />
    </sbb-carousel-item>
  </sbb-carousel-list>
  <sbb-compact-paginator
    accessibility-page-label="Slide"
    accessibility-previous-page-label="Previous slide"
    accessibility-next-page-label="Next slide"
  ></sbb-compact-paginator>
</sbb-carousel>
```

## Slots

The content is projected in an unnamed slot.

The `length` and the `pageSize` properties of the `sbb-compact-paginator` are automatically set based on the number of slotted images.

## Interactions

No interaction or keyboard interaction is provided, except from the usage of the paginator to switch between items.

## Accessibility

Following the [ARIA carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/),
the component has `role="region"` and `aria-label="carousel"`.

It's strongly recommended to set the values of the `accessibilityPageLabel`, `accessibilityPreviousPageLabel` and
`accessibilityNextPageLabel` properties on the paginator based on the projected content (e.g. using the 'slide' keyword).

To not break the accessibility when links are used together with images, please place the image within the anchor tag.

```html
<sbb-carousel>
  <sbb-carousel-list>
    <sbb-carousel-item>
      <a href="#" target="_blank">
        <img src="../img-1.jpg" alt="SBB image" height="300" width="400" />
      </a>
    </sbb-carousel-item>
    ...
</sbb-carousel>
```

<!-- Auto Generated Below -->

## Properties

| Name     | Attribute | Privacy | Type      | Default | Description                                        |
| -------- | --------- | ------- | --------- | ------- | -------------------------------------------------- |
| `shadow` | `shadow`  | public  | `boolean` | `false` | Used to display a box-shadow around the component. |

## Slots

| Name | Description                                                                             |
| ---- | --------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add the `sbb-carousel-list` and a `sbb-paginator` for controls. |
