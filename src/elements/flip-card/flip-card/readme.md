The `sbb-flip-card` component displays an informative card that reveals more informations when clicked or toggled programmatically.
It's meant to be used together with `sbb-flip-card-summary` and `sbb-flip-card-details`.

```html
<sbb-flip-card>
  <sbb-flip-card-summary>
    <sbb-title> Card Title </sbb-title>
    <sbb-image slot="image" image-src="..."></sbb-image>
  </sbb-flip-card-summary>
  <sbb-flip-card-details> Some additional text. </sbb-flip-card-details>
</sbb-flip-card>
```

## Slots

The component will display the content slotted in the `summary` slot in the main view, and the content slotted inside the `details` slot after the card has been flipped.

## States

The `sbb-flip-card` will switch to the flipped state after the user clicks on it or after the `toggle` method is called. Once the component is flipped, it will have the attribute `data-flipped`, which is for internal use only, so it should not be set by hand.

<!-- Auto Generated Below -->

## Properties

| Name      | Attribute | Privacy | Type                        | Default | Description                                |
| --------- | --------- | ------- | --------------------------- | ------- | ------------------------------------------ |
| `details` | -         | public  | `SbbFlipCardDetailsElement` |         | Returns the slotted sbb-flip-card-details. |
| `summary` | -         | public  | `SbbFlipCardSummaryElement` |         | Returns the slotted sbb-flip-card-summary. |

## Methods

| Name     | Privacy | Description                             | Parameters | Return | Inherited From |
| -------- | ------- | --------------------------------------- | ---------- | ------ | -------------- |
| `toggle` | public  | Toggles the state of the sbb-flip-card. |            | `void` |                |

## Slots

| Name      | Description                                                 |
| --------- | ----------------------------------------------------------- |
| `details` | Use this slot to provide a sbb-flip-card-details component. |
| `summary` | Use this slot to provide a sbb-flip-card-summary component. |
