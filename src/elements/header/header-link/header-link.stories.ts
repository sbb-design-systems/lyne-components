import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import sampleImages from '../../core/images.ts';

import readme from './readme.md?raw';
import './header-link.component.ts';
import '../../image.ts';

const TemplateSingle = ({ active, text, ...args }: Args): TemplateResult => html`
  <sbb-header-link ${sbbSpread(args)} class=${active ? 'sbb-active' : ''}>
    ${text}
  </sbb-header-link>
`;

const AvatarSbbImageTemplate = ({ active, text, ...args }: Args): TemplateResult => html`
  <sbb-header-link ${sbbSpread(args)} class=${active ? 'sbb-active' : ''}>
    <sbb-image image-src=${sampleImages[6]} slot="icon" sbb-badge="5" alt="Avatar Icon"></sbb-image>
    ${text}
  </sbb-header-link>
`;

const AvatarImgTemplate = ({ active, text, ...args }: Args): TemplateResult => html`
  <sbb-header-link ${sbbSpread(args)} class=${active ? 'sbb-active' : ''}>
    <img src=${sampleImages[6]} slot="icon" alt="Avatar Icon" />
    ${text}
  </sbb-header-link>
`;

const AvatarImgBadgeTemplate = ({ active, text, ...args }: Args): TemplateResult => html`
  <sbb-header-link ${sbbSpread(args)} class=${active ? 'sbb-active' : ''}>
    <figure sbb-badge="5" class="sbb-figure" slot="icon">
      <img
        src=${sampleImages[6]}
        alt="Avatar Icon"
        class="sbb-image-border-radius-round"
        style="aspect-ratio: 1 / 16; object-fit: cover; width: var(--sbb-size-icon-ui-small); height: var(--sbb-size-icon-ui-small);"
      />
    </figure>
    ${text}
  </sbb-header-link>
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

const accessibilityLabel: InputType = {
  control: { type: 'text' },
};

const basicArgTypes: ArgTypes = {
  text,
  'expand-from': expandFrom,
  'icon-name': iconName,
  active,
  href,
  target,
  rel,
  download,
  'accessibility-label': accessibilityLabel,
};

const basicArgs: Args = {
  text: 'Menu',
  'expand-from': expandFrom.options![0],
  'icon-name': 'hamburger-menu-small',
  active: false,
  href: href.options![1],
  target: '_blank',
  rel: undefined,
  download: false,
  'accessibility-label': undefined,
};

export const Default: StoryObj = {
  render: TemplateSingle,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const IconOnly: StoryObj = {
  render: TemplateSingle,
  argTypes: basicArgTypes,
  args: { ...basicArgs, text: '', 'accessibility-label': 'hamburger-menu-small' },
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
  title: 'elements/sbb-header/sbb-header-link',
};

export default meta;
