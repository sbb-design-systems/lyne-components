import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import './seat-reservation-place.js';

const seatNumber: InputType = {
  control: {
    type: 'text',
  },
};

const seatDirection: InputType = {
  control: {
    type: 'select',
  },
  options: ['right', 'bottom', 'left', 'top'],
};

const seatState: InputType = {
  control: {
    type: 'select',
  },
  options: ['default', 'selected', 'unavailable', 'not-bookable'],
};

const defaultArgTypes: ArgTypes = {
  'seat-number': seatNumber,
  direction: seatDirection,
  state: seatState,
};

const defaultArgs: Args = {
  'seat-number': '888',
  direction: 'right',
  state: 'free',
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-place ${sbbSpread(args)}></sbb-seat-reservation-place>`;

export const Place: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-place',
};

export default meta;
