import type { InputType } from '@storybook/types';
import type { ArgTypes, Args, Meta, StoryObj } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';

import { sbbSpread } from '../../core/dom';

import '../../button';
import '../../title';
import readme from './readme.md?raw';
import '../container';
import './sticky-bar';

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

const containerContent = (title: string, color: string): TemplateResult => html`
  <div style="overflow: auto;">
    <sbb-title level="4" ?negative=${color === 'midnight'}>${title}</sbb-title>
    <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
    <p class="sbb-text-s">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
  </div>
  <sbb-button variant="secondary" ?negative=${color === 'midnight'}>See more</sbb-button>
`;

const Template = (): TemplateResult =>
  html` <sbb-sticky-bar>
    <sbb-button variant="secondary">Example</sbb-button>
  </sbb-sticky-bar>`;

const DefaultTemplate = ({ color, ...args }): TemplateResult => html`
  <sbb-container ${sbbSpread(args)} color=${color}>
    ${containerContent('Example title', color)} ${containerContent('Another one', color)}
    ${containerContent('And another one', color)} ${containerContent('And a last one', color)}

    <sbb-sticky-bar>
      <sbb-button style="margin-inline-start: auto">Continue</sbb-button>
    </sbb-sticky-bar>
  </sbb-container>
`;

const ShortTemplate = ({ color, ...args }): TemplateResult => html`
  <sbb-container ${sbbSpread(args)} color=${color}>
    ${containerContent('Example title', color)}

    <sbb-sticky-bar>
      <sbb-button style="margin-inline-start: auto">Continue</sbb-button>
    </sbb-sticky-bar>
  </sbb-container>
`;

const WithStickybarTemplate = ({ color, ...args }): TemplateResult => html`
  <sbb-container ${sbbSpread(args)} color=${color}>
    ${containerContent('Example title', color)} ${containerContent('Another one', color)}
    ${containerContent('And another one', color)} ${containerContent('And a last one', color)}

    <sbb-sticky-bar>
      <sbb-button style="margin-inline-start: auto">Continue</sbb-button>
    </sbb-sticky-bar>
  </sbb-container>
  <sbb-container color="milk" style="padding-block: 5rem">
    ${containerContent('Content after first container', color)}
    ${containerContent('Another one', color)}
  </sbb-container>
`;

export const Standalone: StoryObj = {
  render: Template,
};

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const Expanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

export const ShortContent: StoryObj = {
  render: ShortTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
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

export const WithContentAfter: StoryObj = {
  render: WithStickybarTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

const meta: Meta = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-container/sbb-sticky-bar',
};

export default meta;
