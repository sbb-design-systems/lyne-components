The `sbb-link-button` component provides the same functionality as a native `<button>`,
despite its appearance as a link enhanced with the SBB Design.

## Slots

The text is provided via an unnamed slot.

```html
<sbb-link-button value="help"> Help </sbb-link-button>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-link-button disabled>Refunds</sbb-link-button>
```

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-link-button name="tickets" form="buy" value="tickets">
  Travel-cards and tickets
</sbb-link-button>
```

## Accessibility

### Disabled buttons

Generally speaking, `disabled` elements are considered a bad pattern for a11y. They are invisible to assistive
technology and do not provide the reason for which they are disabled.
To partially address the problem, disabled elements are kept focusable (other interactions are still prevented).
However, it is still the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type                  | Default    | Description                                                                                                                |
| ---------- | ---------- | ------- | --------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `disabled` | public  | `boolean`             | `false`    | Whether the component is disabled.                                                                                         |
| `form`     | `form`     | public  | `string \| undefined` |            | The <form> element to associate the button with.                                                                           |
| `name`     | `name`     | public  | `string`              |            | The name of the button element.                                                                                            |
| `negative` | `negative` | public  | `boolean`             | `false`    | Negative coloring variant flag.                                                                                            |
| `size`     | `size`     | public  | `SbbLinkSize`         | `'s'`      | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used. |
| `type`     | `type`     | public  | `SbbButtonType`       | `'button'` | The type attribute to use for the button.                                                                                  |
| `value`    | `value`    | public  | `string`              |            | The value of the button element.                                                                                           |

## Slots

| Name | Description                                                   |
| ---- | ------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-link-button`. |
