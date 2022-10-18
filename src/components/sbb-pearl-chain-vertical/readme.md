# sbb-pearl-chain-vertical
The `<sbb-pearl-chain-vertical>` component is used to display the `<sbb-pearl-chain-item>` components. Therefore it has an unnamed slot. This component is only meant to be used with the item component.
For styling the pearl-chain refer to said item component.

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


```html
<sbb-pearl-chain-vertical> 
  <sbb-pearl-chain-item  pearlChainItemAttributes={args}>
    <div slot="right">content</div>
    <div slot="left">content</div>
  <sbb-pearl-chain-item>
</sbb-pearl-chainvertical>
```

<!-- Auto Generated Below -->


----------------------------------------------


