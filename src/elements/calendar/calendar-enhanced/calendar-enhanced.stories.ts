import type { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';
import './calendar-enhanced.component.ts';

const Template = (_: Args): TemplateResult => html`<sbb-calendar-enhanced></sbb-calendar-enhanced>`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-calendar/sbb-calendar-enhanced',
};

export default meta;
