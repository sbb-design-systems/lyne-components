The `sbb-status` is a component that has the purpose to show the user short messages to update the current status.
The status element displays a brief text message preceded by the status icon.

The `sbb-status` is structured in the following way:

- Icon: informs user about the current status type
- Title (optional): gives user an overview of the message
- Message: provide the information to the user

```html
<sbb-status><p>Status info text</p></sbb-status>
```

## Variants

The `sbb-status` supports eight types, based on the type of the information displayed:

- `info` (default)
- `success`
- `warn`
- `error`
- `pending`
- `incomplete`
- `not-started`
- `in-progress`

```html
<sbb-status type="info">...</sbb-status>
<sbb-status type="success">...</sbb-status>
<sbb-status type="warn">...</sbb-status>
<sbb-status type="error">...</sbb-status>
<sbb-status type="pending">...</sbb-status>
<sbb-status type="incomplete">...</sbb-status>
<sbb-status type="not-started">...</sbb-status>
<sbb-status type="in-progress">...</sbb-status>
```

## Title

An optional `sbb-title` can be slotted.

```html
<sbb-status>
  <sbb-title level="3">Title</sbb-title>
  <p>Status info text</p>
</sbb-status>
```

## Icon

The icon is primarily predefined and bound to the status.
However, it's possible to override this by using `iconName` property or `icon` slot.

## Style

The `sbb-status` use default message colors, based on the chosen `type`.

## Accessibility

The message should be wrapped into a `<p>` element to guarantee the semantic meaning.
Avoid slotting block elements (e.g. `<div>`) as this violates semantic rules and can have negative effects on screen-readers.

If needed, the `role="status"` attribute can be added on the component's tag.

```html
<sbb-status role="status" type="error"><p>An error occurred.</p></sbb-status>
```

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type            | Default  | Description                                                                                                                      |
| ---------- | ----------- | ------- | --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `iconName` | `icon-name` | public  | `string`        | `''`     | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `type`     | `type`      | public  | `SbbStatusType` | `'info'` | The type of the status.                                                                                                          |

## CSS Properties

| Name                      | Default                   | Description                                                                                                                  |
| ------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-status-color`      | `var(--sbb-color-iron)`   | Specify a custom color, which will override the predefined color for any type.                                               |
| `--sbb-status-text-color` | `var(--sbb-status-color)` | Specify a custom text color, which will override the predefined color for any type. Only valid for a status without a title. |

## Slots

| Name   | Description                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
|        | Use the unnamed slot to add an optional `sbb-title` and content (wrapped in a `<p>` element to the status message. |
| `icon` | Use this slot to override the default status icon.                                                                 |
