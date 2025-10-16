The `sbb-calendar` component displays a calendar that allows the user to select a date.

While being deeply linked to the implementation of the [sbb-datepicker-toggle](/docs/elements-sbb-datepicker-sbb-datepicker-toggle--docs) component,
it can be used on its own.

```html
<sbb-calendar></sbb-calendar>
```

## Configuration

It's possible to set a date using the `dateSelected` property. Also, it's possible to place limits on the selection
using the two properties named `min` and `max`. For these three properties, the accepted formats are:

- Date objects
- ISO String
- Unix Timestamp (number of seconds since Jan 1, 1970)

It's recommended to set the time to 00:00:00.

```html
<sbb-calendar min="1599955200" max="1699920000" selected="1649980800"></sbb-calendar>
```

By default, the component takes, in order of priority,
the `dateSelected` property or the current date to calculate which month it has to show.
It's possible to move to the previous/next month using the two buttons at the top of the component.

It's also possible to select a specific date by clicking on the month label between the buttons:
this action opens a list of twenty-four selectable years, and, after the year selection, the list of months of that year.
Clicking on an element will set the month and restore the first view, allowing to select the desired day.

The `sbb-calendar` can be directly displayed in one of these modalities using the `view` property (default: `day`).

```html
<sbb-calendar selected="1585699200" view="month"></sbb-calendar>

<sbb-calendar selected="1585699200" view="year"></sbb-calendar>
```

Unwanted dates can be filtered out using the `dateFilter` property.
Note that using the `dateFilter` function as a replacement for the `min` and `max` properties will most likely result in a significant loss of performance.
The `dateFilter` is applied in all the views, so if some months or years are not allowed they will be displayed as disabled in the corresponding view.

```ts
/** Returns only working days (Mon-Fri). */
const dateFilterFn: (d: Day) => boolean = d.getDay() !== 6 && d.getDay() !== 0;
```

```tsx
<sbb-calendar date-filter=${dateFilterFn}></sbb-calendar>
```

### Multiple mode

By default, the component allows selecting a single date:
this behavior can be changed by setting the `multiple` attribute to true.
In this case the `selected` property, if set, must be an array; moreover, the days of the week become clickable,
allowing to select an entire column (e.g. all the Mondays, all the Tuesdays and so on).

```html
<sbb-calendar multiple></sbb-calendar>
```

If the `week-numbers` property is set, the ISO week dates are also clickable, allowing to select all the days in the week.

```html
<sbb-calendar multiple week-numbers></sbb-calendar>
```

## Style

The component displays by default a single month in the `day` view, or a list of twenty-four years in the `year` view,
or a list of months in the `month` view;
however, setting the `wide` property to `true` it's possible to duplicate the view, showing, respectively, two consecutive months or
two sets of twenty-four years or the list of the twelve months for two consecutive years.

```html
<sbb-calendar wide="true" selected="1699920000"></sbb-calendar>
```

It's also possible to change the orientation of dates by setting the `orientation` property to `vertical`.
In this variant, the weekdays are displayed on the left side of the component and the days progress along the vertical direction.
This visual change is applied only to the day view.

```html
<sbb-calendar orientation="vertical"></sbb-calendar>
```

In both orientations, the week days are always displayed;
using the `week-numbers` property, it's possible to display the ISO week dates perpendicularly to week days,
so on the left side in `horizontal` and on top in `vertical`.

```html
<sbb-calendar week-numbers></sbb-calendar>

<sbb-calendar orientation="vertical" week-numbers></sbb-calendar>
```

## Events

Consumers can listen to the `dateselected` event on the `sbb-calendar` component to intercept the selected date
which can be read from `event.detail`.

## Keyboard interaction

It's possible to move within the component using the keyboard.

The days disabled due to the presence of the `min`, `max` and `dateFilter` properties are taken into account: for example,
pressing the `<kbd>Home</kbd>` when the first day of the month is disabled will result in moving to the first non-disabled day.

### Horizontal orientation

| Keyboard               | Action                                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Left Arrow</kbd>  | Go to previous day.                                                                                                                            |
| <kbd>Right Arrow</kbd> | Go to next day.                                                                                                                                |
| <kbd>Up Arrow</kbd>    | Go to the same day in the previous week (eg. from Monday to previous Monday).<br/>In `wide` mode it's possible to move between the two months. |
| <kbd>Down Arrow</kbd>  | Go to the same day in the next week (eg. from Monday to next Monday).<br/>In `wide` mode it's possible to move between the two months.         |
| <kbd>Home</kbd>        | Go to the first day of the month.                                                                                                              |
| <kbd>End</kbd>         | Go to the last day of the month.                                                                                                               |
| <kbd>Page Up</kbd>     | Go to the same day in the first week (eg. from Monday to the first Monday of the month).                                                       |
| <kbd>Page Down</kbd>   | Go to the same day in the last week (eg. from Monday to the last Monday of the month).                                                         |

### Vertical orientation

| Keyboard               | Action                                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Left Arrow</kbd>  | Go to the same day in the next week (eg. from Monday to next Monday).<br/>In `wide` mode it's possible to move between the two months. |
| <kbd>Right Arrow</kbd> | Go to the same day in the next week (eg. from Monday to next Monday).<br/>In `wide` mode it's possible to move between the two months. |
| <kbd>Up Arrow</kbd>    | Go to previous day.                                                                                                                    |
| <kbd>Down Arrow</kbd>  | Go to next day.                                                                                                                        |
| <kbd>Home</kbd>        | Go to the first day of the month.                                                                                                      |
| <kbd>End</kbd>         | Go to the last day of the month.                                                                                                       |
| <kbd>Page Up</kbd>     | Go to the first day of the week (eg. from any day to Monday of the same week).                                                         |
| <kbd>Page Down</kbd>   | Go to the last day of the week (eg. from any day to Sunday of the same week).                                                          |

## Accessibility

For accessibility purposes, the component is rendered as a native table element and each day is a button.

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

| Name            | Privacy | Description                                                         | Parameters | Return | Inherited From |
| --------------- | ------- | ------------------------------------------------------------------- | ---------- | ------ | -------------- |
| `resetPosition` | public  | Resets the active month according to the new state of the calendar. |            | `void` |                |

## Events

| Name           | Type                    | Description                      | Inherited From |
| -------------- | ----------------------- | -------------------------------- | -------------- |
| `dateselected` | `CustomEvent<T \| T[]>` | Event emitted on date selection. |                |
