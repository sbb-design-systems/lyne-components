# sbb-datepicker

The `sbb-datepicker` component can be used together with a native input element to display the typed value 
as a formatted date (dd.MM.yyyy). 

The component allows the insertion of up to 10 numbers, possibly with separators like `.`, `-`, ` `, `,` or `/`, 
then automatically formats the value as date and displays it. It also exposes methods to get/set the value formatted as Date.

If the `sbb-datepicker` is used within a `sbb-form-field` with a native input, they are automatically linked; otherwise,
they can be connected using the `input` property, which accepts the id of the native input, or directly its reference.

When the two are linked, the component sets the input placeholder, and the input's type as `text`, then reads 
the `disabled`, `readonly`, `min` and `max` attributes from the input and emits then as payload of the `inputUpdated` event.
If the input's value changes, it is formatted then a `change` event is emitted with the new value. If it's an invalid
date, the `sbb-invalid` class is added to the input. The component also listens for changes in its two properties, 
 `wide` and `dateFilter`, and emits a `datePickerUpdated` event when changed.

Consumers can listen to the native `change` event on the `sbb-datepicker` component to intercept the date change `event`;
the current value can be read from the async method `event.target.getValueAsDate()`.

Note that using the `dateFilter` function as a replacement for the `min` and `max` properties will most likely result in a significant loss of performance.

## Usage

Without `sbb-form-field`:
```html
    <input id="datepicker-input" />
    <sbb-datepicker input="datepicker-input"></sbb-datepicker>
```

Without `sbb-form-field`, with all related components:
```html
    <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
    <sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
    <input id="datepicker-input" />
    <sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
    <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
```

With `sbb-form-field`, and input params set:
```html
    <sbb-form-field>
      <input min="1600000000" max="1700000000" value="01.01.2023" readonly=""/>
      <sbb-datepicker></sbb-datepicker>
    </sbb-form-field>
```

With `sbb-form-field` and all related components, input's value set, `wide` set to true:
```html
    <sbb-form-field>
      <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      <sbb-datepicker-toggle></sbb-datepicker-toggle>
      <input value="01.01.2023"/>
      <sbb-datepicker wide></sbb-datepicker>
      <sbb-datepicker-next-day></sbb-datepicker-next-day>
    </sbb-form-field>
```

## Testing

To specify a specific date for the current datetime, you can use the `data-now` attribute (timestamp in milliseconds).
This is helpful if you need a specific state of the component.

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description                                                | Type                      | Default      |
| ------------ | --------- | ---------------------------------------------------------- | ------------------------- | ------------ |
| `dateFilter` | --        | A function used to filter out dates.                       | `(date: Date) => boolean` | `() => true` |
| `input`      | `input`   | Reference of the native input connected to the datepicker. | `HTMLElement \| string`   | `undefined`  |
| `wide`       | `wide`    | If set to true, two months are displayed                   | `boolean`                 | `false`      |


## Events

| Event               | Description                                                                                                                         | Type                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `change`            |                                                                                                                                     | `CustomEvent<any>`              |
| `datePickerUpdated` | Notifies that the attributes of the datepicker has changes.                                                                         | `CustomEvent<any>`              |
| `didChange`         | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/> | `CustomEvent<any>`              |
| `inputUpdated`      | Notifies that the attributes of the input connected to the datepicker has changes.                                                  | `CustomEvent<InputUpdateEvent>` |


## Methods

### `getValueAsDate() => Promise<Date>`

Gets the input value with the correct date format.

#### Returns

Type: `Promise<Date>`



### `setValueAsDate(date: Date) => Promise<void>`

Set the input value to the correctly formatted value.

#### Returns

Type: `Promise<void>`




----------------------------------------------


