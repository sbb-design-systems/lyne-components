import type { InputType } from '@storybook/types';
import type { Args, ArgTypes } from '@storybook/web-components';

import { buttonCommonDefaultArgs, buttonCommonDefaultArgTypes } from './button-common-stories';

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

export const buttonLinkDefaultArgTypes: ArgTypes = {
  ...buttonCommonDefaultArgTypes,
  href,
  target,
  rel,
  download,
  disabled,
};

export const buttonLinkDefaultArgs: Args = {
  ...buttonCommonDefaultArgs,
  href: href.options[0],
  target: '_blank',
  rel: 'noopener',
  download: false,
  disabled: false,
};
