import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../../card.ts';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    'sbb-calendar-day' should be used together with 'sbb-calendar-enhanced'. See
    'sbb-calendar-enhanced' examples to see it in action.
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
  title: 'elements/sbb-calendar/sbb-calendar-day',
};

export default meta;
