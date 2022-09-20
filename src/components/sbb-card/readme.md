# sbb-card

The `sbb-card` component is a generic content container; its task is to contain HTML elements related to a single subject. 

The `sbb-card-badge` component can be used via slot to display a badge in the upper right corner.

## Usage

The example below show how to render the component with `<sbb-card-badge>`:

```html
<sbb-card>
  <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
  Card content
</sbb-card>
```

<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                   | Description                                                                     | Type                                         | Default     |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `accessibilityDescribedby` | `accessibility-describedby` | This will be forwarded as aria-describedby to the relevant nested element.      | `string`                                     | `undefined` |
| `accessibilityLabel`       | `accessibility-label`       | This will be forwarded as aria-label to the relevant nested element.            | `string`                                     | `undefined` |
| `accessibilityLabelledby`  | `accessibility-labelledby`  | This will be forwarded as aria-labelledby to the relevant nested element.       | `string`                                     | `undefined` |
| `download`                 | `download`                  | Whether the browser will show the download dialog on click.                     | `boolean`                                    | `undefined` |
| `form`                     | `form`                      | The <form> element to associate the button with.                                | `string`                                     | `undefined` |
| `href`                     | `href`                      | The href value you want to link to.                                             | `string`                                     | `undefined` |
| `idValue`                  | `id-value`                  | Id used to identify the inner element.                                          | `string`                                     | `undefined` |
| `name`                     | `name`                      | The name of the button.                                                         | `string`                                     | `undefined` |
| `rel`                      | `rel`                       | The relationship of the linked URL as space-separated link types.               | `string`                                     | `undefined` |
| `size`                     | `size`                      | Size variant, either xs, s, m, l, xl or xxl.                                    | `"l" \| "m" \| "s" \| "xl" \| "xs" \| "xxl"` | `'m'`       |
| `target`                   | `target`                    | Where to display the linked URL.                                                | `string`                                     | `undefined` |
| `type`                     | `type`                      | Default behaviour of the button.                                                | `"button" \| "reset" \| "submit"`            | `undefined` |
| `value`                    | `value`                     | The value associated with button `name` when it's submitted with the form data. | `string`                                     | `undefined` |


## Events

| Event                   | Description                                                                                                          | Type               |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `sbb-card-button_click` | Emits whenever the native button click event triggers. TODO: similar to the one in sbb-button. To be fixed together. | `CustomEvent<any>` |


## Slots

| Slot        | Description                        |
| ----------- | ---------------------------------- |
| `"badge"`   | Slot to render `<sbb-card-badge>`. |
| `"unnamed"` | Slot to render the content.        |


----------------------------------------------


