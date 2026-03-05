The `sbb-mini-calendar` is a component used to display a minimal calendar.

It must be used in combination with one or more `sbb-mini-calendar-month`,
each one slotting the required `sbb-mini-calendar-day`.

The `sbb-mini-calendar-month` requires usage of the `date` property/attribute in ISO string format (YYYY-MM).

The `sbb-mini-calendar-day` requires usage of the `date` property/attribute in ISO string format (YYYY-MM-DD).

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

Consumers should check the accuracy of the slotted data, since there's no check on missing or wrongly formatted data.

It's also possible to display a tooltip on hover using the `sbb-tooltip` attribute (when using the
`tooltip` module), passing the date with the desired format.
For better usability, it's suggested to set the `sbb-tooltip-open-delay` attribute too.

```html
<sbb-mini-calendar>
  <sbb-mini-calendar-month date="2025-01">
    <sbb-mini-calendar-day
      date="2025-01-01"
      sbb-tooltip="01.01.2025"
      sbb-tooltip-open-delay="200"
    ></sbb-mini-calendar-day>
    ...
  </sbb-mini-calendar-month>
</sbb-mini-calendar>
```

## Style

The orientation of the days in each month can be set using the `orientation` property, which default value is `horizontal`.

```html
<sbb-mini-calendar orientation="vertical"> ... </sbb-mini-calendar>
```

For the `sbb-mini-calendar-month` the month name is always displayed at the component's bottom;
the year is displayed on top only for January and for the first slotted month in the `sbb-mini-calendar`.

The `orientation` value of the `sbb-mini-calendar` parent controls the component's orientation via CSS rules.

The `sbb-mini-calendar-day` component has a `color` property, which is used to change the dot color.
Default colors are provided for `charcoal`, `cloud`, `orange`, `red` and `sky` values;
moreover, consumers can write their own CSS rules for custom values.

```html
<!-- default style -->
<sbb-mini-calendar-day date="2025-01-01" color="orange"></sbb-mini-calendar-day>

<!-- custom value -->
<style>
  sbb-mini-calendar-day[color='my-custom-color'] {
    color: lightskyblue;
  }
</style>
<sbb-mini-calendar-day date="2025-01-01" color="my-custom-color"></sbb-mini-calendar-day>
```

Similarly, a property named `marker` determines the shape of the dot.
Default styles are provided for `target`, `circle`, `slash` and `cross` values.
Consumers can write their own CSS rules for different values.

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
