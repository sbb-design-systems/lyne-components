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


import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, type TemplateResult } from 'lit';
import type { InputType } from 'storybook/internal/types';

import readme from './readme.md?raw';

import './header-environment.component.ts';
import '../header.ts';
import '../header-button.ts';
import '../header-link.ts';
import '../../logo.ts';
import '../../menu.ts';

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

const Template = (args: Args): TemplateResult => html`
  <sbb-header>
    <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
      Menu
    </sbb-header-button>
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
    <a aria-label="Homepage" href="/" class="sbb-header-logo">
      <sbb-logo protective-room="none"></sbb-logo>
    </a>
    <sbb-header-environment aria-label="Environment: ${args.environment}"
      >${args.environment}</sbb-header-environment
    >
  </sbb-header>
  <div class="sbb-page-spacing">${new Array(12).fill(null).map(LoremIpsumTemplate)}</div>
`;

const environment: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['dev', 'edu', 'int', 'loc', 'test', 'any'],
};

const argTypes: ArgTypes = {
  environment: environment,
};

const basicArgs: Args = {
  environment: environment.options![0],
};

export const Basic: StoryObj = {
  render: Template,
  argTypes,
  args: basicArgs,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'elements/sbb-header/sbb-header-environment',
};

export default meta;


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
