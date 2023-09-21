The `sbb-accordion` is a component which acts as a container 
for one or more [sbb-expansion-panel](/docs/components-sbb-accordion-sbb-expansion-panel--docs). 

```html
<sbb-accordion>
  <sbb-expansion-panel>
    <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
    <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
  </sbb-expansion-panel>
  <sbb-expansion-panel>
    <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
    <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
  </sbb-expansion-panel>
</sbb-accordion>
```

## Variants

The `multi` property, if set, allows having more than one `sbb-expansion-panel` expanded at the same time.

```html
<sbb-accordion multi>
  ...
</sbb-accordion>
```

## Style

The component has a `titleLevel` property, which is proxied to each inner `sbb-expansion-panel-header`, and can be used
to wrap the header of each `sbb-expansion-panel` in a heading tag; if the property is unset, a `div` is used.

In the following example, all the `sbb-expansion-panel-header` would be wrapped in a `h3` heading tag.

```html
<sbb-accordion title-level='3'>
  <sbb-expansion-panel>
    <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
    <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
  </sbb-expansion-panel>
  ...
</sbb-accordion>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                 | Type                                     | Default     |
| ------------------ | ------------------- | --------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `disableAnimation` | `disable-animation` | Whether the animation should be disabled.                                   | `boolean`                                | `false`     |
| `multi`            | `multi`             | Whether more than one sbb-expansion-panel can be open at the same time.     | `boolean`                                | `false`     |
| `titleLevel`       | `title-level`       | The heading level for the sbb-expansion-panel-headers within the component. | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `undefined` |


## Slots

| Slot        | Description                                      |
| ----------- | ------------------------------------------------ |
| `"unnamed"` | Use this to add one or more sbb-expansion-panel. |


----------------------------------------------


