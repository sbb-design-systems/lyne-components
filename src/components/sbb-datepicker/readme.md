# sbb-datepicker

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description                              | Type                       | Default      |
| ------------ | --------- | ---------------------------------------- | -------------------------- | ------------ |
| `dateFilter` | --        | A function used to filter out dates.     | `(date: Date) => boolean`  | `() => true` |
| `max`        | `max`     | The maximum valid date.                  | `Date \| number \| string` | `undefined`  |
| `min`        | `min`     | The minimum valid date.                  | `Date \| number \| string` | `undefined`  |
| `wide`       | `wide`    | If set to true, two months are displayed | `boolean`                  | `false`      |


## Dependencies

### Depends on

- [sbb-button](../sbb-button)
- [sbb-tooltip](../sbb-tooltip)
- [sbb-calendar](../sbb-calendar)

### Graph
```mermaid
graph TD;
  sbb-datepicker --> sbb-button
  sbb-datepicker --> sbb-tooltip
  sbb-datepicker --> sbb-calendar
  sbb-button --> sbb-icon
  sbb-tooltip --> sbb-button
  sbb-calendar --> sbb-button
  style sbb-datepicker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


