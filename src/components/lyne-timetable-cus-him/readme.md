# lyne-timetable-cus-him



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                                                                                                                                                                                                                                                                                              | Type                                                                  | Default              |
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------- |
| `config` _(required)_ | `config`  | Stringified JSON to define the different outputs of the occupancy predicition cell. Format: occupancyItems: [ {    class: '1',    icon: "<svg width="19" height="16"...></svg>",,    occupancy: 'low' }, {    class: '2',    icon: "<svg width="19" height="16"...></svg>",,    occupancy: 'medium'  } ] | `string`                                                              | `undefined`          |
| `variant`             | `variant` | Variant of the Cus Him display, can either be an icon only list variant or a single icon with text                                                                                                                                                                                                       | `"first-level-list" \| "second-level-list" \| "second-level-message"` | `'first-level-list'` |


## Dependencies

### Used by

 - [lyne-timetable-row](../lyne-timetable-row)

### Graph
```mermaid
graph TD;
  lyne-timetable-row --> lyne-timetable-cus-him
  style lyne-timetable-cus-him fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


