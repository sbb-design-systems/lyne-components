# sbb-navigation

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                                | Type                    | Default     |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `trigger` | `trigger` | The element that will trigger the navigation. Accepts both a string (id of an element) or an HTML element. | `HTMLElement \| string` | `undefined` |


## Events

| Event                       | Description                                                  | Type                |
| --------------------------- | ------------------------------------------------------------ | ------------------- |
| `sbb-navigation_did-close`  | Emits whenever the navigation is closed.                     | `CustomEvent<void>` |
| `sbb-navigation_did-open`   | Emits whenever the navigation is opened.                     | `CustomEvent<void>` |
| `sbb-navigation_will-close` | Emits whenever the navigation begins the closing transition. | `CustomEvent<void>` |
| `sbb-navigation_will-open`  | Emits whenever the navigation starts the opening transition. | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Closes the navigation.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the navigation on trigger click.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                            |
| ----------- | ------------------------------------------------------ |
| `"unnamed"` | Use this to project any content inside the navigation. |


----------------------------------------------


