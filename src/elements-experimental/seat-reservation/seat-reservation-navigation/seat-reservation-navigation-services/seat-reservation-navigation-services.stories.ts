import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './seat-reservation-navigation-services.js';

const defaultArgs: Args = {
  propertyIds: ['BISTRO'],
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-navigation-services
    .propertyIds="${defaultArgs.propertyIds}"
    ${sbbSpread(args)}
  >
  </sbb-seat-reservation-navigation-services>`;

const propertyIdsType: InputType = {
  control: 'object',
  description: 'array of service icon names',
};

const defaultArgsTypes: Args = {
  propertyIds: propertyIdsType,
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgsTypes,
  args: { ...defaultArgs },
};

export const MultipleServiceIcons: StoryObj = {
  render: Template,
  args: { ...defaultArgs, propertyIds: ['BISTRO', 'SILENCE', 'WHEELCHAIR'] },
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
