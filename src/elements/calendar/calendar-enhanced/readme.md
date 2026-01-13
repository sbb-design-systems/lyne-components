> Explain the use and the purpose of the component; add minor details if needed and provide a basic example.<br>
> If you reference other components, link their documentation at least once (the path must start from _/docs/..._ ).<br>
> For the examples, use triple backticks with file extension (` ```html <code here>``` `).<br>
> The following list of paragraphs is only suggested; remove, create and adapt as needed.

The `sbb-calendar-enhanced` is a component . . .

```html
<sbb-calendar-enhanced></sbb-calendar-enhanced>
```

## Slots

> Describe slot naming and usage and provide an example of slotted content.

## States

> Describe the component states (`disabled`, `readonly`, etc.) and provide examples.

## Style

> Describe the properties which change the component visualization (`size`, `negative`, etc.) and provide examples.

## Interactions

> Describe how it's possible to interact with the component (open and close a `sbb-dialog`, dismiss a `sbb-alert`, etc.) and provide examples.

## Events

> Describe events triggered by the component and possibly how to get information from the payload.

## Keyboard interaction

> If the component has logic for keyboard navigation (as the `sbb-calendar` or the `sbb-select`) describe it.

| Keyboard       | Action        |
| -------------- | ------------- |
| <kbd>Key</kbd> | What it does. |

## Accessibility

> Describe how accessibility is implemented and if there are issues or suggested best-practice for the consumers.

<!-- Auto Generated Below -->

## Properties

| Name          | Attribute      | Privacy | Type                                     | Default        | Description                                                                                                                |
| ------------- | -------------- | ------- | ---------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `dateFilter`  | `date-filter`  | public  | `((date: T \| null) => boolean) \| null` | `null`         | A function used to filter out dates.                                                                                       |
| `max`         | `max`          | public  | `T \| null`                              | `null`         | The maximum valid date. Accepts a date object or null. Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute. |
| `min`         | `min`          | public  | `T \| null`                              | `null`         | The minimum valid date. Accepts a date object or null. Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute. |
| `multiple`    | `multiple`     | public  | `boolean`                                | `false`        | Whether the calendar allows for multiple date selection.                                                                   |
| `orientation` | `orientation`  | public  | `SbbOrientation`                         | `'horizontal'` | The orientation of days in the calendar.                                                                                   |
| `selected`    | `selected`     | public  | `T \| T[] \| null`                       | `null`         | The selected date: accepts a date object, or, if `multiple`, an array of dates.                                            |
| `view`        | `view`         | public  | `CalendarView`                           | `'day'`        | The initial view of the calendar which should be displayed on opening.                                                     |
| `weekNumbers` | `week-numbers` | public  | `boolean`                                | `false`        | Whether it has to display the week numbers in addition to week days.                                                       |
| `wide`        | `wide`         | public  | `boolean`                                | `false`        | If set to true, two months are displayed                                                                                   |

## Methods

| Name            | Privacy | Description                                                         | Parameters | Return | Inherited From         |
| --------------- | ------- | ------------------------------------------------------------------- | ---------- | ------ | ---------------------- |
| `resetPosition` | public  | Resets the active month according to the new state of the calendar. |            | `void` | SbbCalendarBaseElement |

## Events

| Name              | Type                    | Description                      | Inherited From         |
| ----------------- | ----------------------- | -------------------------------- | ---------------------- |
| `currentViewDays` | `SbbMonthChangeEvent`   |                                  |                        |
| `dateselected`    | `CustomEvent<T \| T[]>` | Event emitted on date selection. | SbbCalendarBaseElement |
