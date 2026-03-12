import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';

import { MOCK_GIRUNO_TRAIN } from './common/mapper/sample-data/seat-reservation-sample-data-giruno.ts';
import { MOCK_TRAIN_LOCOMOTIVE_LAYOUT } from './common/mapper/sample-data/seat-reservation-sample-data-others.ts';
import { mapIconToSvg, mapRawDataToSeatReservation } from './common/mapper.ts';
import type { CoachItem, CoachItemDetails, SeatReservation } from './common/types.ts';
import readme from './readme.md?raw';
import { SbbSeatReservationElement } from './seat-reservation/seat-reservation.component.ts';
import '../seat-reservation.ts';
import { assetsTemplate } from './seat-reservation-graphic/seat-reservation-assets.ts';

const seatReservationType: InputType = {
  control: { type: 'object' },
  table: {
    disable: false,
  },
  description:
    'Seat Reservations Array<SeatReservation>. It is possible to display several decks from the vehicle scheme. Each SeatReservation object within the array represents one deck.',
};

const travelDirectionType: InputType = {
  control: {
    type: 'select',
  },
  options: ['LEFT', 'RIGHT', 'NONE'],
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
    'Controls the visual representation of seat reservation in a horizonal or vertical alignment',
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

const preselectCoachIndexType: InputType = {
  control: { type: 'number' },
  description: 'Preselect a coach by using index.',
};

const defaultArgTypes: ArgTypes = {
  seatReservations: seatReservationType,
  'travel-direction': travelDirectionType,
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
  'show-title-info': false,
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

// Prepare upper deck by copy from the trainDeckBottom
const trainDeckUpper = JSON.parse(JSON.stringify(trainDeckBottom)) as SeatReservation;
trainDeckUpper.deckCoachIndex = 1;
trainDeckUpper.deckCoachLevel = 'UPPER_DECK';

// For docs, we adjust the places from the upper deck to get a little variation
mappedSeatReservationTrain.coachItems.forEach((coachItem) => {
  const filteredPlacesInCoach =
    coachItem.places?.filter((place) => Number(place.number) % 2 === 0) || [];
  deckTwoCoaches.push({ ...coachItem });
  deckTwoCoaches[deckTwoCoaches.length - 1].places = filteredPlacesInCoach;
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
  'show-title-info': false,
};

export const TrainDecks: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: trainLayersArgs,
};

//Reduce coaches from  upper deck to get diff
const trainDeckUpperDiff = JSON.parse(JSON.stringify(trainDeckBottom)) as SeatReservation;
trainDeckUpperDiff.coachItems = trainDeckUpperDiff.coachItems.slice(2, 3);
trainDeckUpperDiff.deckCoachLevel = 'UPPER_DECK';
trainDeckUpperDiff.deckCoachIndex = 2;

//Reduce coaches from middle deck to get diff
const trainDeckMiddleDiff = JSON.parse(JSON.stringify(trainDeckBottom)) as SeatReservation;
trainDeckMiddleDiff.coachItems = trainDeckMiddleDiff.coachItems.slice(1, 5);
trainDeckMiddleDiff.deckCoachLevel = 'MIDDLE_DECK';
trainDeckMiddleDiff.deckCoachIndex = 1;

const trainDecksDiff: Args = {
  seatReservations: [trainDeckUpperDiff, trainDeckMiddleDiff, trainDeckBottom],
  'has-navigation': true,
  'max-reservations': 4,
  'align-vertical': false,
  'base-grid-size': 16,
  height: null,
  'prevent-place-click': false,
  'show-title-info': false,
};
export const TrainDifferentDecks: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: trainDecksDiff,
};

const trainGirunoArgs: Args = {
  seatReservations: [MOCK_GIRUNO_TRAIN],
  'has-navigation': true,
  'max-reservations': 4,
  'align-vertical': false,
  'base-grid-size': 16,
  height: null,
  'prevent-place-click': false,
  'show-title-info': false,
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
  'show-title-info': false,
};

export const Bus: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: busArgs,
};

export const preSelectedCoachIndexFour: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes, 'preselect-coach-index': preselectCoachIndexType },
  args: { ...defaultArgs, 'preselect-coach-index': 4 },
};

const mappedSeatReservationLowerDeck = JSON.parse(
  JSON.stringify(mapRawDataToSeatReservation(null, 'LOWER_DECK')),
);
const mappedSeatReservationUpperDeck = JSON.parse(
  JSON.stringify(mapRawDataToSeatReservation(null, 'UPPER_DECK')),
);
const seatReservationToggleSelectType: InputType = {
  control: {
    type: 'select',
  },
  name: 'Toggle Seat Reservation decks',
  mapping: {
    LOWER_DECK: [mappedSeatReservationLowerDeck],
    UPPER_DECK: [mappedSeatReservationUpperDeck],
  },
  description: 'Toggle Seat Reservation decks',
  options: ['UPPER_DECK', 'LOWER_DECK'],
};

