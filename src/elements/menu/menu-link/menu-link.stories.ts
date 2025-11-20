import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './menu-link.component.ts';

const getBasicTemplate = (
  { text, badge, 'icon-name': iconName, ...args }: Args,
  id: number,
  iconSlot = false,
): TemplateResult => html`
  <sbb-menu-link
    ${sbbSpread(args)}
    sbb-badge=${!args.disabled ? badge : nothing}
    icon-name=${!iconSlot ? iconName : nothing}
  >
    ${text} ${id}
    ${iconSlot ? html`<sbb-icon slot="icon" name=${iconName || nothing}></sbb-icon>` : nothing}
  </sbb-menu-link>
`;

const TemplateMenuAction = (args: Args): TemplateResult => html`
  ${getBasicTemplate(args, 1)} ${getBasicTemplate(args, 2)} ${getBasicTemplate(args, 3)}
`;

const TemplateMenuActionCustomIcon = (args: Args): TemplateResult => html`
  ${getBasicTemplate(args, 1, true)} ${getBasicTemplate(args, 2, true)}
  ${getBasicTemplate(args, 3, true)}
`;

const text: InputType = {
  control: {
    type: 'text',
  },
};

const badge: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'badge',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
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

const defaultArgTypes: ArgTypes = {
  text,
  badge,
  'icon-name': iconName,
  href,
  target,
  rel,
  download,
  disabled,
  'disabled-interactive': disabledInteractive,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  text: 'Details',
  badge: '9',
  'icon-name': 'tick-small',
  href: href.options![0],
  target: '_blank',
  rel: undefined,
  download: false,
  disabled: false,
  'disabled-interactive': false,
  'accessibility-label': 'Descriptive Label, information about badge should be included.',
};

export const menuLink: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const menuLinkCustomIconNoBadge: StoryObj = {
  render: TemplateMenuActionCustomIcon,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    badge: undefined,
  },
};

export const menuLinkNoIconNoBadge: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': undefined, badge: undefined },
};

export const menuLinkStatic: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, href: undefined },
};

export const menuLinkDisabled: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const menuLinkButtonEllipsis: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const menuLinkBadgeNoIcon: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'icon-name': undefined,
    badge: '123',
  },
};

const meta: Meta = {
  decorators: [
    (story) => html`<div style="width: 256px;">${story()}</div>`,
    withActions as Decorator,
  ],
  parameters: {
    backgroundColor: () => 'var(--sbb-background-color-1-inverted)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-menu/sbb-menu-link',
};

export default meta;
