import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import './icon-sidebar-button.js';

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const Template = (args: Args): TemplateResult => {
  return html` <sbb-icon-sidebar-button ${sbbSpread(args)}></sbb-icon-sidebar-button> `;
};

const defaultArgTypes: ArgTypes = {
  'icon-name': iconName,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  'icon-name': 'glass-cocktail-small',
  'aria-label': 'Go to the party',
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

const meta: Meta = {
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-sidebar/sbb-icon-sidebar-button',
};

export default meta;
