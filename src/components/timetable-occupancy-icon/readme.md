The `sbb-timetable-occupancy-icon` is a component used to render a [sbb-icon](/docs/components-sbb-icon--docs)
based on the wagon occupancy and the page style (normal, dark mode, high contrast mode).

```html
<sbb-timetable-occupancy-icon occupancy="HIGH"></sbb-timetable-occupancy-icon>
```

## Style

It's possible to display the component in `negative` variant using the self-named property;
in this case, the rendered icon will change accordingly.

```html
<sbb-timetable-occupancy-icon occupancy="LOW" negative></sbb-timetable-occupancy-icon>
```

## Accessibility

In high contrast mode, in both light and dark variant, the rendered icon changes for a better user experience.

<!-- Auto Generated Below -->

## Properties

| Name        | Attribute   | Privacy | Type            | Default | Description                     |
| ----------- | ----------- | ------- | --------------- | ------- | ------------------------------- |
| `occupancy` | `occupancy` | public  | `OccupancyEnum` |         | Wagon occupancy.                |
| `negative`  | `negative`  | public  | `boolean`       | `false` | Negative coloring variant flag. |
