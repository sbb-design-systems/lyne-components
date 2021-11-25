# lyne-timetable-row



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                                                                                                                                                                                                                                                                                              | Type     | Default     |
| --------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `config` _(required)_ | `config`  | Stringified JSON to define the different outputs of the occupancy predicition cell. Format: occupancyItems: [ {    class: '1',    icon: "<svg width="19" height="16"...></svg>",,    occupancy: 'low' }, {    class: '2',    icon: "<svg width="19" height="16"...></svg>",,    occupancy: 'medium'  } ] | `string` | `undefined` |


## Dependencies

### Used by

 - [lyne-timetable](../lyne-timetable)

### Depends on

- [lyne-timetable-transportation-details](../lyne-timetable-transportation-details)
- [lyne-timetable-platform](../lyne-timetable-platform)
- [lyne-timetable-occupancy](../lyne-timetable-occupancy)
- [lyne-timetable-duration](../lyne-timetable-duration)
- [lyne-timetable-cus-him](../lyne-timetable-cus-him)

### Graph
```mermaid
graph TD;
  lyne-timetable-row --> lyne-timetable-transportation-details
  lyne-timetable-row --> lyne-timetable-platform
  lyne-timetable-row --> lyne-timetable-occupancy
  lyne-timetable-row --> lyne-timetable-duration
  lyne-timetable-row --> lyne-timetable-cus-him
  lyne-timetable-transportation-details --> lyne-timetable-transportation-number
  lyne-timetable-transportation-details --> lyne-timetable-transportation-walk
  lyne-timetable-transportation-details --> lyne-timetable-transportation-time
  lyne-timetable-transportation-details --> lyne-pearl-chain
  lyne-timetable --> lyne-timetable-row
  style lyne-timetable-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


