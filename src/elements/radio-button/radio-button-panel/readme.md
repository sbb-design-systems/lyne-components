The `sbb-radio-button-panel` component provides the same functionality as a native `<input type="radio"/>` enhanced with the selection panel design and functionalities. Use multiple `sbb-radio-button-panel` components inside a [sbb-radio-button-group](/docs/components-sbb-radio-button-sbb-radio-button-group--docs) component in order to display a radio input within a group.

```html
<sbb-radio-button-group value="Value one" aria-label="Radio group label">
  <sbb-radio-button-panel value="Value one">Option one</sbb-radio-button-panel>
  <sbb-radio-button-panel value="Value two">Option two</sbb-radio-button-panel>
</sbb-radio-button-group>
```

## Slots

It is possible to provide a label via an unnamed slot; additionally the slote named `subtext` can be used to provide a subtext and the slot named `suffix` can be used to provide suffix items.

```html
<sbb-radio-button-panel>
  Label
  <span slot="subtext">Subtext</span>
  <span slot="suffix">Suffix</span>
</sbb-radio-button-panel>
```

## States

It is possible to display the component in `disabled` or `checked` state by using the self-named properties.
The `allowEmptySelection` property allows user to deselect the component.

```html
<sbb-radio-button-panel value="One" checked>Option one</sbb-radio-button-panel>
<sbb-radio-button-panel value="Two" disabled>Option two</sbb-radio-button-panel>
<sbb-radio-button-panel value="Three" allowEmptySelection>Option three</sbb-radio-button-panel>
```

## Style

The component's label can be displayed in bold using the `sbb-text--bold` class on a wrapper tag:

```html
<sbb-radio-button-panel value="bold">
  <span class="sbb-text--bold">Bold label</span>
</sbb-radio-button-panel>
```

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute               | Privacy | Type                                 | Default   | Description                                    |
| --------------------- | ----------------------- | ------- | ------------------------------------ | --------- | ---------------------------------------------- |
| `allowEmptySelection` | `allow-empty-selection` | public  | `boolean`                            | `false`   | Whether the radio can be deselected.           |
| `borderless`          | `borderless`            | public  | `boolean`                            | `false`   | Whether the unselected panel has a border.     |
| `checked`             | `checked`               | public  | `boolean`                            | `false`   | Whether the radio button is checked.           |
| `color`               | `color`                 | public  | `'white' \| 'milk'`                  | `'white'` | The background color of the panel.             |
| `disabled`            | `disabled`              | public  | `boolean`                            | `false`   | Whether the radio button is disabled.          |
| `group`               | -                       | public  | `SbbRadioButtonGroupElement \| null` | `null`    | Reference to the connected radio button group. |
| `required`            | `required`              | public  | `boolean`                            | `false`   | Whether the radio button is required.          |
| `size`                | `size`                  | public  | `SbbRadioButtonSize`                 | `'m'`     | Label size variant, either m or s.             |
| `value`               | `value`                 | public  | `string \| undefined`                |           | Value of radio button.                         |

## Methods

| Name     | Privacy | Description | Parameters | Return | Inherited From                   |
| -------- | ------- | ----------- | ---------- | ------ | -------------------------------- |
| `select` | public  |             |            | `void` | SbbRadioButtonCommonElementMixin |

## Slots

| Name      | Description                                             |
| --------- | ------------------------------------------------------- |
|           | Use the unnamed slot to add content to the radio label. |
| `subtext` | Slot used to render a subtext under the label.          |
| `suffix`  | Slot used to render additional content after the label. |
