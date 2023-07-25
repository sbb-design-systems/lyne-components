The `<sbb-pearl-chain-vertical-item>` is intended to be used with the `<sbb-pearl-chain-vertical>` component. It is a table-row with three table-cells. It is used to display the dots and line of the pearl-chain. In addition to that, there are two slots, which make it possible to display content on the left and right side of the pearl-chain. The component has many styling option, which can be configured through the 'pearlChainVerticalItemAttributes' property.
The slots themselves are unstyled, so that they can be used in various ways.

## Usage with props 
Example prop: 
              pearlChainVerticalItemAttributes={{
                lineType: 'standard',
                lineColor: 'charcoal',
                minHeight: '89',
                hideLine: false,
                bulletType: 'thick-bullet',
                bulletSize: 'small',
              }}

``` html
  <sbb-pearl-chain-vertical-item  pearlChainVerticalItemAttributes={args}>
    <div slot="right">content</div>
    <div slot="left">content</div>
  <sbb-pearl-chain-vertical-item>
´´´
<!-- Auto Generated Below -->


## Properties

| Property                                        | Attribute           | Description                                                                 | Type                               | Default     |
| ----------------------------------------------- | ------------------- | --------------------------------------------------------------------------- | ---------------------------------- | ----------- |
| `disableAnimation`                              | `disable-animation` | If true the position won't be animated.                                     | `boolean`                          | `undefined` |
| `pearlChainVerticalItemAttributes` _(required)_ | --                  | The pearlChainVerticalItemAttributes Prop for styling the bullets and line. | `PearlChainVerticalItemAttributes` | `undefined` |


## Slots

| Slot      | Description                           |
| --------- | ------------------------------------- |
| `"left"`  | content of the left side of the item  |
| `"right"` | content of the right side of the item |


----------------------------------------------


