# sbb-timetable-row

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type      | Default                   |
| ------------------- | -------------------- | ----------- | --------- | ------------------------- |
| `accessiblityLabel` | `accessiblity-label` |             | `string`  | `undefined`               |
| `direction`         | `direction`          |             | `string`  | `'Richtung Hauptbahnhof'` |
| `loading`           | `loading`            |             | `boolean` | `undefined`               |
| `pictogramName`     | `pictogram-name`     |             | `string`  | `'tick-small'`            |
| `transportNumber`   | `transport-number`   |             | `string`  | `undefined`               |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-timetable-row --> sbb-timetable-row-header
  sbb-timetable-row --> sbb-timetable-transportation-details
  sbb-timetable-row --> sbb-timetable-row-button
  sbb-timetable-row --> sbb-timetable-platform
  sbb-timetable-row --> sbb-timetable-occupancy
  sbb-timetable-row --> sbb-timetable-travel-hints
  sbb-timetable-row --> sbb-timetable-duration
  sbb-timetable-row --> sbb-timetable-cus-him
  sbb-timetable-transportation-details --> sbb-timetable-transportation-number
  sbb-timetable-transportation-details --> sbb-timetable-transportation-walk
  sbb-timetable-transportation-details --> sbb-timetable-transportation-time
  style sbb-timetable-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


