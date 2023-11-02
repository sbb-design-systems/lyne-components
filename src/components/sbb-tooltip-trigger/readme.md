The `sbb-tooltip-trigger` component is used to trigger a [sbb-tooltip](/docs/components-sbb-tooltip-sbb-tooltip--docs) 
by pressing or hovering on it. 

```html
<sbb-tooltip-trigger id="tooltip-trigger"></sbb-tooltip-trigger>

<sbb-tooltip trigger="tooltip-trigger">
  <p>Tooltip content.</p>
</sbb-tooltip>
```

## Slots

By default, it renders the `sbb-icon` named `information-circle-small`; 
it is possible to define a custom icon with the property `iconName`. 
Moreover, it is possible to override the `sbb-icon` with custom content by slotting it.

```html
<sbb-tooltip-trigger id="tooltip-trigger" icon-name='pie-small'>
</sbb-tooltip-trigger>

<sbb-tooltip trigger="tooltip-trigger">
  <p>Tooltip content.</p>
</sbb-tooltip>

<sbb-tooltip-trigger id="tooltip-trigger2">
  Custom Content
</sbb-tooltip-trigger>

<sbb-tooltip trigger="tooltip-trigger2">
  <p>Another tooltip content.</p>
</sbb-tooltip>
```

## State

It is possible to display the component in `disabled`  state by using the self-named properties. 

```html
<sbb-tooltip-trigger id="tooltip-trigger" disabled></sbb-tooltip-trigger>

<sbb-tooltip trigger="tooltip-trigger">
  <p>Tooltip content.</p>
</sbb-tooltip>
```

## Accessibility

To make screen-readers announce the type of the trigger when is focused, 
use the `aria-label` attribute, as shown below:

```html
<sbb-tooltip-trigger aria-label="Custom label" id="tooltip-trigger"></sbb-tooltip-trigger>
```

To make screen-readers announce the tooltip content when the trigger is focused, 
associate the tooltip trigger with the tooltip via `aria-describedby` and an `id`.

```html
<sbb-tooltip-trigger aria-describedby="tooltip-content" id="tooltip-trigger"></sbb-tooltip-trigger>

<!-- Tooltip component -->
<sbb-tooltip id="tooltip" trigger="tooltip-trigger">
    <p id="tooltip-content">
      Tooltip content. <sbb-link id="tooltip-link" variant="inline">Link</sbb-link>
    </p>
</sbb-tooltip>
```

<!-- Auto Generated Below --> 
 
## Properties 

| Name       | Attribute   | Privacy | Type                  | Default                      | Description                                                                                                                      |
| ---------- | ----------- | ------- | --------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | `name`      | public  | `string \| undefined` |                              | The name attribute to use for the button.                                                                                        |
| `negative` | `negative`  | public  | `boolean`             | `false`                      | Negative coloring variant flag.                                                                                                  |
| `iconName` | `icon-name` | public  | `string`              | `'circle-information-small'` | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `disabled` | `disabled`  | public  | `boolean`             |                              | Whether the tooltip-trigger is disabled.                                                                                         |

## Slots

| Name | Description                                                 |
| ---- | ----------------------------------------------------------- |
|      | Use the unnamed slot to add content to the tooltip trigger. |
