# **name**

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                                 | Type                    | Default     |
| --------- | --------- | ----------------------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `trigger` | `trigger` | The element that will trigger the menu dialog. Accepts both a string (id of an element) or an HTML element. | `HTMLElement \| string` | `undefined` |


## Events

| Event                 | Description                                            | Type                |
| --------------------- | ------------------------------------------------------ | ------------------- |
| `sbb-menu_did-close`  | Emits whenever the menu is closed.                     | `CustomEvent<void>` |
| `sbb-menu_did-open`   | Emits whenever the menu is opened.                     | `CustomEvent<void>` |
| `sbb-menu_will-close` | Emits whenever the menu begins the closing transition. | `CustomEvent<void>` |
| `sbb-menu_will-open`  | Emits whenever the menu starts the opening transition. | `CustomEvent<void>` |


## Methods

### `closeMenu() => Promise<void>`

Closes the menu.

#### Returns

Type: `Promise<void>`



### `openMenu() => Promise<void>`

Opens the menu on trigger click.

#### Returns

Type: `Promise<void>`




----------------------------------------------


