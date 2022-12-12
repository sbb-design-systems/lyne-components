# sbb-tag-group

The `<sbb-tag-group>` component is used as a container for one or multiple `<sbb-tag>` components,
which are projected inside an unnamed slot.

Once an `<sbb-tag>` has been focused, it's possible to move to the others in the group using the keyboard's arrows.

## Usage

Basic usage:

```html
<sbb-tag-group>
  <sbb-tag value="tag-1" checked="true">All</sbb-tag>
  <sbb-tag value="tag-2" disabled="true">Phones</sbb-tag>
  <sbb-tag value="tag-3">Computer</sbb-tag>
  <sbb-tag value="tag-3">Laptop</sbb-tag>
</sbb-tag-group>
```

<!-- Auto Generated Below -->


## Slots

| Slot        | Description                                        |
| ----------- | -------------------------------------------------- |
| `"unnamed"` | Provide one or more 'sbb-tag' to add to the group. |


----------------------------------------------


