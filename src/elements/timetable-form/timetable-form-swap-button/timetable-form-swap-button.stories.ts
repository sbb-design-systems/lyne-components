import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import '../../card.ts';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    <b>sbb-timetable-form-swap-button</b> is an element meant to be used in combination with the
    'sbb-timetable-form'.
    <p style="margin-block-end: 0">
      See the <b>sbb-timetable-form</b> examples to see it in action.
    </p>
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
  title: 'elements/sbb-timetable-form/sbb-timetable-form-swap-button',
};

export default meta;
