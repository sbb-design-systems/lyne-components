import type { Args, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../../storybook/helpers/spread.js';
import { mapRawDataToSeatReservation } from '../../common/mapper/mapper.js';
import extraStylesFromParent from '../../seat-reservation/seat-reservation.scss?lit&inline';

import readme from './readme.md?raw';
import { SbbSeatReservationNavigationCoachElement } from './seat-reservation-navigation-coach.component.js';

const mappedSeatReservation = mapRawDataToSeatReservation('TRAIN');

const Template = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-navigation-coach
    ${sbbSpread(args)}
  ></sbb-seat-reservation-navigation-coach>`;

const indexType: InputType = {
  control: 'number',
  description: 'index number for coach',
};

const selectedType: InputType = {
  control: 'boolean',
  description: 'is coach selected',
};

const coachIdType: InputType = {
  control: 'text',
  description: 'coach item id',
};

const propertyIdsType: InputType = {
  control: 'object',
  description: 'property ids from coach',
};

const travelClassType: InputType = {
  control: 'object',
  description: 'travelClass',
  options: ['FIRST', 'SECOND', 'ANY_CLASS'],
};

const driverAreaType: InputType = {
  control: 'boolean',
  description: 'is coach a Driver Area',
};

const firstAreaType: InputType = {
  control: 'boolean',
  description: 'is coach the first one',
};

const lastAreaType: InputType = {
  control: 'boolean',
  description: 'is coach the last one',
};

const disabledAreaType: InputType = {
  control: 'boolean',
  description: 'is coach disabled',
};

const defaultArgsTypes: Args = {
  index: indexType,
  selected: selectedType,
  coachId: coachIdType,
  'travel-class': travelClassType,
  'property-ids': propertyIdsType,
  'driver-area': driverAreaType,
  first: firstAreaType,
  last: lastAreaType,
  disable: disabledAreaType,
};

const defaultArgs: Args = {
  'coach-id': mappedSeatReservation.coachItems[0].id,
  'property-ids': JSON.stringify(mappedSeatReservation.coachItems[0].propertyIds),
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgsTypes,
  args: { ...defaultArgs, 'travel-class': JSON.stringify(['SECOND']) },
};

export const NavigationCoachFirstClassSelected: StoryObj = {
  render: Template,
  args: { ...defaultArgs, index: 0, selected: true, 'travel-class': JSON.stringify(['FIRST']) },
};

export const NavigationCoachSecondClassNotSelected: StoryObj = {
  render: Template,
  args: { ...defaultArgs, index: 0, selected: false, 'travel-class': JSON.stringify(['SECOND']) },
};

export const DriverArea: StoryObj = {
  render: Template,
  args: { ...defaultArgs, 'driver-area': true, 'coach-id': mappedSeatReservation.coachItems[3].id },
};

export const FirstCoachInTrainFirstClass: StoryObj = {
  render: Template,
  args: {
    ...defaultArgs,
    first: true,
    'travel-class': JSON.stringify(['FIRST']),
  },
};

export const LastCoachInTrain: StoryObj = {
  render: Template,
  args: { ...defaultArgs, last: true },
};

export const DisabledFirstClassCoach: StoryObj = {
  render: Template,
  args: { ...defaultArgs, 'travel-class': JSON.stringify(['FIRST']), disable: true },
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
        SbbSeatReservationNavigationCoachElement.events.selectCoach,
        SbbSeatReservationNavigationCoachElement.events.focusCoach,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title:
    'experimental/sbb-seat-reservation/seat-reservation-navigation/seat-reservation-navigation-coach',
};

export default meta;
