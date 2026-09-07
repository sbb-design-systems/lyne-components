import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';
import { isMacOS } from '../core/dom/platform.ts';
import {
  i18nToggleSlidePressAndHoldActivate,
  i18nToggleSlidePressAndHoldDeactivate,
} from '../core/i18n/i18n.ts';
import { SbbToggleSlideElement, type SbbToggleSlideValidateEvent } from '../toggle-slide.ts';

import readme from './readme.md?raw';

import '../toggle-slide.ts';
import '../button.ts';
import '../card.ts';
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

const defaultArgTypes: ArgTypes = {
  size,
  'aria-label': ariaLabel,
  checked,
  disabled,
  value,
  name,
};

const defaultArgs: Args = {
  size: undefined,
  'aria-label': 'Journey check-in state',
  checked: false,
  disabled: false,
  value: 'Value',
  name: 'name',
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
    <sbb-toggle-slide
      ${sbbSpread(args)}
      .checked=${checked}
      aria-describedby="instruction journey-hint"
      @change=${(e: Event) => {
        const target = e.target as SbbToggleSlideElement;
        const instructionElement = target.parentElement!.querySelector('#instruction');
        if (instructionElement) {
          instructionElement.innerHTML = isMacOS
            ? target.checked
              ? i18nToggleSlidePressAndHoldDeactivate[document.documentElement.lang]
              : i18nToggleSlidePressAndHoldActivate[document.documentElement.lang]
            : '';
        }
      }}
    >
      ${labels}
    </sbb-toggle-slide>
    <span id="instruction" class="sbb-screen-reader-only">
      ${
        isMacOS
          ? checked
            ? i18nToggleSlidePressAndHoldDeactivate[document.documentElement.lang]
            : i18nToggleSlidePressAndHoldActivate[document.documentElement.lang]
          : nothing
      }
    </span>
    <sbb-hint id="journey-hint">After the journey started, you can stop it at any time.</sbb-hint>
  </span>
`;

const TemplateWithError = ({ checked, ...args }: Args): TemplateResult => html`
  ${title}
  <span class="sbb-form-information">
    <sbb-toggle-slide
      ${sbbSpread(args)}
      .checked=${checked}
      aria-describedby="instruction journey-error"
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
      @change=${(e: Event) => {
        const target = e.target as SbbToggleSlideElement;
        const instructionElement = target.parentElement!.querySelector('#instruction');
        if (instructionElement) {
          instructionElement.innerHTML = isMacOS
            ? target.checked
              ? i18nToggleSlidePressAndHoldDeactivate[document.documentElement.lang]
              : i18nToggleSlidePressAndHoldActivate[document.documentElement.lang]
            : '';
        }
      }}
    >
      ${labels}
    </sbb-toggle-slide>
    <span id="instruction" class="sbb-screen-reader-only">
      ${
        isMacOS
          ? checked
            ? i18nToggleSlidePressAndHoldDeactivate[document.documentElement.lang]
            : i18nToggleSlidePressAndHoldActivate[document.documentElement.lang]
          : nothing
      }
    </span>
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

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    disabled: true,
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
