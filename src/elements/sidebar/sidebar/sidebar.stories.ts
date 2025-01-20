import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import type { SbbDialogElement } from '../../dialog.js';

import readme from './readme.md?raw';

import '../../header.js';
import '../../sidebar.js';
import '../../logo.js';
import '../../title.js';
import '../../dialog.js';
import '../../menu.js';

const mode: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['side', 'over'],
};

const opened: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  opened: opened,
  mode: mode,
};

const defaultArgs: Args = {
  opened: true,
  mode: 'side',
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-header expanded>
      <sbb-header-link icon-name="hamburger-menu-small" href="https://sbb.ch/somewhere">
        Menu
      </sbb-header-link>
      <div class="sbb-header-spacer"></div>
      <sbb-header-button icon-name="magnifying-glass-small">Search</sbb-header-button>
      <div class="sbb-header-spacer sbb-header-spacer-logo"></div>
      <a aria-label="Homepage" href="/" class="sbb-header-logo">
        <sbb-logo protective-room="none"></sbb-logo>
      </a>
    </sbb-header>
    <sbb-sidebar-container id="c1">
      <sbb-sidebar opened id="s1">
        <sbb-title slot="title">Sidebar Title</sbb-title> Sidebar content
      </sbb-sidebar>
      <sbb-sidebar-content>
        <sbb-sidebar-container id="c2">
          <sbb-sidebar opened color="milk" id="s2">
            <sbb-title slot="title">Sidebar Title</sbb-title> Sidebar content

            <button
              @click=${(event: PointerEvent) =>
                (
                  (event.currentTarget as HTMLButtonElement).nextElementSibling as SbbDialogElement
                ).open()}
            >
              Toggle Dialog
            </button>
            <sbb-dialog>
              <sbb-dialog-title>Title</sbb-dialog-title>
              <sbb-dialog-content>Dialog content</sbb-dialog-content>
              <sbb-dialog-actions>Action group</sbb-dialog-actions>
            </sbb-dialog>
            <button id="menu-trigger2">Menu trigger</button>
            <sbb-menu id="menu" trigger="menu-trigger2">
              <sbb-menu-button id="menu-action-1" icon-name="tick-small">View</sbb-menu-button>
              <sbb-menu-button id="menu-action-2" icon-name="pen-small" amount="1" disabled
                >Edit</sbb-menu-button
              >
              <sbb-menu-button id="menu-action-3" icon-name="swisspass-small" amount="2"
                >Details</sbb-menu-button
              >
              <sbb-menu-button id="menu-action-4" icon-name="cross-small">Cancel</sbb-menu-button>
            </sbb-menu>
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content
          </sbb-sidebar>
          <sbb-sidebar-content>
            <button @click=${() => document.getElementById('testee')!.toggleAttribute('opened')}>
              Toggle opened
            </button>
            <p>Content</p>
            <p>Content</p>
            <button
              @click=${(event: PointerEvent) =>
                (
                  (event.currentTarget as HTMLButtonElement).nextElementSibling as SbbDialogElement
                ).open()}
            >
              Toggle Dialog
            </button>
            <sbb-dialog>
              <sbb-dialog-title>Title</sbb-dialog-title>
              <sbb-dialog-content>Dialog content</sbb-dialog-content>
              <sbb-dialog-actions>Action group</sbb-dialog-actions>
            </sbb-dialog>

            <button id="menu-trigger">Menu trigger</button>
            <sbb-menu id="menu" trigger="menu-trigger">
              <sbb-menu-button id="menu-action-1" icon-name="tick-small">View</sbb-menu-button>
              <sbb-menu-button id="menu-action-2" icon-name="pen-small" amount="1" disabled
                >Edit</sbb-menu-button
              >
              <sbb-menu-button id="menu-action-3" icon-name="swisspass-small" amount="2"
                >Details</sbb-menu-button
              >
              <sbb-menu-button id="menu-action-4" icon-name="cross-small">Cancel</sbb-menu-button>
            </sbb-menu>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
          </sbb-sidebar-content>
          <sbb-sidebar ${sbbSpread(args)} id="testee" position="end">
            <sbb-title slot="title">Sidebar Title</sbb-title> Sidebar content Sidebar content
          </sbb-sidebar>
        </sbb-sidebar-container>
      </sbb-sidebar-content>
      <sbb-sidebar opened position="end" color="milk" hide-close-button id="s4">
        <sbb-title slot="title">Sidebar Title</sbb-title> Sidebar content Sidebar content
      </sbb-sidebar>
    </sbb-sidebar-container>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Over: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, mode: 'over' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-sidebar/sbb-sidebar',
};

export default meta;
