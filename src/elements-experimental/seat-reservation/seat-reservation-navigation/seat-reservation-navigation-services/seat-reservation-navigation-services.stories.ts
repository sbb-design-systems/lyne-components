import type { Args, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './seat-reservation-navigation-services.component.js';

const propertyIdsType: InputType = {
  control: 'object',
  description: 'array of service icon names',
};

const defaultArgsTypes: Args = {
  'property-ids': propertyIdsType,
};

const defaultArgs: Args = {
  'property-ids': JSON.stringify(['BISTRO']),
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-navigation-services ${sbbSpread(args)}>
  </sbb-seat-reservation-navigation-services>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgsTypes,
  args: { ...defaultArgs },
};

export const MultipleServiceIcons: StoryObj = {
  render: Template,
  args: { ...defaultArgs, 'property-ids': JSON.stringify(['BISTRO', 'SILENCE', 'WHEELCHAIR']) },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title:
    'experimental/sbb-seat-reservation/seat-reservation-navigation/seat-reservation-navigation-services',
};

export default meta;
