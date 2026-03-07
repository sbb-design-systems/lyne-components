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
