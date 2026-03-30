The `<sbb-timetable-form>` is a layout and interaction orchestrator for timetable forms.

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

Wrap the entire form with `.sbb-timetable-form` to enable spacing and positioning on various screen-sizes, including the placement of `<sbb-signet>`.

### Details section

The `<sbb-timetable-form-details>` is a flex wrapper separated by the main fields by a divider.

The `<sbb-timetable-form>` provide the following utility classes to compose the details section:

| Class                               | Effect                                   |
| ----------------------------------- | ---------------------------------------- |
| `.sbb-timetable-form-block`         | Expands the element to full width        |
| `.sbb-timetable-form-mobile-block`  | Full width on mobile screen sizes only   |
| `.sbb-timetable-form-mobile-hidden` | Hides the element on mobile screen sizes |

Example of a details section:

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

The `<sbb-timetable-form-swap-button>`, when clicked, automatically swaps the values of the `<sbb-timetable-form-field>`
and dispatches the `input` and `change` events. The default `aria-label` value is 'Swap from and to', localized in the supported languages.

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbTimetableFormDetailsElement`, `sbb-timetable-form-details`

#### Slots

| Name | Description                                                 |
| ---- | ----------------------------------------------------------- |
|      | Use the unnamed slot to add content to the details section. |

### class: `SbbTimetableFormElement`, `sbb-timetable-form`

#### Slots

| Name | Description                                                 |
| ---- | ----------------------------------------------------------- |
|      | Use the unnamed slot to add content to the 'timetable-form' |

### class: `SbbTimetableFormFieldElement`, `sbb-timetable-form-field`

#### Properties

| Name            | Attribute        | Privacy | Type                                                           | Default      | Description                                                                                                                                                           |
| --------------- | ---------------- | ------- | -------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `borderless`    | `borderless`     | public  | `boolean`                                                      | `true`       | Whether to display the form field without a border.                                                                                                                   |
| `errorSpace`    | `error-space`    | public  | `'none' \| 'reserve'`                                          | `'none'`     | Whether to reserve space for an error message. `none` does not reserve any space. `reserve` does reserve one row for an error message.                                |
| `floatingLabel` | `floating-label` | public  | `boolean`                                                      | `true`       | Whether the label should float. If activated, the placeholder of the input is hidden.                                                                                 |
| `hiddenLabel`   | `hidden-label`   | public  | `boolean`                                                      | `false`      | Whether to visually hide the label. If hidden, screen readers will still read it.                                                                                     |
| `inputElement`  | -                | public  | `HTMLInputElement \| HTMLSelectElement \| HTMLElement \| null` |              | Returns the input element.                                                                                                                                            |
| `label`         | -                | public  | `HTMLLabelElement \| null`                                     |              | Reference to the slotted label.                                                                                                                                       |
| `negative`      | `negative`       | public  | `boolean`                                                      | `false`      | Negative coloring variant flag.                                                                                                                                       |
| `optional`      | `optional`       | public  | `boolean`                                                      | `false`      | Indicates whether the input is optional.<br><strong>Deprecated</strong>: Set the (optional) label text manually. Will be removed with next major version.             |
| `size`          | `size`           | public  | `string`                                                       | `'l'`        | Size variant, either l, m or s.                                                                                                                                       |
| `width`         | `width`          | public  | `string`                                                       | `'collapse'` | Defines the width of the component: - `default`: the component has defined width and min-width; - `collapse`: the component adapts itself to its inner input content. |

#### Methods

| Name    | Privacy | Description                                                                           | Parameters | Return | Inherited From      |
| ------- | ------- | ------------------------------------------------------------------------------------- | ---------- | ------ | ------------------- |
| `clear` | public  | Manually clears the input value. It only works for inputs, selects are not supported. |            | `void` | SbbFormFieldElement |
| `reset` | public  | Manually reset the form field. Currently, this only resets the floating label.        |            | `void` | SbbFormFieldElement |

#### CSS Properties

| Name                                       | Default | Description                                            |
| ------------------------------------------ | ------- | ------------------------------------------------------ |
| `--sbb-form-field-focus-underline-z-index` |         | To override the z-index of the focus underline effect, |
| `--sbb-form-field-outline-offset`          |         | To override the focus outline offset,                  |

#### Slots

| Name     | Description                                                                |
| -------- | -------------------------------------------------------------------------- |
|          | Use this slot to render an input/select or a supported non-native element. |
| `error`  | Use this slot to render an error.                                          |
| `label`  | Use this slot to render a label.                                           |
| `prefix` | Use this slot to render an icon on the left side of the input.             |
| `suffix` | Use this slot to render an icon on the right side of the input.            |

### class: `SbbTimetableFormSwapButtonElement`, `sbb-timetable-form-swap-button`

#### Properties

| Name                  | Attribute              | Privacy | Type                      | Default            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------- | ---------------------- | ------- | ------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`            | `disabled`             | public  | `boolean`                 | `false`            | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                 | `false`            | Whether the button should be aria-disabled but stay interactive.                                                                                                                                                                                                                                                                                                                                                                                        |
| `form`                | `form`                 | public  | `HTMLFormElement \| null` |                    | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `iconName`            | `icon-name`            | public  | `string`                  | `''`               | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                                                                                                                                                                                                                                                                                        |
| `loading`             | `loading`              | public  | `boolean`                 | `false`            | Whether the button indicates a loading state. The animation kicks in after a delay of 300ms, configurable with --sbb-button-loading-delay CSS variable.                                                                                                                                                                                                                                                                                                 |
| `name`                | `name`                 | public  | `string`                  |                    | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `negative`            | `negative`             | public  | `boolean`                 | `false`            | Negative coloring variant flag.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `size`                | `size`                 | public  | `SbbButtonSize`           | `'l' / 's' (lean)` | Size variant, either l, m or s.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `type`                | `type`                 | public  | `SbbButtonType`           | `'button'`         | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `validationMessage`   | -                      | public  | `string`                  |                    | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`            | -                      | public  | `ValidityState`           |                    | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`               | `value`                | public  | `string`                  | `''`               | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `willValidate`        | -                      | public  | `boolean`                 |                    | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

#### Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

#### CSS Properties

| Name                         | Default | Description                                                                                |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `--sbb-button-loading-delay` | `300ms` | The delay before the loading animation starts, when setting the button into loading state. |

#### Slots

| Name   | Description                                                  |
| ------ | ------------------------------------------------------------ |
|        | Use the unnamed slot to add content to the secondary-button. |
| `icon` | Slot used to display the icon, if one is set.                |
