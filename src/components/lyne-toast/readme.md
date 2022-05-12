# lyne-toast



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                          | Default     |
| --------------- | ---------------- | ----------- | ----------------------------- | ----------- |
| `config`        | --               |             | `InterfaceToastConfiguration` | `undefined` |
| `keyboardClose` | `keyboard-close` |             | `boolean`                     | `false`     |
| `overlayIndex`  | `overlay-index`  |             | `number`                      | `undefined` |


## Events

| Event                     | Description | Type                                            |
| ------------------------- | ----------- | ----------------------------------------------- |
| `lyne-toast_did-dismiss`  |             | `CustomEvent<InterfaceOverlayEventDetail<any>>` |
| `lyne-toast_did-present`  |             | `CustomEvent<void>`                             |
| `lyne-toast_will-dismiss` |             | `CustomEvent<InterfaceOverlayEventDetail<any>>` |
| `lyne-toast_will-present` |             | `CustomEvent<void>`                             |


## Methods

### `dismiss(data?: any, role?: string) => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `onDidDismiss<T = any>() => Promise<InterfaceOverlayEventDetail<T>>`

Returns a promise that resolves when the toast did dismiss.

#### Returns

Type: `Promise<InterfaceOverlayEventDetail<T>>`



### `onWillDismiss<T = any>() => Promise<InterfaceOverlayEventDetail<T>>`

Returns a promise that resolves when the toast will dismiss.

#### Returns

Type: `Promise<InterfaceOverlayEventDetail<T>>`



### `present() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"button"` |             |


----------------------------------------------


