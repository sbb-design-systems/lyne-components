import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import './menu-action';
import '../../icon';

const getBasicTemplate = ({ text, ...args }: Args, id, iconSlot = false): TemplateResult => html`
  <sbb-menu-action ${sbbSpread(args)}>
    ${text} ${id} ${iconSlot ? html`<sbb-icon slot="icon" name="pie-small"></sbb-icon>` : nothing}
  </sbb-menu-action>
`;

const TemplateMenuAction = (args): TemplateResult => html`
  <div>${getBasicTemplate(args, 1)} ${getBasicTemplate(args, 2)} ${getBasicTemplate(args, 3)}</div>
`;

const TemplateMenuActionCustomIcon = (args): TemplateResult => html`
  <div>
    ${getBasicTemplate(args, 1, true)} ${getBasicTemplate(args, 2, false)}
    ${getBasicTemplate(args, 3, true)}
  </div>
`;

const text: InputType = {
  control: {
    type: 'text',
  },
};

const amount: InputType = {
  control: {
    type: 'text',
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
  amount,
  'icon-name': iconName,
  href,
  target,
  rel,
  download,
  type,
  disabled,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  text: 'Details',
  amount: '99',
  'icon-name': 'tick-small',
  href: href.options[0],
  target: '_blank',
  rel: undefined,
  download: false,
  type: undefined,
  disabled: false,
  name: undefined,
  value: undefined,
  form: undefined,
  'aria-label': ariaLabel,
};

const buttonArgs: Args = {
  ...defaultArgs,
  href: undefined,
  type: type.options[0],
  name: 'detail',
  value: 'Value',
  form: 'form-name',
};

export const menuActionLink: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const menuActionButton: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: buttonArgs,
};

export const menuActionLinkCustomIconNoAmount: StoryObj = {
  render: TemplateMenuActionCustomIcon,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    amount: undefined,
    'icon-name': undefined,
  },
};

export const menuActionLinkNoIconNoAmount: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': undefined, amount: undefined },
};

export const menuActionButtonDisabled: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: { ...buttonArgs, disabled: true },
};

export const menuActionButtonEllipsis: StoryObj = {
  render: TemplateMenuAction,
  argTypes: defaultArgTypes,
  args: {
    ...buttonArgs,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

const meta: Meta = {
  decorators: [
    (story) => html`
      <div
        style=${styleMap({ 'background-color': 'var(--sbb-color-black-default)', width: '320px' })}
      >
        ${story()}
      </div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-menu/sbb-menu-action',
};

export default meta;
