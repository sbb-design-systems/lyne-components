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

const extended: InputType = {
  control: {
    type: 'boolean',
  },
};

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  type,
  extended,
  'title-content': titleContent,
  text,
};

const defaultArgs: Args = {
  type: 'info',
  extended: false,
  'title-content': undefined,
  text: 'Status info text',
};

const Template = ({ text, ...args }: Args): TemplateResult => html`
  <sbb-status ${sbbSpread(args)}> ${text} </sbb-status>
`;

export const infoShort: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const infoTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'title-content': 'Title', extended: true },
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
