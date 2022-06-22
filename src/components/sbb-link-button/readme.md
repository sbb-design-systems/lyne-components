# sbb-link-button

<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute        | Description                                                                                                                              | Type                                                                     | Default     |
| ------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------- |
| `download`               | `download`       | If set to true, the browser will show the download dialog on click.                                                                      | `boolean`                                                                | `undefined` |
| `hrefValue` _(required)_ | `href-value`     | The href value you want to link to                                                                                                       | `string`                                                                 | `undefined` |
| `icon`                   | `icon`           | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/ | `string`                                                                 | `undefined` |
| `iconFlip`               | `icon-flip`      | Decide whether the icon should get flipped horizontally if the document writing mode is changed from ltr to rtl or vice versa.           | `boolean`                                                                | `undefined` |
| `iconPlacement`          | `icon-placement` | The icon can either be place before or after the text                                                                                    | `"end" \| "start"`                                                       | `'start'`   |
| `idValue`                | `id-value`       | Pass in an id, if you need to identify the link element.                                                                                 | `string`                                                                 | `undefined` |
| `text` _(required)_      | `text`           | The link text we want to visually show                                                                                                   | `string`                                                                 | `undefined` |
| `variant`                | `variant`        | Choose the link button style variant                                                                                                     | `"primary" \| "primary-negative" \| "secondary" \| "secondary-negative"` | `'primary'` |


## Slots

| Slot     | Description                                  |
| -------- | -------------------------------------------- |
| `"icon"` | Slot used to display the icon, if one is set |


----------------------------------------------


