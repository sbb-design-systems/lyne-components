> Explain the use and the purpose of the component; add minor details if needed and provide a basic example.<br>
> If you reference other components, link their documentation at least once (the path must start from _/docs/..._ ).<br>
> For the examples, use triple backticks with file extension (` ```html <code here>``` `).<br>
> The following list of paragraphs is only suggested; remove, create and adapt as needed.

The `sbb-status` is a component . . .

```html
<sbb-status></sbb-status>
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

| Name         | Attribute     | Privacy | Type                                                       | Default  | Description                                                                        |
| ------------ | ------------- | ------- | ---------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `type`       | `type`        | public  | `'info' \| 'success' \| 'warning' \| 'error' \| undefined` | `'info'` | The type of the status.                                                            |
| `titleLabel` | `title-label` | public  | `string \| undefined`                                      |          | Content of title.                                                                  |
| `titleLevel` | `title-level` | public  | `TitleLevel`                                               | `'3'`    | Level of title, it will be rendered as heading tag (e.g. h3). Defaults to level 3. |
| `textLabel`  | `text-label`  | public  | `string \| undefined`                                      |          | Content of text.                                                                   |

## Slots

| Name    | Description                                                |
| ------- | ---------------------------------------------------------- |
|         | Use the unnamed slot to add content to the status message. |
| `title` | Use this to provide a title for the status (optional).     |
