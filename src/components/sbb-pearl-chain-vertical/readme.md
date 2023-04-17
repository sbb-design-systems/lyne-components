The `<sbb-pearl-chain-vertical>` component is used to display the `<sbb-pearl-chain-vertical-item>` components. Therefore it has an unnamed slot. This component is only meant to be used with the `<sbb-pearl-chain-vertical-item>` component.
For styling the pearl-chain refer to said item component.

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

```html
<sbb-pearl-chain-vertical> 
  <sbb-pearl-chain-vertical-item  pearlChainVerticalItemAttributes={args}>
    <div slot="right">content</div>
    <div slot="left">content</div>
  <sbb-pearl-chain-vertical-item>
</sbb-pearl-chain-vertical>
```

<!-- Auto Generated Below -->


----------------------------------------------


