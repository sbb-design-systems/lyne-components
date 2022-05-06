# lyne-toast



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute             | Description                                                             | Type                                                                                      | Default     |
| ---------------------- | --------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------- |
| `action`               | `action`              | Action configuration.                                                   | `"close" \| ({ label: string; action: () => void; }) \| { label: string; link: string; }` | `undefined` |
| `horizontalPosition`   | `horizontal-position` | Where the toast should be displayed horizontally. Defaults to 'center'. | `"center" \| "end" \| "left" \| "right" \| "start"`                                       | `'center'`  |
| `icon`                 | `icon`                | Either SVG string or reference to a SVG element.                        | `HTMLElement \| string`                                                                   | `undefined` |
| `iconTemplate`         | `icon-template`       | Id of <template> to use for the icon.                                   | `string`                                                                                  | `undefined` |
| `message` _(required)_ | `message`             | Message to display.                                                     | `string`                                                                                  | `undefined` |
| `open`                 | `open`                | TODO: set open state from outside the component                         | `boolean`                                                                                 | `true`      |
| `size`                 | `size`                |                                                                         | `"large" \| "small"`                                                                      | `'large'`   |
| `timeout`              | `timeout`             | Hide the toast after defined milliseconds.                              | `number`                                                                                  | `3000`      |
| `verticalPosition`     | `vertical-position`   | Where the toast should be displayed vertically. Defaults to 'bottom'.   | `"bottom" \| "top"`                                                                       | `'bottom'`  |


## Slots

| Slot        | Description                  |
| ----------- | ---------------------------- |
| `"unnamed"` | Use this to document a slot. |


----------------------------------------------


