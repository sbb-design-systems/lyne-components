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
  sbb-timetable-row --> sbb-card-badge
  sbb-timetable-row --> sbb-icon
  style sbb-timetable-row fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


