The `sbb-mini-calendar` is a component used to display a minimal calendar.

It must be used in combination with one or more [sbb-mini-calendar-month](/docs/elements-sbb-mini-calendar-sbb-mini-calendar-month--docs),
each one slotting the requested [sbb-mini-calendar-day](/docs/elements-sbb-mini-calendar-sbb-mini-calendar-day--docs).

```html
<sbb-mini-calendar>
  <sbb-mini-calendar-month date="2025-01">
    <sbb-mini-calendar-day date="2025-01-01"></sbb-mini-calendar-day>
    ...
  </sbb-mini-calendar-month>
  <sbb-mini-calendar-month date="2025-02">
    <sbb-mini-calendar-day date="2025-02-01"></sbb-mini-calendar-day>
    ...
  </sbb-mini-calendar-month>
  ...
</sbb-mini-calendar>
```

## Slots

The `sbb-mini-calendar-month` are provided via an unnamed slot.
Consumers should check the accuracy of the slotted data, since there's no check on missing or wrongly formatted data.

## Style

The orientation of the days in each month can be set using the `orientation` property, which default value is `horizontal`.

```html
<sbb-mini-calendar orientation="vertical"> ... </sbb-mini-calendar>
```

## Keyboard interaction

It's possible to move within the component using the keyboard.

### Horizontal orientation

| Keyboard               | Action                                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Left Arrow</kbd>  | Go to previous day.                                                                                                         |
| <kbd>Right Arrow</kbd> | Go to next day.                                                                                                             |
| <kbd>Up Arrow</kbd>    | Go to the same day in the previous week (eg. from Monday to previous Monday).<br/>Allows movement between different months. |
| <kbd>Down Arrow</kbd>  | Go to the same day in the next week (eg. from Monday to next Monday).<br/>Allows movement between different months.         |
| <kbd>Home</kbd>        | Go to the first day of the month.                                                                                           |
| <kbd>End</kbd>         | Go to the last day of the month.                                                                                            |
| <kbd>Page Up</kbd>     | Go to the same day in the first week (eg. from Monday to the first Monday of the month).                                    |
| <kbd>Page Down</kbd>   | Go to the same day in the last week (eg. from Monday to the last Monday of the month).                                      |

### Vertical orientation

| Keyboard               | Action                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| <kbd>Left Arrow</kbd>  | Go to the same day in the next week (eg. from Monday to next Monday).<br/>Allows movement between different months. |
| <kbd>Right Arrow</kbd> | Go to the same day in the next week (eg. from Monday to next Monday).<br/>Allows movement between different months. |
| <kbd>Up Arrow</kbd>    | Go to previous day.                                                                                                 |
| <kbd>Down Arrow</kbd>  | Go to next day.                                                                                                     |
| <kbd>Home</kbd>        | Go to the first day of the month.                                                                                   |
| <kbd>End</kbd>         | Go to the last day of the month.                                                                                    |
| <kbd>Page Up</kbd>     | Go to the first day of the week (eg. from any day to Monday of the same week).                                      |
| <kbd>Page Down</kbd>   | Go to the last day of the week (eg. from any day to Sunday of the same week).                                       |

## Accessibility

Even though some WCAG rules have been followed
(e.g., `aria-label`s on `sbb-mini-calendar-day`s, keyboard navigation, visible focus indicator, correct contrast...),
the component may not be fully accessible due to the small dimensions of `sbb-mini-calendar-day`s and
the usage of a grid implementation for the `sbb-mini-calendar-month`
(differently from the `sbb-calendar`, which has a table implementation).

<!-- Auto Generated Below -->

## Properties

| Name          | Attribute     | Privacy | Type             | Default        | Description                              |
| ------------- | ------------- | ------- | ---------------- | -------------- | ---------------------------------------- |
| `orientation` | `orientation` | public  | `SbbOrientation` | `'horizontal'` | The orientation of days in the calendar. |

## Slots

| Name | Description                                                     |
| ---- | --------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-mini-calendar-month` elements. |
