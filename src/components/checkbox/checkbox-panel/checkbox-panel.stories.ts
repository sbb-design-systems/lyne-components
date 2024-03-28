import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import { sbbSpread } from '../../core/dom';

import '../../icon';
import './checkbox-panel';

import readme from './readme.md?raw';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

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

const icon: InputType = {
  control: {
    type: 'text',
  },
};

const iconPlacement: InputType = {
  control: {
    type: 'select',
  },
  options: ['start', 'end'],
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  checked,
  indeterminate,
  disabled,
  label,
  value,
  name,
  'icon-name': icon,
  'icon-placement': iconPlacement,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  size: size.options[1],
  checked: false,
  indeterminate: false,
  disabled: false,
  label: 'Label',
  value: 'Value',
  name: 'name',
  'icon-name': undefined,
  'icon-placement': undefined,
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

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[0] },
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
