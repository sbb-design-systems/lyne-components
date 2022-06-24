# sbb-overlay
Example component for overlay system. Not meant to be used.

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type     | Default     |
| -------------- | --------------- | ----------- | -------- | ----------- |
| `overlayIndex` | `overlay-index` |             | `number` | `undefined` |


## Events

| Event         | Description | Type                                            |
| ------------- | ----------- | ----------------------------------------------- |
| `didDismiss`  |             | `CustomEvent<InterfaceOverlayEventDetail<any>>` |
| `didPresent`  |             | `CustomEvent<void>`                             |
| `willDismiss` |             | `CustomEvent<InterfaceOverlayEventDetail<any>>` |
| `willPresent` |             | `CustomEvent<void>`                             |


## Methods

### `dismiss(data?: any, role?: string) => Promise<boolean>`

Dismiss the overlay.

#### Returns

Type: `Promise<boolean>`



### `onDidDismiss<T = any>() => Promise<InterfaceOverlayEventDetail<T>>`



#### Returns

Type: `Promise<InterfaceOverlayEventDetail<T>>`



### `onWillDismiss<T = any>() => Promise<InterfaceOverlayEventDetail<T>>`



#### Returns

Type: `Promise<InterfaceOverlayEventDetail<T>>`



### `present() => Promise<void>`

Present the overlay.

#### Returns

Type: `Promise<void>`




----------------------------------------------


