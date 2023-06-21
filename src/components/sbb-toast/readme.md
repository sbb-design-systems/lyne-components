The `sbb-toast` is a component that can be used to display toast notifications.

## Usage
A `sbb-toast` can be shown/dismissed by calling the `open/close` methods.

Only one toast can ever be opened at one time. If a new toast is opened while a previous message is still showing, the older message will be automatically dismissed.

```html
<sbb-button onClick={() => document.querySelector('sbb-toast').open() } />

<sbb-toast position="bottom-left" dismissible="true">
  Toast content
</sbb-toast>
```
A toast can also be given a `timeout` and a custom action:

```html
<sbb-button onClick={() => document.querySelector('sbb-toast').open() } />

<sbb-toast position="bottom-left" timeout="6000">
  Toast content

  <!-- Toast action can be a button -->
  <sbb-button slot="action" icon-name="clock-small"></sbb-button>
  <!-- Or a link -->
  <sbb-link slot="action">Link action</sbb-link>
</sbb-toast>
```

## Accessibility
`sbb-toast` announces messages via an aria-live region. Use the `politeness` property to customize the politeness announcement behaviour. 
Check [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions) for further info.

`sbb-toast` does not move focus to the toast element. Moving focus like this would disrupt users in the middle of a workflow. For any action offered in the toast, your application should provide an alternative way to perform the action.

Avoid setting a `duration` for toasts that have an action available, as screen reader users may want to navigate to the toast element to activate the action.
<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                      | Type                                                                                                                                                            | Default           |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `disableAnimation` | `disable-animation` | Whether the animation is disabled.                                                                                                               | `boolean`                                                                                                                                                       | `false`           |
| `dismissible`      | `dismissible`       | Whether the toast has a close button.                                                                                                            | `boolean`                                                                                                                                                       | `false`           |
| `iconName`         | `icon-name`         | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons/.        | `string`                                                                                                                                                        | `undefined`       |
| `politeness`       | `politeness`        | The ARIA politeness level. Check https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions for further info | `"assertive" \| "off" \| "polite"`                                                                                                                              | `'assertive'`     |
| `position`         | `position`          | The position where to place the toast.                                                                                                           | `"bottom-center" \| "bottom-end" \| "bottom-left" \| "bottom-right" \| "bottom-start" \| "top-center" \| "top-end" \| "top-left" \| "top-right" \| "top-start"` | `'bottom-center'` |
| `timeout`          | `timeout`           | The length of time in milliseconds to wait before automatically dismissing the toast.                                                            | `number`                                                                                                                                                        | `6000`            |


## Events

| Event        | Description                                                    | Type                |
| ------------ | -------------------------------------------------------------- | ------------------- |
| `did-close`  | Emits whenever the autocomplete is closed.                     | `CustomEvent<void>` |
| `did-open`   | Emits whenever the autocomplete is opened.                     | `CustomEvent<void>` |
| `will-close` | Emits whenever the autocomplete begins the closing transition. | `CustomEvent<void>` |
| `will-open`  | Emits whenever the autocomplete starts the opening transition. | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Close the toast.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Open the toast.
If there are other opened toasts in the page, close them first.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                  |
| ----------- | ---------------------------- |
| `"unnamed"` | Use this to document a slot. |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)
- [sbb-button](../sbb-button)

### Graph
```mermaid
graph TD;
  sbb-toast --> sbb-icon
  sbb-toast --> sbb-button
  sbb-button --> sbb-icon
  style sbb-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


