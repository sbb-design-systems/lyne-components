import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './menu-button.component.ts';

const getBasicTemplate = (
  { text, badge, 'icon-name': iconName, ...args }: Args,
  id: number,
  iconSlot = false,
): TemplateResult => html`
  <sbb-menu-button
    ${sbbSpread(args)}
    sbb-badge=${!args.disabled ? badge : nothing}
    icon-name=${!iconSlot ? iconName : nothing}
  >
    ${text} ${id}
    ${iconSlot ? html`<sbb-icon slot="icon" name=${iconName || nothing}></sbb-icon>` : nothing}
  </sbb-menu-button>
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

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
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
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  text,
  badge,
  'icon-name': iconName,
  type,
  disabled,
  'disabled-interactive': disabledInteractive,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  text: 'Details',
  badge: '9',
  'icon-name': 'tick-small',
  disabled: false,
  'disabled-interactive': false,
  type: type.options![0],
  name: 'detail',
  value: 'Value',
  form: 'form-name',
  'aria-label': 'Descriptive Label, information about badge should be included.',
};

export const menuButton: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const menuButtonCustomIconNoBadge: StoryObj = {
  render: TemplateMenuActionCustomIcon,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    badge: undefined,
  },
};

export const menuButtonNoIconNoBadge: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': undefined, badge: undefined },
};

export const menuButtonDisabled: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const menuButtonEllipsis: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const menuButtonBadgeNoIcon: StoryObj = {
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
  title: 'elements/sbb-menu/sbb-menu-button',
};

export default meta;
