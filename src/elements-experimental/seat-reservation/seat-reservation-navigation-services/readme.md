The `sbb-seat-reservation-navigation-services` is a component which displays the available service icons of a coach

The purpose of this component is to be used in the main
[sbb-reservation-navigation-coach](/docs/experimental-sbb-seat-reservation-navigation-coach--docs) component
and should not be used on its own even if it's possible.

```html
<sbb-seat-reservation-navigation-services .propertyIds="PROPERTY_IDS">
</sbb-seat-reservation-navigation-services>
```

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute       | Privacy | Type       | Default | Description                                                                          |
| --------------- | --------------- | ------- | ---------- | ------- | ------------------------------------------------------------------------------------ |
| `propertyIds`   | `property-ids`  | public  | `string[]` | `[]`    | Coach service property ids, which are used to display the services in the navigation |
| `showTitleInfo` | `showTitleInfo` | public  | `boolean`  | `false` | Disable the mouse over title information                                             |
| `vertical`      | `vertical`      | public  | `boolean`  | `false` | If true, the service icons are displayed vertically                                  |
