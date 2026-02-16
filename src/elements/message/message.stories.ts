import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import images from '../core/images.ts';
import '../image.ts';
import '../title.ts';
import '../button/secondary-button.ts';
import './message.component.ts';

import readme from './readme.md?raw';

const DefaultTemplate = (): TemplateResult => html`
  <sbb-message>
    <sbb-image slot="image" image-src=${images[images.length - 1]}></sbb-image>
    <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
    <sbb-secondary-button
      slot="action"
      icon-name="arrows-circle-small"
      size="m"
    ></sbb-secondary-button>
  </sbb-message>
`;

const NoImageTemplate = (): TemplateResult => html`
  <sbb-message>
    <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
    <sbb-secondary-button
      slot="action"
      icon-name="arrows-circle-small"
      size="m"
    ></sbb-secondary-button>
  </sbb-message>
`;

const NoErrorCodeTemplate = (): TemplateResult => html`
  <sbb-message>
    <sbb-image slot="image" image-src=${images[images.length - 1]}></sbb-image>
    <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <sbb-secondary-button
      slot="action"
      icon-name="arrows-circle-small"
      size="m"
    ></sbb-secondary-button>
  </sbb-message>
`;

const NoActionTemplate = (): TemplateResult => html`
  <sbb-message>
    <sbb-image slot="image" image-src=${images[images.length - 1]}></sbb-image>
    <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
  </sbb-message>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
};

export const NoImage: StoryObj = {
  render: NoImageTemplate,
};

export const NoErrorCode: StoryObj = {
  render: NoErrorCodeTemplate,
};

export const NoAction: StoryObj = {
  render: NoActionTemplate,
};

const meta: Meta = {
  decorators: [(story) => html` <div style="max-width: 45rem; margin: auto;">${story()}</div> `],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-message',
};

export default meta;
