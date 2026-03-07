### sbb-flip-card

The `sbb-flip-card` component displays an informative card that reveals more information when clicked or toggled programmatically.

```html
<sbb-flip-card>
  <sbb-flip-card-summary>
    <sbb-title> Card Title </sbb-title>
    <sbb-image slot="image" image-src="..." alt="..."></sbb-image>
  </sbb-flip-card-summary>
  <sbb-flip-card-details> Some additional text. </sbb-flip-card-details>
</sbb-flip-card>
```

With the `sbb-flip-card-summary` you can optionally add an overlapping `sbb-chip-label` by wrapping the
`sbb-image` in a `figure` tag (see [sbb-image doc](/docs/elements-sbb-image--docs#utility%classes)).

```html
<sbb-flip-card>
  <sbb-flip-card-summary>
    ...
    <figure class="sbb-figure" slot="image">
      <sbb-image
        image-src="https://cdn.img.sbb.ch/content/dam/internet/externe-assets/lyne/Bahnhof-Luzern.jpg"
        alt="Station of Lucerne from outside"
      ></sbb-image>
      <sbb-chip-label class="sbb-figure-overlap-start-start">...</sbb-chip-label>
    </figure>
  </sbb-flip-card-summary>
</sbb-flip-card>
```

## Style

The `sbb-flip-card` component has a predefined minimum height that can be customized by specifying the `min-height` property directly in the style of the host element with a custom height. Alternatively, when used within a CSS grid layout alongside other cards, the height can be adjusted using the `grid-template-rows` property. For consistent behavior and flexibility, it is recommended to use the `minmax()` function, for example: `grid-template-rows: minmax(320px, 1fr)`.

```html
<div
  style="display: grid; grid-template-rows: minmax(320px, 1fr); grid-template-columns: repeat(2, 1fr);"
>
  <sbb-flip-card>
    <sbb-flip-card-summary>
      <sbb-title> Card Title </sbb-title>
      <sbb-image slot="image" image-src="..." alt="..."></sbb-image>
    </sbb-flip-card-summary>
    <sbb-flip-card-details> Some additional text. </sbb-flip-card-details>
  </sbb-flip-card>

  <sbb-flip-card>
    <sbb-flip-card-summary>
      <sbb-title> Card Title </sbb-title>
      <sbb-image slot="image" image-src="..." alt="..."></sbb-image>
    </sbb-flip-card-summary>
    <sbb-flip-card-details> Some additional text. </sbb-flip-card-details>
  </sbb-flip-card>
</div>
```

## Slots

The component will display the content slotted in the `summary` slot in the main view, and the content slotted inside the `details` slot after the card has been flipped.

## States

The `sbb-flip-card` will switch to the flipped state after the user clicks on it or after the `toggle` method is called.
