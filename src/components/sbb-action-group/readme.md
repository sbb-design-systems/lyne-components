# sbb-action-group

The `sbb-action-group` component is a generic content container which can contain up to three action items
(`<sbb-button>` or `<sbb-link>` or other HTML elements) in various allocations.

The `orientation` property is used to set items orientation. Possible values are `horizontal` (default) and `vertical`.

The optional property `horizontalFrom` indicates the minimum breakpoint from which the orientation changes to `horizontal`.

The `align-group` property can be used to set the default alignment of the contained elements; 
possible values are `start`, `center`, `stretch` and `end`.

It is also possible to set the `align-self` attribute on action items in order to move them in the opposite direction 
to the group; possible values are `start`, `center` or `end`.

## Usage

The examples below shows how to use the `<sbb-action-group>` component using `<sbb-button>` and `<sbb-link>` as action items.

```html
<sbb-action-group>
  <sbb-button variant="secondary" label="Action 1"/>
  <sbb-button label="Action 2"/>
</sbb-action-group>

<sbb-action-group align="end">
  <sbb-button align-self="start" variant="secondary" label="Action 1"/>
  <sbb-button variant="secondary" label="Action 2"/>
  <sbb-button label="Action 3"></sbb-button>
</sbb-action-group>

<sbb-action-group orientation="vertical">
  <sbb-button variant="secondary" label="Action 1"/>
  <sbb-button variant="secondary" label="Action 2"/>
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

## Allocations

Items can be displayed inside `sbb-action-group` in different allocations.

If we define the triad x-y-z as the number of elements aligned at the start, at the center and at the end of the component,
and we consider a template like the following one (possibly removing the link for 2-elements allocations):

```html
<sbb-action-group>
  <sbb-button label="Button 1" />
  <sbb-button label="Button 2" />
  <sbb-link variant="block" icon-name="chevron-small-left-small" href="https://github.com/lyne-design-system/lyne-components">
    Link
  </sbb-link>
</sbb-action-group>
```

the values for `align-group` and `align-self` for the various allocations are as follows.

### Horizontal

| orientation='horizontal' | align-group |     align-self     |
|:------------------------:|:-----------:|:------------------:|
|           3-0-0          |    start    |         /          |
|           1-1-1          |    start    | Button 2: 'center' |
|           2-0-1          |    start    |    Link: 'end'     |
|           1-0-2          |     end     | Button 1: 'start'  |
|           2-0-0          |    start    |         /          |
|           1-0-1          |    start    |  Button 2: 'end'   |

### Vertical

| orientation='vertical' | align-group | align-self |
|:----------------------:|:-----------:|:----------:|
|          3-0-0         |    start    |      /     |
|          2-0-0         |    start    |      /     |
|          0-3-0         |    center   |      /     |
|          0-2-0         |    center   |      /     |
|          0-0-3         |     end     |      /     |
|          0-0-2         |     end     |      /     |

| orientation='vertical' (full width) | align-group |   align-self   |
|:-----------------------------------:|:-----------:|:--------------:|
|                3-0-0                |   stretch   |  Link: 'start' |
|                2-0-0                |   stretch   |        /       |
|                0-3-0                |   stretch   | Link: 'center' |
|                0-2-0                |   stretch   |        /       |
|                0-0-3                |   stretch   |   Link: 'end'  |
|                0-0-2                |   stretch   |        /       |

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


