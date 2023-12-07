import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { ArgTypes, Args, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';
import placeholderImage from '../../teaser/stories/placeholder.png';

import '../../button';
import '../../teaser';
import '../../title';
import '../sticky-bar';
import './container';

import readme from './readme.md?raw';

const teaser = (): TemplateResult => html`
  <sbb-teaser is-stacked>
    <img slot="image" src=${placeholderImage} alt="400x300" />
    <span slot="title">Example teaser</span>
    <p slot="description">With a description.</p>
  </sbb-teaser>
`;

const containerContent = (title: string, negative = false): TemplateResult => html`
  <div style=${styleMap({ overflow: 'auto' })}>
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

const variant: InputType = {
  control: {
    type: 'select',
  },
  options: ['transparent', 'white', 'milk', 'midnight'],
};

const defaultArgTypes: ArgTypes = {
  expanded,
  variant,
};

const defaultArgs: Args = {
  expanded: false,
  variant: 'transparent',
};

const DefaultTemplate = ({ ...args }): TemplateResult => html`
  <sbb-container ${sbbSpread({ ...args })}>${containerContent('Example title')}</sbb-container>
`;

const WithStickybarTemplate = ({ variant, ...args }): TemplateResult => html`
  <sbb-container ${sbbSpread({ ...args })} variant=${variant}>
    ${containerContent('Example title', variant === 'midnight')}
    ${containerContent('Another one', variant === 'midnight')}
    ${containerContent('And another one', variant === 'midnight')}
    <div style="display: flex; gap: 1rem; padding-block: 3rem">
      ${teaser()} ${teaser()} ${teaser()}
    </div>
    <sbb-sticky-bar>
      <sbb-button ?negative=${variant === 'midnight'} style="margin-inline-start: auto;"
        >Continue</sbb-button
      >
    </sbb-sticky-bar>
  </sbb-container>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithStickyBar: StoryObj = {
  render: WithStickybarTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style=${styleMap({ margin: '-1rem' })}>${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {},
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-container/sbb-container',
};

export default meta;
