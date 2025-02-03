import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import './icon-sidebar-link.js';

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const href: InputType = {
  control: {
    type: 'text',
  },
};

const Template = (args: Args): TemplateResult => {
  return html` <sbb-icon-sidebar-link ${sbbSpread(args)}></sbb-icon-sidebar-link> `;
};

const defaultArgTypes: ArgTypes = {
  'icon-name': iconName,
  'accessibility-label': accessibilityLabel,
  href,
};

const defaultArgs: Args = {
  'icon-name': 'glass-cocktail-small',
  'accessibility-label': 'Go to the party',
  href: '#',
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
  title: 'elements/sbb-sidebar/sbb-icon-sidebar-link',
};

export default meta;
