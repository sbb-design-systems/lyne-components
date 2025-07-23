> Explain the use and the purpose of the component; add minor details if needed and provide a basic example.<br>
> If you reference other components, link their documentation at least once (the path must start from _/docs/..._ ).<br>
> For the examples, use triple backticks with file extension (` ```html <code here>``` `).<br>
> The following list of paragraphs is only suggested; remove, create and adapt as needed.

The `sbb-tooltip` is a component . . .

```html
<sbb-tooltip></sbb-tooltip>
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

| Name                  | Attribute                | Privacy | Type                  | Default | Description                                                                                                                |
| --------------------- | ------------------------ | ------- | --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `closeDelay`          | `close-delay`            | public  | `number`              | `0`     | Close the tooltip after a given delay in milliseconds. Global configuration is used as default, if not set.                |
| `disabled`            | `disabled`               | public  | `boolean`             | `false` | Whether the component is disabled.                                                                                         |
| `isOpen`              | -                        | public  | `boolean`             |         | Whether the element is open.                                                                                               |
| `longPressCloseDelay` | `long-press-close-delay` | public  | `number`              | `1500`  | Automatically close the tooltip after it has been open by long press. Global configuration is used as default, if not set. |
| `negative`            | `negative`               | public  | `boolean`             | `false` | Negative coloring variant flag.                                                                                            |
| `openDelay`           | `open-delay`             | public  | `number`              | `0`     | Open the tooltip after a given delay in milliseconds. Global configuration is used as default, if not set.                 |
| `trigger`             | `trigger`                | public  | `HTMLElement \| null` | `null`  | The element that will trigger the popover overlay. For attribute usage, provide an id reference.                           |

## Methods

| Name    | Privacy | Description           | Parameters | Return | Inherited From          |
| ------- | ------- | --------------------- | ---------- | ------ | ----------------------- |
| `close` | public  | Closes the component. |            | `void` | SbbOpenCloseBaseElement |
| `open`  | public  | Opens the component.  |            | `void` | SbbOpenCloseBaseElement |

## Events

| Name          | Type    | Description                                                                  | Inherited From          |
| ------------- | ------- | ---------------------------------------------------------------------------- | ----------------------- |
| `beforeclose` | `Event` | Emits whenever the component begins the closing transition. Can be canceled. | SbbOpenCloseBaseElement |
| `beforeopen`  | `Event` | Emits whenever the component starts the opening transition. Can be canceled. | SbbOpenCloseBaseElement |
| `close`       | `Event` | Emits whenever the component is closed.                                      | SbbOpenCloseBaseElement |
| `open`        | `Event` | Emits whenever the component is opened.                                      | SbbOpenCloseBaseElement |

## CSS Properties

| Name                    | Default                              | Description                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-tooltip-z-index` | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |

## Slots

| Name | Description                                            |
| ---- | ------------------------------------------------------ |
|      | Use the unnamed slot to add the text into the tooltip. |
