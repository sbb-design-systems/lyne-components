The `sbb-radio-button` component provides the same functionality as a native `<input type="radio"/>` enhanced with the SBB Design.

Radio-buttons should typically be placed inside a [sbb-radio-button-group](/docs/elements-sbb-radio-button-sbb-radio-button-group--docs) component
in order to display a radio input within a group. Individual radio-buttons inside a radio-group will inherit the `name` of the group.

```html
<sbb-radio-button-group name="radio-group" value="Value one" aria-label="Radio group label">
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button-group>
```

In cases where that's not possible, you can define a group of radios using the same `name` property

```html
<sbb-radio-button name="radio-group" value="Value one" checked>Option one</sbb-radio-button>
<sbb-radio-button name="radio-group" value="Value two">Option two</sbb-radio-button>
```

## States

It is possible to display the component in `disabled` or `checked` state by using the self-named properties.

The component has a `required` property, which can be useful
for setting a custom [sbb-form-error](/docs/elements-sbb-form-field-sbb-form-error--docs) message
within a [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs).

The `allowEmptySelection` property allows user to deselect the component.

```html
<sbb-radio-button value="One" checked>Option one</sbb-radio-button>

<sbb-radio-button value="Two" disabled>Option two</sbb-radio-button>

<sbb-radio-button value="Three" required>Option three</sbb-radio-button>

<sbb-radio-button value="Four" allowEmptySelection>Option four</sbb-radio-button>
```

## Style

The component has three different sizes, which can be changed using the `size` property (`m`, which is the default, `s` and `xs`).
If used inside a `sbb-radio-button-group`, the `size` will be inherited from it.

```html
<sbb-radio-button value="small" size="s">Size</sbb-radio-button>
```

The component's label can be displayed in bold using the `sbb-text--bold` class on a wrapper tag:

```html
<sbb-radio-button value="bold">
  <span class="sbb-text--bold">Bold label</span>
</sbb-radio-button>
```

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute               | Privacy | Type                                 | Default             | Description                                                    |
| --------------------- | ----------------------- | ------- | ------------------------------------ | ------------------- | -------------------------------------------------------------- |
| `allowEmptySelection` | `allow-empty-selection` | public  | `boolean`                            | `false`             | Whether the radio can be deselected.                           |
| `checked`             | `checked`               | public  | `boolean`                            | `false`             | Whether the radio button is checked.                           |
| `disabled`            | `disabled`              | public  | `boolean`                            | `false`             | Whether the component is disabled.                             |
| `form`                | -                       | public  | `HTMLFormElement \| null`            |                     | Returns the form owner of the internals of the target element. |
| `group`               | -                       | public  | `SbbRadioButtonGroupElement \| null` | `null`              | Reference to the connected radio button group.                 |
| `name`                | `name`                  | public  | `string`                             |                     | Name of the form element. Will be read from name attribute.    |
| `required`            | `required`              | public  | `boolean`                            | `false`             | Whether the component is required.                             |
| `size`                | `size`                  | public  | `SbbRadioButtonSize`                 | `'m' / 'xs' (lean)` | Size variant, either xs, s or m.                               |
| `type`                | -                       | public  | `string`                             | `'radio'`           | Form type of element.                                          |
| `value`               | `value`                 | public  | `string \| null`                     | `null`              | Value of the form element.                                     |

## Methods

| Name     | Privacy | Description                                                                                                                         | Parameters | Return | Inherited From                   |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ | -------------------------------- |
| `select` | public  | Set the radio-button as 'checked'; if 'allowEmptySelection', toggle the checked property. In both cases it emits the change events. |            | `void` | SbbRadioButtonCommonElementMixin |

## Events

| Name     | Type         | Description      | Inherited From                    |
| -------- | ------------ | ---------------- | --------------------------------- |
| `change` | `Event`      | Fired on change. | SbbFormAssociatedRadioButtonMixin |
| `input`  | `InputEvent` | Fired on input.  | SbbFormAssociatedRadioButtonMixin |

## Slots

| Name | Description                                             |
| ---- | ------------------------------------------------------- |
|      | Use the unnamed slot to add content to the radio label. |
