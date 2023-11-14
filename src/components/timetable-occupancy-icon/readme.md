The `sbb-timetable-occupancy-icon` is a component used to render a [sbb-icon](/docs/components-sbb-icon--docs)
based on the wagon occupancy and on the page style (normal, dark mode, high contrast mode).

```html
<sbb-timetable-occupancy-icon occupancy="high"></sbb-timetable-occupancy-icon>
```

## Style

It's possible to display the component in `negative` variant using the self-named property;
in this case, the rendered icon will change accordingly.

```html
<sbb-timetable-occupancy-icon occupancy="low" negative></sbb-timetable-occupancy-icon>
```

## Accessibility

In high contrast mode, in both light and dark variant, the rendered icon changes for a better user experience.

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute     | Privacy | Type           | Default   | Description                                                                                                                                                                                                   |
| ------------ | ------------- | ------- | -------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `occupancy`  | `occupancy`   | public  | `SbbOccupancy` |           | Wagon occupancy.                                                                                                                                                                                              |
| `negative`   | `negative`    | public  | `boolean`      | `false`   | Negative coloring variant flag.                                                                                                                                                                               |
| `ariaHidden` | `aria-hidden` | public  | `string`       | `'false'` | The aria-hidden property is set to "true" by default, since an icon alone does not convey any useful information for a screen-reader user.                                                                    |
| `name`       | `name`        | public  | `string`       |           | The provided name consisting of the namespace and the name of the icon. If the namespace is missing, the default namespace "sbb" will be used. E.g. `name` (will use "sbb" as namespace) or `namespace:name`. |
| `sanitize`   | `sanitize`    | public  | `boolean`      | `true`    | When set to `false`, SVG content that is HTTP fetched will not be checked if the response SVG content has any `<script>` elements, or any attributes that start with `on`, such as `onclick`.                 |
| `ariaLabel`  | `aria-label`  | public  | `string`       |           | Only set the aria-label if aria-hidden is set to "false".                                                                                                                                                     |
