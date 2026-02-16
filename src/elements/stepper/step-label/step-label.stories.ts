import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';

import readme from './readme.md?raw';

import '../../card.ts';

const Template = (): TemplateResult =>
  html`<sbb-card color="milk">
    'sbb-step-label' cannot be used on its own. See 'sbb-stepper' examples to see it in action.
  </sbb-card>`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-stepper/sbb-step-label',
};

export default meta;
