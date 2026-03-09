### sbb-stepper

The `sbb-stepper` is a component that visually guides a user through a sequential, multistep process. It breaks down complex forms, flows, or other linear interactions into smaller, easier-to-follow steps. The current step is highlighted, and a progress bar connects the steps to visually represent progress.

Use it with [sbb-step-label](/docs/elements-sbb-stepper-sbb-step-label--docs) and [sbb-step](/docs/elements-sbb-stepper-sbb-step--docs).

```html
<sbb-stepper aria-label="Purpose of this flow">
  <sbb-step-label>Step label 1</sbb-step-label>
  <sbb-step>Step content 1</sbb-step>

  <sbb-step-label>Step label 2</sbb-step-label>
  <sbb-step>Step content 2</sbb-step>
</sbb-stepper>
```

The `sbb-step-label` can be disabled via the `disabled` attribute/property.

```html
<sbb-step-label disabled>Step label</sbb-step-label>
```

By default the `sbb-step-label` displays a counter in the label prefix, which is aligned
with the position in the `sbb-stepper`. This can be overridden via the `icon-name`.

```html
<!-- Displays a number in the prefix circle -->
<sbb-step-label>Step label</sbb-step-label>

<!-- Displays a tick icon in the prefix circle -->
<sbb-step-label icon-name="tick-small">Step label</sbb-step-label>
```

## Interactions

There are two attributes to support navigation between different steps that can be used on elements inside an `sbb-step` to select the next or the previous step when clicked: `sbb-stepper-next` and `sbb-stepper-previous`.

### Linear stepper

The `linear` property can be set to create a linear stepper that requires the user to complete previous steps before proceeding to following steps.

```html
<sbb-stepper aria-label="Purpose of this flow" linear>
  <sbb-step-label>Step label 1</sbb-step-label>
  <sbb-step>Step content 1</sbb-step>

  <sbb-step-label>Step label 2</sbb-step-label>
  <sbb-step>Step content 2</sbb-step>

  <sbb-step-label>Step label 3</sbb-step-label>
  <sbb-step>Step content 3</sbb-step>
</sbb-stepper>
```

## Events

Whenever a step switch is triggered, a `validate` event is emitted and can be canceled to prevent the step change.

```ts
document
  .querySelector('sbb-stepper')
  .addEventListener((event: CustomEvent<SbbStepValidateEventDetails>) => {
    if (currentStateIsInvalid()) {
      // This will prevent switching to another step and force
      // the user to fix the current state.
      event.preventDefault();
    }
  });
```

## Forms

There are two possible approaches. One is using a single form for the stepper, and the other is using a different form for each step.

### Single form

```html
<form>
  <sbb-stepper aria-label="Purpose of this flow">
    <sbb-step-label>Step label 1</sbb-step-label>
    <sbb-step>Step content 1: <sbb-form-field>...</sbb-form-field></sbb-step>

    <sbb-step-label>Step label 2</sbb-step-label>
    <sbb-step>Step content 2: <sbb-form-field>...</sbb-form-field></sbb-step>
  </sbb-stepper>
</form>
```

### Multiple forms

```html
<sbb-stepper aria-label="Purpose of this flow">
  <sbb-step-label>Step label 1</sbb-step-label>
  <sbb-step>
    <form>
      <sbb-form-field>...</sbb-form-field>
    </form>
  </sbb-step>

  <sbb-step-label>Step label 2</sbb-step-label>
  <sbb-step>
    <form>
      <sbb-form-field>...</sbb-form-field>
    </form>
  </sbb-step>
</sbb-stepper>
```

Calling the `reset()` method on the `sbb-stepper` will reset the wrapping `form` or, if they are present, every `form` in each step; then it will select the first step.

## Events

Whenever a step switch is triggered, a `validate` event is emitted on the requested step and bubbles up to the stepper.
The validate event can be canceled to prevent the step change.
Every successful change of a step triggers the `stepchange` event.

## Accessibility

Whenever textual content is provided, please also set the attribute `tabindex=‘0’` on the text tag, so that it can be reached and announced by screen-readers. Also remember to use the classes `.sbb-focus-outline` and `.sbb-focus-outline-dark` to correctly style the outline.

```html
<sbb-stepper aria-label="Purpose of this flow">
  <sbb-step-label>Step label 1</sbb-step-label>
  <sbb-step>
    <p tabindex="0" class="sbb-focus-outline">Step content 1</p>
    <sbb-button>Button<sbb-button>
  </sbb-step>

  <sbb-step-label>Step label 2</sbb-step-label>
  <sbb-step>
    <p tabindex="0" class="sbb-focus-outline">Step content 2</p>
    <sbb-button>Button<sbb-button>
  </sbb-step>
</sbb-stepper>
```

