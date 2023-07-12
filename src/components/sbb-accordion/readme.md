The `sbb-accordion` is a component which acts as a container for one or more `sbb-expansion-panel`; 
the content is projected inside an unnamed slot.

The component has a `level` property, which is proxied to the `sbb-expansion-panel-header`, and can be used 
to wrap the header of each `sbb-expansion-panel` in a heading tag; if the property is unset, a `div` is used.

The `multi` property, if set, allows to have more than one panel expanded at the same time.

## Usage

Basic usage:

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

Multi accordion with level-3:

```html
<sbb-accordion multi level='3'>
  <sbb-expansion-panel>
    <sbb-expansion-panel-header>Multi header 1</sbb-expansion-panel-header>
    <sbb-expansion-panel-content>Multi content 1</sbb-expansion-panel-content>
  </sbb-expansion-panel>
  <sbb-expansion-panel>
    <sbb-expansion-panel-header>Multi header 2</sbb-expansion-panel-header>
    <sbb-expansion-panel-content>Multi content 2</sbb-expansion-panel-content>
  </sbb-expansion-panel>
</sbb-accordion>
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                             | Type                                     | Default     |
| -------- | --------- | ----------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `level`  | `level`   | The level for the sbb-expansion-panel-headers within the component.     | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `undefined` |
| `multi`  | `multi`   | Whether more than one sbb-expansion-panel can be open at the same time. | `boolean`                                | `false`     |


## Slots

| Slot        | Description                                      |
| ----------- | ------------------------------------------------ |
| `"unnamed"` | Use this to add one or more sbb-expansion-panel. |


----------------------------------------------


