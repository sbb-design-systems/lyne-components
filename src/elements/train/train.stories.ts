import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import type { SbbTrainFormationElement, SbbTrainWagonElement } from '../train.ts';

import readme from './readme.md?raw';

import '../icon.ts';
import '../train.ts';

const trainFormationWrapper = (content: TemplateResult): TemplateResult =>
  html`<sbb-train-formation><sbb-train>${content}</sbb-train></sbb-train-formation>`;

const WagonTemplate = (args: Args): TemplateResult =>
  trainFormationWrapper(html`<sbb-train-wagon ${sbbSpread(args)}></sbb-train-wagon>`);

const WagonIconsTemplate = (args: Args): TemplateResult =>
  trainFormationWrapper(html`
    <sbb-train-wagon ${sbbSpread(args)}>
      <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      <sbb-icon
        aria-hidden="false"
        aria-label="Business zone in 1st class: Reservation possible"
        name="sa-bz"
      ></sbb-icon>
    </sbb-train-wagon>
  `);

const FormationTemplate = (args: Args): TemplateResult => html`
  <sbb-train-formation ${sbbSpread(args)}>
    <sbb-train
      direction-label="Direction of travel"
      station="Bern"
      direction="left"
      accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
    >
      <sbb-train-wagon
        type="locomotive"
        additional-accessibility-text="Top of the train"
        sector="A"
      ></sbb-train-wagon>
      <sbb-train-wagon type="closed" sector="A" label="37"></sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        type="wagon"
        label="38"
        occupancy="low"
        blocked-passage="previous"
        wagon-class="1"
        sector="A"
      >
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon
          aria-hidden="false"
          aria-label="Business zone in 1st class: Reservation possible"
          name="sa-bz"
        ></sbb-icon>
        <sbb-icon
          aria-hidden="false"
          aria-label="Business zone in 1st class: Reservation possible"
          name="sa-bz"
        ></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon type="wagon" label="39" occupancy="none" wagon-class="1" sector="B">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon type="restaurant" label="40" sector="B">
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon type="wagon" label="41" occupancy="high" wagon-class="2" sector="B">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="42"
        occupancy="low"
        wagon-class="2"
        blocked-passage="next"
        sector="C"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        type="wagon"
        label="43"
        occupancy="low"
        wagon-class="2"
        blocked-passage="both"
        sector="C"
      >
        <sbb-icon
          aria-hidden="false"
          aria-label="stroller space"
          name="sa-abteilkinderwagen"
        ></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        blocked-passage="previous"
        type="wagon"
        label="44"
        occupancy="low"
        wagon-class="2"
        sector="C"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="Family zone" name="sa-fz"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="45"
        occupancy="low"
        wagon-class="2"
        sector="D"
      ></sbb-train-wagon>
      <sbb-train-wagon type="couchette" label="46" sector="D"></sbb-train-wagon>
      <sbb-train-wagon
        type="sleeping"
        label="47"
        additional-accessibility-text="End of the train"
        sector="D"
        blocked-passage="next"
      ></sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
    </sbb-train>
    <sbb-train
      direction-label="Direction of travel"
      station="Luzern"
      direction="left"
      accessibility-label="The top of the train is in Sector E. The train leaves the station in this direction"
    >
      <sbb-train-wagon
        type="wagon-end-left"
        additional-accessibility-text="Top of the train"
        blocked-passage="previous"
        occupancy="none"
        wagon-class="2"
        sector="E"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="50"
        occupancy="low"
        wagon-class="2"
        sector="E"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="51"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="52"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="53"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="54"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="55"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="56"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="57"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="58"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon-end-right"
        label="59"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon>
    </sbb-train>
  </sbb-train-formation>
`;

/*
 * Formation controls
 */

const view: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['side', 'top'] satisfies SbbTrainFormationElement['view'][],
};

const defaultArgTypes: ArgTypes = {
  view,
};

const defaultArgs: Args = {
  view: 'side',
};

/*
 * Wagon controls
 */

const wagonLabel: InputType = {
  control: {
    type: 'text',
  },
};

const wagonAdditionalAccessibilityText: InputType = {
  control: {
    type: 'text',
  },
};

const wagonOccupancy: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['high', 'medium', 'low', 'none', null] satisfies SbbTrainWagonElement['occupancy'][],
};

const wagonType: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [
    'wagon',
    'wagon-end-left',
    'wagon-end-right',
    'couchette',
    'sleeping',
    'restaurant',
    'locomotive',
    'closed',
  ] satisfies SbbTrainWagonElement['type'][],
};

const wagonClass: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2', '1-2', '2-1', null] satisfies SbbTrainWagonElement['wagonClass'][],
};

const wagonDefaultArgTypes: ArgTypes = {
  occupancy: wagonOccupancy,
  type: wagonType,
  label: wagonLabel,
  'wagon-class': wagonClass,
  'additional-accessibility-text': wagonAdditionalAccessibilityText,
};

const wagonDefaultArgs: Args = {
  label: '36',
  type: wagonType.options![0],
  occupancy: wagonOccupancy.options![2],
  'wagon-class': wagonClass.options![1],
  'additional-accessibility-text': '',
};

export const TrainFormation: StoryObj = {
  render: FormationTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const TrainFormationTopView: StoryObj = {
  render: FormationTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    view: 'top',
  },
};

export const wagon: StoryObj = {
  render: WagonTemplate,
  argTypes: wagonDefaultArgTypes,
  args: wagonDefaultArgs,
};

export const wagonRestaurant: StoryObj = {
  render: WagonIconsTemplate,
  argTypes: wagonDefaultArgTypes,
  args: {
    ...wagonDefaultArgs,
    type: wagonType.options![5],
    'wagon-class': '',
    occupancy: null,
  },
};

export const wagonLocomotive: StoryObj = {
  render: WagonTemplate,
  argTypes: wagonDefaultArgTypes,
  args: {
    ...wagonDefaultArgs,
    type: wagonType.options![6],
    'wagon-class': '',
    occupancy: null,
  },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Train',
};

export default meta;
