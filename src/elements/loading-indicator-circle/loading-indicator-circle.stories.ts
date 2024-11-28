import type { InputType, StoryContext } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import type { SbbLoadingIndicatorCircleElement } from './loading-indicator-circle.js';
import readme from './readme.md?raw';

import './loading-indicator-circle.js';
import '../button/button.js';
import '../title.js';
import '../card.js';

const createLoadingIndicator = (event: Event): void => {
  const loader: SbbLoadingIndicatorCircleElement = document.createElement(
    'sbb-loading-indicator-circle',
  );
  const container = (event.currentTarget as HTMLElement).parentElement!.querySelector(
    '.loader-container',
  )!;
  loader.setAttribute('aria-label', 'Loading, please wait');
  container.append(loader);
  setTimeout(() => {
    const p = document.createElement('p');
    p.textContent = "Loading complete. Here's your data: ...";
    container.append(p);
    loader.remove();
  }, 5000);
};

const TemplateAccessibility = (): TemplateResult => html`
  <sbb-card color="milk">
    Turn on your screen-reader and click the button to make the loading indicator appear.
  </sbb-card>
  <br />
  <sbb-button @click=${(event: Event) => createLoadingIndicator(event)}> Show loader </sbb-button>
  <div class="loader-container" aria-live="polite"></div>
`;

const Template = (args: Args): TemplateResult => html`
  <p>
    <sbb-loading-indicator-circle ${sbbSpread(args)}></sbb-loading-indicator-circle> Inline loading
    indicator
  </p>
  <sbb-title level="4">
    <sbb-loading-indicator-circle ${sbbSpread(args)}></sbb-loading-indicator-circle> Adaptive to
    font size
  </sbb-title>
`;

const variant: InputType = {
  control: {
    type: 'select',
  },
  options: ['window', 'circle'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'l'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'smoke', 'white'],
};

const defaultArgTypes: ArgTypes = {
  variant,
  size,
  color,
};

const defaultArgs: Args = {
  variant: variant.options![0],
  size: size.options![0],
  color: color.options![0],
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, variant: variant.options![1] },
};

export const Smoke: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1], variant: variant.options![1] },
};

export const White: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![2], variant: variant.options![1] },
  decorators: [
    (story) =>
      html`<div
        style="color: var(--sbb-color-white); --sbb-title-text-color-normal-override: var(--sbb-color-white)"
      >
        ${story()}
      </div>`,
  ],
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
  title: 'elements/loading-indicator/sbb-loading-indicator-circle',
};

export default meta;
