The `sbb-navigation-marker` component is a collection of [sbb-navigation-action](/docs/components-sbb-navigation-sbb-navigation-action--docs).
Its intended use is inside a [sbb-navigation](/docs/components-sbb-navigation-sbb-navigation--docs) component. 

```html
<sbb-navigation-marker>
  <sbb-navigation-action id="nav1">Label 1</sbb-navigation-action>
  <sbb-navigation-action id="nav2">Label 2</sbb-navigation-action>
  <sbb-navigation-action href="https://www.sbb.ch/some/route">Label 3</sbb-navigation-action>
<sbb-navigation-marker>
```

## Style

The component has a property named `size` which is proxied to all the `sbb-navigation-action` within it.
Possible values are `l` (default) and `s`.

```html
<sbb-navigation-marker size='s'>
  ...
<sbb-navigation-marker>
```

<!-- Auto Generated Below --> 
 

## Properties 

| Name   | Attribute   | Privacy | Type                      | Default | Description          |
| ------ | ------ | ------- | ------------------------- | ------- | -------------------- |
| `size` | `size` | public  | `'l' \| 's' \| undefined` | Marker size variant. |                |

## Methods

| Name     | Privacy | Description | Parameters                    | Return | Inherited From |
| -------- | ------- | ----------- | ----------------------------- | ------ | -------------- |
| `select` | public  |             | `action: SbbNavigationAction` | `void` |                |
| `reset`  | public  |             |                               | `void` |                |

## Slots

| Name      | Description                                                                 |
| --------- | --------------------------------------------------------------------------- |
| `unnamed` | Use this slot to provide navigation actions into the sbb-navigation-marker. |

