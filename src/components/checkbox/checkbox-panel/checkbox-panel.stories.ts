import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import '../../button.js';
import '../../card.js';
import '../../icon.js';
import './checkbox-panel.js';

import readme from './readme.md?raw';

const checked: InputType = {
  control: {
    type: 'boolean',
  },
};

const indeterminate: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const label: InputType = {
  control: {
    type: 'text',
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

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  checked,
  indeterminate,
  disabled,
  label,
  value,
  name,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  checked: false,
  indeterminate: false,
  disabled: false,
  label: 'Label',
  value: 'Value',
  name: 'name',
  'aria-label': undefined,
};

const Template = ({ label, checked, ...args }: Args): TemplateResult =>
  html` <sbb-checkbox-panel .checked=${checked} ?checked=${checked} ${sbbSpread(args)}>
    ${label}
    <span slot="subtext">Subtext</span>
    <span slot="suffix" style="margin-inline-start: auto;">
      <span style="display:flex;align-items:center;">
        <sbb-icon
          name="diamond-small"
          style="margin-inline: var(--sbb-spacing-fixed-2x);"
          data-namespace="default"
          role="img"
          aria-hidden="true"
        ></sbb-icon>
        <span class="sbb-text-m sbb-text--bold">
          <span class="sbb-text-xs sbb-text--bold">CHF</span> 40.00
        </span>
      </span>
    </span>
  </sbb-checkbox-panel>`;

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

export const DefaultUnchecked: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const DefaultChecked: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true },
};
export const DefaultIndeterminate: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, indeterminate: true },
};

export const disabledChecked: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true, checked: true },
};
export const disabledUnchecked: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};
export const disabledIndeterminate: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true, indeterminate: true },
};

export const withForm: StoryObj = {
  render: TemplateWithForm,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 2rem;">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-checkbox/sbb-checkbox-panel',
};

export default meta;
