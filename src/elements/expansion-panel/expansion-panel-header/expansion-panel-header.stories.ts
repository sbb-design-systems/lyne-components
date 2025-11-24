import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../../card.ts';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    'sbb-expansion-panel-header' is an element to be only used together with 'sbb-expansion-panel'.
    See 'sbb-expansion-panel' examples to see it in action.
  </sbb-card>
`;
export const ExpansionPanelHeader: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-accordion/sbb-expansion-panel-header',
};

export default meta;
