import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import type { SbbErrorElement } from '../../form-field.ts';
import { SbbStepElement, type SbbStepValidateEventDetails } from '../step.ts';

import readme from './readme.md?raw';
import { SbbStepperElement } from './stepper.component.ts';

import '../step-label.ts';
import '../../link/block-link-button.ts';
import '../../button/button.ts';
import '../../button/secondary-button.ts';
import '../../form-field.ts';
import '../../card.ts';

const loremIpsum = `
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
  sanctus est Lorem ipsum dolor sit amet.
`;
const loremIpsumSubstring = [219, 58, 160, 304];

const linear: InputType = {
  control: {
    type: 'boolean',
  },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'small', 'large', 'ultra'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
};

const defaultArgTypes: ArgTypes = {
  linear,
  orientation,
  'horizontal-from': horizontalFrom,
  size,
};

const defaultArgs: Args = {
  linear: false,
  orientation: 'horizontal',
  'horizontal-from': 'unset',
  size: size.options![1],
};

const codeStyle: Args = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-background-color-4)',
};

const textBlock = (): TemplateResult => html`
  <sbb-card color="milk" style="margin-block-start: var(--sbb-spacing-fixed-8x)">
    Page content: lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
  </sbb-card>
`;

const toggleElement = (): void => {
  const element = document.querySelector('#expandable')! as HTMLDivElement;
  if (element.style.display === 'block') {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
};

const addElement = (event: PointerEvent): void => {
  const div = document.createElement('div');
  div.innerText = 'Content dynamically added.';
  div.style.cssText = `display: block; height: 200px; background-color: mistyrose;`;
  (event.target as HTMLButtonElement).parentElement!.querySelector('sbb-step')!.appendChild(div);
};

const firstFormElement = (error: SbbErrorElement): TemplateResult => html`
  <sbb-form-field error-space="reserve" size="m">
    <label>Name</label>
    <input
      @input=${(event: KeyboardEvent) => {
        const input = event.currentTarget as HTMLInputElement;
        if (input.value !== '') {
          error.remove();
          input.classList.remove('sbb-invalid');
        } else {
          input.closest('sbb-form-field')!.append(error);
          input.classList.add('sbb-invalid');
        }
      }}
      required
      placeholder="Your name"
      name="name"
      value="Christina Müller"
    />
  </sbb-form-field>
`;

const secondFormElement = (): TemplateResult => html`
  <sbb-form-field error-space="none" size="m">
    <label>Favorite number</label>
    <input type="number" placeholder="Your lucky number" name="number" value="75" />
  </sbb-form-field>
`;

const thirdFormElement = (): TemplateResult => html`
  <sbb-form-field error-space="none" size="m">
    <label>Favorite animal</label>
    <select name="animal">
      <option>Panda 🐼</option>
      <option>Jellyfish 🪼</option>
      <option>Fox 🦊</option>
      <option>Dragon 🐲</option>
    </select>
  </sbb-form-field>
`;

const stepperContent = (disabled: boolean, longLabel: boolean): TemplateResult[] =>
  ['First', 'Second', 'Third', 'Fourth'].map(
    (element, index, arr) => html`
      <sbb-step-label ?disabled=${disabled && index === 2}
        >${longLabel
          ? loremIpsum.substring(0, loremIpsumSubstring[index])
          : `${element} step`}</sbb-step-label
      >
      <sbb-step>
        <div
          tabindex="0"
          class="sbb-focus-outline"
          style="margin-block-end: var(--sbb-spacing-fixed-4x)"
        >
          ${element} step
          content${longLabel ? '.' : `: ${loremIpsum.substring(0, loremIpsumSubstring[index])}`}
        </div>
        ${index !== 0
          ? html`<sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>`
          : nothing}
        ${index !== arr.length - 1
          ? html`<sbb-button size="m" sbb-stepper-next>Next</sbb-button>`
          : nothing}
        ${index === arr.length - 1
          ? html`<sbb-button size="m" sbb-stepper-next>Submit</sbb-button>`
          : nothing}
      </sbb-step>
    `,
  );

const WithSingleFormTemplate = (args: Args): TemplateResult => {
  document.querySelector('sbb-stepper')?.reset();
  document.querySelector('sbb-error')?.remove();
  const error: SbbErrorElement = document.createElement('sbb-error');
  error.setAttribute('slot', 'error');
  error.textContent = 'This is a required field.';

  return html`
    <form
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        for (const [name, value] of formData) {
          document.querySelector(`.text-block-${name}`)!.textContent = value.toString();
        }
      }}
      @reset=${() => {
        // This is needed to focus and trigger again the error on the first field
        // when getting back to it after resetting the stepper.
        setTimeout(() =>
          document.querySelector('input[name="name"]')?.dispatchEvent(new InputEvent('input')),
        );
      }}
    >
      <sbb-stepper ${sbbSpread(args)} aria-label="Purpose of this flow" selected-index="0">
        <sbb-step-label icon-name="pen-small">Step 1</sbb-step-label>
        <sbb-step
          @validate=${(e: CustomEvent<SbbStepValidateEventDetails>) => {
            if (
              e.detail
                .currentStep!.querySelector('sbb-form-field')!
                .inputElement!.matches(':invalid')
            ) {
              e.preventDefault();
            }
          }}
        >
          <div style="margin-block-end: var(--sbb-spacing-fixed-4x)">
            ${firstFormElement(error)}
          </div>
          <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
        </sbb-step>

        <sbb-step-label>Step 2</sbb-step-label>
        <sbb-step>
          <div style="margin-block-end: var(--sbb-spacing-fixed-4x)">${secondFormElement()}</div>
          <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
          <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
        </sbb-step>

        <sbb-step-label>
          <sbb-icon slot="icon" name="dog-small"></sbb-icon>
          Step 3
        </sbb-step-label>
        <sbb-step>
          <div style="margin-block-end: var(--sbb-spacing-fixed-4x)">${thirdFormElement()}</div>
          <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
          <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
        </sbb-step>

        <sbb-step-label icon-name="tick-small">Step 4</sbb-step-label>
        <sbb-step>
          <div
            tabindex="0"
            class="sbb-focus-outline"
            style="margin-block-end: var(--sbb-spacing-fixed-4x)"
            aria-live="polite"
          >
            You are now done.
          </div>
          <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
          <sbb-button type="submit" size="m" sbb-stepper-next>Submit</sbb-button>
          <sbb-block-link-button
            type="reset"
            style="display: inline-block; margin-inline-start: var(--sbb-spacing-fixed-2x); vertical-align: middle;"
            icon-name="arrow-circle-small"
            @click=${() => document.querySelector('sbb-stepper')?.reset()}
            >Reset</sbb-block-link-button
          >
        </sbb-step>
      </sbb-stepper>
    </form>
    <sbb-card color="milk" style="margin-block-start: var(--sbb-spacing-fixed-8x)">
      Hi <code style=${styleMap(codeStyle)} class="text-block-name">&nbsp; &nbsp;</code>! 👋 Your
      lucky number is
      <code style=${styleMap(codeStyle)} class="text-block-number">&nbsp; &nbsp;</code> 🍀 and your
      favourite animal is
      <code style=${styleMap(codeStyle)} class="text-block-animal">&nbsp; &nbsp;</code>.
    </sbb-card>
  `;
};

const WithMultipleFormsTemplate = (args: Args): TemplateResult => {
  document.querySelector('sbb-stepper')?.reset();
  document.querySelector('sbb-error')?.remove();
  const error: SbbErrorElement = document.createElement('sbb-error');
  error.setAttribute('slot', 'error');
  error.textContent = 'This is a required field.';

  return html`
    <sbb-stepper ${sbbSpread(args)} aria-label="Purpose of this flow" selected-index="0">
      <sbb-step-label icon-name="pen-small">Step 1</sbb-step-label>
      <sbb-step
        @validate=${(e: CustomEvent<SbbStepValidateEventDetails>) => {
          if (
            e.detail.currentStep!.querySelector('sbb-form-field')!.inputElement!.matches(':invalid')
          ) {
            e.preventDefault();
          }
        }}
      >
        <div style="margin-block-end: var(--sbb-spacing-fixed-4x)">
          <form
            @reset=${() => {
              // This is needed to focus and trigger again the error on the first field
              // when getting back to it after resetting the stepper.
              setTimeout(() =>
                document
                  .querySelector('input[name="name"]')
                  ?.dispatchEvent(new InputEvent('input')),
              );
            }}
          >
            ${firstFormElement(error)}
          </form>
        </div>
        <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
      </sbb-step>

      <sbb-step-label>Step 2</sbb-step-label>
      <sbb-step>
        <div style="margin-block-end: var(--sbb-spacing-fixed-4x)">
          <form>${secondFormElement()}</form>
        </div>
        <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
        <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
      </sbb-step>

      <sbb-step-label icon-name="dog-small">Step 3</sbb-step-label>
      <sbb-step>
        <div style="margin-block-end: var(--sbb-spacing-fixed-4x)">
          <form>${thirdFormElement()}</form>
        </div>
        <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
        <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
      </sbb-step>

      <sbb-step-label icon-name="tick-small">Step 4</sbb-step-label>
      <sbb-step>
        <div
          tabindex="0"
          class="sbb-focus-outline"
          style="margin-block-end: var(--sbb-spacing-fixed-4x)"
          aria-live="polite"
        >
          You are now done.
        </div>
        <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
        <sbb-button size="m" sbb-stepper-next>Submit</sbb-button>
        <sbb-block-link-button
          style="display: inline-block; margin-inline-start: var(--sbb-spacing-fixed-2x); vertical-align: middle;"
          icon-name="arrow-circle-small"
          @click=${() => document.querySelector('sbb-stepper')?.reset()}
          >Reset</sbb-block-link-button
        >
      </sbb-step>
    </sbb-stepper>
    ${textBlock()}
  `;
};

const Template = ({ disabled, ...args }: Args): TemplateResult => html`
  <sbb-stepper ${sbbSpread(args)} aria-label="Purpose of this flow" selected-index="0">
    ${stepperContent(disabled, false)}
  </sbb-stepper>
  ${textBlock()}
`;

const LongLabelsTemplate = (args: Args): TemplateResult => html`
  <sbb-stepper ${sbbSpread(args)} aria-label="Purpose of this flow" selected-index="0">
    ${stepperContent(false, true)}
  </sbb-stepper>
  ${textBlock()}
`;

const DynamicHeightTemplate = (args: Args): TemplateResult => html`
  <sbb-stepper ${sbbSpread(args)} aria-label="Purpose of this flow" selected-index="0">
    <sbb-step-label>Step</sbb-step-label>
    <sbb-step>
      <div
        tabindex="0"
        class="sbb-focus-outline"
        style="margin-block-end: var(--sbb-spacing-fixed-4x)"
      >
        First step content: ${loremIpsum.substring(0, loremIpsumSubstring[0])}
      </div>
      <div id="expandable" style="display: none; background-color: aliceblue; height: 400px;">
        Toggle this content.
      </div>
    </sbb-step>
  </sbb-stepper>
  <sbb-button @click=${() => toggleElement()}>Toggle content</sbb-button>
  <sbb-button @click=${(event: PointerEvent) => addElement(event)}>Add content</sbb-button>
  ${textBlock()}
`;

export const WithSingleForm: StoryObj = {
  render: WithSingleFormTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithMultipleForms: StoryObj = {
  render: WithMultipleFormsTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const DynamicHeight: StoryObj = {
  render: DynamicHeightTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Linear: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, linear: true },
};

export const WithDisabledStep: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const Vertical: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, orientation: orientation.options![1] },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![0] },
};

export const HorizontalFromSmall: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    orientation: orientation.options![1],
    'horizontal-from': horizontalFrom.options![3],
  },
};

export const LongLabels: StoryObj = {
  render: LongLabelsTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const LongLabelsVertical: StoryObj = {
  render: LongLabelsTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, orientation: orientation.options![1] },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbStepElement.events.validate, SbbStepperElement.events.selectionchange],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-stepper/sbb-stepper',
};

export default meta;
