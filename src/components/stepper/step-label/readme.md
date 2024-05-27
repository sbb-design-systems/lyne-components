Use the `sbb-step-label` with the `sbb-stepper` to display a step label.

```html
<sbb-step-label>Step label</sbb-step-label>
```

## Slots

It has an implicit slot name: `step-label`.

## States

It can be `disabled`.

```html
<sbb-step-label disabled>Step label</sbb-step-label>
```

## Style

If it is used in an `sbb-stepper` and no `icon-name` is specified, it displays a counter in the label prefix to keep track of the step number.

```html
<!-- Displays a tick icon in the prefix circle -->
<sbb-step-label icon-name="tick-small">Step label</sbb-step-label>

<!-- Displays a number in the prefix circle -->
<sbb-step-label>Step label</sbb-step-label>
```

## Accessibility

The aria values `aria-controls`, `aria-setsize`, `aria-posinset` are set automatically.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                     | Default    | Description                                                                                                                      |
| ---------- | ----------- | ------- | ------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `form`     | `form`      | public  | `string \| undefined`    |            | The <form> element to associate the button with.                                                                                 |
| `iconName` | `icon-name` | public  | `string \| undefined`    |            | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `name`     | `name`      | public  | `string`                 |            | The name of the button element.                                                                                                  |
| `step`     | -           | public  | `SbbStepElement \| null` | `null`     | The step controlled by the label.                                                                                                |
| `type`     | `type`      | public  | `SbbButtonType`          | `'button'` | The type attribute to use for the button.                                                                                        |
| `value`    | `value`     | public  | `string`                 |            | The value of the button element.                                                                                                 |

## Slots

| Name   | Description                                      |
| ------ | ------------------------------------------------ |
|        | Use the unnamed slot to provide a label.         |
| `icon` | Use this to display an icon in the label bubble. |
