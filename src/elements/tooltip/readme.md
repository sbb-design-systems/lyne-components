The `sbb-tooltip` component displays contextual information related to an element.

The standard way to use it is through the `trigger` property, referencing the element which activate the tooltip.

```html
<sbb-button id="tooltip-trigger">Button</sbb-button>
<sbb-tooltip trigger="tooltip-trigger">Tooltip message</sbb-tooltip>
```

## Attribute usage

It's also possible use the component by setting the `sbb-tooltip` attribute on the trigger element.  
The attribute's value is the tooltip's rendered message
(_Note: it does not work if used in a Shadow DOM_).

```html
<sbb-button sbb-tooltip="Tooltip message">Button</sbb-button>
```

If the component is used this way, it's also possible to set the open and close delays
using the `sbb-tooltip-open-delay` and the `sbb-tooltip-close-delay` attributes.

```html
<sbb-button sbb-tooltip="Tooltip message" sbb-tooltip-open-delay="250" sbb-tooltip-close-delay="250"
  >Button</sbb-button
>
```

## Interactions

The tooltip opens when the user hovers the trigger element and closes on mouse leave. A delay can be optionally set, both on open and close actions.

On touch devices, the tooltip opens on long press and closes automatically after a `longPressCloseDelay` (default: 1500 ms).

## Positioning

By default, the tooltip appears below the trigger element. If there is insufficient space, it automatically chooses the best available position.
Currently, the positioning priority is not configurable (an enhancement is planned soon).

## Configuration

The open and close delays can be configured via global configuration. These values will be used as default, unless explicitly set on the element.

```ts
import { mergeConfig } from '@sbb-esta/lyne-elements/core/config.js';

mergeConfig({
  tooltip: {
    openDelay: 0, // Delay before the tooltip opens (in ms)
    closeDelay: 0, // Delay before the tooltip closes (in ms)
    longPressCloseDelay: 1500, // Duration before the tooltip auto-closes after a long press (in ms)
  },
});
```

## Accessibility

The `sbb-tooltip` adds an `aria-describedby` description that provides a reference to an element containing the tooltip's message.

Avoid interactions that exclusively show a tooltip with pointer events like click and mouseenter.
Always ensure that keyboard users can perform the same set of actions available to mouse and touch users.

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute                | Privacy | Type                  | Default | Description                                                                                                                |
| --------------------- | ------------------------ | ------- | --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `closeDelay`          | `close-delay`            | public  | `number`              | `null`  | Close the tooltip after a given delay in milliseconds. Global configuration is used as default, if not set.                |
| `disabled`            | `disabled`               | public  | `boolean`             | `false` | Whether the component is disabled.                                                                                         |
| `isOpen`              | -                        | public  | `boolean`             |         | Whether the element is open.                                                                                               |
| `longPressCloseDelay` | `long-press-close-delay` | public  | `number`              | `1500`  | Automatically close the tooltip after it has been open by long press. Global configuration is used as default, if not set. |
| `openDelay`           | `open-delay`             | public  | `number`              | `null`  | Open the tooltip after a given delay in milliseconds. Global configuration is used as default, if not set.                 |
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
