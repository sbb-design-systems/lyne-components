import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './map-container.component.ts';
import '../card.ts';
import '../form-field.ts';
import '../header.ts';
import '../icon.ts';
import '../logo.ts';
import '../title.ts';

const hideScrollUpButton: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'hide-scroll-up-button': hideScrollUpButton,
};

const defaultArgs: Args = {
  'hide-scroll-up-button': false,
};

const Template = (args: Args): TemplateResult => html`
  <sbb-map-container ${sbbSpread(args)}>
    <div style="padding: var(--sbb-spacing-fixed-4x);">
      <sbb-form-field style="width: 100%;">
        <sbb-icon slot="prefix" name="magnifying-glass-small"></sbb-icon>
        <input minlength=${2} name="keyword" autocomplete="off" placeholder="Search" />
        <sbb-form-field-clear></sbb-form-field-clear>
      </sbb-form-field>
      <sbb-title level="4">Operations & Disruptions</sbb-title>
      ${[...Array(10).keys()].map(
        (value) => html`
          <sbb-card color="milk" style="margin-block-end: var(--sbb-spacing-fixed-4x);">
            <p>Situation ${value}</p>
          </sbb-card>
        `,
      )}
    </div>

    <div slot="map" style="height: 100%;">
      <div
        style="background-color: var(--sbb-background-color-4); height: 100%; display: flex; align-items: center; justify-content: center;"
      >
        map
      </div>
    </div>
  </sbb-map-container>
`;

export const MapContainer: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

const meta: Meta = {
  decorators: [
    (story) => html`
      <sbb-header expanded>
        <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
          Menu
        </sbb-header-button>
        <div class="sbb-header-spacer"></div>
        <sbb-logo protective-room="none" class="sbb-header-logo"></sbb-logo>
      </sbb-header>
      ${story()}
    `,
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'elements/sbb-map-container',
};

export default meta;
