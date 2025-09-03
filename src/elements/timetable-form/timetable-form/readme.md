The `sbb-timetable-form` is a layout and interaction orchestrator for timetable forms.

It arranges related form parts (like origin/destination fields, swap button, and a details section) and provides utility classes for consistent, responsive composition.
Use it inside a native `<form>` and wrap the whole form with the `.sbb-timetable-form` class to enable the layout.

```html
<form class="sbb-timetable-form">
  <sbb-signet></sbb-signet>
  <sbb-timetable-form>
    <sbb-timetable-form-field>
      <label>From</label>
      <input type="text" name="from" />
    </sbb-timetable-form-field>
    <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
    <sbb-timetable-form-field>
      <label>To</label>
      <input type="text" name="to" />
    </sbb-timetable-form-field>
    <sbb-timetable-form-details> ... </sbb-timetable-form-details>
  </sbb-timetable-form>
</form>
```

## Style

Wrap the entire form with `.sbb-timetable-form` to enable spacing and positioning on various screen-sizes, including the placement of `sbb-signet`.

### Details section

The `sbb-timetable-form-details` is a flex wrapper separated by the main fields by a divider.

The `sbb-timetable-form` provide the following utility classes to compose the details section:

| Class                               | Effect                                   |
| ----------------------------------- | ---------------------------------------- |
| `.sbb-timetable-form-block`         | Expands the element to full width        |
| `.sbb-timetable-form-mobile-block`  | Full width on mobile screen sizes only   |
| `.sbb-timetable-form-mobile-hidden` | Hides the element on mobile screen sizes |

Here is an example of a details section:

```html
<sbb-timetable-form>
  ...
  <sbb-timetable-form-details>
    <sbb-form-field width="collapse" size="l" borderless class="sbb-timetable-form-mobile-block">
      <sbb-date-input></sbb-date-input>
      <sbb-datepicker-previous-day
        class="sbb-timetable-form-mobile-hidden"
      ></sbb-datepicker-previous-day>
      <sbb-datepicker-toggle></sbb-datepicker-toggle>
      <sbb-datepicker-next-day class="sbb-timetable-form-mobile-hidden"></sbb-datepicker-next-day>
      <sbb-datepicker></sbb-datepicker>
    </sbb-form-field>
    <sbb-divider orientation="vertical" class="sbb-timetable-form-mobile-hidden"></sbb-divider>
    <sbb-form-field width="collapse" size="l" borderless>
      <sbb-time-input value="13:30"></sbb-time-input>
    </sbb-form-field>
    <sbb-toggle size="s" name="departure-arrival">
      <sbb-toggle-option value="departure">Dep</sbb-toggle-option>
      <sbb-toggle-option value="arrival">Arr</sbb-toggle-option>
    </sbb-toggle>
    <div style="flex-grow: 1;"></div>
    <sbb-button type="submit" size="m">Search</sbb-button>
  </sbb-timetable-form-details>
</sbb-timetable-form>
```

## Interactions

The `sbb-timetable-form-swap-button`, when clicked, automatically swaps the values of the `sbb-timetable-form-field`

<!-- Auto Generated Below -->

## Slots

| Name | Description                                                 |
| ---- | ----------------------------------------------------------- |
|      | Use the unnamed slot to add content to the 'timetable-form' |
