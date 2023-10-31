The `sbb-tooltip` component can be useful for displaying contextual and additional information on mouse hover or click of a trigger element. 

The component could be used:

- to describe icons and buttons;
- when more information is useful to help a user make decisions;
- when an element needs more context or explanation;
- when defining a term or inline item.

The component must be connected with the trigger element using the `trigger` property,
which accepts the id of the element, or directly its reference;
the [sbb-tooltip-trigger](/docs/components-sbb-tooltip-sbb-tooltip-trigger--docs) is meant to be used as trigger.

```html
<sbb-tooltip-trigger id="tooltip-trigger"></sbb-tooltip-trigger>

<sbb-tooltip id="tooltip" trigger="tooltip-trigger">
  <p id="tooltip-content">Tooltip content.</p>
</sbb-tooltip>
```

## Interactions

The `sbb-tooltip` can be dismissed by clicking on an interactive element within its content, 
by clicking on the close button or by performing another action on the page.

You can also indicate that an element within the tooltip content should close the `sbb-tooltip` when clicked 
by marking it with the `sbb-tooltip-close` attribute; 
it's also possible to hide the default close button using the `hideCloseButton` property.

```html
<sbb-tooltip-trigger id="tooltip-trigger"></sbb-tooltip-trigger>

<sbb-tooltip id="tooltip" trigger="tooltip-trigger" hide-close-button>
  <p id="tooltip-content">
    Tooltip content. <sbb-link id="tooltip-link" variant="inline" sbb-tooltip-close>Link</sbb-link>
  </p>
</sbb-tooltip>
```

You can also indicate that the `sbb-tooltip` should be shown on hover with the property `hoverTrigger`
and set a custom delay for the open and close animations (defaults to 0). 
In this case, the default close button is hidden.

If hover is not supported by the current device, the component will be triggered on click/tap as default.
The `sbb-tooltip` will automatically disappear after the hiding delay 
if neither the trigger element nor the tooltip are on hover or if another action is performed on the page.

```html
<sbb-tooltip-trigger id="tooltip-trigger"></sbb-tooltip-trigger>

<sbb-tooltip id="tooltip" trigger="tooltip-trigger" hover-trigger open-delay="500" close-delay="750">
  <p id="tooltip-content">
    Tooltip content. <sbb-link id="tooltip-link" variant="inline">Link</sbb-link>
  </p>
</sbb-tooltip>
```

## Style

The `sbb-tooltip` automatically calculates where it should place itself, based on available space. Default is below and center.
The default `z-index` of the component is set to `1000`;
to specify a custom stack order, the `z-index` can be changed by defining the CSS variable `--sbb-tooltip-z-index`.

## Accessibility

As the tooltip opens, the focus will automatically be set to the first focusable item within the component.

To make screen-readers announce the tooltip content when the trigger is focused, 
associate the trigger with the `sbb-tooltip` via `aria-describedby` and `id` as shown below. 

If the tooltip trigger is a `sbb-tooltip-trigger` component, set `role="button"` on it, 
since the `aria-describedby` attribute can be used with semantic HTML elements and with elements 
that have an ARIA `role`.

```html
<!-- Trigger element -->
<button id="tooltip-trigger" aria-describedby="tooltip-content">Button with tooltip</button>

<!-- Tooltip component -->
<sbb-tooltip id="tooltip" trigger="tooltip-trigger">
    <p id="tooltip-content">
      Tooltip content. <sbb-link id="tooltip-link" variant="inline">Link</sbb-link>
    </p>
</sbb-tooltip>

<!-- Tooltip trigger component -->
<sbb-tooltip-trigger role="button" aria-describedby="tooltip-content" id="tooltip-trigger"></sbb-tooltip-trigger>

<!-- Tooltip component -->
<sbb-tooltip id="tooltip" trigger="tooltip-trigger">
    <p id="tooltip-content">
      Tooltip content. <sbb-link id="tooltip-link" variant="inline">Link</sbb-link>
    </p>
</sbb-tooltip>
```

<!-- Auto Generated Below --> 
 

## Properties 

| Name                      | Attribute                      | Privacy | Type                         | Default | Description                                                                                                        |
| ------------------------- | ------------------------- | ------- | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `trigger`                 | `trigger`                 | public  | `string \| HTMLElement`      |         | The element that will trigger the tooltip dialog.&#xA;Accepts both a string (id of an element) or an HTML element. |
| `hideCloseButton`         | `hide-close-button`         | public  | `boolean \| undefined`       | `false` | Whether the close button should be hidden.                                                                         |
| `hoverTrigger`            | `hover-trigger`            | public  | `boolean \| undefined`       | `false` | Whether the tooltip should be triggered on hover.                                                                  |
| `openDelay`               | `open-delay`               | public  | `number`                     | `0`     | Open the tooltip after a certain delay.                                                                            |
| `closeDelay`              | `close-delay`              | public  | `number`                     | `0`     | Close the tooltip after a certain delay.                                                                           |
| `disableAnimation`        | `disable-animation`        | public  | `boolean`                    | `false` | Whether the animation is enabled.                                                                                  |
| `accessibilityCloseLabel` | `accessibility-close-label` | public  | `\| string     \| undefined` |         | This will be forwarded as aria-label to the close button element.                                                  |

## Methods

| Name    | Privacy | Description                         | Parameters            | Return | Inherited From |
| ------- | ------- | ----------------------------------- | --------------------- | ------ | -------------- |
| `open`  | public  | Opens the tooltip on trigger click. |                       | `void` |                |
| `close` | public  | Closes the tooltip.                 | `target: HTMLElement` | `void` |                |

## Attributes

| Name                        | Field                   | Inherited From |
| --------------------------- | ----------------------- | -------------- |
| `trigger`                   | trigger                 |                |
| `hide-close-button`         | hideCloseButton         |                |
| `hover-trigger`             | hoverTrigger            |                |
| `open-delay`                | openDelay               |                |
| `close-delay`               | closeDelay              |                |
| `disable-animation`         | disableAnimation        |                |
| `accessibility-close-label` | accessibilityCloseLabel |                |

## Slots

| Name | Description                                           |
| ---- | ----------------------------------------------------- |
|      | Use the unnamed slot to add content into the tooltip. |

