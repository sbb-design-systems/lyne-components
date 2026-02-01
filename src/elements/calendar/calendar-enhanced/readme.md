The `sbb-calendar-enhanced` is a component that can be used to display a calendar with extra information for each day.

The component must be used in combination with slotted [sbb-calendar-day](/docs/elements-sbb-calendar-sbb-calendar-day--docs).

```html
<sbb-calendar-enhanced>
  <sbb-calendar-day slot="2025-01-01"></sbb-calendar-day>
  <sbb-calendar-day slot="2025-01-02"></sbb-calendar-day>
  ...
  <sbb-calendar-day slot="2025-01-31"></sbb-calendar-day>
</sbb-calendar-enhanced>
```

## Configuration

The component shares the same functionalities of the [sbb-calendar](/docs/elements-sbb-calendar-sbb-calendar--docs),
so please refer to its 'Configuration' section for information
about the `dateSelected`, `min`, `max`, `dateFilter`, `week-numbers` and `multiple` properties.

## Slots

The component create its own slots based on the month to be displayed; during initialization it is the current month,
so for the first render the slotted `sbb-calendar-day`s must match those of the current month.

For month changes, please refer to the "Events" section.

## Style

The component shares the same style of the [sbb-calendar](/docs/elements-sbb-calendar-sbb-calendar--docs),
so please refer to its 'Style' section for information about the `wide`, `orientation` and `view` properties.

## Events

Each time the month changes due to user interaction with the previous/next month buttons,
or via selecting a different year and then a month, a `monthchange` event is emitted, typed as `SbbMonthChangeEvent`.

The event has a `range: Day[]` property, which can be accessed to have information about the days to render.
Consumers can listen to this event to dynamically create and slot the `sbb-calendar-day`s of the chosen month.

```html
<sbb-calendar-enhanced @monthchange="(e) => monthChangeHandler(e)">...</sbb-calendar-enhanced>
```

```ts
function monthChangeHandler(e) {
  const calendar = e.target;
  // Remove slotted days to keep the DOM clean.
  Array.from(calendar.children).forEach((e) => e.remove());
  // Add the new days
  e.range.map((day) => {
    const child = document.createElement('sbb-calendar-day');
    // The day.value property is the date in ISO8601 format,
    // the correct one for the `sbb-calendar-day`'s slot property.
    child.setAttribute('slot', day.value);
    calendar.appendChild(child);
  });
}
```

As in the `sbb-calendar`, consumers can listen to the `dateselected` event to intercept the selected date, which can be read from `event.detail`.

## Keyboard interaction

The component shares the same interaction of the [sbb-calendar](/docs/elements-sbb-calendar-sbb-calendar--docs),
so please refer to its 'Keyboard interaction' section for detailed information.

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

| Name           | Type                    | Description                                                                                     | Inherited From         |
| -------------- | ----------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- |
| `dateselected` | `CustomEvent<T \| T[]>` | Event emitted on date selection.                                                                | SbbCalendarBaseElement |
| `monthchange`  | `SbbMonthChangeEvent`   | Emits when the month changes. The `range` property contains the days array of the chosen month. |                        |