const toggleArgs: Args = {
  seatReservations: seatReservationToggleSelectType,
};

export const trainToggleDecks: StoryObj = {
  render: Template,
  argTypes: toggleArgs,
  args: { seatReservations: 'LOWER_DECK' },
};

const trainWithNewLocomotives: Args = {
  seatReservations: [MOCK_TRAIN_LOCOMOTIVE_LAYOUT],
  'has-navigation': true,
  'max-reservations': 4,
  'align-vertical': false,
  'base-grid-size': 16,
  height: null,
  'prevent-place-click': false,
  'show-title-info': false,
};

export const TrainWithNewLocomotives: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: trainWithNewLocomotives,
};

/****************************************************************************
 *                                                                          *
 *              BEGIN seat-reservation-area Component                       *
 *                                                                          *
 * *************************************************************************/
const mounting: InputType = {
  control: {
    type: 'select',
  },
  options: ['free', 'upper-border', 'lower-border', 'upper-to-lower-border'],
};

const background: InputType = {
  control: {
    type: 'select',
  },
  options: ['light', 'dark'],
};

const defaultArgTypesAreaComponent: ArgTypes = {
  mounting,
  background,
};

const defaultArgsAreaComponent: Args = {
  style: '--sbb-seat-reservation-area-width: 100;--sbb-seat-reservation-area-height: 50;',
  background: 'dark',
  mounting: 'free',
};

const TemplateAreaComponent = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-area ${sbbSpread(args)}></sbb-seat-reservation-area>`;

export const AreaDefault: StoryObj = {
  render: TemplateAreaComponent,
  argTypes: defaultArgTypesAreaComponent,
  args: {
    ...defaultArgsAreaComponent,
  },
};

export const AreaWidth32Height32: StoryObj = {
  render: TemplateAreaComponent,
  argTypes: defaultArgTypesAreaComponent,
  args: {
    ...defaultArgsAreaComponent,
    style: '--sbb-seat-reservation-area-width: 32;--sbb-seat-reservation-area-height: 32;',
  },
};

export const AreaWidth160Height64: StoryObj = {
  render: TemplateAreaComponent,
  argTypes: defaultArgTypesAreaComponent,
  args: {
    ...defaultArgsAreaComponent,
    style: '--sbb-seat-reservation-area-width: 160;--sbb-seat-reservation-area-height: 64;',
  },
};

export const AreaWidth64Height64Rotation45Deg: StoryObj = {
  render: TemplateAreaComponent,
  argTypes: defaultArgTypesAreaComponent,
  args: {
    ...defaultArgsAreaComponent,
    style:
      '--sbb-seat-reservation-area-width: 64;--sbb-seat-reservation-area-height: 64;--sbb-seat-reservation-area-rotation: 45',
  },
};

export const AreaBackgroundLight: StoryObj = {
  render: TemplateAreaComponent,
  argTypes: defaultArgTypesAreaComponent,
  args: { ...defaultArgsAreaComponent, background: 'light' },
};

export const AreaMountingUpperBorder: StoryObj = {
  render: TemplateAreaComponent,
  argTypes: defaultArgTypesAreaComponent,
  args: { ...defaultArgsAreaComponent, mounting: 'upper-border' },
};

export const AreaMountingLowerBorder: StoryObj = {
  render: TemplateAreaComponent,
  argTypes: defaultArgTypesAreaComponent,
  args: { ...defaultArgsAreaComponent, mounting: 'lower-border' },
};

export const AreaMountingUpperToLowerBorder: StoryObj = {
  render: TemplateAreaComponent,
  argTypes: defaultArgTypesAreaComponent,
  args: { ...defaultArgsAreaComponent, mounting: 'upper-to-lower-border' },
};

/****************************************************************************
 *                                                                          *
 *              BEGIN seat-reservation-graphic Component                   *
 *                                                                          *
 * *************************************************************************/
const name: InputType = {
  control: {
    type: 'select',
  },
  options: Object.keys(mapIconToSvg),
};

const stretch: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypesGraphic: ArgTypes = {
  name: name,
  stretch,
};

const defaultArgsGraphic: Args = {
  name: 'BISTRO',
  stretch: false,
  style: '--sbb-seat-reservation-graphic-width: 32;--sbb-seat-reservation-graphic-height: 32;',
};

const TemplateGraphic = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-graphic ${sbbSpread(args)}></sbb-seat-reservation-graphic>`;

export const GraphicDefault: StoryObj = {
  render: TemplateGraphic,
  argTypes: defaultArgTypesGraphic,
  args: { ...defaultArgsGraphic },
};

