import type { Args, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import './sidebar-close-button.js';

const Template = (args: Args): TemplateResult =>
  html`<sbb-sidebar-close-button ${sbbSpread(args)}></sbb-sidebar-close-button>`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-sidebar/sbb-sidebar-close-button',
};

export default meta;
