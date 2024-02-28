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
<sbb-link-button type="button" name="tickets" form="buy" value="tickets">
  Travel-cards and tickets
</sbb-link-button>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute  | Privacy | Type                  | Default    | Description                                                                                                                |
| ---------- | ---------- | ------- | --------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `size`     | `size`     | public  | `SbbLinkSize`         | `'s'`      | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used. |
| `negative` | `negative` | public  | `boolean`             | `false`    | Negative coloring variant flag.                                                                                            |
| `disabled` | `disabled` | public  | `boolean`             | `false`    | Whether the component is disabled.                                                                                         |
| `type`     | `type`     | public  | `SbbButtonType`       | `'button'` | The type attribute to use for the button.                                                                                  |
| `name`     | `name`     | public  | `string \| undefined` |            | The name attribute to use for the button.                                                                                  |
| `value`    | `value`    | public  | `string \| undefined` |            | The value attribute to use for the button.                                                                                 |
| `form`     | `form`     | public  | `string \| undefined` |            | The <form> element to associate the button with.                                                                           |

## Slots

| Name | Description                                                   |
| ---- | ------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-link-button`. |
