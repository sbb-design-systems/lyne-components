# lyne-timetable-transportation-details



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                                                                                                                                                                                                                                                                                              | Type     | Default     |
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `config` _(required)_ | `config`  | Stringified JSON to define the different outputs of the occupancy predicition cell. Format: occupancyItems: [ {    class: '1',    icon: "<svg width="19" height="16"...></svg>",,    occupancy: 'low' }, {    class: '2',    icon: "<svg width="19" height="16"...></svg>",,    occupancy: 'medium'  } ] | `string` | `undefined` |


## Dependencies

### Used by

 - [lyne-timetable-row](../lyne-timetable-row)

### Depends on

- [lyne-timetable-transportation-number](../lyne-timetable-transportation-number)
- [lyne-timetable-transportation-time](../lyne-timetable-transportation-time)
- [lyne-pearl-chain](../lyne-pearl-chain)

### Graph
```mermaid
graph TD;
  lyne-timetable-transportation-details --> lyne-timetable-transportation-number
  lyne-timetable-transportation-details --> lyne-timetable-transportation-time
  lyne-timetable-transportation-details --> lyne-pearl-chain
  lyne-timetable-row --> lyne-timetable-transportation-details
  style lyne-timetable-transportation-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


