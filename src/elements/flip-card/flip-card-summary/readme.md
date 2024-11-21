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

Use the unnamed slot of `sbb-flip-card-summary` to provide a title and, optionally, the `image` slot to provide an image (via either `sbb-image` or `img`).

<!-- Auto Generated Below -->

## Properties

| Name             | Attribute         | Privacy | Type                        | Default   | Description                             |
| ---------------- | ----------------- | ------- | --------------------------- | --------- | --------------------------------------- |
| `imageAlignment` | `image-alignment` | public  | `SbbFlipCardImageAlignment` | `'after'` | The position where to render the image. |

## Slots

| Name    | Description                                                              |
| ------- | ------------------------------------------------------------------------ |
|         | Use the unnamed slot to provide a title for the `sbb-flip-card-summary`. |
| `image` | Use this slot to provide an image for the `sbb-flip-card-summary`.       |
