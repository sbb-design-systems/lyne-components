import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../card.ts';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    'sbb-card-button' is an invisible action element. See 'sbb-card' examples to see it in action.
  </sbb-card>
`;

export const SbbCardButtonElement: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-card/sbb-card-button',
};

export default meta;
