# lyne-card-badge



<!-- Auto Generated Below -->


## Properties

| Property                          | Attribute             | Description                                                                                                                                                                                                                                                                                                             | Type                              | Default     |
| --------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `accessibilityLabel` _(required)_ | `accessibility-label` | Accessibility label text. This text gets exposed to screen reader users. The text should reflect all the information which gets passed into the component (as text or within the slot) so which is visible in the card badge, either through text or iconography.  Example text: Sales ticket price starts at CHF 37.50 | `string`                          | `undefined` |
| `appearance`                      | `appearance`          | Badge appearance                                                                                                                                                                                                                                                                                                        | `"primary" \| "primary-negative"` | `'primary'` |
| `isDiscount`                      | `is-discount`         | Mark as discount                                                                                                                                                                                                                                                                                                        | `boolean`                         | `undefined` |
| `price`                           | `price`               | Price text                                                                                                                                                                                                                                                                                                              | `string`                          | `undefined` |
| `size`                            | `size`                | Badge size                                                                                                                                                                                                                                                                                                              | `"regular"`                       | `'regular'` |
| `text`                            | `text`                | From/above price text                                                                                                                                                                                                                                                                                                   | `string`                          | `undefined` |


## Slots

| Slot        | Description                                                                                                                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"generic"` | Slot used to render generic content. Since this slot is wrapped within a `span` only inline elements are allowed to be passed within this slot. Check https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements |


----------------------------------------------


