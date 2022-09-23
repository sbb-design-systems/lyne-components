# sbb-card

The `sbb-card` component is a generic content container; its task is to contain HTML elements related to a single subject.

Internally, it could be rendered as a link or as a button based on the value of the `href` attribute 
(as the [sbb-link](../sbb-link/readme.md)). When rendered as a button, consumers could listen to the emitted click event.

It has 6 size variant (from `xs` to `xxl`) base on the `size` attribute value,
and 2 background variants - white for default and milk for negative - based on the `negative` attribute value.
Consumers could also conditionally set the value of the `active` attribute to display an active state on the component.

The `sbb-card-badge` component can be used via slot to display a badge in the upper right corner. 
Even if provided, it is never displayed when the `sbb-card` size attribute is set to `xs` or `s`.

## Usage

The examples below show how to render the component with and without the `<sbb-card-badge>` component.
In the first one, the `sbb-card` will be internally rendered as a button, in the second one as a link. 

```html
<sbb-card size="xl" negative>
  <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
  Card content
</sbb-card>

<sbb-card size="l" href="https://github.com/lyne-design-system/lyne-components" target="_blank">
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
| `active`                   | `active`                    | Used to set the component's active state.                                       | `boolean`                                    | `false`     |
| `download`                 | `download`                  | Whether the browser will show the download dialog on click.                     | `boolean`                                    | `undefined` |
| `form`                     | `form`                      | The <form> element to associate the button with.                                | `string`                                     | `undefined` |
| `href`                     | `href`                      | The href value you want to link to.                                             | `string`                                     | `undefined` |
| `idValue`                  | `id-value`                  | Id used to identify the inner element.                                          | `string`                                     | `undefined` |
| `name`                     | `name`                      | The name of the button.                                                         | `string`                                     | `undefined` |
| `negative`                 | `negative`                  | Option for set the component background color.                                  | `boolean`                                    | `undefined` |
| `rel`                      | `rel`                       | The relationship of the linked URL as space-separated link types.               | `string`                                     | `undefined` |
| `size`                     | `size`                      | Size variant, either xs, s, m, l, xl or xxl.                                    | `"l" \| "m" \| "s" \| "xl" \| "xs" \| "xxl"` | `'m'`       |
| `target`                   | `target`                    | Where to display the linked URL.                                                | `string`                                     | `undefined` |
| `type`                     | `type`                      | Default behaviour of the button.                                                | `"button" \| "reset" \| "submit"`            | `undefined` |
| `value`                    | `value`                     | The value associated with button `name` when it's submitted with the form data. | `string`                                     | `undefined` |


## Events

| Event                   | Description                                            | Type               |
| ----------------------- | ------------------------------------------------------ | ------------------ |
| `sbb-card-button_click` | Emits whenever the native button click event triggers. | `CustomEvent<any>` |


## Slots

| Slot        | Description                        |
| ----------- | ---------------------------------- |
| `"badge"`   | Slot to render `<sbb-card-badge>`. |
| `"unnamed"` | Slot to render the content.        |


----------------------------------------------


