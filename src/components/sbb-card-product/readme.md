# sbb-card-product

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                                                                                                                                                                                                                           | Type                                                            | Default      |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------ |
| `accessibilityLabel` | `accessibility-label` | The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the component's slots and which is visible in the card, either through text or iconography.  Example text: Connection from X to Y, via Z, on date X. Ticket price starts at X. | `string`                                                        | `undefined`  |
| `appearance`         | `appearance`          | CardProduct appearance                                                                                                                                                                                                                                                                                | `"primary" \| "primary-negative"`                               | `'primary'`  |
| `ariaHaspopup`       | `aria-haspopup`       | If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.                                                                                                                                                         | `"dialog" \| "grid" \| "listbox" \| "menu" \| "tree" \| "true"` | `undefined`  |
| `cardProductId`      | `card-product-id`     | The ID value you want to reference                                                                                                                                                                                                                                                                    | `string`                                                        | `undefined`  |
| `eventId`            | `event-id`            | Id which is sent in the click event payload                                                                                                                                                                                                                                                           | `string`                                                        | `undefined`  |
| `hrefValue`          | `href-value`          | The href value you want to link to                                                                                                                                                                                                                                                                    | `string`                                                        | `undefined`  |
| `isButton`           | `is-button`           | Defines if the card behaves like a HTML button. Needs to be set true if the card does not point to a URL.                                                                                                                                                                                             | `boolean`                                                       | `undefined`  |
| `isDisabled`         | `is-disabled`         | Set to true to get a disabled button                                                                                                                                                                                                                                                                  | `boolean`                                                       | `false`      |
| `layout`             | `layout`              | CardProduct layout                                                                                                                                                                                                                                                                                    | `"loose" \| "standard"`                                         | `'standard'` |
| `name`               | `name`                | The name attribute to use for the button                                                                                                                                                                                                                                                              | `string`                                                        | `undefined`  |
| `type`               | `type`                | The type attribute to use for the button                                                                                                                                                                                                                                                              | `"button" \| "reset" \| "submit"`                               | `'button'`   |
| `value`              | `value`               | The value attribute to use for the button                                                                                                                                                                                                                                                             | `string`                                                        | `undefined`  |


## Slots

| Slot           | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| `"action"`     | Slot used to render the button                                               |
| `"card-badge"` | Slot used to render the optional card badge e.g. discounts                   |
| `"category"`   | Slot used to render the product category                                     |
| `"details"`    | Slot used to render the details                                              |
| `"icon"`       | Slot used to render the product icon                                         |
| `"lead"`       | Slot used to render the lead text                                            |
| `"text"`       | Slot used to render product contents — only inline HTML elements are allowed |
| `"title"`      | Slot used to render the title                                                |


----------------------------------------------


