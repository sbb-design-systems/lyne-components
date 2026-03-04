The `sbb-carousel` is a slideshow component that can be used to display a
series of items, as images, once at a time, allowing users to cycle
through them via horizontal scrolling or using controls (e.g. a paginator).

The component must be used together with a
[sbb-compact-paginator](/docs/elements-sbb-paginator-sbb-compact-paginator--docs)
and a `sbb-carousel-list`, which accepts one or more `sbb-carousel-item`.

```html
<sbb-carousel>
  <sbb-carousel-list>
    <sbb-carousel-item>
      <img src="../img-1.jpg" alt="Image 1" height="300" width="400" />
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
  </sbb-carousel-list>
  <sbb-compact-paginator></sbb-compact-paginator>
</sbb-carousel>
```

The `length` and the `pageSize` properties of the `sbb-compact-paginator`
are automatically set based on the number of slotted images.

The values of the `accessibilityPageLabel`, `accessibilityPreviousPageLabel` and `accessibilityNextPageLabel` properties
are also set, in order to automatically override the 'page' keyword to the 'slide' one.
If needed, consumers can provide their own values.

The `sbb-carousel-item` supports native `img` tags, `sbb-image`, `picture`
and also custom content, appropriately formatted.
Since it doesn't have a fixed size, it's important for consumers to define
the dimensions of slotted images to correctly render the component.

## Interactions

It's possible to switch between items using the paginator controls, or, if the component is focused, using the arrow keys.

| Keyboard                            | Action                         |
| ----------------------------------- | ------------------------------ |
| <kbd>Down Arrow / Right Arrow</kbd> | Navigate to the next item.     |
| <kbd>Up Arrow / Left Arrow</kbd>    | Navigate to the previous item. |

## Events

The `sbb-carousel-item` component provides the two events `beforeshow`
and `show`; their dispatch is related to scroll events in the
`sbb-carousel-list`.
The `beforeshow` is dispatched when an item is being scrolled into view
and the `show` is dispatched when the item is fully visible.

## Style

The carousel determines its dimensions by reading the dimensions from the first slotted `sbb-carousel-item` element.
It is the consumers' responsibility to set the correct height and width of the items, and to ensure that they are all the same size.

These dimensions are read only once, when the component is first connected to the DOM or first becomes visible.
In special cases, such as when the carousel size needs to be responsive, it is recommended to manually
set the width and height CSS properties on the `sbb-carousel-list` element.
Manually set dimensions will take precedence over the automatically read dimensions.

## Accessibility

Following the [ARIA carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/),
the `sbb-carousel` component has `role="region"` and `aria-label="carousel"` and the `sbb-carousel-list` component has `aria-atomic='true'` and `aria-live='polite'`.
If no `aria-label` is provided on the slotted `sbb-carousel-item` 
instances, the component sets a default value on them..

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
