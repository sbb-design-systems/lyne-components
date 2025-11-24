import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './seat-reservation-navigation-services.component.ts';

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
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-navigation-services',
};

export default meta;
