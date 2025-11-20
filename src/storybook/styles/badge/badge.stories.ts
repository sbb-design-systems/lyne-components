import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import '../../../elements/header.ts';
import '../../../elements/icon.ts';

import readme from './readme.md?raw';

const badgeContent: InputType = {
  control: {
    type: 'text',
  },
};

const badgePosition: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['before', 'after'],
};

const defaultArgTypes: ArgTypes = {
  badgeContent,
  badgePosition,
};

const defaultArgs: Args = {
  badgeContent: '3',
  badgePosition: 'after',
};

const BadgeOnIconTemplate = ({ badgeContent, badgePosition }: Args): TemplateResult => html`
  <sbb-icon
    sbb-badge=${badgeContent}
    sbb-badge-position=${badgePosition}
    name="controls-small"
  ></sbb-icon>
`;

const BadgeOnHeaderButtonTemplate = ({ badgeContent, badgePosition }: Args): TemplateResult => html`
  <sbb-header-button>
    <sbb-icon
      slot="icon"
      sbb-badge=${badgeContent}
      sbb-badge-position=${badgePosition}
      name="user-small"
    ></sbb-icon>
    User menu
  </sbb-header-button>
`;

export const BadgeOnIcon: StoryObj = {
  render: BadgeOnIconTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const BadgeOnIconBefore: StoryObj = {
  render: BadgeOnIconTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, badgePosition: 'before' },
};

export const BadgeOnHeaderButton: StoryObj = {
  render: BadgeOnHeaderButtonTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'styles/badge',
};

export default meta;
