# sbb-selection-panel

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                    | Type                | Default   |
| ------------------ | ------------------- | ---------------------------------------------- | ------------------- | --------- |
| `color`            | `color`             | The background color of the panel.             | `"milk" \| "white"` | `'white'` |
| `disableAnimation` | `disable-animation` | Whether the animation is enabled.              | `boolean`           | `false`   |
| `forceOpen`        | `force-open`        | Whether the content section is always visible. | `boolean`           | `false`   |


## Events

| Event        | Description                                                       | Type                                         |
| ------------ | ----------------------------------------------------------------- | -------------------------------------------- |
| `did-close`  | Emits whenever the content section is closed.                     | `CustomEvent<{ closeTarget: HTMLElement; }>` |
| `did-open`   | Emits whenever the content section is opened.                     | `CustomEvent<void>`                          |
| `will-close` | Emits whenever the content section begins the closing transition. | `CustomEvent<{ closeTarget: HTMLElement; }>` |
| `will-open`  | Emits whenever the content section starts the opening transition. | `CustomEvent<void>`                          |


## Slots

| Slot        | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| `"badge"`   | Use this slot to provide a `sbb-card-badge` (optional).            |
| `"content"` | Use this slot to provide custom content for the panel (optional).  |
| `"unnamed"` | Use this slot to provide a `sbb-checkbox` or a `sbb-radio-button`. |


## Dependencies

### Depends on

- [sbb-divider](../sbb-divider)

### Graph
```mermaid
graph TD;
  sbb-selection-panel --> sbb-divider
  style sbb-selection-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


