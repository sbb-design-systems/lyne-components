The `sbb-card` component is a generic content container; its task is to contain content related to a single subject.

```html
<sbb-card>Card content</sbb-card>
```

## Slots

The content is projected in an unnamed slot.
It's possible to use the component together with the `sbb-card-badge` and the `sbb-card-action`.

### With `sbb-card-badge`

The `sbb-card-badge` component can be used to display a badge in the upper right corner.
The badge is hidden with card sizes are `xs` or `s`.
For API details, see the [sbb-card-badge](/docs/components-sbb-card-sbb-card-badge--docs) docs.

```html
<sbb-card size="m" color="white">
  <sbb-card-badge>
    <span>%</span>
    <span>from CHF</span>
    <span>19.99</span>
  </sbb-card-badge>
  Card content
</sbb-card>
```

### With `sbb-card-action`

To add an action to a card, add a `sbb-card-action` to the main slot.
With the `sbb-card-action` all the card area becomes clickable.
For API details (mainly accessibility), see the [sbb-card-action](/docs/components-sbb-card-sbb-card-action--docs) docs.

```html
<sbb-card>
  <sbb-card-action href="https://www.sbb.ch"
    >Check all the wonderful trips available.</sbb-card-action
  >
  Buy trips
</sbb-card>
```

## Style

It's possible to choose among seven different values for the `size` property (from `xs` to `xxxl`, default `m`);
the choice mainly affects the content's padding.

```html
<sbb-card size="xs">Card content</sbb-card>
<sbb-card size="s">Card content</sbb-card>
<sbb-card size="m">Card content</sbb-card>
<sbb-card size="l">Card content</sbb-card>
<sbb-card size="xl">Card content</sbb-card>
<sbb-card size="xxl">Card content</sbb-card>
<sbb-card size="xxxl">Card content</sbb-card>
```

The component has four different values to choose from for the `color` property; default is `white`.

```html
<sbb-card color="milk">Card content</sbb-card>
<sbb-card color="transparent-bordered">Card content</sbb-card>
<sbb-card color="transparent-bordered-dashed">Card content</sbb-card>
```

## Accessibility

Normally, a `sbb-card` should be a single action, however, it's possible to place other interactive elements
in the card content. Interactive content will automatically be detected and made accessible to click / focus.
In cases where there should be only a visual button or link inside the card content without a different action, the
`is-static` attribute should be set (e.g. `<sbb-button is-static></sbb-button>`).

### Windows High Contrast Notes

In high contrast mode, all the content of a link or a button receives a specific color which overrides every other color.

However, as the content of the card is not directly inside the button or link,
this does not happen when the slotted content has a specific color set.
To improve coloring, it's needed to manually define styles for Window high contrast mode (setting `LinkText` or `ButtonText`).

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                                                                                          | Default   | Description                                        |
| ------- | --------- | ------- | --------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| `size`  | `size`    | public  | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'xxl' \| 'xxxl' \| undefined`                           | `'m'`     | Size variant, either xs, s, m, l, xl, xxl or xxxl. |
| `color` | `color`   | public  | `\| 'white'     \| 'milk'     \| 'transparent-bordered'     \| 'transparent-bordered-dashed'` | `'white'` | Option to set the component's background color.    |

## Slots

| Name     | Description                                            |
| -------- | ------------------------------------------------------ |
|          | Use the unnamed slot to add content to the card.       |
| `badge`  | Use this slot to render a `sbb-card-badge` component.  |
| `action` | Use this slot to render a `sbb-card-action` component. |
