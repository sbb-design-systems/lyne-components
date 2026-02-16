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
