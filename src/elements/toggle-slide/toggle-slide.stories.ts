import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';
import { SbbToggleSlideElement, type SbbToggleSlideValidateEvent } from '../toggle-slide.ts';

import readme from './readme.md?raw';

import '../toggle-slide.ts';
import '../button.ts';
import '../card.ts';
import '../dialog.ts';
import '../form-field.ts';
import '../title.ts';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'] satisfies SbbToggleSlideElement['size'][],
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const checked: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypesWithoutStates: ArgTypes = {
  size,
  'aria-label': ariaLabel,
  value,
  name,
};

const defaultArgTypes: ArgTypes = {
  ...defaultArgTypesWithoutStates,
  checked,
  disabled,
  readonly,
};

const defaultArgsWithoutStates: Args = {
  size: undefined,
  'aria-label': 'Journey check-in state',
  value: 'Value',
  name: 'name',
};

const defaultArgs: Args = {
  ...defaultArgsWithoutStates,
  checked: false,
  readonly: false,
  disabled: false,
};

const title = html`<sbb-title level="6" style="margin-block-start: 0;">
  Journey check-in
</sbb-title>`;

const labels = html`
  <sbb-toggle-slide-activation-label>To start pull right</sbb-toggle-slide-activation-label>
  <sbb-toggle-slide-deactivation-label>To stop pull left</sbb-toggle-slide-deactivation-label>
`;

const Template = ({ checked, ...args }: Args): TemplateResult => html`
  ${title}
  <sbb-toggle-slide ${sbbSpread(args)} .checked=${checked}>${labels}</sbb-toggle-slide>
`;

const TemplateWithAsynchronousValidation = ({ checked, ...args }: Args): TemplateResult => html`
  ${title}
  <sbb-toggle-slide
    ${sbbSpread(args)}
    .checked=${checked}
    @validate=${(e: SbbToggleSlideValidateEvent) => {
      e.preventDefaultConditionally(
        // Simulate a backend call with a timeout.
        new Promise((resolve) => setTimeout(() => resolve(true), 1500)),
      );
    }}
  >
    ${labels}
  </sbb-toggle-slide>
`;

const TemplateWithHint = ({ checked, ...args }: Args): TemplateResult => html`
  ${title}
  <span class="sbb-form-information">
    <sbb-toggle-slide ${sbbSpread(args)} .checked=${checked} aria-describedby="journey-hint">
      ${labels}
    </sbb-toggle-slide>
    <sbb-hint id="journey-hint">After the journey started, you can stop it at any time.</sbb-hint>
  </span>
`;

const TemplateWithError = ({ checked, ...args }: Args): TemplateResult => html`
  ${title}
  <span class="sbb-form-information">
    <sbb-toggle-slide
      ${sbbSpread(args)}
      .checked=${checked}
      aria-describedby="journey-error"
      @validate=${(e: SbbToggleSlideValidateEvent) => {
        e.preventDefaultConditionally(
          // Simulate a backend call with a timeout and a negative answer.
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(false);
              const toggleSlideElement = e.target as SbbToggleSlideElement;

              // Set the component into a invalid state.
              toggleSlideElement.setCustomValidity(
                'The journey could not be started. Retry later.',
              );
              const formInformationElement = toggleSlideElement.parentElement!;

              // Add an error message to the form information element.
              formInformationElement.querySelector('sbb-error')?.remove();
              const error = document.createElement('sbb-error');
              error.id = 'journey-error';
              error.innerHTML = 'The journey could not be started. Retry later.';
              formInformationElement.append(error);
            }, 1500);
          }),
        );
      }}
    >
      ${labels}
    </sbb-toggle-slide>
  </span>
  <p>Try to check in and see the asynchronous validation failing.</p>
`;

