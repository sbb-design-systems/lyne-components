The `sbb-tooltip` component displays contextual information related to an element.

You can use the tooltip in two ways:

- **By connecting the `sbb-tooltip` component to an element through the `trigger` property**

```html
<sbb-button id="tooltip-trigger">Button</sbb-button>
<sbb-tooltip trigger="tooltip-trigger">Tooltip message</sbb-tooltip>
```

- **Via the `sbb-tooltip` attribute** (_Note: it does not work if used in a Shadow DOM_)

```html
<sbb-button sbb-tooltip="Tooltip message">Button</sbb-button>
```

## Interactions

The tooltip opens when the user hovers the trigger element and closes on mouse leave. A delay can be optionally set, both on open and close actions.

On touch devices, the tooltip opens on long press and closes automatically after a `longPressCloseDelay` (default: 1500 ms).

## Positioning

The tooltip uses the [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using) to anchor itself to the trigger element.
Specifically, it uses the "[position-area](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using#setting_a_position-area)"
and "[position-try-fallbacks](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Try_options_hiding#using_position-area_try_fallback_options)" CSS properties to define where the tooltip should be positioned.

You can control the positioning of the tooltip by overriding the `--sbb-overlay-controller-position-area` and `--sbb-overlay-controller-position-try-fallbacks` CSS variables.
By default, it appears below the trigger element and, if there is insufficient space, it automatically chooses the best available position.

```scss
// Primary position
--sbb-overlay-controller-position-area: block-end;

// Fallback positions. The first one that fits will be used.
--sbb-overlay-controller-position-try-fallbacks:
  block-end span-inline-end, block-end span-inline-start, block-start, block-start span-inline-end,
  block-start span-inline-start;
```

**Note:** The CSS anchor positioning feature is not yet fully [supported](https://caniuse.com/css-anchor-positioning) by all browsers. Therefore, a polyfill is used which limits the possible positions to the following:

| Logical positions               | Physical positions  |
| ------------------------------- | ------------------- |
| `block-start`                   | `top`               |
| `block-end`                     | `bottom`            |
| `inline-start`                  | `left`              |
| `inline-end`                    | `right`             |
| `block-start span-inline-start` | `top span-left`     |
| `block-start span-inline-end`   | `top span-right`    |
| `block-end span-inline-start`   | `bottom span-left`  |
| `block-end span-inline-end`     | `bottom span-right` |
| `inline-start span-block-start` | `left span-top`     |
| `inline-start span-block-end`   | `left span-bottom`  |
| `inline-end span-block-start`   | `right span-top`    |
| `inline-end span-block-end`     | `right span-bottom` |

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
| `closeDelay`          | `close-delay`            | public  | `number`              | `0`     | Close the tooltip after a given delay in milliseconds. Global configuration is used as default, if not set.                |
| `disabled`            | `disabled`               | public  | `boolean`             | `false` | Whether the component is disabled.                                                                                         |
| `isOpen`              | -                        | public  | `boolean`             |         | Whether the element is open.                                                                                               |
| `longPressCloseDelay` | `long-press-close-delay` | public  | `number`              | `1500`  | Automatically close the tooltip after it has been open by long press. Global configuration is used as default, if not set. |
| `openDelay`           | `open-delay`             | public  | `number`              | `0`     | Open the tooltip after a given delay in milliseconds. Global configuration is used as default, if not set.                 |
| `trigger`             | `trigger`                | public  | `HTMLElement \| null` | `null`  | The element that will trigger the tooltip overlay. For attribute usage, provide an id reference.                           |

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