Use an `aria-label` attribute to describe the purpose of the stepper.
The components internally manage aria states, like `aria-setsize`, `aria-posinset`, `aria-controls` or
`aria-labelledby`.
If important content needs to be announced when a step is changed, use the `aria-live=‘polite’` attribute.

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbStepElement`, `sbb-step`

#### Properties

| Name      | Attribute | Privacy | Type                          | Default | Description            |
| --------- | --------- | ------- | ----------------------------- | ------- | ---------------------- |
| `label`   | -         | public  | `SbbStepLabelElement \| null` | `null`  | The label of the step. |
| `stepper` | -         | public  | `SbbStepperElement \| null`   |         |                        |

#### Events

| Name       | Type                                       | Description                                                                                                 | Inherited From |
| ---------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | -------------- |
| `validate` | `CustomEvent<SbbStepValidateEventDetails>` | The validate event is dispatched when a step change is triggered. Can be canceled to abort the step change. |                |

#### Slots

| Name | Description                              |
| ---- | ---------------------------------------- |
|      | Use the unnamed slot to provide content. |

### class: `SbbStepLabelElement`, `sbb-step-label`

#### Properties

| Name                | Attribute   | Privacy | Type                        | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ----------- | ------- | --------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`          | `disabled`  | public  | `boolean`                   | `false`    | Whether the component is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `form`              | `form`      | public  | `HTMLFormElement \| null`   |            | The `<form>` element to associate the button with.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `iconName`          | `icon-name` | public  | `string`                    | `''`       | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch.                                                                                                                                                                                                                                                                                                                        |
| `name`              | `name`      | public  | `string`                    |            | Name of the form element. Will be read from name attribute.                                                                                                                                                                                                                                                                                                                                                                                             |
| `step`              | -           | public  | `SbbStepElement \| null`    | `null`     | The step controlled by the label.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `stepper`           | -           | public  | `SbbStepperElement \| null` |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `type`              | `type`      | public  | `SbbButtonType`             | `'button'` | The type attribute to use for the button.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `validationMessage` | -           | public  | `string`                    |            | Returns the current error message, if available, which corresponds to the current validation state. Please note that only one message is returned at a time (e.g. if multiple validity states are invalid, only the chronologically first one is returned until it is fixed, at which point the next message might be returned, if it is still applicable). Also, a custom validity message (see below) has precedence over native validation messages. |
| `validity`          | -           | public  | `ValidityState`             |            | Returns the ValidityState object for this element.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `value`             | `value`     | public  | `string`                    | `''`       | Value of the form element.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `willValidate`      | -           | public  | `boolean`                   |            | Returns true if this element will be validated when the form is submitted; false otherwise.                                                                                                                                                                                                                                                                                                                                                             |

#### Methods

| Name                | Privacy | Description                                                                                                                                                                                | Parameters        | Return    | Inherited From         |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------- | ---------------------- |
| `checkValidity`     | public  | Returns true if this element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.                                                          |                   | `boolean` | SbbFormAssociatedMixin |
| `reportValidity`    | public  | Returns true if this element has no validity problems; otherwise, returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user. |                   | `boolean` | SbbFormAssociatedMixin |
| `setCustomValidity` | public  | Sets the custom validity message for this element. Use the empty string to indicate that the element does not have a custom validity error.                                                | `message: string` | `void`    | SbbFormAssociatedMixin |

#### Slots

| Name   | Description                                      |
| ------ | ------------------------------------------------ |
|        | Use the unnamed slot to provide a label.         |
| `icon` | Use this to display an icon in the label bubble. |

### class: `SbbStepperElement`, `sbb-stepper`

#### Properties

| Name             | Attribute         | Privacy | Type                        | Default            | Description                                                                       |
| ---------------- | ----------------- | ------- | --------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `horizontalFrom` | `horizontal-from` | public  | `SbbHorizontalFrom \| null` | `null`             | Overrides the behavior of `orientation` property.                                 |
| `linear`         | `linear`          | public  | `boolean`                   | `false`            | If set to true, only the current and previous labels can be clicked and selected. |
| `orientation`    | `orientation`     | public  | `SbbOrientation`            | `'horizontal'`     | Steps orientation, either horizontal or vertical.                                 |
| `selected`       | -                 | public  | `SbbStepElement \| null`    |                    | The currently selected step.                                                      |
| `selectedIndex`  | `selected-index`  | public  | `number \| null`            |                    | The currently selected step index.                                                |
| `size`           | `size`            | public  | `'s' \| 'm'`                | `'m' / 's' (lean)` | Size variant, either s or m.                                                      |
| `steps`          | -                 | public  | `SbbStepElement[]`          |                    | The steps of the stepper.                                                         |

#### Methods

| Name       | Privacy | Description                                                                        | Parameters | Return | Inherited From |
| ---------- | ------- | ---------------------------------------------------------------------------------- | ---------- | ------ | -------------- |
| `next`     | public  | Selects the next step.                                                             |            | `void` |                |
| `previous` | public  | Selects the previous step.                                                         |            | `void` |                |
| `reset`    | public  | Resets the form in which the stepper is nested or every form of each step, if any. |            | `void` |                |

#### Events

| Name         | Type                 | Description                        | Inherited From |
| ------------ | -------------------- | ---------------------------------- | -------------- |
| `stepchange` | `SbbStepChangeEvent` | Emits whenever a step was changed. |                |

#### Slots

| Name         | Description                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ |
|              | Provide a `sbb-expansion-panel-header` and a `sbb-expansion-panel-content` to the stepper. |
| `step`       | Use this slot to provide an `sbb-step`.                                                    |
| `step-label` | Use this slot to provide an `sbb-step-label`.                                              |
