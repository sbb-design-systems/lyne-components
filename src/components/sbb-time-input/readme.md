The `sbb-time-input` is a component that displays the typed value as a formatted time (HH:mm).

The component allows the insertion of up to 4 numbers, possibly with a separator char like `.`, `:`, `,` or `-`, 
then automatically formats the value as time and displays it (see the "Format example" paragraph).

The initial value can be set using the `value` property (string) or the `valueAsDate` property (Date).
When the input changes, if it is valid, the component updates the `value`, while `valueAsDate` is changed this way: 
the start date is set to 01.01.1970, 00:00:00 UTC, then the typed hours and minuted are added, 
e.g.: with a value of `12:34`, the `valueAsDate` will be 01.01.1970, 12:34:00 UTC.
If the value is invalid because not real (e.g. 12:61 or 25:30), the component does not format the `value`,
and empties the `valueAsDate` property.

It is possible to display the component in disabled or readonly state by using the self-named properties.
The component can be used within a `<sbb-form-field>` component, and it has a `required` property, 
which can be useful for setting a custom `<sbb-form-error>` message.

Consumers can listen to the native `change` event on the `sbb-time-input` component to intercept the input's change `event`;
the current `value` can be read from `event.target.value` and the `valueAsDate` from `event.target.valueAsDate`.

### Format example

See the table below for some formatting examples:

| Input | Output |
|-------|--------|
| 12:34 | 12:34  |
| 1     | 01:00  |
| 12    | 12:00  |
| 123   | 01:23  |
| 1234  | 12:34  |
| 1.    | 01:00  |
| 1.2   | 01:02  |
| 1.23  | 01:23  |
| 12:   | 12:00  |
| 12.3  | 12:03  |
| 12,34 | 12:34  |
| 12-34 | 12:34  |

### Usage

Basic usage:

```html
<sbb-time-input value='13:30'></sbb-time-input>
```

Required `sbb-time-input` inside a `sbb-form-field`:

```html
<sbb-form-field label='My form' width='collapse'>
  <sbb-time-input value='23:15' required='true' form='form'></sbb-time-input>
  <sbb-form-error>This field is required!</sbb-form-error>
</sbb-form-field>
```

Readonly `sbb-time-input` inside a `sbb-form-field`:

```html
<sbb-form-field size='l' label='My form' width='collapse'>
  <sbb-time-input value='08:00' readonly='true' form='form'></sbb-time-input>
</sbb-form-field>
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute  | Description                                                      | Type      | Default     |
| ------------- | ---------- | ---------------------------------------------------------------- | --------- | ----------- |
| `disabled`    | `disabled` | Disabled state for the inner HTMLInputElement.                   | `boolean` | `false`     |
| `form`        | `form`     | The <form> element to associate the inner HTMLInputElement with. | `string`  | `undefined` |
| `readonly`    | `readonly` | Readonly state for the inner HTMLInputElement.                   | `boolean` | `false`     |
| `required`    | `required` | Required state for the inner HTMLInputElement.                   | `boolean` | `false`     |
| `value`       | `value`    | Value for the inner HTMLInputElement.                            | `string`  | `''`        |
| `valueAsDate` | --         | Date value with the given time for the inner HTMLInputElement.   | `Date`    | `null`      |


## Events

| Event       | Description                                                                                                                         | Type               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `didChange` | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/> | `CustomEvent<any>` |


----------------------------------------------


