import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import '../../icon.ts';
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
    <a href="https://www.sbb.ch" class="sbb-active">Nav item 1</a>
    <a href="https://www.sbb.ch">Nav item 2</a>
    <a class="sbb-disabled" aria-disabled="true">Nav item 3</a>
    <a href="https://www.sbb.ch">Nav item 4</a>
  </sbb-tab-nav-bar>
`;

const withIconTemplate = (args: Args): TemplateResult => html`
  <sbb-tab-nav-bar ${sbbSpread(args)}>
    <a href="https://www.sbb.ch" class="sbb-active">
      <sbb-icon name="app-icon-small"></sbb-icon>
      Nav item 1</a
    >
    <a href="https://www.sbb.ch">
      <sbb-icon name="user-small"></sbb-icon>
      Nav item 2</a
    >
    <a class="sbb-disabled" aria-disabled="true">
      <sbb-icon name="circle-information-small"></sbb-icon>
      Nav item 3</a
    >
    <a href="https://www.sbb.ch">
      <sbb-icon name="pie-small"></sbb-icon>
      Nav item 4</a
    >
  </sbb-tab-nav-bar>
`;

const withAmountTemplate = (args: Args): TemplateResult => html`
  <sbb-tab-nav-bar ${sbbSpread(args)}>
    <a href="https://www.sbb.ch" class="sbb-active"
      >Nav item 1 <span class="sbb-tab-amount">42</span></a
    >
    <a href="https://www.sbb.ch">Nav item 2 <span class="sbb-tab-amount">42</span></a>
    <a class="sbb-disabled" aria-disabled="true"
      >Nav item 3 <span class="sbb-tab-amount">42</span></a
    >
    <a href="https://www.sbb.ch">Nav item 4 <span class="sbb-tab-amount">42</span></a>
  </sbb-tab-nav-bar>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithIcon: StoryObj = {
  render: withIconTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithAmount: StoryObj = {
  render: withAmountTemplate,
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
