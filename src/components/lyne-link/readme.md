# lyne-link



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute        | Description                                                                                                                              | Type                       | Default      |
| ------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| `hrefValue` _(required)_ | `href-value`     | The href value you want to link to                                                                                                       | `string`                   | `undefined`  |
| `icon`                   | `icon`           | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/ | `string`                   | `undefined`  |
| `iconFlip` _(required)_  | `icon-flip`      | Decide whether the icon should get flipped horizontally if the document writing mode is changed from ltr to rtl or vice versa.           | `boolean`                  | `undefined`  |
| `iconPlacement`          | `icon-placement` | The icon can either be place before or after the text                                                                                    | `"left" \| "right"`        | `'left'`     |
| `text` _(required)_      | `text`           | The link text we want to visually show                                                                                                   | `string`                   | `undefined`  |
| `textSize`               | `text-size`      | Text size, the link should get in the non button variation.                                                                              | `"m" \| "s" \| "xs"`       | `'m'`        |
| `variant`                | `variant`        | Choose the link style variant                                                                                                            | `"negative" \| "positive"` | `'positive'` |


## Slots

| Slot     | Description                                  |
| -------- | -------------------------------------------- |
| `"icon"` | Slot used to display the icon, if one is set |


----------------------------------------------


