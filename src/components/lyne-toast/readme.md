# lyne-toast



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                          | Default     |
| -------------- | --------------- | ----------- | ----------------------------- | ----------- |
| `config`       | --              |             | `InterfaceToastConfiguration` | `undefined` |
| `overlayIndex` | `overlay-index` |             | `number`                      | `undefined` |


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



### `present() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------


