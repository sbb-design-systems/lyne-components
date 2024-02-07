import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit/static-html.js';

import {
  blockFixedWidth,
  blockIconStart,
  blockM,
  blockMIcon,
  blockNegative,
  blockS,
  blockSIcon,
  blockWithSlottedIcon,
  blockXS,
  blockXSIcon,
  inline,
  inlineNegative,
  linkCommonDefaultArgs,
  linkCommonDefaultArgTypes,
  wrapperStyle,
} from '../common/link-common-stories';

import readme from './readme.md?raw';
import './link';

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

const hrefs = ['https://www.sbb.ch', 'https://github.com/lyne-design-system/lyne-components'];
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
    category: 'Link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const defaultArgTypes: ArgTypes = {
  ...linkCommonDefaultArgTypes,
  tag,
  href,
  target,
  rel,
  download,
  disabled,
};

const defaultArgs: Args = {
  ...linkCommonDefaultArgs,
  tag: 'sbb-link',
  href: href.options[1],
  target: '_blank',
  rel: undefined,
  download: false,
  disabled: false,
};

export const BlockXS: StoryObj = blockXS;
export const BlockS: StoryObj = blockS;
export const BlockM: StoryObj = blockM;
export const BlockXSIcon: StoryObj = blockXSIcon;
export const BlockSIcon: StoryObj = blockSIcon;
export const BlockMIcon: StoryObj = blockMIcon;
export const BlockIconStart: StoryObj = blockIconStart;
export const BlockNegative: StoryObj = blockNegative;
export const BlockWithSlottedIcon: StoryObj = blockWithSlottedIcon;
export const BlockFixedWidth: StoryObj = blockFixedWidth;
export const Inline: StoryObj = inline;
export const InlineNegative: StoryObj = inlineNegative;

const meta: Meta = {
  argTypes: defaultArgTypes,
  args: defaultArgs,
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link',
};

export default meta;
