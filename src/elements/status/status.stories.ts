import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import '../title.js';
import './status.component.js';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'info',
    'success',
    'warning',
    'error',
    'pending',
    'incomplete',
    'not-started',
    'in-progress',
  ],
};

const titleText: InputType = {
  control: {
    type: 'text',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  type,
  titleText,
  text,
  'icon-name': iconName,
};

const defaultArgs: Args = {
  type: type.options![0],
  titleText: '',
  text: 'Status info text',
  'icon-name': undefined,
};

const Template = ({ text, titleText, ...args }: Args): TemplateResult => html`
  <sbb-status ${sbbSpread(args)}>
    ${titleText ? html`<sbb-title level="3">${titleText}</sbb-title>` : nothing} ${text}
  </sbb-status>
`;

const TemplateIconSlot = ({ text, 'icon-name': iconName, ...args }: Args): TemplateResult => html`
  <sbb-status ${sbbSpread(args)}>
    <sbb-icon name=${iconName} slot="icon"></sbb-icon>
    ${text}
  </sbb-status>
`;

export const info: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const success: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![1] },
};

export const warning: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![2] },
};

export const error: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![3] },
};

export const pending: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![4] },
};

export const incomplete: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![5] },
};

export const notStarted: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![6] },
};

export const inProgress: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![7] },
};

export const infoWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, titleText: 'Title' },
};

export const successWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![1], titleText: 'Success!' },
};

export const warningWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![2], titleText: 'Warning!' },
};

export const errorWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![3], titleText: 'Error!' },
};

export const pendingWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![4], titleText: 'Pending...' },
};

export const incompleteWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![5], titleText: 'Incomplete...' },
};

export const notStartedWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![6], titleText: 'Not started...' },
};

export const inProgressWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: type.options![7], titleText: 'In progress...' },
};

export const successWithCustomIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    type: 'success',
    'icon-name': 'pen-small',
    titleText: 'Success!',
  },
};

export const successWithCustomIconSlotted: StoryObj = {
  render: TemplateIconSlot,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: 'success', 'icon-name': 'globe-small' },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-status',
};

export default meta;
