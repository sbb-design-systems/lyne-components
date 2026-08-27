import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';
import type { SbbToggleSlideValidateEvent, SbbToggleSlideElement } from '../toggle-slide.ts';

import readme from './readme.md?raw';

import '../toggle-slide.ts';
import '../button.ts';
import '../card.ts';
import '../form-field.ts';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'] satisfies SbbToggleSlideElement['size'][],
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

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  checked,
  disabled,
  value,
  name,
  'icon-name': iconName,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  size: undefined,
  checked: false,
  disabled: false,
  value: 'Value',
  name: 'name',
  'icon-name': undefined,
  'aria-label': 'Journey checkin state',
};

const Template = ({ ...args }: Args): TemplateResult => html`
  <span class="sbb-form-information">
    <sbb-toggle-slide
      ${sbbSpread(args)}
      @validate=${(e: SbbToggleSlideValidateEvent) => {
        // Example for asynchronous validation
        e.preventDefaultConditionally(
          new Promise((resolve) => {
            setTimeout(() => resolve(true), 1500);
          }),
        );
      }}
    >
      <sbb-toggle-slide-activation-label>To start pull right</sbb-toggle-slide-activation-label>
      <sbb-toggle-slide-deactivation-label>To stop pull left</sbb-toggle-slide-deactivation-label>
    </sbb-toggle-slide>
    <sbb-hint>This is a hint</sbb-hint>
  </span>
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

export const SbbToggleSlideDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const SbbToggleSlideDefaultSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![0],
  },
};

export const SbbToggleSlideDefaultSizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![1],
  },
};

export const SbbToggleSlideDefaultSizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![2],
  },
};

export const SbbToggleSlideDefaultChecked: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const SbbToggleSlideDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const SbbToggleSlideDisabledChecked: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    disabled: true,
    checked: true,
  },
};

export const withForm: StoryObj = {
  render: TemplateWithForm,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['change', 'input', 'validate'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Toggle Slide',
};

export default meta;
