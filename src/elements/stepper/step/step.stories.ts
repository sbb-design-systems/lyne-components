import type { Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import readme from './readme.md?raw';
import './step.component.js';

const Template = (): TemplateResult =>
  html`<sbb-step slot="step" data-selected>Step content.</sbb-step>`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-stepper/sbb-step',
};

export default meta;
