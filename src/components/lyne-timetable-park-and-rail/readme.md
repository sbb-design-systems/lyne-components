# lyne-timetable-park-and-rail



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute    | Description                                                                                                                                                                                                                                                                                              | Type            | Default         |
| --------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------- |
| `appearance`          | `appearance` | appearance of the Park & Ride display, (currently only 'first-level').                                                                                                                                                                                                                                   | `"first-level"` | `'first-level'` |
| `config` _(required)_ | `config`     | Stringified JSON to define the different outputs of the occupancy predicition cell. Format: occupancyItems: [ {    class: '1',    icon: "<svg width="19" height="16"...></svg>",,    occupancy: 'low' }, {    class: '2',    icon: "<svg width="19" height="16"...></svg>",,    occupancy: 'medium'  } ] | `string`        | `undefined`     |


## Dependencies

### Used by

 - [lyne-timetable-row](../lyne-timetable-row)

### Graph
```mermaid
graph TD;
  lyne-timetable-row --> lyne-timetable-park-and-rail
  style lyne-timetable-park-and-rail fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


