import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';

import './sidebar-title.component.ts';

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const defaultArgTypes: ArgTypes = {
  level,
};

const defaultArgs: Args = {
  level: undefined,
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-sidebar-title ${sbbSpread(args)}>Sidebar title</sbb-sidebar-title>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-sidebar/sbb-sidebar-title',
};

export default meta;
