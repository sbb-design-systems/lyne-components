import type { Args, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import { mapRawDataToSeatReservation } from '../common/mapper/mapper.ts';
import type { CoachItemDetails } from '../common/types.ts';
import extraStylesFromParent from '../seat-reservation/seat-reservation.scss?lit&inline';

import readme from './readme.md?raw';
import { SbbSeatReservationNavigationCoachElement } from './seat-reservation-navigation-coach.component.ts';

const mappedSeatReservation = mapRawDataToSeatReservation('TRAIN');

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-navigation-coach
    ${sbbSpread(args)}
  ></sbb-seat-reservation-navigation-coach>`;

const disabledAreaType: InputType = {
  control: 'boolean',
  description: 'is coach disabled',
};

const selectedType: InputType = {
  control: 'boolean',
  description: 'is coach selected',
};

const hoveredType: InputType = {
  control: 'boolean',
  description: 'coach hovered',
};

const focusedType: InputType = {
  control: 'boolean',
  description: 'coach focused',
};

const coachItemDetailsType: InputType = {
  control: 'object',
  description: 'coach item details',
};

const defaultArgsTypes: Args = {
  selected: selectedType,
  hovered: hoveredType,
  focused: focusedType,
  disable: disabledAreaType,
  'coach-item-details': coachItemDetailsType,
};

const defaultCoachItemDetails: CoachItemDetails = {
  id: mappedSeatReservation.coachItems[0].id,
  travelClass: 'FIRST',
  propertyIds: mappedSeatReservation.coachItems[0].propertyIds || [],
  freePlaces: { seats: 0, bicycles: 0 },
  isDriverArea: false,
  driverAreaElements: { driverArea: undefined, driverAreaNoVerticalWall: undefined },
};

const defaultArgs: Args = {
  index: 0,
  selected: false,
  hovered: false,
  focused: false,
  disable: false,
  vertical: false,
};

function addOrUpdateDetailArgs(options = {}): string {
  return JSON.stringify({ ...defaultCoachItemDetails, ...options });
}

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgsTypes,
  args: { ...defaultArgs, 'coach-item-details': JSON.stringify(defaultCoachItemDetails) },
};

export const NavigationCoachFirstClassSelected: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    'coach-item-details': addOrUpdateDetailArgs({ travelClass: 'FIRST' }),
    selected: true,
  },
};

export const NavigationCoachSecondClassNotSelected: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    'coach-item-details': addOrUpdateDetailArgs({ travelClass: 'SECOND' }),
    selected: false,
  },
};

export const DriverArea: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    'coach-item-details': addOrUpdateDetailArgs({ isDriverArea: true }),
  },
};

export const DriverAreaSelected: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    'coach-item-details': addOrUpdateDetailArgs({ isDriverArea: true }),
    selected: true,
  },
};

export const DriverAreaFocused: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    'coach-item-details': addOrUpdateDetailArgs({ isDriverArea: true }),
    focused: true,
  },
};

export const FirstCoachInTrainFirstClass: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    'coach-item-details': addOrUpdateDetailArgs({
      driverAreaSide: { left: true },
      travelClass: 'FIRST',
    }),
  },
};

export const LastCoachInTrain: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    'coach-item-details': addOrUpdateDetailArgs({
      driverAreaSide: { right: true },
    }),
  },
};

export const DisabledFirstClassCoach: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    'coach-item-details': addOrUpdateDetailArgs({ travelClass: 'FIRST' }),
    disable: true,
  },
};

export const VerticalFirstClass: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    'coach-item-details': JSON.stringify(defaultCoachItemDetails),
    vertical: true,
  },
};

const meta: Meta = {
  decorators: [
    withActions as Decorator,
    (story) =>
      html`<style>
          ${extraStylesFromParent}
        </style>
        <ul class="sbb-sr-navigation__list-coaches">
          <li>${story()}</li>
        </ul>`,
  ],
  parameters: {
    actions: {
      handles: [
        SbbSeatReservationNavigationCoachElement.events.selectcoach,
        SbbSeatReservationNavigationCoachElement.events.focuscoach,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-navigation-coach',
};

export default meta;
