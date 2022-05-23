# lyne-toast



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                                                                            | Type                                              | Default     |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- |
| `config`         | --               | Exposed toast configuration.                                                           | `InterfaceToastConfiguration`                     | `undefined` |
| `enterAnimation` | --               | Animation to use when the toast is presented.                                          | `(baseEl: any, opts?: any) => InterfaceAnimation` | `undefined` |
| `keyboardClose`  | `keyboard-close` | If `true`, the keyboard will be automatically dismissed when the overlay is presented. | `boolean`                                         | `false`     |
| `leaveAnimation` | --               | Animation to use when the toast is dismissed.                                          | `(baseEl: any, opts?: any) => InterfaceAnimation` | `undefined` |


## Events

| Event                     | Description                             | Type                                            |
| ------------------------- | --------------------------------------- | ----------------------------------------------- |
| `lyne-toast_did-dismiss`  | Emitted after the toast has dismissed.  | `CustomEvent<InterfaceOverlayEventDetail<any>>` |
| `lyne-toast_did-present`  | Emitted after the toast has presented.  | `CustomEvent<void>`                             |
| `lyne-toast_will-dismiss` | Emitted before the toast has dismissed. | `CustomEvent<InterfaceOverlayEventDetail<any>>` |
| `lyne-toast_will-present` | Emitted before the toast has presented. | `CustomEvent<void>`                             |


## Methods

### `dismiss(data?: any, role?: string) => Promise<boolean>`

Dismiss the toast overlay after it has been presented.

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

Present the toast overlay after it has been created.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"button"` |             |


----------------------------------------------


