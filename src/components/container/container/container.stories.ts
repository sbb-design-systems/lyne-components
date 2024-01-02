import type { InputType } from '@storybook/types';
import type { ArgTypes, Args, Meta, StoryObj } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';

import { sbbSpread } from '../../core/dom';

import '../../button';
import '../../teaser';
import '../../title';
import '../sticky-bar';
import './container';

import readme from './readme.md?raw';

const containerContent = (title: string, negative = false): TemplateResult => html`
  <div style="overflow: auto">
    <sbb-title level="4" ?negative=${negative}>${title}</sbb-title>
    <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
    <p class="sbb-text-s">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
  </div>
  <sbb-button variant="secondary" ?negative=${negative}>See more</sbb-button>
`;

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const color: InputType = {
  control: {
    type: 'select',
  },
  options: ['transparent', 'white', 'milk', 'midnight'],
};

const defaultArgTypes: ArgTypes = {
  expanded,
  color,
};

const defaultArgs: Args = {
  expanded: false,
  color: color.options[0],
};

const DefaultTemplate = ({ color, ...args }): TemplateResult => html`
  <sbb-container ${sbbSpread(args)} color=${color} style="padding-block-end: 3rem;">
    ${containerContent('Example title', color === 'midnight')}
    ${containerContent('Another one', color === 'midnight')}
    ${containerContent('And another one', color === 'midnight')}
  </sbb-container>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const White: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[1] },
};

export const Milk: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[2] },
};

export const Midnight: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[3] },
};

export const Expanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

const meta: Meta = {
  parameters: {
    actions: {},
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-container/sbb-container',
};

export default meta;
