# sbb-datepicker

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description                                                | Type                       | Default      |
| ------------ | --------- | ---------------------------------------------------------- | -------------------------- | ------------ |
| `dateFilter` | --        | A function used to filter out dates.                       | `(date: Date) => boolean`  | `() => true` |
| `input`      | `input`   | Reference of the native input connected to the datepicker. | `HTMLElement \| string`    | `undefined`  |
| `max`        | `max`     | The maximum valid date.                                    | `Date \| number \| string` | `undefined`  |
| `min`        | `min`     | The minimum valid date.                                    | `Date \| number \| string` | `undefined`  |
| `wide`       | `wide`    | If set to true, two months are displayed                   | `boolean`                  | `false`      |


## Events

| Event               | Description                                                                                                                         | Type                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `change`            |                                                                                                                                     | `CustomEvent<any>`              |
| `datePickerUpdated` |                                                                                                                                     | `CustomEvent<any>`              |
| `didChange`         | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/> | `CustomEvent<any>`              |
| `inputUpdated`      |                                                                                                                                     | `CustomEvent<InputUpdateEvent>` |


## Methods

### `getValueAsDate() => Promise<Date>`



#### Returns

Type: `Promise<Date>`



### `setValueAsDate(date: Date) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------


