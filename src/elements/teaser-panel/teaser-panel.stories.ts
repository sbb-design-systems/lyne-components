import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import '../teaser-panel.ts';

const Template = (): TemplateResult => html`
  <div style="height: 550px; position: relative; background-color: cyan">
    <sbb-teaser-panel> Break out and explore castles and palaces. </sbb-teaser-panel>
  </div>
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
  title: 'elements/Teaser Panel',
};

export default meta;
