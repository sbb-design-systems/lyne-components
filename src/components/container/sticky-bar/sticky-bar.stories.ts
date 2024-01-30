import type { InputType } from '@storybook/types';
import type { ArgTypes, Args, Meta, StoryObj } from '@storybook/web-components';
import isChromatic from 'chromatic';
import { html, nothing, type TemplateResult } from 'lit';

import { sbbSpread } from '../../core/dom';

import '../../action-group';
import '../../button';
import '../../link';
import '../../title';
import '../container';
import readme from './readme.md?raw';
import './sticky-bar';

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Container',
  },
};

const containerColor: InputType = {
  name: 'color',
  control: {
    type: 'select',
  },
  table: {
    category: 'Container',
  },
  options: ['transparent', 'white', 'milk', 'midnight'],
};

const color: InputType = {
  control: {
    type: 'select',
  },
  table: {
    category: 'Sticky Bar',
  },
  options: ['unset', 'white', 'milk', 'midnight'],
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Sticky Bar',
  },
};

const defaultArgTypes: ArgTypes = {
  expanded,
  color,
  containerColor,
  disableAnimation,
};

const defaultArgs: Args = {
  expanded: false,
  color: color.options[0],
  containerColor: containerColor.options[0],
  disableAnimation: isChromatic(),
};

const actionGroup = (): TemplateResult => html`
  <sbb-action-group
    align-group="stretch"
    orientation="vertical"
    horizontal-from="medium"
    style="width:100%;"
  >
    <sbb-link
      align-self="start"
      icon-name="chevron-small-left-small"
      href="https://www.sbb.ch/en/"
      sbb-dialog-close
    >
      Link
    </sbb-link>
    <sbb-button variant="secondary" sbb-dialog-close> Cancel </sbb-button>
    <sbb-button variant="primary" sbb-dialog-close> Confirm </sbb-button>
  </sbb-action-group>
`;

const containerContent = (title: string, color: string): TemplateResult => html`
  <sbb-title level="4" ?negative=${color === 'midnight'}>${title}</sbb-title>
  <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
  <p class="sbb-text-s">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <sbb-button
    variant="secondary"
    ?negative=${color === 'midnight'}
    style="margin-block-end: 0.75rem;"
    >See more</sbb-button
  >
`;

const Template = (): TemplateResult =>
  html` <sbb-sticky-bar>
    <sbb-button variant="secondary">Example</sbb-button>
  </sbb-sticky-bar>`;

const DefaultTemplate = ({
  color,
  containerColor,
  disableAnimation,
  ...args
}: Args): TemplateResult => html`
  <sbb-container ${sbbSpread(args)} color=${containerColor}>
    ${containerContent('Example title', containerColor)}
    ${containerContent('Another one', containerColor)}
    ${containerContent('And another one', containerColor)}
    ${containerContent('And a last one', containerColor)}

    <sbb-sticky-bar
      color=${color !== 'unset' ? color : nothing}
      ?disable-animation=${disableAnimation}
    >
      ${actionGroup()}
    </sbb-sticky-bar>
  </sbb-container>
`;

const ShortTemplate = ({
  color,
  containerColor,
  disableAnimation,
  ...args
}: Args): TemplateResult => html`
  <sbb-container ${sbbSpread(args)} color=${containerColor}>
    ${containerContent('Example title', containerColor)}

    <sbb-sticky-bar
      color=${color !== 'unset' ? color : nothing}
      ?disable-animation=${disableAnimation}
    >
      ${actionGroup()}
    </sbb-sticky-bar>
  </sbb-container>
`;

const WithContentAfterTemplate = ({
  color,
  containerColor,
  disableAnimation,
  ...args
}: Args): TemplateResult => html`
  <sbb-container ${sbbSpread(args)} color=${containerColor}>
    ${containerContent('Example title', containerColor)}
    ${containerContent('Another one', containerColor)}
    ${containerContent('And another one', containerColor)}
    ${containerContent('And a last one', containerColor)}

    <sbb-sticky-bar
      color=${color !== 'unset' ? color : nothing}
      ?disable-animation=${disableAnimation}
    >
      ${actionGroup()}
    </sbb-sticky-bar>
  </sbb-container>
  <sbb-container color="milk">
    <div style="padding-block: 4rem;">
      ${containerContent('Content after first container', 'milk')}
      ${containerContent('Another one', 'milk')}
    </div>
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
  render: WithContentAfterTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const MilkContainer: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options[2] },
};

export const MilkContainerWhiteStickyBar: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, containerColor: color.options[2], color: color.options[1] },
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
