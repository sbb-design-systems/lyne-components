import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { ArgTypes, InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { mapRawDataToSeatReservation } from '../common.js';

import readme from './readme.md?raw';
import { SbbSeatReservationNavigationElement } from './seat-reservation-navigation.js';

const seatReservationType: InputType = {
  control: 'object',
  table: {
    disable: true,
  },
};

const alignVerticalType: InputType = {
  control: 'boolean',
  table: {
    disable: true,
  },
};

const defaultArgTypes: ArgTypes = {
  seatReservation: seatReservationType,
  'align-vertical': alignVerticalType,
};

const mapedSeatReservation = mapRawDataToSeatReservation();
const defaultArgs: Args = {
  seatReservation: mapedSeatReservation,
  'align-vertical': false,
};

const Template = ({ seatReservation, ...args }: Args): TemplateResult =>
  html`<sbb-seat-reservation-navigation
    .seatReservation=${seatReservation}
    ${sbbSpread(args)}
  ></sbb-seat-reservation-navigation>`;

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
      handles: [SbbSeatReservationNavigationElement.events.selectCoach],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-navigation',
};

export default meta;
