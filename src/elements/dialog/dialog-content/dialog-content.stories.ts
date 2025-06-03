import type { Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';

import './dialog-content.component.js';
import readme from './readme.md?raw';

const Template = (): TemplateResult =>
  html`<sbb-dialog-content>This is a dialog content.</sbb-dialog-content>`;

export const Default: StoryObj = { render: Template };

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-dialog/sbb-dialog-content',
};

export default meta;
