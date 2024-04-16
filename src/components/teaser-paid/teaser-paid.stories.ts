import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import sampleImages from '../core/images.js';

import readme from './readme.md?raw';

import '../chip.js';
import '../image.js';
import './teaser-paid.js';

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const hrefs: string[] = [
  'https://www.sbb.ch',
  'https://github.com/lyne-design-system/lyne-components',
];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
  table: {
    category: 'link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const imageSrc: InputType = {
  control: {
    type: 'text',
  },
};

const imageAlt: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'aria-label': ariaLabel,
  href,
  rel,
  target,
  'image-src': imageSrc,
  'image-alt': imageAlt,
};

const defaultArgs: Args = {
  'aria-label': undefined,
  href: href.options[0],
  rel: undefined,
  target: undefined,
  'image-src': sampleImages[1],
  'image-alt': 'SBB CFF FFS Employee',
};

const Template = ({
  'image-src': imageSrc,
  'image-alt': imageAlt,
  ...args
}: Args): TemplateResult =>
  html` <sbb-teaser-paid ${sbbSpread(args)}>
    <sbb-chip slot="chip">Label</sbb-chip>
    <sbb-image slot="image" image-src=${imageSrc} alt=${imageAlt}></sbb-image>
  </sbb-teaser-paid>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const OpenInNewWindow: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, target: '_blank' },
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 2rem;">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { diffThreshold: 0.11, delay: 5000 },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-teaser/sbb-teaser-paid',
};

export default meta;
