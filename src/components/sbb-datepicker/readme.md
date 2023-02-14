# sbb-datepicker

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                          | Type                       | Default      |
| -------------------- | --------------------- | -------------------------------------------------------------------- | -------------------------- | ------------ |
| `accessibilityLabel` | `accessibility-label` | This will be forwarded as aria-label to the relevant nested element. | `string`                   | `undefined`  |
| `dateFilter`         | --                    | A function used to filter out dates.                                 | `(date: Date) => boolean`  | `() => true` |
| `disabled`           | `disabled`            | Disabled state for the inner HTMLInputElement.                       | `boolean`                  | `false`      |
| `form`               | `form`                | The <form> element to associate the inner HTMLInputElement with.     | `string`                   | `undefined`  |
| `max`                | `max`                 | The maximum valid date.                                              | `Date \| number \| string` | `undefined`  |
| `min`                | `min`                 | The minimum valid date.                                              | `Date \| number \| string` | `undefined`  |
| `readonly`           | `readonly`            | Readonly state for the inner HTMLInputElement.                       | `boolean`                  | `false`      |
| `required`           | `required`            | Required state for the inner HTMLInputElement.                       | `boolean`                  | `false`      |
| `value`              | `value`               | Value for the inner HTMLInputElement.                                | `string`                   | `null`       |
| `valueAsDate`        | --                    | Date value with the given time for the inner HTMLInputElement.       | `Date`                     | `null`       |
| `wide`               | `wide`                | If set to true, two months are displayed                             | `boolean`                  | `false`      |


## Events

| Event       | Description                                                                                                                         | Type               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `change`    |                                                                                                                                     | `CustomEvent<any>` |
| `didChange` | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/> | `CustomEvent<any>` |
| `didRender` |                                                                                                                                     | `CustomEvent<any>` |


----------------------------------------------


