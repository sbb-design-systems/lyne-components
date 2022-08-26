# sbb-journey-summary



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute | Description | Type                                                                                                                                                                                           | Default     |
| ---------------------------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `summaryConfig` _(required)_ | --        |             | `{ leg: Leg[]; vias: string[]; startPoint: string; destination: string; arrivalWalk: number; departure: TimeQuayWrapper; arrival: TimeQuayWrapper; departureWalk: number; duration: number; }` | `undefined` |


## Dependencies

### Depends on

- [sbb-journey-header](../sbb-journey-header)
- [sbb-pearl-chain](../sbb-pearl-chain)

### Graph
```mermaid
graph TD;
  sbb-journey-summary --> sbb-journey-header
  sbb-journey-summary --> sbb-pearl-chain
  style sbb-journey-summary fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


