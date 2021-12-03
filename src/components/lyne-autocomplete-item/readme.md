# lyne-autocomplete-item



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute       | Description                                      | Type      | Default     |
| ------------------- | --------------- | ------------------------------------------------ | --------- | ----------- |
| `ariaPosinset`      | `aria-posinset` | The aria-posinset attribute for the list element | `number`  | `undefined` |
| `ariaSelected`      | `aria-selected` | The aria-selected attribute for the list element | `boolean` | `undefined` |
| `ariaSetsize`       | `aria-setsize`  | The aira-setsize attribute for the list element  | `number`  | `undefined` |
| `eventId`           | `event-id`      | Id which is sent in the select event payload     | `string`  | `undefined` |
| `highlight`         | `highlight`     | The text to highlight within the string property | `string`  | `undefined` |
| `text` _(required)_ | `text`          | Text to show as content of the autocomplete item | `string`  | `undefined` |


## Slots

| Slot          | Description                                            |
| ------------- | ------------------------------------------------------ |
| `"post-text"` | placeholder to put content inline after the item text  |
| `"pre-text"`  | placeholder to put content inline before the item text |


## Dependencies

### Used by

 - [lyne-autocomplete](../lyne-autocomplete)

### Graph
```mermaid
graph TD;
  lyne-autocomplete --> lyne-autocomplete-item
  style lyne-autocomplete-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


