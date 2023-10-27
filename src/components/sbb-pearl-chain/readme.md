The `sbb-pearl-chain` component displays all parts of a journey, including changes of trains or other kinds of transports. 
Also, it is possible to render the current position.

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
      }
    }
  },
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
      }
    }
  }
]
```

```html
<sbb-pearl-chain legs={legs}></sbb-pearl-chain>
```


## Testing

To specify a specific date for the current datetime, you can use the `data-now` attribute (timestamp in milliseconds).
This is helpful if you need a specific state of the component.

<!-- Auto Generated Below --> 
 

## Properties 

| Name               | Attribute               | Privacy | Type                   | Default | Description                                                                                                                                                                                                                                                                                            |
| ------------------ | ------------------ | ------- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `legs`             | `legs`             | public  | `(Leg \| PtRideLeg)[]` |         |                |
| `disableAnimation` | `disable-animation` | public  | `boolean \| undefined` |         |                |

