The link components from Lyne provide the same functionality as a native `anchor (a)` element
enhanced with SBB Design, accepting its associated properties (`href`, `target`, `rel` and `download`).

```html
<sbb-link href="http://www.sbb.ch">Link text</sbb-link>
<sbb-block-link href="http://www.sbb.ch">Link text</sbb-block-link>
```

For every variant there is also a button version, equivalent to a native `button` element.

```html
<sbb-link-button href="http://www.sbb.ch">Link text</sbb-link-button>
<sbb-block-link-button href="http://www.sbb.ch">Link text</sbb-block-link-button>
```

Additionally for every variant there is a static version that can be used inside another
interactive element (e.g. an `anchor (a)`).

```html
<sbb-link-static href="http://www.sbb.ch">Link text</sbb-link-static>
<sbb-block-link-static href="http://www.sbb.ch">Link text</sbb-block-link-static>
```

Block links can optionally display an icon, which can be provided via the `iconName` property
or via custom content using the `icon` slot.

```html
<sbb-block-link href="https://www.sbb.ch" icon-name="chevron-small-right-small">
  Help
</sbb-block-link>

<sbb-block-link
  href="https://www.sbb.ch"
  icon-name="chevron-small-left-small"
  icon-placement="start"
>
  Contact
</sbb-block-link>
```

## States

The component can be displayed in `disabled` state using the corresponding property.

```html
<sbb-link href="https://www.sbb.ch" disabled>Refunds</sbb-link>
```

## Style

Block links have three sizes (`xs`, `s`, which is the default, and `m`).

```html
<sbb-block-link href="https://www.sbb.ch" size="m">Refunds</sbb-block-link>
```

### Active state

To show a currently active link, the CSS class `sbb-active` can be placed on the `<sbb-block-link>`.
One possible use case would be to use it within the `<sbb-sidebar>`.

```html
<sbb-block-link class="sbb-active" accessibility-current="page">Refunds</sbb-block-link>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbBlockLinkButtonElement`, `sbb-block-link-button`

#### Properties

| Name                  | Attribute              | Privacy | Type                      | Default             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------- | ---------------------- | ------- | ------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`            | `disabled`             | public  | `boolean`                 | `false`             | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                 | `false`             | Whether the button should be aria-disabled but stay interactive.                                                                                                                                                                                                                                                                                                                                                                                        |
| `form`                | `form`                 | public  | `HTMLFormElement \| null` |                     | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `iconName`            | `icon-name`            | public  | `string`                  | `''`                | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                                                                                                                                                                                                                                                                                        |
| `iconPlacement`       | `icon-placement`       | public  | `SbbIconPlacement`        | `'start'`           | Moves the icon to the end of the component if set to true.                                                                                                                                                                                                                                                                                                                                                                                              |
| `name`                | `name`                 | public  | `string`                  |                     | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `size`                | `size`                 | public  | `SbbLinkSize`             | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.                                                                                                                                                                                                                                                                                                                              |
| `type`                | `type`                 | public  | `SbbButtonType`           | `'button'`          | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `validationMessage`   | -                      | public  | `string`                  |                     | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`            | -                      | public  | `ValidityState`           |                     | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`               | `value`                | public  | `string`                  | `''`                | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `willValidate`        | -                      | public  | `boolean`                 |                     | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

#### Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

#### Slots

| Name   | Description                                                         |
| ------ | ------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the `sbb-block-link-button`. |
| `icon` | Slot used to display the icon, if one is set.                       |

### class: `SbbBlockLinkElement`, `sbb-block-link`

#### Properties

| Name                   | Attribute               | Privacy | Type                       | Default             | Description                                                                                                                      |
| ---------------------- | ----------------------- | ------- | -------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityCurrent` | `accessibility-current` | public  | `string`                   | `''`                | This will be forwarded as aria-current to the inner anchor element.                                                              |
| `accessibilityLabel`   | `accessibility-label`   | public  | `string`                   | `''`                | This will be forwarded as aria-label to the inner anchor element.                                                                |
| `disabled`             | `disabled`              | public  | `boolean`                  | `false`             | Whether the component is disabled.                                                                                               |
| `download`             | `download`              | public  | `boolean`                  | `false`             | Whether the browser will show the download dialog on click.                                                                      |
| `href`                 | `href`                  | public  | `string`                   | `''`                | The href value you want to link to.                                                                                              |
| `iconName`             | `icon-name`             | public  | `string`                   | `''`                | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `iconPlacement`        | `icon-placement`        | public  | `SbbIconPlacement`         | `'start'`           | Moves the icon to the end of the component if set to true.                                                                       |
| `rel`                  | `rel`                   | public  | `string`                   | `''`                | The relationship of the linked URL as space-separated link types.                                                                |
| `size`                 | `size`                  | public  | `SbbLinkSize`              | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.       |
| `target`               | `target`                | public  | `LinkTargetType \| string` | `''`                | Where to display the linked URL.                                                                                                 |

