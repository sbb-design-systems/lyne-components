import type { Args, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';

import './screen-reader-only.component.ts';

const content: InputType = {
  control: {
    type: 'text',
  },
};

const Template = (args: Args): TemplateResult =>
  html`There is a visually hidden text here:
    <sbb-screen-reader-only>${args.content}</sbb-screen-reader-only>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: { content },
  args: { content: `I'm visually hidden, but read to screen reader.` },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'internals/sbb-screen-reader-only',
};

export default meta;
