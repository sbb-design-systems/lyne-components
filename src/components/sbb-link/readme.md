# sbb-link
Link will become a button if no hrefValue is given and no staticSpan flag is set.
Link will become a span if no hrefValue is given and no staticSpan flag is set to true.
  
<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute        | Description                                                                                                                                                                     | Type                                                           | Default     |
| ------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------- |
| `ariaText`               | `aria-text`      | The link text we want to visually show.                                                                                                                                         | `string`                                                       | `undefined` |
| `buttonName`             | `button-name`    | Name attribute if link is used as button                                                                                                                                        | `string`                                                       | `undefined` |
| `buttonType`             | `button-type`    | Type attribute if link is used as button                                                                                                                                        | `"button" \| "reset" \| "submit"`                              | `undefined` |
| `disabled`               | `disabled`       | Disabled attribute if link is used as button                                                                                                                                    | `boolean`                                                      | `undefined` |
| `download`               | `download`       | If set to true, the browser will show the download dialog on click.                                                                                                             | `boolean`                                                      | `undefined` |
| `formId`                 | `form-id`        | Form attribute if link is used as button                                                                                                                                        | `string`                                                       | `undefined` |
| `hrefValue` _(required)_ | `href-value`     | The href value you want to link to                                                                                                                                              | `string`                                                       | `undefined` |
| `icon`                   | `icon`           | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/. Inline variant doesn't support icons. | `string`                                                       | `undefined` |
| `iconFlip`               | `icon-flip`      | Decide whether the icon should get flipped horizontally if the document writing mode is changed from ltr to rtl or vice versa.                                                  | `boolean`                                                      | `undefined` |
| `iconPlacement`          | `icon-placement` | The icon can either be place before or after the text.                                                                                                                          | `"end" \| "start"`                                             | `'start'`   |
| `idValue`                | `id-value`       | Pass in an id, if you need to identify the link element.                                                                                                                        | `string`                                                       | `undefined` |
| `staticSpan`             | `static-span`    | If this is set to true an span element will be used instead of a anchor or a button                                                                                             | `boolean`                                                      | `undefined` |
| `textSize`               | `text-size`      | Text size, the link should get in the non button variation. With inline variant, the text size adapts to where it is used.                                                      | `"m" \| "s" \| "xs"`                                           | `'s'`       |
| `variant`                | `variant`        | Choose the link style variant.                                                                                                                                                  | `"block" \| "block-negative" \| "inline" \| "inline-negative"` | `'block'`   |


## Slots

| Slot     | Description                                  |
| -------- | -------------------------------------------- |
| `"icon"` | Slot used to display the icon, if one is set |


----------------------------------------------