#### Slots

| Name   | Description                                                  |
| ------ | ------------------------------------------------------------ |
|        | Use the unnamed slot to add content to the `sbb-block-link`. |
| `icon` | Slot used to display the icon, if one is set.                |

### class: `SbbBlockLinkStaticElement`, `sbb-block-link-static`

#### Properties

| Name            | Attribute        | Privacy | Type               | Default             | Description                                                                                                                      |
| --------------- | ---------------- | ------- | ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`      | `disabled`       | public  | `boolean`          | `false`             | Whether the component is disabled.                                                                                               |
| `iconName`      | `icon-name`      | public  | `string`           | `''`                | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `iconPlacement` | `icon-placement` | public  | `SbbIconPlacement` | `'start'`           | Moves the icon to the end of the component if set to true.                                                                       |
| `size`          | `size`           | public  | `SbbLinkSize`      | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.       |

#### Slots

| Name   | Description                                                         |
| ------ | ------------------------------------------------------------------- |
|        | Use the unnamed slot to add content to the `sbb-block-link-static`. |
| `icon` | Slot used to display the icon, if one is set.                       |

### class: `SbbLinkButtonElement`, `sbb-link-button`

#### Properties

| Name                  | Attribute              | Privacy | Type                      | Default             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------- | ---------------------- | ------- | ------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`            | `disabled`             | public  | `boolean`                 | `false`             | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `disabledInteractive` | `disabled-interactive` | public  | `boolean`                 | `false`             | Whether the button should be aria-disabled but stay interactive.                                                                                                                                                                                                                                                                                                                                                                                        |
| `form`                | `form`                 | public  | `HTMLFormElement \| null` |                     | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `name`                | `name`                 | public  | `string`                  |                     | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `negative`            | `negative`             | public  | `boolean`                 | `false`             | Negative coloring variant flag.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `size`                | `size`                 | public  | `SbbLinkSize`             | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used.                                                                                                                                                                                                                                                                                                                              |
| `type`                | `type`                 | public  | `SbbButtonType`           | `'button'`          | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `validationMessage`   | -                      | public  | `string`                  |                     | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`            | -                      | public  | `ValidityState`           |                     | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`               | `value`                | public  | `string`                  | `''`                | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `willValidate`        | -                      | public  | `boolean`                 |                     | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

#### Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

#### Slots

| Name | Description                                                   |
| ---- | ------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-link-button`. |

### class: `SbbLinkElement`, `sbb-link`

#### Properties

| Name                   | Attribute               | Privacy | Type                       | Default             | Description                                                                                                                |
| ---------------------- | ----------------------- | ------- | -------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityCurrent` | `accessibility-current` | public  | `string`                   | `''`                | This will be forwarded as aria-current to the inner anchor element.                                                        |
| `accessibilityLabel`   | `accessibility-label`   | public  | `string`                   | `''`                | This will be forwarded as aria-label to the inner anchor element.                                                          |
| `disabled`             | `disabled`              | public  | `boolean`                  | `false`             | Whether the component is disabled.                                                                                         |
| `download`             | `download`              | public  | `boolean`                  | `false`             | Whether the browser will show the download dialog on click.                                                                |
| `href`                 | `href`                  | public  | `string`                   | `''`                | The href value you want to link to.                                                                                        |
| `negative`             | `negative`              | public  | `boolean`                  | `false`             | Negative coloring variant flag.                                                                                            |
| `rel`                  | `rel`                   | public  | `string`                   | `''`                | The relationship of the linked URL as space-separated link types.                                                          |
| `size`                 | `size`                  | public  | `SbbLinkSize`              | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used. |
| `target`               | `target`                | public  | `LinkTargetType \| string` | `''`                | Where to display the linked URL.                                                                                           |

#### Slots

| Name | Description                                            |
| ---- | ------------------------------------------------------ |
|      | Use the unnamed slot to add content to the `sbb-link`. |

### class: `SbbLinkStaticElement`, `sbb-link-static`

#### Properties

| Name       | Attribute  | Privacy | Type          | Default             | Description                                                                                                                |
| ---------- | ---------- | ------- | ------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `disabled` | public  | `boolean`     | `false`             | Whether the component is disabled.                                                                                         |
| `negative` | `negative` | public  | `boolean`     | `false`             | Negative coloring variant flag.                                                                                            |
| `size`     | `size`     | public  | `SbbLinkSize` | `'s' / 'xs' (lean)` | Text size, the link should get in the non-button variation. With inline variant, the text size adapts to where it is used. |

#### Slots

| Name | Description                                                   |
| ---- | ------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-link-static`. |
