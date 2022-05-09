# lyne-timetable-row



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                                                                                                                               | Type     | Default     |
| --------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `config` _(required)_ | `config`  | Stringified JSON which defines most of the content of the component. Please check the individual stories to get an idea of the structure. | `string` | `undefined` |


## Dependencies

### Depends on

- [lyne-timetable-row-header](../lyne-timetable-row-header)
- [lyne-timetable-transportation-details](../lyne-timetable-transportation-details)
- [lyne-timetable-row-button](../lyne-timetable-row-button)
- [lyne-timetable-platform](../lyne-timetable-platform)
- [lyne-timetable-occupancy](../lyne-timetable-occupancy)
- [lyne-timetable-travel-hints](../lyne-timetable-travel-hints)
- [lyne-timetable-duration](../lyne-timetable-duration)
- [lyne-timetable-cus-him](../lyne-timetable-cus-him)

### Graph
```mermaid
graph TD;
  lyne-timetable-row --> lyne-timetable-row-header
  lyne-timetable-row --> lyne-timetable-transportation-details
  lyne-timetable-row --> lyne-timetable-row-button
  lyne-timetable-row --> lyne-timetable-platform
  lyne-timetable-row --> lyne-timetable-occupancy
  lyne-timetable-row --> lyne-timetable-travel-hints
  lyne-timetable-row --> lyne-timetable-duration
  lyne-timetable-row --> lyne-timetable-cus-him
  lyne-timetable-transportation-details --> lyne-timetable-transportation-number
  lyne-timetable-transportation-details --> lyne-timetable-transportation-walk
  lyne-timetable-transportation-details --> lyne-timetable-transportation-time
  lyne-timetable-transportation-details --> lyne-pearl-chain
  style lyne-timetable-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


