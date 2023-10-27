The `sbb-pearl-chain-time` component adds an optional walk icon and a duration in minutes 
before and/or after the [sbb-pearl-chain](/docs/timetable-sbb-pearl-chain--docs).

The walk time indicates that the user has to walk to get to the destination, or to the station to begin the journey.

The `legs` property is mandatory.

```json5
[
  {
    "__typename": "PTRideLeg",
    "arrival": {
      "time": "2022-12-11T12:13:00+01:00"
    },
    "departure": {
      "time": "2022-12-07T12:11:00+01:00"
    },
    "serviceJourney": {
      "serviceAlteration": {
        "cancelled": false,
        "delayText": "string",
        "reachable": true,
        "unplannedStopPointsText": ""
      },
      "notices": [
        {
          "name": "CI",
          "text": {
            "template": "Extended boarding time (45')"
          }
        }
      ]
    }
  }
]
```

```html
<sbb-pearl-chain-time 
  legs={legs} 
  departure-time="20:30"
  arrival-time="21:30" 
  departure-walk="5" 
  arrival-walk="3" 
/>
```

## Testing

To specify a specific date for the current datetime, you can use the `data-now` attribute (timestamp in milliseconds).
This is helpful if you need a specific state of the component.

<!-- Auto Generated Below --> 
 

## Properties 

| Name               | Attribute               | Privacy | Type                   | Default | Description                                                                                                                                                                                                                                                                                            |
| ------------------ | ------------------ | ------- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `legs`             | `legs`             | public  | `(Leg \| PtRideLeg)[]` |         |                |
| `departureTime`    | `departure-time`    | public  | `string \| undefined`  |         |                |
| `arrivalTime`      | `arrival-time`      | public  | `string \| undefined`  |         |                |
| `departureWalk`    | `departure-walk`    | public  | `number \| undefined`  |         |                |
| `arrivalWalk`      | `arrival-walk`      | public  | `number \| undefined`  |         |                |
| `disableAnimation` | `disable-animation` | public  | `boolean \| undefined` |         |                |