export const GraphicPamAreaWidth32Height32: StoryObj = {
  render: TemplateGraphic,
  args: { ...defaultArgsGraphic, name: 'PRAM_AREA' },
};

export const GraphicStairAreaWidth32Height32Rotation315: StoryObj = {
  render: TemplateGraphic,
  args: {
    ...defaultArgsGraphic,
    name: 'STAIR_AREA',
    style:
      '--sbb-seat-reservation-graphic-width: 32;--sbb-seat-reservation-graphic-height: 32;--sbb-seat-reservation-graphic-rotation: 315',
  },
};

export const GraphicCoachBorderMiddleWidth20Height128Stretch: StoryObj = {
  render: TemplateGraphic,
  args: {
    ...defaultArgsGraphic,
    name: 'COACH_BORDER_MIDDLE',
    stretch: true,
    style: '--sbb-seat-reservation-graphic-width: 20;--sbb-seat-reservation-graphic-height: 128;',
  },
};

export const GraphicAvailableAssets: StoryObj = {
  render: () => assetsTemplate,
};

/****************************************************************************
 *                                                                          *
 *              BEGIN seat-reservation-navigation-coach Component           *
 *                                                                          *
 * *************************************************************************/
const TemplateNavigationCoach = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-navigation-coach
    ${sbbSpread(args)}
  ></sbb-seat-reservation-navigation-coach>`;

const disabledAreaTypeNavigationCoach: InputType = {
  control: 'boolean',
  description: 'is coach disabled',
};

const selectedTypeNavigationCoach: InputType = {
  control: 'boolean',
  description: 'is coach selected',
};

const hoveredTypeNavigationCoach: InputType = {
  control: 'boolean',
  description: 'coach hovered',
};

const focusedTypeNavigationCoach: InputType = {
  control: 'boolean',
  description: 'coach focused',
};

const coachItemDetailsTypeNavigationCoach: InputType = {
  control: 'object',
  description: 'coach item details',
};

const defaultArgsTypesNavigationCoach: Args = {
  selected: selectedTypeNavigationCoach,
  hovered: hoveredTypeNavigationCoach,
  focused: focusedTypeNavigationCoach,
  disable: disabledAreaTypeNavigationCoach,
  'coach-item-details': coachItemDetailsTypeNavigationCoach,
};

const defaultCoachItemDetailsNavigationCoach: CoachItemDetails = {
  id: mappedSeatReservationTrain.coachItems[0].id,
  travelClass: 'FIRST',
  propertyIds: mappedSeatReservationTrain.coachItems[0].propertyIds || [],
  freePlaces: { seats: 0, bicycles: 0 },
  isDriverArea: false,
  driverAreaElements: { driverArea: undefined, driverAreaNoVerticalWall: undefined },
};

const defaultArgsNavigationCoach: Args = {
  index: 0,
  selected: false,
  hovered: false,
  focused: false,
  disable: false,
  vertical: false,
};

function addOrUpdateDetailArgs(options = {}): string {
  return JSON.stringify({ ...defaultCoachItemDetailsNavigationCoach, ...options });
}

export const NavigationCoachDefault: StoryObj = {
  render: TemplateNavigationCoach,
  argTypes: defaultArgsTypesNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': JSON.stringify(defaultCoachItemDetailsNavigationCoach),
  },
};

export const NavigationCoachFirstClassSelected: StoryObj = {
  render: TemplateNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': addOrUpdateDetailArgs({ travelClass: 'FIRST' }),
    selected: true,
  },
};

export const NavigationCoachSecondClassNotSelected: StoryObj = {
  render: TemplateNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': addOrUpdateDetailArgs({ travelClass: 'SECOND' }),
    selected: false,
  },
};

export const NavigationCoachDriverArea: StoryObj = {
  render: TemplateNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': addOrUpdateDetailArgs({ isDriverArea: true }),
  },
};

export const NavigationCoachDriverAreaSelected: StoryObj = {
  render: TemplateNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': addOrUpdateDetailArgs({ isDriverArea: true }),
    selected: true,
  },
};

export const NavigationCoachDriverAreaFocused: StoryObj = {
  render: TemplateNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': addOrUpdateDetailArgs({ isDriverArea: true }),
    focused: true,
  },
};

export const NavigationCoachFirstCoachInTrainFirstClass: StoryObj = {
  render: TemplateNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': addOrUpdateDetailArgs({
      driverAreaSide: { left: true },
      travelClass: 'FIRST',
    }),
  },
};

export const NavigationCoachLastCoachInTrain: StoryObj = {
  render: TemplateNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': addOrUpdateDetailArgs({
      driverAreaSide: { right: true },
    }),
  },
};

export const NavigationCoachDisabledFirstClassCoach: StoryObj = {
  render: TemplateNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': addOrUpdateDetailArgs({ travelClass: 'FIRST' }),
    disable: true,
  },
};

export const NavigationCoachVerticalFirstClass: StoryObj = {
  render: TemplateNavigationCoach,
  args: {
    ...defaultArgsNavigationCoach,
    'coach-item-details': JSON.stringify(defaultCoachItemDetailsNavigationCoach),
    vertical: true,
  },
};

/****************************************************************************
 *                                                                          *
 *              BEGIN seat-reservation-navigation-services Component        *
 *                                                                          *
 * *************************************************************************/
const propertyIdsTypeNavigationServices: InputType = {
  control: 'object',
  description: 'array of service icon names',
};

const defaultArgsTypesNavigationServices: Args = {
  'property-ids': propertyIdsTypeNavigationServices,
};

const defaultArgsNavigationServices: Args = {
  'property-ids': JSON.stringify(['BISTRO']),
};

const TemplateNavigationServices = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-navigation-services ${sbbSpread(args)}>
  </sbb-seat-reservation-navigation-services>`;

