import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';

import './header.component.ts';
import '../header-button.ts';
import '../header-link.ts';
import '../../divider.ts';
import '../../logo.ts';
import '../../menu.ts';
import '../../signet.ts';

const LoremIpsumTemplate = (): TemplateResult => html`
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada augue. Morbi
    eget tristique nisl, sit amet dapibus erat. Donec tempor, metus et aliquam ultrices, nulla mi
    mollis urna, a lacinia mauris risus mattis massa. Quisque cursus sollicitudin enim in malesuada.
    Maecenas nec hendrerit augue. Duis porttitor mattis molestie. Sed imperdiet velit at dui
    ultrices, viverra scelerisque nisi dapibus. Nulla urna lectus, gravida eu dapibus vel, mattis
    non turpis. Nunc interdum et justo sed faucibus. Vestibulum interdum commodo mi, sed eleifend
    odio posuere in. Nunc non dui venenatis, eleifend est ut, varius odio. Quisque augue ante,
    mollis eu lorem id, commodo cursus risus.
  </div>
  <br />
`;

const appName = (): TemplateResult => html`
  <span class="sbb-header-info">
    <strong>Name</strong>
    <span>V. 1.1</span>
  </span>
`;

const HeaderBasicTemplate = (
  { attributes, ...args }: Args,
  template: TemplateResult,
): TemplateResult => html`
  <sbb-header ${sbbSpread(args)}>
    <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
      Menu
    </sbb-header-button>
    ${args.size === 's' ? appName() : nothing}
    <div class="sbb-header-spacer"></div>
    <sbb-header-link
      href="https://www.sbb.ch"
      target="_blank"
      icon-name="magnifying-glass-small"
      class="sbb-active"
      accessibility-current="page"
    >
      Search
    </sbb-header-link>
    ${template}
    <sbb-header-button
      icon-name="globe-small"
      id="language-menu-trigger"
      class="last-element"
      expand-from="small"
    >
      English
    </sbb-header-button>
    <sbb-menu trigger="language-menu-trigger">
      <sbb-menu-button>Deutsch</sbb-menu-button>
      <sbb-menu-button>Français</sbb-menu-button>
      <sbb-menu-button>Italiano</sbb-menu-button>
      <sbb-menu-button icon-name="tick-small">English</sbb-menu-button>
    </sbb-menu>
    <div class="sbb-header-spacer sbb-header-spacer-logo"></div>
    ${args.size === 's'
      ? html`
          <a aria-label="Homepage" href="/" class="sbb-header-logo">
            <sbb-signet protective-room="panel"></sbb-signet>
          </a>
        `
      : html`
          <a aria-label="Homepage" href="/" class="sbb-header-logo">
            <sbb-logo protective-room="none"></sbb-logo>
          </a>
        `}
  </sbb-header>
  <div
    class=${args.expanded ? `sbb-page-spacing-expanded` : `sbb-page-spacing`}
    ${sbbSpread(attributes)}
  >
    ${new Array(12).fill(null).map(LoremIpsumTemplate)}
  </div>
`;

const Template = (args: Args): TemplateResult => html`
  ${HeaderBasicTemplate(
    args,
    html`
      <sbb-header-button icon-name="user-small" class="sbb-header-shrinkable">
        Sign in
      </sbb-header-button>
    `,
  )}
`;

const TemplateWithUserMenu = (args: Args): TemplateResult => html`
  ${HeaderBasicTemplate(
    args,
    html`
      <sbb-header-button
        icon-name="user-small"
        id="user-menu-trigger"
        class="sbb-header-shrinkable"
      >
        Christina Müller
      </sbb-header-button>
      <sbb-menu trigger="user-menu-trigger">
        <sbb-menu-link icon-name="user-small" href="/"> Account </sbb-menu-link>
        <sbb-menu-button icon-name="tickets-class-small">Tickets</sbb-menu-button>
        <sbb-menu-button icon-name="shopping-cart-small" sbb-badge="1">
          Shopping cart
        </sbb-menu-button>
        <sbb-divider></sbb-divider>
        <sbb-menu-button icon-name="exit-small">Sign out</sbb-menu-button>
      </sbb-menu>
    `,
  )}
`;

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const hideOnScroll: InputType = {
  control: {
    type: 'boolean',
  },
};

const scrollOrigin: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const argTypes: ArgTypes = {
  expanded,
  'hide-on-scroll': hideOnScroll,
  'scroll-origin': scrollOrigin,
  size,
};

const basicArgs: Args = {
  expanded: false,
  'hide-on-scroll': false,
  'scroll-origin': undefined,
  size: size.options![0],
};

export const Basic: StoryObj = {
  render: Template,
  argTypes,
  args: basicArgs,
};

export const Expanded: StoryObj = {
  render: Template,
  argTypes,
  args: {
    ...basicArgs,
    expanded: true,
  },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes,
  args: { ...basicArgs, size: size.options![1] },
};

export const WithUserMenu: StoryObj = {
  render: TemplateWithUserMenu,
  argTypes,
  args: basicArgs,
};

export const BasicScrollHide: StoryObj = {
  render: Template,
  argTypes,
  args: { ...basicArgs, 'hide-on-scroll': true },
};

export const ExpandedScrollHide: StoryObj = {
  render: Template,
  argTypes,
  args: {
    ...basicArgs,
    expanded: true,
    'hide-on-scroll': true,
  },
};

export const ContainerScrollOriginScrollHide: StoryObj = {
  render: Template,
  argTypes,
  args: {
    ...basicArgs,
    'hide-on-scroll': true,
    'scroll-origin': 'container',
    attributes: {
      id: 'container',
      style: 'height: 200px; overflow: auto;',
    },
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      story: {
        inline: false,
        // Setting the iFrame height ensures that the story has enough space when used in the docs section.
        iframeHeight: '250px',
      },
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'elements/sbb-header/sbb-header',
};

export default meta;
