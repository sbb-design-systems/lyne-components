import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';
import { useEffect, useRef } from 'storybook/preview-api';

import { sbbSpread } from '../../docs/helpers/spread.ts';
import type { SbbLogoAnniversaryElement } from '../logo.pure.ts';

import type { SbbLogoElement } from './logo.component.ts';
import readme from './readme.md?raw';

import '../container.ts';
import '../header.ts';
import '../logo.ts';
import '../menu.ts';

const Template = (args: Args): TemplateResult => html`<sbb-logo ${sbbSpread(args)}></sbb-logo>`;

// Sets `lang` on the document element synchronously during render (avoiding flicker on
// remount), and restores the original value once the story unmounts (e.g. when the user
// navigates to another story).
const useDocumentLanguage = (language: string): void => {
  const originalLang = useRef<string | null>(null);
  if (originalLang.current === null) {
    originalLang.current = document.documentElement.getAttribute('lang');
  }
  document.documentElement.setAttribute('lang', language);

  // Reset the language when user chooses another story
  useEffect(
    () => () => {
      if (originalLang.current !== null) {
        document.documentElement.setAttribute('lang', originalLang.current);
      } else {
        document.documentElement.removeAttribute('lang');
      }
    },
    [],
  );
};

const TemplateAnniversary = ({ language, ...args }: Args): TemplateResult => {
  useDocumentLanguage(language);

  return html`<sbb-logo-anniversary ${sbbSpread(args)}></sbb-logo-anniversary>`;
};

const LoremIpsumTemplate = (): TemplateResult => html`
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada augue. Morbi
    eget tristique nisl, sit amet dapibus erat. Donec tempor, metus et aliquam ultrices, nulla mi
    mollis urna, a lacinia mauris risus mattis massa.
  </p>
  <br />
`;

const TemplateAnniversaryInHeader = ({ language, ...args }: Args): TemplateResult => {
  useDocumentLanguage(language);

  return html`
    <sbb-header hide-on-scroll>
      <sbb-header-button icon-name="hamburger-menu-small" hide-label-below="small">
        Menu
      </sbb-header-button>
      <div class="sbb-header-spacer"></div>
      <sbb-header-link icon-name="magnifying-glass-small" href="/" hide-label-below="large">
        Search
      </sbb-header-link>
      <sbb-header-button
        icon-name="user-small"
        class="sbb-header-shrinkable"
        hide-label-below="large"
      >
        Sign in
      </sbb-header-button>
      <sbb-header-button
        icon-name="globe-small"
        id="logo-anniversary-language-menu-trigger"
        class="last-element"
        hide-label-below="small"
      >
        English
      </sbb-header-button>
      <sbb-menu trigger="logo-anniversary-language-menu-trigger">
        <sbb-menu-button>Deutsch</sbb-menu-button>
        <sbb-menu-button>Français</sbb-menu-button>
        <sbb-menu-button>Italiano</sbb-menu-button>
        <sbb-menu-button icon-name="tick-small">English</sbb-menu-button>
      </sbb-menu>
      <div class="sbb-header-spacer sbb-header-spacer-logo"></div>
      <a aria-label="Homepage" href="/" class="sbb-header-logo">
        <sbb-logo-anniversary ${sbbSpread(args)}></sbb-logo-anniversary>
      </a>
    </sbb-header>
    <sbb-container color="milk">${new Array(4).fill(null).map(LoremIpsumTemplate)}</sbb-container>
  `;
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const protectiveRoom: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'minimal', 'ideal'] satisfies SbbLogoElement['protectiveRoom'][],
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const animation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['all', 'none'] satisfies SbbLogoAnniversaryElement['animation'][],
};

const language: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['en', 'de', 'fr', 'it'],
};

const commonArgTypes = {
  negative,
  'accessibility-label': accessibilityLabel,
};

const logoArgTypes: ArgTypes = {
  ...commonArgTypes,
  'protective-room': protectiveRoom,
};

const anniversaryArgTypes = {
  language,
  ...commonArgTypes,
  animation,
};

const commonArgs: Args = {
  negative: false,
  'accessibility-label': undefined,
};

const logoArgs: Args = {
  ...commonArgs,
  'protective-room': protectiveRoom.options![0],
};

const anniversaryArgs: Args = {
  language: 'en',
  ...commonArgs,
  animation: 'all',
};

export const NoProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: logoArgTypes,
  args: { ...logoArgs },
};

export const MinimalProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: logoArgTypes,
  args: { ...logoArgs, 'protective-room': protectiveRoom.options![1] },
};

export const IdealProtectiveRoom: StoryObj = {
  render: Template,
  argTypes: logoArgTypes,
  args: { ...logoArgs, 'protective-room': protectiveRoom.options![2] },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: logoArgTypes,
  args: {
    ...logoArgs,
    negative: true,
    'protective-room': protectiveRoom.options![2],
  },
};

export const Anniversary: StoryObj = {
  render: TemplateAnniversary,
  argTypes: anniversaryArgTypes,
  args: { ...anniversaryArgs },
};

export const AnniversaryNegative: StoryObj = {
  render: TemplateAnniversary,
  argTypes: anniversaryArgTypes,
  args: { ...anniversaryArgs, negative: true },
};

export const AnniversaryInHeader: StoryObj = {
  render: TemplateAnniversaryInHeader,
  argTypes: anniversaryArgTypes,
  args: { ...anniversaryArgs },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        // Setting the iFrame height ensures that the story has enough space when used in the docs section.
        iframeHeight: '250px',
      },
    },
  },
};

const meta: Meta = {
  decorators: [
    (story, context) =>
      context.name === 'Anniversary In Header'
        ? story()
        : html`<div style="max-width: 300px;">${story()}</div>`,
  ],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Logo',
};

export default meta;
