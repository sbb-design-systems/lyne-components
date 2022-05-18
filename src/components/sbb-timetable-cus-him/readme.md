# sbb-timetable-cus-him

!! Please note that this component is not intended for direct use. It will get used within sbb-timetable. It is listed
here to show the various configuration options to component developers. !!

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute    | Description                                                                                                                               | Type                                                                                           | Default              |
| --------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------- |
| `appearance`          | `appearance` | Set the desired appearance of the component.                                                                                              | `"first-level-list" \| "second-level-button" \| "second-level-list" \| "second-level-message"` | `'first-level-list'` |
| `config` _(required)_ | `config`     | Stringified JSON which defines most of the content of the component. Please check the individual stories to get an idea of the structure. | `string`                                                                                       | `undefined`          |


## Dependencies

### Used by

 - [sbb-timetable-button](../sbb-timetable-button)
 - [sbb-timetable-row](../sbb-timetable-row)

### Graph
```mermaid
graph TD;
  sbb-timetable-button --> sbb-timetable-cus-him
  sbb-timetable-row --> sbb-timetable-cus-him
  style sbb-timetable-cus-him fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


