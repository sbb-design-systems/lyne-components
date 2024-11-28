import type { InputType, StoryContext } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import type { SbbLoadingIndicatorElement } from './loading-indicator.js';
import readme from './readme.md?raw';

import './loading-indicator.js';
import '../button/button.js';
import '../title.js';
import '../card.js';

const createLoadingIndicator = (event: Event, args: Args): void => {
  const loader: SbbLoadingIndicatorElement = document.createElement('sbb-loading-indicator');
  const container = (event.currentTarget as HTMLElement).parentElement!.querySelector(
    '.loader-container',
  )!;
  loader.setAttribute('aria-label', 'Loading, please wait');
  loader.size = args['size'];
  container.append(loader);
  setTimeout(() => {
    const p = document.createElement('p');
    p.textContent = "Loading complete. Here's your data: ...";
    container.append(p);
    loader.remove();
  }, 5000);
};

const TemplateAccessibility = (args: Args): TemplateResult => html`
  <sbb-card color="milk">
    Turn on your screen-reader and click the button to make the loading indicator appear.
  </sbb-card>
  <br />
  <sbb-button @click=${(event: Event) => createLoadingIndicator(event, args)}>
    Show loader
  </sbb-button>
  <div class="loader-container" aria-live="polite"></div>
`;

const Template = (args: Args): TemplateResult => html`
  <sbb-loading-indicator ${sbbSpread(args)}></sbb-loading-indicator>
`;

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'l', 'xl', 'xxl', 'xxxl'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'smoke', 'white'],
};

const defaultArgTypes: ArgTypes = {
  size,
  color,
};

const defaultArgs: Args = {
  size: size.options![0],
  color: color.options![0],
};

export const SmallDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SmallSmoke: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1] },
};

export const SmallWhite: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2] },
};

export const LargeDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const LargeSmoke: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1], size: size.options![1] },
};

export const LargeWhite: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2], size: size.options![1] },
};

export const XLDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![2] },
};

export const XLSmoke: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1], size: size.options![2] },
};

export const XLWhite: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2], size: size.options![2] },
};

export const XXLDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![3] },
};

export const XXLSmoke: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1], size: size.options![3] },
};

export const XXLWhite: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2], size: size.options![3] },
};

export const XXXLDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![4] },
};

export const XXXLSmoke: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1], size: size.options![4] },
};

export const XXXLWhite: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2], size: size.options![4] },
};

export const Accessibility: StoryObj = {
  render: TemplateAccessibility,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.color === 'white' ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/loading-indicator/sbb-loading-indicator',
};

export default meta;
