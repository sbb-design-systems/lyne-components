> Explain the use and the purpose of the component; add minor details if needed and provide a basic example.<br>
> If you reference other components, link their documentation at least once (the path must start from _/docs/..._ ).<br>
> For the examples, use triple backticks with file extension (` ```html <code here>``` `).<br>
> The following list of paragraphs is only suggested; remove, create and adapt as needed.

The `sbb-checkbox-panel` is a component . . .

```html
<sbb-checkbox-panel></sbb-checkbox-panel>
```

## Slots

> Describe slot naming and usage and provide an example of slotted content.

## States

> Describe the component states (`disabled`, `readonly`, etc.) and provide examples.

## Style

> Describe the properties which change the component visualization (`size`, `negative`, etc.) and provide examples.

## Interactions

> Describe how it's possible to interact with the component (open and close a `sbb-dialog`, dismiss a `sbb-alert`, etc.) and provide examples.

## Events

> Describe events triggered by the component and possibly how to get information from the payload.

## Keyboard interaction

> If the component has logic for keyboard navigation (as the `sbb-calendar` or the `sbb-select`) describe it.

| Keyboard       | Action        |
| -------------- | ------------- |
| <kbd>Key</kbd> | What it does. |

## Accessibility

> Describe how accessibility is implemented and if there are issues or suggested best-practice for the consumers.

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type                              | Default | Description                                                                                                                      |
| --------------- | ---------------- | ------- | --------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `indeterminate` | `indeterminate`  | public  | `boolean`                         | `false` | Whether the checkbox is indeterminate.                                                                                           |
| `iconPlacement` | `icon-placement` | public  | `SbbIconPlacement`                | `'end'` | The label position relative to the labelIcon. Defaults to end                                                                    |
| `size`          | `size`           | public  | `SbbCheckboxSize`                 | `'m'`   | Label size variant, either m or s.                                                                                               |
| `group`         | -                | public  | `SbbCheckboxGroupElement \| null` | `null`  | Reference to the connected checkbox group.                                                                                       |
| `checked`       | `checked`        | public  | `boolean`                         | `false` | Whether the checkbox is checked.                                                                                                 |
| `iconName`      | `icon-name`      | public  | `string \| undefined`             |         | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |

## Events

| Name        | Type                | Description                                                                      | Inherited From |
| ----------- | ------------------- | -------------------------------------------------------------------------------- | -------------- |
| `didChange` | `CustomEvent<void>` | Deprecated. used for React. Will probably be removed once React 19 is available. |                |
| `change`    | `Event`             | Event fired on change.                                                           |                |
| `input`     | `InputEvent`        | Event fired on input.                                                            |                |

## Slots

| Name      | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
|           | Use the unnamed slot to add content to the `sbb-checkbox`.                                      |
| `subtext` | Slot used to render a subtext under the label (only visible within a selection panel).          |
| `suffix`  | Slot used to render additional content after the label (only visible within a selection panel). |
