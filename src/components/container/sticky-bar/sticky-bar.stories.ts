import { withActions } from '@storybook/addon-actions/decorator';
import type { Decorator, Meta, StoryObj } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';

import '../../button';
import '../../title';
import readme from './readme.md?raw';
import './sticky-bar';

const containerContent = (title: string): TemplateResult => html`
  <sbb-title level="4">${title}</sbb-title>
  <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
  <p class="sbb-text-s">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <sbb-button variant="secondary">See more</sbb-button>
`;

const Template = (): TemplateResult =>
  html` <sbb-sticky-bar>
    <sbb-button variant="secondary">Example</sbb-button>
  </sbb-sticky-bar>`;

const WithStickybarTemplate = (): TemplateResult => html`
  <sbb-container>
    ${containerContent('Example title')} ${containerContent('Another one')}
    ${containerContent('And another one')} ${containerContent('And a last one')}

    <sbb-sticky-bar>
      <sbb-button style="margin-inline-start: auto">Continue</sbb-button>
    </sbb-sticky-bar>
  </sbb-container>
  <sbb-container variant="milk" style="padding-block: 5rem">
    ${containerContent('Content after first container')} ${containerContent('Another one')}
  </sbb-container>
`;

export const Standalone: StoryObj = {
  render: Template,
};

export const WithContentAfter: StoryObj = {
  render: WithStickybarTemplate,
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="margin: -1rem">${story()}</div> `,
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
  title: 'components/sbb-container/sbb-sticky-bar',
};

export default meta;
