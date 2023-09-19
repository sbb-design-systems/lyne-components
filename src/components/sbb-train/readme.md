A `sbb-train` is a component used as a container element for a collection of `sbb-train-wagon` or `sbb-train-blocked-passage`
and it can be used within the `sbb-train-formation` component.

```html
<sbb-train 
  direction-label="driving direction"
  direction-label-level="3"
  station="Genève-Aéroport"
  direction="left"
  accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
>
  ...
</sbb-train>
```

It's possible to use the `station` property to display the label of the `sbb-train` destination, 
while the `direction` property can be used to display the direction indicator (default: `left`).
The direction label and the level of its heading tag are set, respectively, 
with the property `directionLabel` and `directionLabelLevel`

## Accessibility

The `accessibility-label` property should be used to give further information about the leaving direction of the `sbb-train`.
It should refer to the section where the locomotive is placed.

<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute               | Description                                                                                  | Type                                     | Default     |
| ----------------------------- | ----------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `accessibilityLabel`          | `accessibility-label`   | Accessibility label for additional information regarding the leaving direction of the train. | `string`                                 | `undefined` |
| `direction`                   | `direction`             | Controls the direction indicator to show the arrow left or right. Default is left.           | `"left" \| "right"`                      | `'left'`    |
| `directionLabel` _(required)_ | `direction-label`       | General label for "driving direction".                                                       | `string`                                 | `undefined` |
| `directionLabelLevel`         | `direction-label-level` | Heading level of the direction label, used for screen readers.                               | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `'6'`       |
| `station`                     | `station`               | Label for the destination station of the train.                                              | `string`                                 | `undefined` |


## Slots

| Slot        | Description                         |
| ----------- | ----------------------------------- |
| `"unnamed"` | Used for slotting sbb-train-wagons. |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-train --> sbb-icon
  style sbb-train fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


