# sbb-autocomplete

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                                                                                                                                                                                        | Type                         | Default     |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | ----------- |
| `origin`  | `origin`  | The element where the autocomplete will attach. Accepts both a string (id of an element) or an HTML element.  If not setted, will search for the first 'sbb-form-field' ancestor                                                                                   | `HTMLElement \| string`      | `undefined` |
| `trigger` | `trigger` | The element that will trigger the autocomplete opening. Accepts both a string (id of an element) or an HTML element. By default, the autocomplete will open on focus of the 'trigger' element.  If not setted, will search for the first 'input' child of 'origin' | `HTMLInputElement \| string` | `undefined` |


## Events

| Event        | Description                                            | Type                |
| ------------ | ------------------------------------------------------ | ------------------- |
| `did-close`  | Emits whenever the menu is closed.                     | `CustomEvent<void>` |
| `did-open`   | Emits whenever the menu is opened.                     | `CustomEvent<void>` |
| `will-close` | Emits whenever the menu begins the closing transition. | `CustomEvent<void>` |
| `will-open`  | Emits whenever the menu starts the opening transition. | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Closes the autocomplete.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the autocomplete.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                  |
| ----------- | ---------------------------- |
| `"unnamed"` | Use this to document a slot. |


----------------------------------------------


