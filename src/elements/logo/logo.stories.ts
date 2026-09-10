import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';
import { useEffect, useRef } from 'storybook/preview-api';

import { sbbSpread } from '../../docs/helpers/spread.ts';
import type { SbbLogoAnniversaryElement } from '../logo.pure.ts';

import type { SbbLogoElement } from './logo.component.ts';
import readme from './readme.md?raw';

import '../logo.ts';

const Template = (args: Args): TemplateResult => html`<sbb-logo ${sbbSpread(args)}></sbb-logo>`;

const TemplateAnniversary = ({ language, ...args }: Args): TemplateResult => {
  // Store the original document language once per mount, and restore it when the story
  // unmounts (e.g. when the user navigates to another story). The attribute itself is set
  // synchronously during render (not in an effect) so there is no visible delay/flicker
  // when Storybook re-applies the previously selected `lang` arg on remount.
  const originalLang = useRef<string | null>(null);
  if (originalLang.current === null) {
    originalLang.current = document.documentElement.getAttribute('lang');
  }
  document.documentElement.setAttribute('lang', language);

  // Reset the language when user chooses another story
  useEffect(() => {
    return () => {
      if (originalLang.current !== null) {
        document.documentElement.setAttribute('lang', originalLang.current);
      } else {
        document.documentElement.removeAttribute('lang');
      }
    };
  }, []);

  return html`<sbb-logo-anniversary ${sbbSpread(args)}></sbb-logo-anniversary>`;
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

const meta: Meta = {
  decorators: [(story) => html`<div style="max-width: 300px;">${story()}</div>`],
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
