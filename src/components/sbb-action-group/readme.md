# sbb-action-group

The `sbb-action-group` component is a generic content container as an action element; its goal is to contain the `<sbb-button>` and `<sbb-link>` components, but it can be also used to contains other HTML elements.

Inside the child components it is possible to define the `align-self` prop with the following values: *start*, *center*, *end* in order to define their position.
## Usage

The examples below shows how to use the component with the `<sbb-action-group>` component with `<sbb-button>`and `<sbb-link>` components.

```html
<sbb-action-group>
  <sbb-button variant="secondary">Action 1</sbb-button>
  <sbb-button>Action 2</sbb-button>
</sbb-action-group>

<sbb-action-group align="end">
  <sbb-button align-self="start" variant="secondary">Action 1</sbb-button>
  <sbb-button variant="secondary">Action 2</sbb-button>
  <sbb-button>Action 3</sbb-button>
</sbb-action-group>

<sbb-action-group orientation="vertical">
  <sbb-button variant="secondary">Action 1</sbb-button>
  <sbb-button variant="secondary">Action 2</sbb-button>
  <sbb-link
    align-self="end"
    variant="block"
    text-size="s"
    icon-name="chevron-small-left-small"
    icon-placement="start"
    href="https://github.com/lyne-design-system/lyne-components"
  >
    Action 3
  </sbb-link>
</sbb-action-group>
```
<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                  | Type                                                                       | Default        |
| ---------------- | ----------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------- |
| `alignGroup`     | `align-group`     | Set the slotted `<sbb-action-group>` children's alignment.                   | `"center" \| "end" \| "start" \| "stretch"`                                | `'start'`      |
| `horizontalFrom` | `horizontal-from` | Overrides the behaviour of `orientation` property.                           | `"large" \| "medium" \| "micro" \| "small" \| "ultra" \| "wide" \| "zero"` | `'medium'`     |
| `orientation`    | `orientation`     | Indicates the orientation of the components inside the `<sbb-action-group>`. | `"horizontal" \| "vertical"`                                               | `'horizontal'` |


## Slots

| Slot        | Description                                      |
| ----------- | ------------------------------------------------ |
| `"unnamed"` | Slot to render the content inside the container. |


----------------------------------------------


