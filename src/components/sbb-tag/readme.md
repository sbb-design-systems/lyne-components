# sbb-tag

The `sbb-tag` is a component that can be used as a filter in order to categorize a large amount of information.

It could be active or not depending on the value of the `checked` attribute, 
and it could be displayed in disabled or required state by using the self-named properties.
The component has also a `value` property, which is bound to its inner HTMLInputElement.

It is possible to provide a label via an unnamed slot; the component can optionally display a `<sbb-icon>` 
at the component start using the `iconName` property or via custom SVG using the `icon` slot.
It's also possible to display an amount at the component end using the `amount` slot.

Consumers can listen to the native `change` event on the `sbb-tag` component to intercept the input's change;
the current state can be read from `event.target.checked`, while the value from `event.target.value`.

## Usage

Checked:

```html
<sbb-tag checked="true" value="All" amount="123">All</sbb-tag>
```

Unchecked disabled with icon:

```html
<sbb-tag disabled="true" value="All" icon-name="circle-information-small">All</sbb-tag>
```

Unchecked required with custom icon and amount:

```html
<sbb-tag required="true" value="All">
  <sbb-icon slot="icon" name="pie-small" />
  All
  <span slot="amount">123</span>
</sbb-tag>
```

## Accessibility

The component uses an internal `<input type="checkbox"/>` element to provide an accessible experience.
This internal checkbox receives focus and is automatically labelled by the text content of the
`<sbb-tag>` element.


<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                                                                         | Type      | Default     |
| -------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `accessibilityLabel` | `accessibility-label` | The aria-label prop for tag action element.                                                                                                         | `string`  | `undefined` |
| `amount`             | `amount`              | Amount displayed inside the tag.                                                                                                                    | `string`  | `undefined` |
| `checked`            | `checked`             | Whether the toggle is checked.                                                                                                                      | `boolean` | `false`     |
| `disabled`           | `disabled`            | Whether the tag is disabled.                                                                                                                        | `boolean` | `false`     |
| `iconName`           | `icon-name`           | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://lyne.sbb.ch/tokens/icons (optional). | `string`  | `undefined` |
| `value`              | `value`               | Value of the tag.                                                                                                                                   | `string`  | `undefined` |


## Events

| Event          | Description                                                                                                                         | Type                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `change`       | Change event emitter                                                                                                                | `CustomEvent<any>`                                    |
| `didChange`    | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/> | `CustomEvent<any>`                                    |
| `input`        | Input event emitter                                                                                                                 | `CustomEvent<any>`                                    |
| `state-change` | Internal event that emits whenever the state of the tag in relation to the parent toggle changes.                                   | `CustomEvent<StateChangeChecked \| StateChangeValue>` |


## Slots

| Slot        | Description                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------- |
| `"amount"`  | Provide an amount to show it at the component end.                                            |
| `"icon"`    | Use this slot to display an icon at the component start, by providing a `sbb-icon` component. |
| `"unnamed"` | This slot will show the provided tag label.                                                   |


## Dependencies

### Depends on

- [sbb-icon](../sbb-icon)

### Graph
```mermaid
graph TD;
  sbb-tag --> sbb-icon
  style sbb-tag fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


