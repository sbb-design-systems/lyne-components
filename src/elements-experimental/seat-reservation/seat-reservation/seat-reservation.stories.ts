import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { MOCK_GIRUNO_TRAIN } from '../common/mapper/seat-reservation-sample-data.js';
import { mapRawDataToSeatReservation, type CoachItem, type SeatReservation } from '../common.js';

import readme from './readme.md?raw';
import { SbbSeatReservationElement } from './seat-reservation.component.js';

const seatReservationType: InputType = {
  control: { type: 'object' },
  table: {
    disable: false,
  },
  description:
    'Seat Reservations Array<SeatReservation>. It is possible to display several decks from the vehicle scheme. Each SeatReservation object within the array represents one deck.',
};

const maxSeatReservationsType: InputType = {
  control: { type: 'number' },
  description: 'Maximal number of possible clickable seats',
};

const maxBicycleReservationsType: InputType = {
  control: { type: 'number' },
  description: 'Maximal number of possible clickable bicycle places',
};

const navigationType: InputType = {
  control: { type: 'boolean' },
  description: 'Controls the seat reservation navigation to show or hide',
};

const alignVerticalType: InputType = {
  control: { type: 'boolean' },
  description:
    'Controls the visual represention of seat reservation in a horizonal or vertical alignment',
};

const preventPlaceClickType: InputType = {
  control: { type: 'boolean' },
  description: 'Any place click functionality is prevented',
};

const heightType: InputType = {
  control: { type: 'number' },
  description: 'Can be used to display the seat reservation schema in a defined size.',
};

const baseGridSizeType: InputType = {
  control: { type: 'number' },
  description:
    'Specifies the size of a single cell to be used when calculating positions and dimensions of all elements.',
};

const defaultArgTypes: ArgTypes = {
  seatReservations: seatReservationType,
  'max-seat-reservations': maxSeatReservationsType,
  'max-bicycle-reservations': maxBicycleReservationsType,
  'has-navigation': navigationType,
  'align-vertical': alignVerticalType,
  'base-grid-size': baseGridSizeType,
  height: heightType,
  'prevent-place-click': preventPlaceClickType,
};

const mappedSeatReservationTrain = mapRawDataToSeatReservation('TRAIN');
const defaultArgs: Args = {
  seatReservations: [mappedSeatReservationTrain],
  'max-seat-reservations': 4,
  'has-navigation': true,
  'align-vertical': false,
  'base-grid-size': 16,
  height: null,
  'prevent-place-click': false,
};

const Template = ({ seatReservations, ...args }: Args): TemplateResult =>
  html`<sbb-seat-reservation
    .seatReservations=${seatReservations}
    ${sbbSpread(args)}
  ></sbb-seat-reservation>`;

export const Train: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

const trainDeckBottom = mappedSeatReservationTrain;
const deckTwoCoaches: CoachItem[] = [];

trainDeckBottom.deckCoachLevel = 'LOWER_DECK';

//Prepair upper deck by copy from the trainDeckBottom
const trainDeckUpper = JSON.parse(JSON.stringify(trainDeckBottom)) as SeatReservation;
trainDeckUpper.deckCoachIndex = 1;
trainDeckUpper.deckCoachLevel = 'UPPER_DECK';

//For showcase we adjust the places from the upper deck to get a little variation
mappedSeatReservationTrain.coachItems.forEach((coachItem) => {
  const filteredPlaesInCoach =
    coachItem.places?.filter((place) => Number(place.number) % 2 === 0) || [];
  deckTwoCoaches.push({ ...coachItem });
  deckTwoCoaches[deckTwoCoaches.length - 1].places = filteredPlaesInCoach;
});
trainDeckUpper.coachItems = deckTwoCoaches;

const trainLayersArgs: Args = {
  seatReservations: [trainDeckUpper, trainDeckBottom],
  'has-navigation': true,
  'max-reservations': 4,
  'align-vertical': false,
  'base-grid-size': 16,
  height: null,
  'prevent-place-click': false,
};

export const TrainDecks: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: trainLayersArgs,
};

const trainGirunoArgs: Args = {
  seatReservations: [MOCK_GIRUNO_TRAIN],
  'has-navigation': true,
  'max-reservations': 4,
  'align-vertical': false,
  'base-grid-size': 16,
  height: null,
  'prevent-place-click': false,
};

export const TrainGiruno: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: trainGirunoArgs,
};

const mappedSeatReservationBus = mapRawDataToSeatReservation('BUS');
const busArgs: Args = {
  seatReservations: [mappedSeatReservationBus],
  'has-navigation': true,
  'max-seat-reservations': 4,
  'align-vertical': false,
  'prevent-place-click': false,
};

export const Bus: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: busArgs,
};

export const preSelectedCoachIndexFour: StoryObj = {
  render: Template,
  args: { ...defaultArgs, 'preselect-coach-index': 4 },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbSeatReservationElement.events.selectedplaces,
        SbbSeatReservationElement.events.selectedcoach,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation',
};

export default meta;
