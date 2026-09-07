<!-- Auto Generated Below -->

## API Documentation

### class: `SbbPearlChainElement`, `sbb-pearl-chain`

#### Properties

| Name  | Attribute | Privacy | Type   | Default      | Description                                                                                                               |
| ----- | --------- | ------- | ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `now` | `now`     | public  | `Date` | `new Date()` | A configured date which acts as the current date instead of the real current date. Only recommended for testing purposes. |

### class: `SbbPearlChainNodeElement`, `sbb-pearl-chain-node`

#### Properties

| Name         | Attribute    | Privacy | Type                                                                                                                                                            | Default | Description                                                                                   |
| ------------ | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `arrival`    | `arrival`    | public  | `Date \| null`                                                                                                                                                  | `null`  | The arrival date/time at this node. Accepts ISO 8601 datetime strings.                        |
| `departure`  | `departure`  | public  | `Date \| null`                                                                                                                                                  | `null`  | The departure date/time at this node. Accepts ISO 8601 datetime strings.                      |
| `disrupted`  | `disrupted`  | public  | `'arrival' \| 'departure' \| true \| null`                                                                                                                      | `null`  | Marks the node as disrupted, coloring the bullet red (if rendered).                           |
| `irrelevant` | `irrelevant` | public  | `'arrival' \| 'departure' \| true \| null`                                                                                                                      | `null`  | Marks the node as irrelevant, coloring the bullet gray (if rendered); supersedes `disrupted`. |
| `type`       | `type`       | public  | `'start' \| 'end' \| 'stop' \| 'boarding' \| 'alighting' \| 'skip' \| 'stop-duty' \| 'stop-on-demand' \| 'boarding-on-demand' \| 'alighting-on-demand' \| null` | `null`  | Decides how the bullet is rendered. Defaults to \_empty\_ (no bullet).                        |
| `walk`       | `walk`       | public  | `'arrival' \| 'departure' \| true \| null`                                                                                                                      | `null`  | Marks the node as a walk connection. Does not affect the bullet color.                        |
