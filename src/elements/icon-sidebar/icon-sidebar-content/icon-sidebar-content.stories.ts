import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../../card.ts';

import './icon-sidebar-content.component.ts';

const Template = (): TemplateResult => html`
  <sbb-card color="milk"> See 'sbb-icon-sidebar' examples to see it in action. </sbb-card>
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
  title: 'elements/sbb-icon-sidebar/sbb-icon-sidebar-content',
};

export default meta;
