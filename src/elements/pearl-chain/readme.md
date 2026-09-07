<!-- Auto Generated Below -->

## API Documentation

### class: `SbbPearlChainElement`, `sbb-pearl-chain`

#### Properties

| Name  | Attribute | Privacy | Type           | Default | Description                                                                                                               |
| ----- | --------- | ------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `now` | `now`     | public  | `Date \| null` | `null`  | A configured date which acts as the current date instead of the real current date. Only recommended for testing purposes. |

#### Methods

| Name         | Privacy | Description                                                                                                                | Parameters                       | Return | Inherited From |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------ | -------------- |
| `addNode`    | public  | Registers a `sbb-pearl-chain-node` with this pearl chain.                                                                  | `node: SbbPearlChainNodeElement` | `void` |                |
| `removeNode` | public  | Unregisters a `sbb-pearl-chain-node` from this pearl chain. Without arguments, behaves like the native `Element.remove()`. | `node: SbbPearlChainNodeElement` | `void` |                |

### class: `SbbPearlChainNodeElement`, `sbb-pearl-chain-node`

#### Properties

| Name         | Attribute    | Privacy | Type                                                                                                                                                            | Default | Description                                                                                   |
| ------------ | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `arrival`    | `arrival`    | public  | `Date \| null`                                                                                                                                                  | `null`  | The arrival date/time at this node. Accepts ISO 8601 datetime strings.                        |
| `departure`  | `departure`  | public  | `Date \| null`                                                                                                                                                  | `null`  | The departure date/time at this node. Accepts ISO 8601 datetime strings.                      |
| `disrupted`  | `disrupted`  | public  | `SbbPearlChainNodeTriState`                                                                                                                                     | `null`  | Marks the node as disrupted, coloring the bullet red (if rendered).                           |
| `irrelevant` | `irrelevant` | public  | `SbbPearlChainNodeTriState`                                                                                                                                     | `null`  | Marks the node as irrelevant, coloring the bullet gray (if rendered); supersedes `disrupted`. |
| `type`       | `type`       | public  | `'start' \| 'end' \| 'stop' \| 'boarding' \| 'alighting' \| 'skip' \| 'stop-duty' \| 'stop-on-demand' \| 'boarding-on-demand' \| 'alighting-on-demand' \| null` | `null`  | Decides how the bullet is rendered. Defaults to \_empty\_ (no bullet).                        |
| `walk`       | `walk`       | public  | `SbbPearlChainNodeTriState`                                                                                                                                     | `null`  | Marks the node as a walk connection. Does not affect the bullet color.                        |
