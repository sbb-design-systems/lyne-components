# sbb-timetable-row

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute             | Description | Type                                                                                                                      | Default     |
| --------------------- | --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `accessibilityLabel`  | `accessibility-label` |             | `string`                                                                                                                  | `undefined` |
| `config` _(required)_ | --                    |             | `{ legs: Leg[]; notices?: Notice[]; situations?: PtSituation[]; summary: TripSummary; tripId: string; valid?: boolean; }` | `undefined` |
| `loading`             | `loading`             |             | `boolean`                                                                                                                 | `undefined` |


## Slots

| Slot                     | Description                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `"badge"`                | Slot used to render the sbb-card-badge component                                                                         |
| `"direction"`            | Slot used to render the direction text                                                                                   |
| `"duration"`             | Slot used to render the duration - recommandation: use `<time>` tag here                                                 |
| `"leftTime"`             | Slot used to render the time for the transportation time - recommandation: use `<time>` tag here                         |
| `"leftTime"`             | Slot used to render the arrival time - recommandation: use `<time datetime="">` tag here                                 |
| `"occupancyFirstClass"`  | Slot used to render the icon for the occupancy in the first class                                                        |
| `"occupancySecondClass"` | Slot used to render the icon for the occupancy in the second class                                                       |
| `"pearlChain"`           | Slot used to render the sbb-pearchain-chain component                                                                    |
| `"pictogram"`            | Slot used to render the product category                                                                                 |
| `"platform"`             | Slot used to render the platform                                                                                         |
| `"rightTime"`            | Slot used to render the departure time - recommandation: use `<time datetime="">` tag here                               |
| `"transportNumber"`      | Slot used to render the icon for the transportation number - alternative: override with the `transportNumber` Prop       |
| `"travelHints"`          | Slot used to render the hint icons as a list                                                                             |
| `"walkTimeAfter"`        | Slot used to render the walk time - renders automaticly the walk-icon next to it - recommandation: use `<time>` tag here |
| `"walkTimeBefore"`       | Slot used to render the walk time - renders automaticly the walk-icon next to it - recommandation: use `<time>` tag here |
| `"warning"`              | Slot used to render a warning icon - CUS-HIM Icons                                                                       |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)
- [sbb-timetable-row-button](../sbb-timetable-row-button)

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


