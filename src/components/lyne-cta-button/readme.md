# lyne-cta-button



<!-- Auto Generated Below -->


## Usage

### Usage

Use it like this: `<lyne-cta-button label="My button text"></lyne-cta-button>`

This is a sample code block:
```bash
npm install
```

```javascript
const foo = "bar";
```



## Properties

| Property          | Attribute          | Description                                         | Type                                                                                                                                                     | Default                 |
| ----------------- | ------------------ | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `disabled`        | `disabled`         | Set to true to get a disabled button                | `boolean`                                                                                                                                                | `false`                 |
| `eventId`         | `event-id`         | Id which is send in the click event payload         | `string`                                                                                                                                                 | `undefined`             |
| `icon`            | `icon`             | Define if icon should be shown or not               | `boolean`                                                                                                                                                | `false`                 |
| `iconDescription` | `icon-description` | Define if icon should be shown or not               | `string`                                                                                                                                                 | `undefined`             |
| `label`           | `label`            | Label text to show on the button                    | `string`                                                                                                                                                 | `'Default button text'` |
| `size`            | `size`             | Size variant, either large or small.                | `"large" \| "small"`                                                                                                                                     | `'large'`               |
| `variant`         | `variant`          | Variant of the button, like primary, secondary etc. | `"primary" \| "primary-negative" \| "secondary" \| "secondary-negative" \| "tertiary" \| "tertiary-negative" \| "transparent" \| "transparent-negative"` | `'primary'`             |


## Slots

| Slot        | Description                                              |
| ----------- | -------------------------------------------------------- |
| `"unnamed"` | Slot to render svg icon. You must pass an <svg> element. |


----------------------------------------------


