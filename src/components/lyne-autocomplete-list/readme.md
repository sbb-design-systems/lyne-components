# lyne-autocomplete-list



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                       | Type      | Default     |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `highlight`     | `highlight`      | The string to search for as highlight in the list items.                                                                                                          | `string`  | `undefined` |
| `items`         | `items`          | Items to show in the autocomplete interface. You should pass a stringified array of objects, containing the `text` key for each object with an appropriate value. | `string`  | `undefined` |
| `listId`        | `list-id`        | Id to use for the list.                                                                                                                                           | `string`  | `undefined` |
| `selectedIndex` | `selected-index` | The index of the list item which should be currently selected.                                                                                                    | `number`  | `undefined` |
| `visible`       | `visible`        | Determine if the list should be visible or not.                                                                                                                   | `boolean` | `false`     |


## Dependencies

### Used by

 - [lyne-autocomplete](../lyne-autocomplete)

### Depends on

- [lyne-autocomplete-item](../lyne-autocomplete-item)

### Graph
```mermaid
graph TD;
  lyne-autocomplete-list --> lyne-autocomplete-item
  lyne-autocomplete --> lyne-autocomplete-list
  style lyne-autocomplete-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


