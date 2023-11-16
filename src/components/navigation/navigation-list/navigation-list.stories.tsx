import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { styleMap, StyleInfo } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import './navigation-list';
import '../navigation-action';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  label,
};

const defaultArgs: Args = {
  label: 'Label',
};

const navigationActions = (): TemplateResult => html`
  <sbb-navigation-action>Tickets & Offers</sbb-navigation-action>
  <sbb-navigation-action>Vacations & Recreation</sbb-navigation-action>
  <sbb-navigation-action>Travel information</sbb-navigation-action>
  <sbb-navigation-action>Help & Contact</sbb-navigation-action>
`;

const style: Readonly<StyleInfo> = {
  'background-color': 'var(--sbb-color-midnight-default)',
  width: 'max-content',
  padding: '2rem',
};

const DefaultTemplate = (args: Args): TemplateResult => html`
  <sbb-navigation-list ${sbbSpread(args)}>${navigationActions()}</sbb-navigation-list>
`;

const SlottedLabelTemplate = (args: Args): TemplateResult => html`
  <sbb-navigation-list ${sbbSpread(args)}>
    <span slot="label">Slotted label</span>
    ${navigationActions()}
  </sbb-navigation-list>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SlottedLabel: StoryObj = {
  render: SlottedLabelTemplate,
  argTypes: defaultArgTypes,
  args: {},
};

const meta: Meta = {
  decorators: [(story) => html` <div style=${styleMap(style)}>${story()}</div> `],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-navigation/sbb-navigation-list',
};

export default meta;
