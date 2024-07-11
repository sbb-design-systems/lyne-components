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

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import sampleImages from '../../core/images.js';

import readme from './readme.md?raw';

import './flip-card.js';
import '../flip-card-summary.js';
import '../flip-card-details.js';
import '../../image/image.js';
import '../../title/title.js';
import "../../link/link/link";

const myProp: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'my-prop': myProp,
};

const defaultArgs: Args = {
  'my-prop': 'Label',
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-flip-card ${sbbSpread(args)}>
    <sbb-flip-card-summary slot="summary">
      <sbb-title level="4">Summary</sbb-title>
      <sbb-image
        slot="image"
        image-src=${sampleImages[0]}
        border-radius="none"
        aspect-ratio="free"
      ></sbb-image>
    </sbb-flip-card-summary>
    <sbb-flip-card-details slot="details"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
      Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae
      tortor ullamcorper maximus. In convallis consectetur felis.
      <sbb-link href="https://www.sbb.ch" negative
        >Link</sbb-link
      ></sbb-flip-card-details
    >
  </sbb-flip-card>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
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
  title: 'elements/sbb-flip-card/sbb-flip-card',
};

export default meta;
