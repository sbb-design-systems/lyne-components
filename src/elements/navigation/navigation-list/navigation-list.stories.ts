import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './navigation-list.component.ts';
import '../navigation-button.ts';

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
  <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
  <sbb-navigation-button>Vacations & Recreation</sbb-navigation-button>
  <sbb-navigation-button>Travel information</sbb-navigation-button>
  <sbb-navigation-button>Help & Contact</sbb-navigation-button>
`;

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
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-navigation/sbb-navigation-list',
};

export default meta;
