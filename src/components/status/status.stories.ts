import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';

import './status';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['info', 'success', 'warning', 'error'],
};

const titleLabel: InputType = {
  control: {
    type: 'text',
  },
};

const textLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  type: type,
  'title-label': titleLabel,
  'text-label': textLabel,
};

const defaultArgs: Args = {
  type: 'info',
  'text-label': 'Text label',
};

const Template = (args: Args): TemplateResult => html`
  <sbb-status ${sbbSpread(args)}> </sbb-status>
`;

export const infoShort: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const infoTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'title-label': 'Title' },
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
  title: 'components/sbb-status',
};

export default meta;
