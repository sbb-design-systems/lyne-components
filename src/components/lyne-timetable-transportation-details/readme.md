# lyne-timetable-transportation-details

!! Please note that this component is not intended for direct use. It will get used within lyne-timetable. It is listed
here to show the various configuration options to component developers. !!

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                                                                                                                               | Type     | Default     |
| --------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `config` _(required)_ | `config`  | Stringified JSON which defines most of the content of the component. Please check the individual stories to get an idea of the structure. | `string` | `undefined` |


## Dependencies

### Used by

 - [lyne-timetable-row](../lyne-timetable-row)

### Depends on

- [lyne-timetable-transportation-number](../lyne-timetable-transportation-number)
- [lyne-timetable-transportation-walk](../lyne-timetable-transportation-walk)
- [lyne-timetable-transportation-time](../lyne-timetable-transportation-time)
- [lyne-pearl-chain](../lyne-pearl-chain)

### Graph
```mermaid
graph TD;
  lyne-timetable-transportation-details --> lyne-timetable-transportation-number
  lyne-timetable-transportation-details --> lyne-timetable-transportation-walk
  lyne-timetable-transportation-details --> lyne-timetable-transportation-time
  lyne-timetable-transportation-details --> lyne-pearl-chain
  lyne-timetable-row --> lyne-timetable-transportation-details
  style lyne-timetable-transportation-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


