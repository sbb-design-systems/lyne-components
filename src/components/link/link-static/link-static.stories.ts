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
import './link-static';
import '../block-link-static';

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

const defaultArgTypes: ArgTypes = {
  ...linkCommonDefaultArgTypes,
  tag,
};

const defaultArgs: Args = {
  ...linkCommonDefaultArgs,
  tag: 'sbb-block-link-static',
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

export const Inline: StoryObj = {
  ...inline,
  args: {
    tag: 'sbb-link-static',
    text: 'Show more',
  },
};
export const InlineNegative: StoryObj = {
  ...inlineNegative,
  args: {
    tag: 'sbb-link-static',
    text: 'Show more',
    negative: true,
  },
};

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
  title: 'components/sbb-link/sbb-link-static',
};

export default meta;
