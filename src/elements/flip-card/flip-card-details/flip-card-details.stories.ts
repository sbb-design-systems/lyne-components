import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../../card.ts';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    'sbb-flip-card-details' is an element to be only used together with 'sbb-flip-card'. See
    'sbb-flip-card' examples to see it in action.
  </sbb-card>
`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-flip-card/sbb-flip-card-details',
};

export default meta;
