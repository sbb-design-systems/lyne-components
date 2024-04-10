import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit/static-html.js';

import {
  inline,
  inlineNegative,
  linkDefaultArgs,
  linkDefaultArgTypes,
  wrapperStyle,
} from '../common/link-common-stories.js';

import readme from './readme.md?raw';
import './link.js';

const defaultArgTypes: ArgTypes = {
  ...linkDefaultArgTypes,
};

const defaultArgs: Args = {
  ...linkDefaultArgs,
  tag: 'sbb-link',
};

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
  title: 'components/sbb-link/sbb-link',
};

export default meta;
