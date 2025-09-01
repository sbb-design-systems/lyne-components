import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import '../../card.js';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    <b>sbb-timetable-form-details</b> is an element to be only used together with 'sbb-timetable-form'. </br>
    See the <b>sbb-timetable-form</b> examples to see it in action.
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
  title: 'elements/sbb-timetable-form/sbb-timetable-form-details',
};

export default meta;
