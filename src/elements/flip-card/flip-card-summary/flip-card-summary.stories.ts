import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import sampleImages from '../../core/images.js';

import readme from './readme.md?raw';

import './flip-card-summary.js';
import '../../title.js';
import '../../image.js';

const imageAlignment: InputType = {
  control: {
    type: 'select',
  },
  options: ['after', 'below'],
  table: {
    category: 'Summary',
  },
};

const defaultArgTypes: ArgTypes = {
  imageAlignment,
};

const defaultArgs: Args = {
  imageAlignment: imageAlignment.options![0],
};

const Template = (args: Args): TemplateResult => html`
  <sbb-flip-card-summary image-alignment=${args.imageAlignment}>
    <sbb-title level="4">Summary</sbb-title>
    <sbb-image
      slot="image"
      image-src=${sampleImages[0]}
      border-radius="none"
      aspect-ratio="free"
    ></sbb-image>
  </sbb-flip-card-summary>
`;

export const Default: StoryObj = {
  render: Template,
  args: defaultArgs,
  argTypes: defaultArgTypes,
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-flip-card/sbb-flip-card-summary',
};

export default meta;