export const NavigationServicesDefault: StoryObj = {
  render: TemplateNavigationServices,
  argTypes: defaultArgsTypesNavigationServices,
  args: { ...defaultArgsNavigationServices },
};

export const NavigationServicesMultipleServiceIcons: StoryObj = {
  render: TemplateNavigationServices,
  args: {
    ...defaultArgsNavigationServices,
    'property-ids': JSON.stringify(['BISTRO', 'SILENCE', 'WHEELCHAIR']),
  },
};

/****************************************************************************
 *                                                                          *
 *              BEGIN seat-reservation-place-control Component              *
 *                                                                          *
 * *************************************************************************/
const typePlaceControl: InputType = {
  control: {
    type: 'select',
  },
  options: ['SEAT', 'BICYCLE'],
};

const statePlaceControl: InputType = {
  control: {
    type: 'select',
  },
  options: ['FREE', 'SELECTED', 'RESTRICTED', 'ALLOCATED'],
};

const textPlaceControl: InputType = {
  control: {
    type: undefined,
  },
};

const defaultArgTypesPlaceControl: ArgTypes = {
  typePlaceControl,
  statePlaceControl,
  textPlaceControl,
};

const defaultArgsPlaceControl: Args = {
  type: 'SEAT',
  state: 'FREE',
  text: '',
  style:
    '--sbb-seat-reservation-place-control-text-scale-value: 32;--sbb-seat-reservation-place-control-width: 32;--sbb-seat-reservation-place-control-height: 32;--sbb-seat-reservation-place-control-rotation: 0; --sbb-seat-reservation-place-control-text-rotation: 0;',
};

const TemplatePlaceControl = (args: Args): TemplateResult =>
  html`<sbb-seat-reservation-place-control
    ${sbbSpread(args)}
  ></sbb-seat-reservation-place-control>`;

export const PlaceControlDefault: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: defaultArgsPlaceControl,
};

export const PlaceControlPlaceSeatFree: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: { ...defaultArgsPlaceControl, text: '123', type: 'SEAT', state: 'FREE' },
};

export const PlaceControlPlaceSeatFreeRotation90TextRotationMinus90: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: {
    ...defaultArgsPlaceControl,
    text: '123',
    type: 'SEAT',
    state: 'FREE',
    style: defaultArgsPlaceControl.style.concat(
      '--sbb-seat-reservation-place-control-rotation: 90; --sbb-seat-reservation-place-control-text-rotation:-90',
    ),
  },
};

export const PlaceControlPlaceSeatSelected: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: { ...defaultArgsPlaceControl, text: '123', type: 'SEAT', state: 'SELECTED' },
};

export const PlaceControlPlaceSeatRestricted: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: { ...defaultArgsPlaceControl, text: '123', type: 'SEAT', state: 'RESTRICTED' },
};

export const PlaceControlPlaceSeatAllocated: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: { ...defaultArgsPlaceControl, text: '123', type: 'SEAT', state: 'ALLOCATED' },
};

export const PlaceControlPlaceBicycleAvailable: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: { ...defaultArgsPlaceControl, text: '123', type: 'BICYCLE', state: 'FREE' },
};

export const PlaceControlPlaceBicycleSelected: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: { ...defaultArgsPlaceControl, text: '123', type: 'BICYCLE', state: 'SELECTED' },
};

export const PlaceControlPlaceBicycleRestricted: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: { ...defaultArgsPlaceControl, text: '123', type: 'BICYCLE', state: 'RESTRICTED' },
};

export const PlaceControlPlaceBicycleAllocated: StoryObj = {
  render: TemplatePlaceControl,
  argTypes: defaultArgTypesPlaceControl,
  args: { ...defaultArgsPlaceControl, text: '123', type: 'BICYCLE', state: 'ALLOCATED' },
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
  title: 'experimental/Seat Reservation',
};

export default meta;
