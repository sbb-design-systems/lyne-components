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


import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { SbbMenuElement } from './menu.component.ts';
import readme from './readme.md?raw';

import '../../button/button.ts';
import '../../divider.ts';
import '../../link.ts';
import '../menu-button.ts';
import '../menu-link.ts';

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Menu action',
  },
};

const badge: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Menu action',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Menu action',
  },
};

const defaultArgTypes: ArgTypes = {
  'icon-name': iconName,
  badge,
  disabled,
};

const defaultArgs: Args = {
  'icon-name': 'link-small',
  badge: '2',
  disabled: false,
};

const userNameStyle: Args = {
  fontWeight: 'bold',
  fontSize: 'var(--sbb-text-font-size-xs)',
  marginTop: 'var(--sbb-spacing-fixed-1x)',
};

const userInfoStyle: Args = {
  color: 'light-dark(var(--sbb-color-graphite), var(--sbb-color-smoke))',
  fontSize: 'var(--sbb-text-font-size-xxs)',
};

const triggerButton = (id: string): TemplateResult => html`
  <sbb-button id=${id} size="m"> Menu trigger </sbb-button>
`;

const DefaultTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('menu-trigger-1')}
  <sbb-menu trigger="menu-trigger-1">
    <sbb-menu-link icon-name=${args['icon-name']} href="https://www.sbb.ch/en">
      View
    </sbb-menu-link>
    <sbb-menu-button
      icon-name="pen-small"
      sbb-badge=${!args.disabled ? '16' : nothing}
      aria-label=${!args.disabled ? 'Edit 16 items' : nothing}
      ?disabled-interactive=${args.disabled}
    >
      Edit
    </sbb-menu-button>
    <sbb-menu-button
      icon-name="swisspass-small"
      sbb-badge=${args.badge}
      aria-label="Details, ${args.badge} items"
    >
      Details
    </sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button icon-name="cross-small">Cancel</sbb-menu-button>
  </sbb-menu>
`;

const NestedTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('menu-trigger-1')}
  <sbb-menu trigger="menu-trigger-1">
    <sbb-menu-button icon-name=${args['icon-name']}> New Document </sbb-menu-button>
    <sbb-menu-button icon-name="pen-small" sbb-badge=${args.badge} ?disabled=${args.disabled}>
      Edit
    </sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button icon-name="lock-closed-small" id="sub-menu-1">
      Set Document Permissions
    </sbb-menu-button>
    <sbb-menu-button icon-name="download-small" id="sub-menu-2">Download Selected</sbb-menu-button>
    <sbb-menu-button icon-name="trash-small">Delete Selected</sbb-menu-button>
    <sbb-menu-button icon-name="circle-information-small">Details</sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button icon-name="cross-small">Cancel Selection</sbb-menu-button>
  </sbb-menu>
  <sbb-menu trigger="sub-menu-1">
    <sbb-menu-button icon-name="employees-sbb-small"> All Users </sbb-menu-button>
    <sbb-menu-button icon-name="two-users-small"> Group </sbb-menu-button>
    <sbb-menu-button icon-name="user-small"> Single User </sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button icon-name="filter-small" id="sub-menu-3">
      Custom User Permission
    </sbb-menu-button>
  </sbb-menu>
  <sbb-menu trigger="sub-menu-2">
    <sbb-menu-button icon-name="document-pdf-small">Download as PDF</sbb-menu-button>
    <sbb-menu-button icon-name="document-doc-small">Download as DOCX</sbb-menu-button>
    <sbb-menu-button icon-name="document-xls-small">Download as XLS</sbb-menu-button>
    <sbb-menu-button icon-name="document-zip-small">Download as archive</sbb-menu-button>
  </sbb-menu>
  <sbb-menu trigger="sub-menu-3">
    <sbb-menu-button icon-name="hand-small">Hand Select</sbb-menu-button>
    <sbb-menu-button icon-name="tag-small">Define Permission Criteria</sbb-menu-button>
    <sbb-menu-button icon-name="link-small">Create Invitation Link</sbb-menu-button>
  </sbb-menu>
`;

const CustomContentTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('menu-trigger-2')}
  <sbb-menu trigger="menu-trigger-2">
    <div style=${styleMap(userNameStyle)}>Christina Müller</div>
    <span style=${styleMap(userInfoStyle)}>UIS9057</span>
    <sbb-block-link href="https://www.sbb.ch/en" size="xs">Profile</sbb-block-link>
    <sbb-divider></sbb-divider>
    <sbb-menu-link icon-name=${args['icon-name']} href="https://www.sbb.ch/en">
      View
    </sbb-menu-link>
    <sbb-menu-button icon-name="tickets-class-small" ?disabled-interactive=${args.disabled}>
      Tickets
    </sbb-menu-button>
    <sbb-menu-button
      icon-name="shopping-cart-small"
      sbb-badge=${args.badge}
      aria-label="Cart, containing ${args.badge} items"
    >
      Cart
    </sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button icon-name="exit-small">Log Out</sbb-menu-button>
  </sbb-menu>
`;

const LongContentTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('menu-trigger-3')}
  <sbb-menu trigger="menu-trigger-3">
    <sbb-menu-button
      icon-name=${args['icon-name']}
      ?disabled-interactive=${args.disabled}
      sbb-badge=${!args.disabled ? args.badge : nothing}
      aria-label=${!args.disabled ? `English, ${args.badge} items` : nothing}
    >
      English
    </sbb-menu-button>
    <sbb-menu-button>Deutsch</sbb-menu-button>
    <sbb-menu-button>Français</sbb-menu-button>
    <sbb-menu-button>Italiano</sbb-menu-button>
    <sbb-menu-button>Rumantsch</sbb-menu-button>
    <sbb-menu-button>Español</sbb-menu-button>
    <sbb-menu-button>Português</sbb-menu-button>
    <sbb-menu-button>日本語</sbb-menu-button>
    <sbb-menu-button>한국어</sbb-menu-button>
    <sbb-menu-button>广州话</sbb-menu-button>
    <sbb-menu-button>Afrikaans</sbb-menu-button>
    <sbb-menu-button>Svenska</sbb-menu-button>
    <sbb-menu-button>Dansk</sbb-menu-button>
    <sbb-menu-button>Nederlands</sbb-menu-button>
    <sbb-menu-button>Suomi</sbb-menu-button>
    <sbb-menu-button>українська мова</sbb-menu-button>
    <sbb-menu-button>አማርኛ</sbb-menu-button>
    <sbb-menu-button>ქართული ენა</sbb-menu-button>
    <sbb-menu-button>Afrikaans</sbb-menu-button>
    <sbb-menu-button>Svenska</sbb-menu-button>
    <sbb-menu-button>Dansk</sbb-menu-button>
    <sbb-menu-button>Nederlands</sbb-menu-button>
    <sbb-menu-button>Suomi</sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button icon-name="cross-small">Cancel</sbb-menu-button>
  </sbb-menu>
`;

const EllipsisTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('menu-trigger-4')}
  <sbb-menu trigger="menu-trigger-4">
    <div style=${styleMap(userNameStyle)}>Christina Müller</div>
    <span style=${styleMap(userInfoStyle)}>UIS9057</span>
    <sbb-block-link href="https://www.sbb.ch/en" size="xs"> Profile </sbb-block-link>
    <sbb-divider></sbb-divider>
    <sbb-menu-link icon-name=${args['icon-name']} href="https://www.sbb.ch/en">
      View
    </sbb-menu-link>
    <sbb-menu-button icon-name="pen-small" ?disabled-interactive=${args.disabled}>
      Edit
    </sbb-menu-button>
    <sbb-menu-button
      icon-name="swisspass-small"
      sbb-badge=${args.badge}
      aria-label="Very long label contains ${args.badge} items"
    >
      Very long label that exceeds the maximum width of the menu, very long label that exceeds the
      maximum width of the menu, very long label that exceeds the maximum width of the menu
    </sbb-menu-button>
    <sbb-divider></sbb-divider>
    <sbb-menu-button icon-name="cross-small">Cancel</sbb-menu-button>
  </sbb-menu>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const Nested: StoryObj = {
  render: NestedTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const CustomContent: StoryObj = {
  render: CustomContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, badge: '2' },
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'tick-small', badge: undefined },
};

export const Ellipsis: StoryObj = {
  render: EllipsisTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbMenuElement.events.beforeopen,
        SbbMenuElement.events.open,
        SbbMenuElement.events.close,
        SbbMenuElement.events.beforeclose,
      ],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '400px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-menu/sbb-menu',
};

export default meta;
