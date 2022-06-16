# sbb-timetable-transportation-walk

!! Please note that this component is not intended for direct use. It will get used within sbb-timetable. It is listed
here to show the various configuration options to component developers. !!

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute    | Description                                                                                                                               | Type                              | Default         |
| --------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------- |
| `appearance`          | `appearance` | Set the desired appearance of the component.                                                                                              | `"first-level" \| "second-level"` | `'first-level'` |
| `config` _(required)_ | `config`     | Stringified JSON which defines most of the content of the component. Please check the individual stories to get an idea of the structure. | `string`                          | `undefined`     |


## Dependencies

### Used by

 - [sbb-timetable-button](../sbb-timetable-button)
 - [sbb-timetable-transportation-details](../sbb-timetable-transportation-details)

### Graph
```mermaid
graph TD;
  sbb-timetable-button --> sbb-timetable-transportation-walk
  sbb-timetable-transportation-details --> sbb-timetable-transportation-walk
  style sbb-timetable-transportation-walk fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


