The `sbb-alert` is a component which should be used to display important messages to a client.

Multiple instances of this component can be used within
the [sbb-alert-group](/docs/elements-sbb-alert-sbb-alert-group--docs) component.

## Slots

The unnamed slot is used to project an `sbb-title` and a `p` containing the text content and one or more `sbb-link`.

The component can optionally display an `sbb-icon` at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-alert icon-name="disruption">
  <sbb-title level="3">Interruption between Berne and Olten</sbb-title>
  Between Bern and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
  construction work will take place. You have to expect changed travel times and changed
  connections. <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
</sbb-alert>

<sbb-alert>
  <sbb-title level="3">Interruption between Berne and Olten</sbb-title>
  <sbb-icon slot="icon" name="disruption"></sbb-icon>
  Between Bern and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
  construction work will take place. You have to expect changed travel times and changed
  connections. <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
</sbb-alert>
```

The `sbb-alert` can optionally be hidden by a user, if the `readOnly` prop is not set.

```html
<sbb-alert readonly>
  <sbb-title level="3">Interruption between Berne and Olten</sbb-title>
  Between Bern and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
  construction work will take place. You have to expect changed travel times and changed
  connections.
</sbb-alert>
```

## Style

Users can choose between three `size`: `s`, `m` (default) and `l`.

```html
<sbb-alert size="s"> ... </sbb-alert>

<sbb-alert size="l"> ... </sbb-alert>
```

## Accessibility

Accessibility is mainly done by wrapping the alerts into the `sbb-alert-group`.

## Animation

Set the `animation` property to manage which animations are enabled.
As a base rule, opening animations should be active if an alert arrives after the initial page load.

<!-- Auto Generated Below -->

## Properties

| Name        | Attribute   | Privacy | Type                                   | Default            | Description                                                                                                                                                      |
| ----------- | ----------- | ------- | -------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animation` | `animation` | public  | `'open' \| 'close' \| 'all' \| 'none'` | `'all'`            | The enabled animations.                                                                                                                                          |
| `iconName`  | `icon-name` | public  | `string`                               | `'info'`           | Name of the icon which will be forward to the nested `sbb-icon`. Choose the icons from https://icons.app.sbb.ch. Styling is optimized for icons of type HIM-CUS. |
| `isOpen`    | -           | public  | `boolean`                              |                    | Whether the element is open.                                                                                                                                     |
| `readOnly`  | `readonly`  | public  | `boolean`                              | `false`            | Whether the component is readonly.                                                                                                                               |
| `size`      | `size`      | public  | `'s' \| 'm' \| 'l'`                    | `'m' / 's' (lean)` | You can choose between `s`, `m` or `l` size.                                                                                                                     |

## Methods

| Name    | Privacy | Description      | Parameters | Return | Inherited From          |
| ------- | ------- | ---------------- | ---------- | ------ | ----------------------- |
| `close` | public  | Close the alert. |            | `void` | SbbOpenCloseBaseElement |
| `open`  | public  | Open the alert.  |            | `void` | SbbOpenCloseBaseElement |

## Events

| Name        | Type                | Description                                               | Inherited From          |
| ----------- | ------------------- | --------------------------------------------------------- | ----------------------- |
| `didClose`  | `CustomEvent<void>` | Emits when the closing animation ends.                    | SbbOpenCloseBaseElement |
| `didOpen`   | `CustomEvent<void>` | Emits when the opening animation ends.                    | SbbOpenCloseBaseElement |
| `willClose` | `CustomEvent<void>` | Emits when the closing animation starts. Can be canceled. | SbbOpenCloseBaseElement |
| `willOpen`  | `CustomEvent<void>` | Emits when the opening animation starts.                  | SbbOpenCloseBaseElement |

## Slots

| Name    | Description                                                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------ |
|         | Use the unnamed slot to add content to the `sbb-alert`. At a minimum an `sbb-title` element and some text should be used.      |
| `icon`  | Should be a `sbb-icon` which is displayed next to the title. Styling is optimized for icons of type HIM-CUS.                   |
| `title` | Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot. |
