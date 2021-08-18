# lyne-button



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute                      | Description                                                                                                                                                                                                                                                                                                                                                                                   | Type                           | Default     |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `arrivalPointCancellation`   | `arrival-point-cancellation`   | If set to true, the arrival point will be marked as cancelled                                                                                                                                                                                                                                                                                                                                 | `boolean`                      | `undefined` |
| `departurePointCancellation` | `departure-point-cancellation` | If set to true, the departure point will be marked as cancelled                                                                                                                                                                                                                                                                                                                               | `boolean`                      | `undefined` |
| `stations`                   | `stations`                     | Stringified JSON to define the stations on the pearl-chain. Format: `{stations: [{location: number, cancellation?: boolean}]}` `location`: number between 0 and 100, which will represent the station on the pearl-chain `cancellation`: if set, the station will be marked as canceled. In this case, the connections to the previous and next stations will be marked as cancelled as well. | `string`                       | `undefined` |
| `status`                     | `status`                       | Define, if the pearlchain represents a connection in the past, in the future or if it is a currently running connection. If it is currently running, provide a number between 0 and 100, which will represent the current location on the pearl-chain.                                                                                                                                        | `"future" \| "past" \| number` | `'future'`  |
| `vertical`                   | `vertical`                     | If set, the pearlchain will be displayed vertically.                                                                                                                                                                                                                                                                                                                                          | `boolean`                      | `undefined` |


----------------------------------------------


