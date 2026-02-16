The `sbb-carousel-item` represents a single item within a [sbb-carousel](/docs/elements-sbb-carousel-sbb-carousel--docs);
it is meant to be slotted in a [sbb-carousel-list](/docs/elements-sbb-carousel-sbb-carousel-list--docs).

```html
<sbb-carousel-item>
  <img src="../image.jpg" alt="SBB image" height="300" width="400" />
</sbb-carousel-item>

<sbb-carousel-item>
  <sbb-image
    image-src="../image.jpg"
    alt="SBB image"
    style="width: 800px; height: 600px;"
  ></sbb-image>
</sbb-carousel-item>

<sbb-carousel-item>
  <div class="sbb-image">
    <img src="../image.jpg" alt="SBB image" height="300" width="400" />
    <figcaption>Caption for picture</figcaption>
  </div>
</sbb-carousel-item>
```

## Slots

The content is projected in an unnamed slot.

The component supports native `img` tags, `sbb-image`, `picture` and also custom content, appropriately formatted;
since it doesn't have a fixed size, it's important for consumers to define the dimensions of slotted images to correctly render the component.

## Events

The component provides two events, named `beforeshow` and `show`; their emission is related to scroll events in the `sbb-carousel-list`.

## Accessibility

Following the [ARIA carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/),
the component has `role="group"` and `aria-roledescription="slide"`.
If the `aria-label` attribute is not provided, it is set by the `sbb-carousel-list` with a default text.

<!-- Auto Generated Below -->

## Events

| Name         | Type                                      | Description                                                  | Inherited From |
| ------------ | ----------------------------------------- | ------------------------------------------------------------ | -------------- |
| `beforeshow` | `CustomEvent<SbbCarouselItemEventDetail>` | Event emitted when the item is starting scrolling.           |                |
| `show`       | `CustomEvent<SbbCarouselItemEventDetail>` | Event emitted when the item is full visible after scrolling. |                |

## Slots

| Name | Description                                                                                |
| ---- | ------------------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add images for the carousel, as <img>, <sbb-image>, <picture>, ... |
