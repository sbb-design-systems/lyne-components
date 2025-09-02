The `sbb-mini-calendar-month` is a component used to group
many [sbb-mini-calendar-day](/docs/elements-sbb-mini-calendar-sbb-mini-calendar-day).

The component needs to be wrapped in a [sbb-mini-calendar](/docs/elements-sbb-mini-calendar-sbb-mini-calendar),
and it requires a `date` property in ISOString format (YYYY-MM).

```html
<sbb-mini-calendar>
  <sbb-mini-calendar-month date="2025-01">
    <sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>
    ...
  </sbb-mini-calendar-month>
</sbb-mini-calendar>
```

## Slots

The `sbb-mini-calendar-day` are provided via an unnamed slot.
Consumers should check the accuracy of the slotted data, since there's no check on missing or wrongly formatted data.

## Style

The month name is always displayed at the component's bottom;
the year is displayed on top only for January and for the first slotted month in the `sbb-mini-calendar`.

The component has two different values for the orientation (`horizontal` and `vertical`);
the `sbb-mini-calendar` parent sets it as data-attribute based on its own `orientation` value.

<!-- Auto Generated Below -->

## Properties

| Name   | Attribute | Privacy | Type     | Default | Description         |
| ------ | --------- | ------- | -------- | ------- | ------------------- |
| `date` | `date`    | public  | `string` | `''`    | Date as ISO string. |

## Slots

| Name | Description                                                   |
| ---- | ------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-mini-calendar-day` elements. |
