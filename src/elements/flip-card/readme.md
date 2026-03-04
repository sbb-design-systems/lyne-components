### sbb-flip-card-summary

The `sbb-flip-card-summary`, when used inside a [sbb-flip-card](/docs/elements-sbb-flip-card-sbb-flip-card--docs), shows its contents when the card is not flipped.
The component's slot is implicitly set to `"summary"`.

```html
<sbb-flip-card>
  <sbb-flip-card-summary>
    <sbb-title> Card Title </sbb-title>
    <sbb-image slot="image" image-src="..." alt="..."></sbb-image>
  </sbb-flip-card-summary>
</sbb-flip-card>
```

## Slots

Use the unnamed slot to provide a title and the `image` slot to provide an image (via either `sbb-image` or `img`).

Optionally, you can add an overlapping `sbb-chip-label` by wrapping the `sbb-image` in a `figure` tag (see [sbb-image doc](/docs/elements-sbb-image--docs#utility%classes)).

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



### sbb-flip-card-details

The `sbb-flip-card-details`, when used inside a [sbb-flip-card](/docs/elements-sbb-flip-card-sbb-flip-card--docs), will show its contents when the card is flipped.
The component's slot is implicitly set to `"details"`.

```html
<sbb-flip-card>
  <sbb-flip-card-details>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat ipsum rhoncus viverra
    dapibus. Aenean id nibh ac tortor elementum vestibulum eu vitae dui. Integer tellus ex, bibendum
    eget purus id, pellentesque interdum tortor. Sed bibendum neque nisi, ac egestas magna consequat
    eu.
    <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
  </sbb-flip-card-details>
</sbb-flip-card>
```



### sbb-flip-card

The `sbb-flip-card` component displays an informative card that reveals more information when clicked or toggled programmatically.
It's meant to be used together with [sbb-flip-card-summary](/docs/elements-sbb-flip-card-sbb-flip-card-summary--docs) and [sbb-flip-card-details](/docs/elements-sbb-flip-card-sbb-flip-card-details--docs).

```html
<sbb-flip-card>
  <sbb-flip-card-summary>
    <sbb-title> Card Title </sbb-title>
    <sbb-image slot="image" image-src="..." alt="..."></sbb-image>
  </sbb-flip-card-summary>
  <sbb-flip-card-details> Some additional text. </sbb-flip-card-details>
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

