import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import '../../../elements/header.js';
import '../../../elements/icon.js';

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
  options: ['before', 'middle', 'after'],
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

export const BadgeOnIconMiddle: StoryObj = {
  render: BadgeOnIconTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, badgePosition: 'middle' },
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
