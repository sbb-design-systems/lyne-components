> Explain the use and the purpose of the component; add minor details if needed and provide a basic example.<br>
> If you reference other components, link their documentation at least once (the path must start from _/docs/..._ ).<br>
> For the examples, use triple backticks with file extension (` ```html <code here>``` `).<br>
> The following list of paragraphs is only suggested; remove, create and adapt as needed.

The `sbb-sidebar` is a component . . .

```html
<sbb-sidebar></sbb-sidebar>
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

| Name              | Attribute           | Privacy | Type                                 | Default   | Description                                                                                                            |
| ----------------- | ------------------- | ------- | ------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `color`           | `color`             | public  | `'white' \| 'milk'`                  | `'white'` |                                                                                                                        |
| `container`       | -                   | public  | `SbbSidebarContainerElement \| null` |           | Returns the SbbSidebarContainerElement where this sidebar is contained.                                                |
| `hideCloseButton` | `hide-close-button` | public  | `boolean`                            | `false`   | Whether the close button should be hidden.                                                                             |
| `isOpen`          | -                   | public  | `boolean`                            |           | Whether the element is open.                                                                                           |
| `mode`            | `mode`              | public  | `'over' \| 'side'`                   | `'side'`  | Mode of the sidebar; one of 'over' or 'side'.                                                                          |
| `opened`          | `opened`            | public  | `boolean`                            | `false`   | Whether the sidebar is opened or closed. Can be used to initially set the opened state. The animation will be skipped. |
| `position`        | `position`          | public  | `'start' \| 'end'`                   | `'start'` | The side that the sidebar is attached to.                                                                              |

## Methods

| Name     | Privacy | Description                     | Parameters | Return | Inherited From          |
| -------- | ------- | ------------------------------- | ---------- | ------ | ----------------------- |
| `close`  | public  | Closes the sidebar.             |            | `void` | SbbOpenCloseBaseElement |
| `open`   | public  | Opens the sidebar.              |            | `void` | SbbOpenCloseBaseElement |
| `toggle` | public  | Toggles the sidebar visibility. |            | `void` |                         |

## Events

| Name        | Type                | Description                                               | Inherited From          |
| ----------- | ------------------- | --------------------------------------------------------- | ----------------------- |
| `didClose`  | `CustomEvent<void>` | Emits when the closing animation ends.                    | SbbOpenCloseBaseElement |
| `didOpen`   | `CustomEvent<void>` | Emits when the opening animation ends.                    | SbbOpenCloseBaseElement |
| `willClose` | `CustomEvent<void>` | Emits when the closing animation starts. Can be canceled. | SbbOpenCloseBaseElement |
| `willOpen`  | `CustomEvent<void>` | Emits when the opening animation starts.                  | SbbOpenCloseBaseElement |

## Slots

| Name    | Description                                                |
| ------- | ---------------------------------------------------------- |
|         | Use the unnamed slot to slot any content into the sidebar. |
| `title` | Use the title slot to add an <sbb-title>.                  |
