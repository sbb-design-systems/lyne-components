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
