The `<sbb-navigation-marker>` component is a collection of [sbb-navigation-action](../sbb-navigation-action/readme.md). 

Its intended use is inside a [sbb-navigation](../sbb-navigation/readme.md) component. 

## Usage

```html
<sbb-navigation-marker>
    <sbb-navigation-action id="nav1">Label 1</sbb-navigation-action>
    <sbb-navigation-action id="nav2">Label 2</sbb-navigation-action>
    <sbb-navigation-action href="https://www.sbb.ch/some/route">Label 3</sbb-navigation-action>
<sbb-navigation-marker>
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description          | Type         | Default |
| -------- | --------- | -------------------- | ------------ | ------- |
| `size`   | `size`    | Marker size variant. | `"l" \| "s"` | `'l'`   |


## Methods

### `reset() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `select(action: HTMLSbbNavigationActionElement) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| `"unnamed"` | Use this slot to provide navigation actions into the sbb-navigation-marker. |


----------------------------------------------


