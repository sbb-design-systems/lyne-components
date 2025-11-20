import type { Args, ArgTypes } from '@storybook/web-components-vite';
import type { InputType } from 'storybook/internal/types';

import { commonDefaultArgs, commonDefaultArgTypes } from './common-stories.private.ts';

const hrefs = ['https://www.sbb.ch', 'https://github.com/sbb-design-systems/lyne-components'];
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

const disabledInteractive: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

export const buttonLinkDefaultArgTypes: ArgTypes = {
  ...commonDefaultArgTypes,
  href,
  target,
  rel,
  download,
  disabled,
  'disabled-interactive': disabledInteractive,
  'accessibility-label': accessibilityLabel,
};

export const buttonLinkDefaultArgs: Args = {
  ...commonDefaultArgs,
  href: href.options![0],
  target: '_blank',
  rel: 'noopener',
  download: false,
  disabled: false,
  'disabled-interactive': false,
  'accessibility-label': undefined,
};
