import type { Args, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import '../../header.js';
import '../../sidebar.js';
import '../../logo.js';

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
    <sbb-icon-sidebar-container id="c1">
      <sbb-icon-sidebar id="s1">
        <sbb-icon-sidebar-link
          accessibility-label="Go to the party"
          icon-name="glass-cocktail-small"
          href="#"
        ></sbb-icon-sidebar-link>
        <sbb-icon-sidebar-link
          accessibility-label="Buy a ticket"
          icon-name="tickets-class-small"
          href="#"
          class="sbb-active"
        ></sbb-icon-sidebar-link>
        <sbb-icon-sidebar-button
          aria-label="Exchange money"
          icon-name="money-exchange-small"
        ></sbb-icon-sidebar-button>
      </sbb-icon-sidebar>
      <sbb-icon-sidebar-content>
        <sbb-sidebar-container id="c2">
          <sbb-sidebar opened color="milk" id="s2">
            <sbb-sidebar-title> Sidebar Title </sbb-sidebar-title>
            <sbb-sidebar-close-button></sbb-sidebar-close-button>

            Sidebar content
            <button>button34</button>
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
            <sbb-sidebar-close-button></sbb-sidebar-close-button>
            <button>button44</button>
            <button>button55</button>
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar
            content Sidebar content Sidebar content Sidebar content Sidebar content Sidebar content
            Sidebar content
          </sbb-sidebar>
        </sbb-sidebar-container>
      </sbb-icon-sidebar-content>
      <sbb-icon-sidebar position="end" color="milk" id="s4">
        <sbb-icon-sidebar-link
          accessibility-label="Go to the party"
          icon-name="glass-cocktail-small"
          href="#"
        ></sbb-icon-sidebar-link>
        <sbb-icon-sidebar-link
          accessibility-label="Buy a ticket"
          icon-name="tickets-class-small"
          href="#"
          class="sbb-active"
        ></sbb-icon-sidebar-link>
        <sbb-icon-sidebar-button
          aria-label="Exchange money"
          icon-name="money-exchange-small"
        ></sbb-icon-sidebar-button>
      </sbb-icon-sidebar>
    </sbb-icon-sidebar-container>`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-sidebar/sbb-icon-sidebar',
};

export default meta;
