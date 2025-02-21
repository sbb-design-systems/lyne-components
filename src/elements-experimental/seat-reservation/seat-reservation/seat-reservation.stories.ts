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
import { assetsTemplate } from './seat-reservation-assets.js';

import './seat-reservation.js';

const myProp: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'my-prop': myProp,
};

const defaultArgs: Args = {
  'my-prop': 'Seat Reservation',
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation ${sbbSpread(args)}></sbb-seat-reservation>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Assets: StoryObj = {
  render: () => assetsTemplate,
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      //handles: [SbbSeatReservationElement.events.myEventName],
      handles: [],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation',
};

export default meta;
