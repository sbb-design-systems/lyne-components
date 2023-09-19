The `sbb-navigation-list` component is a collection of [sbb-navigation-action](../sbb-navigation-action/readme.md).
Its intended use is inside a [sbb-navigation-section](../sbb-navigation-section/readme.md) component.
Optionally, a label can be provided via slot via the self-named property or the self-named slot.

```html
<sbb-navigation-list label="Label 1.1">
    <sbb-navigation-action href="...">Label 1.1.1</sbb-navigation-action>
    <sbb-navigation-action href="...">Label 1.1.2</sbb-navigation-action>
    <sbb-navigation-action href="...">Label 1.1.3</sbb-navigation-action>
</sbb-navigation-list>
```


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `label`  | `label`   |             | `string` | `undefined` |


## Slots

| Slot        | Description                                         |
| ----------- | --------------------------------------------------- |
| `"label"`   | Use this to provide a label element.                |
| `"unnamed"` | Use this to provide content for sbb-navigation-list |


----------------------------------------------


