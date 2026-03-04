### sbb-timetable-form-swap-button

The `sbb-timetable-form-swap-button` is an extension of [sbb-secondary-button](/docs/elements-sbb-button-sbb-secondary-button--docs) to be used inside the `sbb-timetable-form`.
When clicked, it swaps the value of the sibling inputs and dispatch the `input` and `change` events.

```html
<form class="sbb-timetable-form">
  ...
  <sbb-timetable-form>
    <sbb-timetable-form-field>...</sbb-timetable-form-field>
    <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
    <sbb-timetable-form-field>...</sbb-timetable-form-field>
    ...
  </sbb-timetable-form>
</form>
```

## Accessibility

The default `aria-label` value is 'Swap from and to', localized in the supported languages.



### sbb-timetable-form-field

The `sbb-timetable-form-field` is an extension of [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs) to be used inside the `sbb-timetable-form`.

It provides all the functionalities of a `sbb-form-field` and handles the specific styles of a `sbb-timetable-form`.

```html
<form class="sbb-timetable-form">
  <sbb-timetable-form>
    ...
    <sbb-timetable-form-field>
      <label>From</label>
      <input type="text" name="from" />
    </sbb-timetable-form-field>
    <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
    <sbb-timetable-form-field>
      <label>To</label>
      <input type="text" name="to" />
    </sbb-timetable-form-field>
    ...
  </sbb-timetable-form>
</form>
```



### sbb-timetable-form-details

The `sbb-timetable-form-details` is a component meant to be used in combination with the [sbb-timetable-form](/docs/elements-sbb-timetable-form-sbb-timetable-form--docs).

Check the [details section](/docs/elements-sbb-timetable-form-sbb-timetable-form--docs#details-section) on how to use it.



### sbb-timetable-form

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

