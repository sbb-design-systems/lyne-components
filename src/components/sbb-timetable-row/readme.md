# sbb-timetable-row

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                               | Type                                                                                                                        | Default     |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `accessibilityLabel` | `accessibility-label` | This will be forwarded as aria-label to the relevant element.                             | `string`                                                                                                                    | `undefined` |
| `config`             | --                    | The config Prop                                                                           | `{ price: string; notices?: Notice[]; situations?: PtSituation[]; summary: TripSummary; tripId: string; valid?: boolean; }` | `undefined` |
| `loading`            | `loading`             | The loading state - when this is true it will be render skeleton with an idling animation | `boolean`                                                                                                                   | `false`     |


## Dependencies

### Depends on

- [sbb-card-badge](../sbb-card-badge)
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


