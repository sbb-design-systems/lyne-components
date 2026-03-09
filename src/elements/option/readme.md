The `<sbb-option>` is a component which can be used to display items in components like
[sbb-autocomplete](/docs/elements-autocomplete--docs) or a [sbb-select](/docs/elements-select--docs).

It is based on the native `option` element. As such, it can be labeled via its text content.
The component can optionally display an `<sbb-icon>` at the component start using the `iconName` property
or via custom content using the `icon` slot.

```html
<sbb-option>Option label</sbb-option>

<sbb-option icon-name="info">Option label</sbb-option>
```

Like the native `option`, the component has a `value` property.

The state of the `<sbb-option>` can be configured via the `selected` and `disabled` attributes/properties.
When disabled, the selection via click is prevented.
If the `<sbb-option>` is nested in an `<sbb-optgroup>` component, it inherits the `disabled` state from
the parent.

```html
<sbb-option value="value" selected>Option label</sbb-option>

<sbb-option value="value" disabled>Option label</sbb-option>
```

## Events

Consumers can listen to the `optionselected` event on the `<sbb-option>` component to react to the selected
value. The event is triggered if the element has been selected by user interaction. Alternatively,
the `optionselectionchange` event can be listened to, which is triggered if the element has either been
selected or deselected.

## Style

If the label slot contains only a **text node**, it is possible to search for text in the `<sbb-option>`
using the `highlight` method, passing the desired text; if the text is present it will be highlighted
in bold.

```html
<!-- Supported scenario -->
<sbb-option> Highlightable caption</sbb-option>

<!-- Not supported scenarios -->
<sbb-option>
  <span>Not highlightable caption</span>
</sbb-option>

<sbb-option>
  <img src="..." />
  Highlightable caption
</sbb-option>
```

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbOption<T>`.

```ts
const option = document.querySelector('sbb-option');
option.value = { value: 'value', name: 'name' };
option.textContent = 'Example';
```

## sbb-optgroup

The `<sbb-optgroup>` is a component used to group more `<sbb-option>` within an
[sbb-autocomplete](/docs/elements-autocomplete--docs) or an
[sbb-select](/docs/elements-select--docs) component.

The component has a `label` property as the name of the group.

```html
<sbb-optgroup label="Group">
  <sbb-option value="1" selected>1</sbb-option>
  <sbb-option value="2">2</sbb-option>
  <sbb-option value="3">3</sbb-option>
</sbb-optgroup>
```

### States

The component has a `disabled` property which sets all the `<sbb-option>` in the group as disabled.

```html
<sbb-optgroup label="Disabled group" disabled>
  <sbb-option value="A">A</sbb-option>
  <sbb-option value="B">B</sbb-option>
  <sbb-option value="C">C</sbb-option>
</sbb-optgroup>
```

## sbb-option-hint

The `<sbb-option-hint>` is an optional component used to show a hint message within an
[sbb-autocomplete](/docs/elements-autocomplete--docs).

```html
<sbb-autocomplete>
  <sbb-option value="1"> Option 1 </sbb-option>
  ...
  <sbb-divider></sbb-divider>
  <sbb-option-hint>42 more hits</sbb-option-hint>
</sbb-autocomplete>
```

### Style

The `<sbb-option-hint>` has a `negative` property which will be automatically inherited from the parent `<sbb-autocomplete>`.

```html
<sbb-autocomplete>
  <sbb-option value="1">Option 1</sbb-option>
  ...
  <sbb-option-hint>42 more hits</sbb-option-hint>
</sbb-autocomplete>
```

## A11y

By default, the `<sbb-option-hint>` is treated as a simple text from screen readers, and it is not easily accessible by screen reader users.

If deemed necessary, the `<sbb-option-hint>` can be marked with the [aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live) attribute.

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbOptGroupElement`, `sbb-optgroup`

#### Properties

| Name       | Attribute  | Privacy | Type      | Default | Description                        |
| ---------- | ---------- | ------- | --------- | ------- | ---------------------------------- |
| `disabled` | `disabled` | public  | `boolean` | `false` | Whether the component is disabled. |
| `label`    | `label`    | public  | `string`  | `''`    | Option group label.                |

#### Slots

| Name | Description                                                              |
| ---- | ------------------------------------------------------------------------ |
|      | Use the unnamed slot to add `sbb-option` elements to the `sbb-optgroup`. |

### class: `SbbOptionElement`, `sbb-option`

#### Properties

| Name       | Attribute   | Privacy | Type                   | Default | Description                                                                                                                      |
| ---------- | ----------- | ------- | ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `disabled`  | public  | `boolean`              | `false` | Whether the component is disabled.                                                                                               |
| `iconName` | `icon-name` | public  | `string`               | `''`    | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `selected` | `selected`  | public  | `boolean`              |         | Whether the option is selected.                                                                                                  |
| `value`    | `value`     | public  | `(T = string) \| null` | `null`  | Value of the option.                                                                                                             |

#### Events

| Name                    | Type    | Description                                                                             | Inherited From       |
| ----------------------- | ------- | --------------------------------------------------------------------------------------- | -------------------- |
| `optionselected`        | `Event` | Emits when an option was selected by user.                                              | SbbOptionBaseElement |
| `optionselectionchange` | `Event` | The optionselectionchange event is dispatched when the option selection status changes. |                      |

#### CSS Properties

| Name                                  | Default | Description                                                                                                   |
| ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `--sbb-option-icon-container-display` | `none`  | Can be used to reserve space even when preserve-icon-space on autocomplete is not set or iconName is not set. |

#### Slots

| Name   | Description                                                                       |
| ------ | --------------------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the option label.                          |
| `icon` | Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used. |

### class: `SbbOptionHintElement`, `sbb-option-hint`

#### Properties

| Name       | Attribute  | Privacy | Type      | Default | Description                     |
| ---------- | ---------- | ------- | --------- | ------- | ------------------------------- |
| `negative` | `negative` | public  | `boolean` | `false` | Negative coloring variant flag. |

#### Slots

| Name | Description                                       |
| ---- | ------------------------------------------------- |
|      | Use the unnamed slot to display the hint message. |
