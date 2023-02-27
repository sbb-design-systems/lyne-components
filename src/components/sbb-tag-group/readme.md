# sbb-tag-group

The `<sbb-tag-group>` component is used as a container for one or multiple `<sbb-tag>` components,
which are projected inside the unnamed slot.

To work properly, it's mandatory to provide a value to each `<sbb-tag>`.

## Exclusive selection vs. multiple selection
By default, `<sbb-tag-group>` acts like a radio-button group: only one item can be selected. 
In this mode, the value of the `<sbb-tag-group>` will reflect the value of the selected `<sbb-tag>`.

Setting `multiple` property to `true` allows multiple items to be selected (checkbox behavior).
In this mode the value of the `<sbb-tag-group>` is an array containing all values of the selected `<sbb-tag>` items.

## Changing multiple property during run time

There is no support for changing multiple mode during run time (e.g. update value automatically).
So this flag should be provided at components instantiation.

## Accessibility

The `<sbb-tag-group>` surrounding the individual buttons applies role="group" to convey the association between
the individual `<sbb-tag>`s. Each `<sbb-tag-group>` element should be given a label with aria-label or aria-labelledby
that communicates the collective meaning of all `<sbb-tag>`s.
For example, if you have toggles for "Bold", "Italic", and "Underline", you might label the parent group "Font styles".

## Usage

Basic usage:

```html
<sbb-tag-group aria-label="Select your desired device to filter it">
  <sbb-tag value="tag-1" checked>All</sbb-tag>
  <sbb-tag value="tag-2" disabled>Phones</sbb-tag>
  <sbb-tag value="tag-3">Computer</sbb-tag>
  <sbb-tag value="tag-3">Laptop</sbb-tag>
</sbb-tag-group>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                                                     | Type                 | Default |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------- |
| `multiple` | `multiple` | If set multiple to false, the selection is exclusive and the value is a string (or null). If set multiple to true, the selection can have multiple values and therefore value is an array.  Changing multiple during run time is not supported. | `boolean`            | `false` |
| `value`    | `value`    | Value of the sbb-tag-group. If set multiple to false, the value is a string (or null). If set multiple to true, the value is an array.                                                                                                          | `string \| string[]` | `null`  |


## Slots

| Slot        | Description                                        |
| ----------- | -------------------------------------------------- |
| `"unnamed"` | Provide one or more 'sbb-tag' to add to the group. |


----------------------------------------------