const TemplateWithForm = (args: Args): TemplateResult => html`
  <form
    @submit=${(e: SubmitEvent) => {
      e.preventDefault();
      const form = (e.target as HTMLFormElement)!;
      form.querySelector('#form-data')!.innerHTML = JSON.stringify(
        Object.fromEntries(new FormData(form)),
      );
    }}
  >
    <fieldset>
      <legend class="sbb-text-s">&nbsp;fieldset&nbsp;</legend>
      ${Template(args)}
    </fieldset>

    <fieldset disabled>
      <legend class="sbb-text-s">&nbsp;disabled fieldset&nbsp;</legend>
      ${Template({ ...args, name: 'disabled' })}
    </fieldset>
    <div style="margin-block: var(--sbb-spacing-responsive-s)">
      <sbb-secondary-button type="reset">Reset</sbb-secondary-button>
      <sbb-button type="submit">Submit</sbb-button>
    </div>
    <p class="sbb-text-s">Form-Data after click submit:</p>
    <sbb-card color="milk" id="form-data"></sbb-card>
  </form>
`;

const TemplateWithConfirmationDialog = (args: Args): TemplateResult => html`
  <div>
    <sbb-title level="6" style="margin-block-start: 0;">Signal state</sbb-title>
    <sbb-toggle-slide
      ${sbbSpread(args)}
      confirmation-dialog="confirmation-dialog"
      @change=${(e: Event) => {
        const toggleSlideElement = e.target as SbbToggleSlideElement;
        if (toggleSlideElement.checked) {
          toggleSlideElement.readOnly = true;
        }
      }}
      @validate=${(e: SbbToggleSlideValidateEvent) => {
        e.preventDefaultConditionally(
          // Simulate a backend call with a timeout.
          new Promise((resolve) => setTimeout(() => resolve(true), 1500)),
        );
      }}
    >
      <sbb-toggle-slide-activation-label>
        Pull right to set the signal to green
      </sbb-toggle-slide-activation-label>
      <sbb-toggle-slide-deactivation-label>
        The signal is green!
      </sbb-toggle-slide-deactivation-label>
    </sbb-toggle-slide>
    <sbb-secondary-button
      style="margin-block: var(--sbb-spacing-responsive-s); display: flex; width: fit-content;"
      @click=${(e: Event) => {
        const toggleSlideElement = (e.currentTarget as HTMLElement).parentElement!.querySelector(
          'sbb-toggle-slide',
        )!;
        toggleSlideElement.checked = false;
        toggleSlideElement.readOnly = false;
      }}
    >
      Reset
    </sbb-secondary-button>
  </div>
  <sbb-dialog id="confirmation-dialog">
    <sbb-dialog-content id="confirmation">
      Are you sure you want to set the signal to green?
    </sbb-dialog-content>
    <sbb-dialog-actions style="justify-content: space-between">
      <sbb-secondary-button
        sbb-dialog-close="false"
        sbb-focus-initial
        aria-describedby="confirmation"
      >
        Cancel
      </sbb-secondary-button>
      <sbb-button sbb-dialog-close="true" aria-describedby="confirmation">Confirm</sbb-button>
    </sbb-dialog-actions>
  </sbb-dialog>
`;

const TemplateReadOnly = ({ checked, ...args }: Args): TemplateResult => html`
  <sbb-title level="6" style="margin-block-start: 0;">Contract</sbb-title>
  <sbb-toggle-slide ${sbbSpread(args)} .checked=${checked}>
    <sbb-toggle-slide-activation-label>
      Pull right to sign the contract
    </sbb-toggle-slide-activation-label>
    <sbb-toggle-slide-deactivation-label>
      Contract successfully signed
    </sbb-toggle-slide-deactivation-label>
  </sbb-toggle-slide>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![0],
  },
};

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![1],
  },
};

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![2],
  },
};

export const Checked: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const ReadonlyChecked: StoryObj = {
  render: TemplateReadOnly,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'aria-label': 'Sign contract',
    readonly: true,
    checked: true,
  },
};

export const WithAsynchronousValidation: StoryObj = {
  render: TemplateWithAsynchronousValidation,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const WithHint: StoryObj = {
  render: TemplateWithHint,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const WithError: StoryObj = {
  render: TemplateWithError,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const WithForm: StoryObj = {
  render: TemplateWithForm,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const WithConfirmationDialog: StoryObj = {
  render: TemplateWithConfirmationDialog,
  argTypes: defaultArgTypesWithoutStates,
  args: { ...defaultArgsWithoutStates, 'aria-label': 'Should the signal become green?' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbToggleSlideElement.events.change,
        SbbToggleSlideElement.events.input,
        SbbToggleSlideElement.events.validate,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Toggle Slide',
};

export default meta;
