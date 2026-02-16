import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import sampleImages from '../../core/images.ts';

import readme from './readme.md?raw';
import './header-button.component.ts';
import '../../image.ts';

const TemplateSingle = ({ active, text, ...args }: Args): TemplateResult => html`
  <sbb-header-button ${sbbSpread(args)} class=${active ? 'sbb-active' : ''}>
    ${text}
  </sbb-header-button>
`;

const AvatarSbbImageTemplate = ({ active, text, ...args }: Args): TemplateResult => html`
  <sbb-header-button ${sbbSpread(args)} class=${active ? 'sbb-active' : ''}>
    <sbb-image image-src=${sampleImages[6]} slot="icon" sbb-badge="5" alt="Avatar Icon"></sbb-image>
    ${text}
  </sbb-header-button>
`;

const AvatarImgTemplate = ({ active, text, ...args }: Args): TemplateResult => html`
  <sbb-header-button ${sbbSpread(args)} class=${active ? 'sbb-active' : ''}>
    <img src=${sampleImages[6]} slot="icon" alt="Avatar Icon" />
    ${text}
  </sbb-header-button>
`;

const AvatarImgBadgeTemplate = ({ active, text, ...args }: Args): TemplateResult => html`
  <sbb-header-button ${sbbSpread(args)} class=${active ? 'sbb-active' : ''}>
    <figure sbb-badge="5" class="sbb-figure" slot="icon">
      <img
        src=${sampleImages[6]}
        alt="Avatar Icon"
        class="sbb-image-border-radius-round"
        style="aspect-ratio: 1 / 16; object-fit: cover; width: var(--sbb-size-icon-ui-small); height: var(--sbb-size-icon-ui-small);"
      />
    </figure>
    ${text}
  </sbb-header-button>
`;

const text: InputType = {
  control: {
    type: 'text',
  },
};

const expandFrom: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['zero', 'small', 'large', 'ultra'],
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const active: InputType = {
  control: {
    type: 'boolean',
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const ariaLabel: InputType = {
  control: { type: 'text' },
};

const basicArgTypes: ArgTypes = {
  text,
  'expand-from': expandFrom,
  'icon-name': iconName,
  active,
  type,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const basicArgs: Args = {
  text: 'Menu',
  'expand-from': expandFrom.options![0],
  'icon-name': 'hamburger-menu-small',
  active: false,
  type: type.options![0],
  name: 'header-button',
  value: 'value',
  form: 'form',
  'aria-label': undefined,
};

export const Default: StoryObj = {
  render: TemplateSingle,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const IconOnly: StoryObj = {
  render: TemplateSingle,
  argTypes: basicArgTypes,
  args: { ...basicArgs, text: '', 'aria-label': 'hamburger-menu-small' },
};

export const TextOnly: StoryObj = {
  render: TemplateSingle,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'icon-name': '' },
};

export const Active: StoryObj = {
  render: TemplateSingle,
  argTypes: basicArgTypes,
  args: { ...basicArgs, active: true, 'icon-name': 'magnifying-glass-small', text: 'Label' },
};

export const ExpandFromLarge: StoryObj = {
  render: TemplateSingle,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'icon-name': 'magnifying-glass-small',
    text: 'Label',
    'expand-from': 'large',
  },
};

export const AvatarSbbImage: StoryObj = {
  render: AvatarSbbImageTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const AvatarImg: StoryObj = {
  render: AvatarImgTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const AvatarImgBadge: StoryObj = {
  render: AvatarImgBadgeTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-header/sbb-header-button',
};

export default meta;
