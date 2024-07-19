import { withActions } from '@storybook/addon-actions/decorator';
import type { Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../../link.js';
import './flip-card-details.js';

const Template = (): TemplateResult =>
  html`<sbb-flip-card-details style="--sbb-flip-card-details-opacity: 1">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus
    turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor
    ullamcorper maximus. In convallis consectetur felis.
    <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
  </sbb-flip-card-details>`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-flip-card/sbb-flip-card-details',
};

export default meta;
