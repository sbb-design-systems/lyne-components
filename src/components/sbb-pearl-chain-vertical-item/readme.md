# sbb-pearl-chain-item

The `<sbb-pearl-chain-item>` is intended to be used with the `<sbb-pearl-chain-vertical>` component. It is a table-row with three table-cells. It is used to display the dots and line of the pearl-chain. In addition to that, there are two slots, which make it possible to display content on the left and right side of the pearl-chain. The component has many styling option, which can be configured through the 'pearlChainItemAttributes' property.
The slots themselfes are unstyled, so that they can be used in variuos ways.

## Usage with props 
Example prop: 
              pearlChainItemAttributes={{
                lineType: 'standard',
                lineColor: 'charcoal',
                dotColor: 'charcoal',
                minHeight: '89',
                hideLine: false,
                dotType: 'thick-bullet',
                dotSize: 'small',
              }}


``` html
  <sbb-pearl-chain-item  pearlChainItemAttributes={args}>
    <div slot="right">content</div>
    <div slot="left">content</div>
  <sbb-pearl-chain-item>
´´´
<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute           | Description                                                      | Type                       | Default     |
| -------------------------- | ------------------- | ---------------------------------------------------------------- | -------------------------- | ----------- |
| `disableAnimation`         | `disable-animation` | If true the position won't be animated.                          | `boolean`                  | `undefined` |
| `pearlChainItemAttributes` | --                  | The pearlChainItemAttributes Prop for styling the dots and line. | `PearlChainItemAttributes` | `undefined` |


## Slots

| Slot      | Description                           |
| --------- | ------------------------------------- |
| `"left"`  | content of the left side of the item  |
| `"right"` | content of the right side of the item |


----------------------------------------------


