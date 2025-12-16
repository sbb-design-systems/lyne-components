import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './tab-nav-bar.component.ts';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'l', 'xl'],
};

const defaultArgTypes: ArgTypes = {
  size,
};

const defaultArgs: Args = {
  size: size.options![1],
};

const Template = (args: Args): TemplateResult => html`
  <sbb-tab-nav-bar ${sbbSpread(args)}>
    <a href="javascript:void(0);" class="sbb-active">Nav item 1</a>
    <a href="javascript:void(0);">Nav item 2</a>
    <a class="sbb-disabled" aria-disabled="true">Nav item 3</a>
    <a href="javascript:void(0);">Nav item 4</a>
  </sbb-tab-nav-bar>
`;

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
  title: 'elements/sbb-tab/sbb-tab-nav-bar',
};

export default meta;
