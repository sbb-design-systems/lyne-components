import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { ArgTypes, InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import './seat-reservation-navigation.js';

import readme from './readme.md?raw';

const alignVerticalType: InputType = {
  control: 'boolean',
  table: {
    disable: true,
  },
};

const defaultArgTypes: ArgTypes = {
  'align-vertical': alignVerticalType,
};

const defaultArgs: Args = {
  'align-vertical': false,
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-navigation ${sbbSpread(args)}></sbb-seat-reservation-navigation>`;

export const Navigation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
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
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-navigation',
};

export default meta;
