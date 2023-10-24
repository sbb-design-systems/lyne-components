The `sbb-journey-summary` displays the main information of a journey. 
It contains information about the arrival and departure, the date when the journey takes place and how long the trip will be. 
It also consists of a pearl-chain with arrival and departure time. 
In addition to that, it is also possible to display the walktimes at the start and end of a journey. 
The component has an unnamed slot where other elements can be added, i.e. buttons.

## Usage
The Example below shows how to render the component with a button in the slot. 
To be displayed correctly, the trip prop has to include almost all properties mentioned in the table below. 
It is important that the arrival and departure properties consist of a valid ISO 8601 date string. 
If this is not the case, the times and the date will not be displayed. 
If the tripBack prop is passed to the component a second journey-summary, without the header, is displayed.

```html
<sbb-journey-summary trip={trip}><sbb-button /></sbb-journey-summary>
```
<!-- Auto Generated Below --> 
 

| Name               | Attribute               | Privacy | Type                                                | Default | Description                                                                                                        |
| ------------------ | ------------------ | ------- | --------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `trip`             | `trip`             | public  | `InterfaceSbbJourneySummaryAttributes`              |         | The trip prop                                                                                                      |
| `tripBack`         | `trip-back`         | public  | `InterfaceSbbJourneySummaryAttributes \| undefined` |         | The tripBack prop                                                                                                  |
| `roundTrip`        | `round-trip`        | public  | `boolean \| undefined`                              |         | The RoundTrip prop. This prop controls if one or two arrows are displayed in the header.                           |
| `headerLevel`      | `header-level`      | public  | `TitleLevel \| undefined`                           | `'3'`   | Heading level of the journey header element (e.g. h1-h6).                                                          |
| `disableAnimation` | `disable-animation` | public  | `boolean \| undefined`                              |         | Per default, the current location has a pulsating animation. You can&#xA;disable the animation with this property. |

| Name               | Privacy | Type                                                | Default | Description                                                                                                        | Inherited From |
| ------------------ | ------- | --------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ | -------------- |
| `trip`             | public  | `InterfaceSbbJourneySummaryAttributes`              |         | The trip prop                                                                                                      |                |
| `tripBack`         | public  | `InterfaceSbbJourneySummaryAttributes \| undefined` |         | The tripBack prop                                                                                                  |                |
| `roundTrip`        | public  | `boolean \| undefined`                              |         | The RoundTrip prop. This prop controls if one or two arrows are displayed in the header.                           |                |
| `headerLevel`      | public  | `TitleLevel \| undefined`                           | `'3'`   | Heading level of the journey header element (e.g. h1-h6).                                                          |                |
| `disableAnimation` | public  | `boolean \| undefined`                              |         | Per default, the current location has a pulsating animation. You can&#xA;disable the animation with this property. |                |

