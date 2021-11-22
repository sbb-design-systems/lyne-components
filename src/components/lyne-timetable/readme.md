# lyne-timetable



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description | Type     | Default     |
| --------------------- | --------- | ----------- | -------- | ----------- |
| `config` _(required)_ | `config`  |             | `string` | `undefined` |


## Dependencies

### Depends on

- [lyne-timetable-row](../lyne-timetable-row)

### Graph
```mermaid
graph TD;
  lyne-timetable --> lyne-timetable-row
  lyne-timetable-row --> lyne-timetable-transportation-details
  lyne-timetable-row --> lyne-timetable-platform
  lyne-timetable-row --> lyne-timetable-occupancy
  lyne-timetable-row --> lyne-timetable-duration
  lyne-timetable-transportation-details --> lyne-timetable-transportation-number
  lyne-timetable-transportation-details --> lyne-timetable-transportation-time
  lyne-timetable-transportation-details --> lyne-pearl-chain
  style lyne-timetable fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


