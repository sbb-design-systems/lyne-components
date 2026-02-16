import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import '../../card.ts';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    'sbb-tab' must be only used together with 'sbb-tab-label' in a 'sbb-tab-group'. See
    'sbb-tab-group' examples to see it in action.
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
  title: 'elements/sbb-tab/sbb-tab',
};

export default meta;
