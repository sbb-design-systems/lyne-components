The `sbb-time-input` is a component that displays the typed value as a formatted time (HH:mm).

The component allows the insertion of up to 4 numbers, possibly with a separator char like `.`, `:`, `,` or `-`, 
then automatically formats the value as time and displays it (see the "Format example" paragraph).

Basically the native `input` element and the `sbb-time-input` have to be connected by id reference (see example).
If you use it inside a sbb-form-field, the connection is created automatically.

The initial value can be set using the `value` property (string) of the `input` or the `setValueAsDate()`
method of the `sbb-time-input`.
When the input changes, if it is valid, the component updates the `value` of the `input`. To get the value as a `Date` object, 
the `getValueAsDate()` method of the `sbb-time-input` can be called. The date is constructed like following: 
the start date is set to 01.01.1970, 00:00:00 UTC, then the typed hours and minuted are added, 
e.g.: with a value of `12:34`, the `getValueAsDate()` will be 01.01.1970, 12:34:00 UTC.
If the value is invalid because not real (e.g. 12:61 or 25:30), the component does not format the `value`,
and will return `null` if  `getValueAsDate()` was called.

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

## Validation Change

Whenever the validation state changes (e.g. a valid value becomes invalid or vice versa), the `validationChange` event is emitted.


## Usage

Basic usage:

```html
<input value='13:30' id='input-id'>
<sbb-time-input input='input-id'></sbb-time-input>
```

Required `sbb-time-input` inside a `sbb-form-field`:

```html
<sbb-form-field label='My form' width='collapse'>
  <input value='13:30' required>
  <sbb-time-input></sbb-time-input>
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

| Property | Attribute | Description                                                | Type                    | Default     |
| -------- | --------- | ---------------------------------------------------------- | ----------------------- | ----------- |
| `input`  | `input`   | Reference of the native input connected to the datepicker. | `HTMLElement \| string` | `undefined` |


## Events

| Event              | Description                                                                                                                         | Type                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `didChange`        | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/> | `CustomEvent<any>`                   |
| `validationChange` | Emits whenever the internal validation state changes.                                                                               | `CustomEvent<ValidationChangeEvent>` |


## Methods

### `getValueAsDate() => Promise<Date | null>`

Gets the input value with the correct date format.

#### Returns

Type: `Promise<Date>`



### `setValueAsDate(date: Date | number | string) => Promise<void>`

Set the input value to the correctly formatted value.

#### Returns

Type: `Promise<void>`




----------------------------------------------