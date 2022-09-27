# sbb-header

The `sbb-header` component is a container for actions and logo and it is displayed sticky at page's top.

It has two slots: 
the first one can contains [sbb-header-action](../sbb-header-action/readme.md)s or other action items,
like `sbb-button` or `sbb-link`, and it is rendered on the component's right side;
the second one contains a logo, which by default is the [sbb-logo](../sbb-logo/readme.md).

A box-shadow appears under the component when the page is scrolled if the `shadow` variable is set to `true`. 

The component's height can be overriden by defining the variable `--sbb-header-height-override`.

A custom CSS can be obtained adding the `sbb-header__alternative` class on the component. 

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                            | Type      | Default     |
| -------- | --------- | -------------------------------------------------------------------------------------- | --------- | ----------- |
| `shadow` | `shadow`  | Used to display a box-shadow below the component on y-axis scroll whether set to true. | `boolean` | `undefined` |


## Slots

| Slot        | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `"logo"`    | Slot used to render the logo on the right side (sbb-logo as default). |
| `"unnamed"` | Slot used to render the actions on the left side.                     |


## Dependencies

### Depends on

- [sbb-logo](../sbb-logo)

### Graph
```mermaid
graph TD;
  sbb-header --> sbb-logo
  style sbb-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


