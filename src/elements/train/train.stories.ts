import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import type { SbbTrainFormationElement, SbbTrainWagonElement } from '../train.ts';

import readme from './readme.md?raw';

import '../icon.ts';
import '../train.ts';

const trainFormationWrapper = (
  content: TemplateResult,
  view: SbbTrainFormationElement['view'],
  orientation: SbbTrainFormationElement['orientation'],
): TemplateResult =>
  html`<sbb-train-formation view=${view} orientation=${orientation}
    ><sbb-train>${content}</sbb-train></sbb-train-formation
  >`;

const WagonTemplate = ({ wagonActive, view, orientation, ...args }: Args): TemplateResult =>
  trainFormationWrapper(
    html`<sbb-train-wagon
      ${sbbSpread(args)}
      class=${wagonActive ? 'sbb-active' : nothing}
    ></sbb-train-wagon>`,
    view,
    orientation,
  );

const WagonIconsTemplate = ({ wagonActive, view, orientation, ...args }: Args): TemplateResult =>
  trainFormationWrapper(
    html`
      <sbb-train-wagon ${sbbSpread(args)} class=${wagonActive ? 'sbb-active' : nothing}>
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon
          aria-hidden="false"
          aria-label="Business zone in 1st class: Reservation possible"
          name="sa-bz"
        ></sbb-icon>
      </sbb-train-wagon>
    `,
    view,
    orientation,
  );

const WagonButtonTemplate = ({ wagonActive, view, orientation, ...args }: Args): TemplateResult =>
  trainFormationWrapper(
    html`<sbb-train-wagon-button
      ${sbbSpread(args)}
      class=${wagonActive ? 'sbb-active' : nothing}
    ></sbb-train-wagon-button>`,
    view,
    orientation,
  );

const FormationTemplate = (args: Args): TemplateResult => html`
  <sbb-train-formation
    ${sbbSpread(args)}
    style=${args.orientation === 'vertical' ? 'max-height: 80vh' : nothing}
  >
    <sbb-train
      direction-label="Direction of travel"
      station="Bern"
      direction="left"
      accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
    >
      <sbb-train-wagon
        wagon-type="locomotive"
        additional-accessibility-text="Top of the train"
        sector="A"
      ></sbb-train-wagon>
      <sbb-train-wagon wagon-type="closed" sector="A" label="37"></sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        wagon-type="wagon"
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
      <sbb-train-wagon wagon-type="wagon" label="39" occupancy="none" wagon-class="1" sector="B">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon wagon-type="restaurant" label="40" sector="B">
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon wagon-type="wagon" label="41" occupancy="high" wagon-class="2" sector="B">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
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
        wagon-type="wagon"
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
        wagon-type="wagon"
        label="44"
        occupancy="low"
        wagon-class="2"
        sector="C"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="Family zone" name="sa-fz"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="45"
        occupancy="low"
        wagon-class="2"
        sector="D"
      ></sbb-train-wagon>
      <sbb-train-wagon wagon-type="couchette" label="46" sector="D"></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="sleeping"
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
        wagon-type="wagon-end-left"
        additional-accessibility-text="Top of the train"
        blocked-passage="previous"
        occupancy="none"
        wagon-class="2"
        sector="E"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="50"
        occupancy="low"
        wagon-class="2"
        sector="E"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="51"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="52"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="53"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="54"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="55"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="56"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="57"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon"
        label="58"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon>
      <sbb-train-wagon
        wagon-type="wagon-end-right"
        label="59"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon>
    </sbb-train>
  </sbb-train-formation>
`;

const InteractiveFormationTemplate = (args: Args): TemplateResult => html`
  <sbb-train-formation
    ${sbbSpread(args)}
    style=${args.orientation === 'vertical' ? 'max-height: 80vh' : nothing}
  >
    <sbb-train
      direction-label="Direction of travel"
      station="Bern"
      direction="left"
      accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
    >
      <sbb-train-wagon
        wagon-type="locomotive"
        additional-accessibility-text="Top of the train"
        sector="A"
      ></sbb-train-wagon>
      <sbb-train-wagon wagon-type="closed" sector="A" label="37"></sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon-button
        wagon-type="wagon"
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
      </sbb-train-wagon-button>
      <sbb-train-wagon-button wagon-type="wagon" label="39" occupancy="none" wagon-class="1" sector="B">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon-button>
      <sbb-train-wagon-button wagon-type="restaurant" label="40" sector="B">
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      </sbb-train-wagon-button>
      <sbb-train-wagon-button wagon-type="wagon" label="41" occupancy="high" wagon-class="2" sector="B">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="42"
        occupancy="low"
        wagon-class="2"
        blocked-passage="next"
        sector="C"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon-button>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon-button
        wagon-type="wagon"
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
      </sbb-train-wagon-button>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon-button
        blocked-passage="previous"
        wagon-type="wagon"
        label="44"
        occupancy="low"
        wagon-class="2"
        sector="C"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="Family zone" name="sa-fz"></sbb-icon>
      </sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="45"
        occupancy="low"
        wagon-class="2"
        sector="D"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button wagon-type="couchette" label="46" sector="D"></sbb-train-wagon-button
      <sbb-train-wagon-button
        wagon-type="sleeping"
        label="47"
        additional-accessibility-text="End of the train"
        sector="D"
        blocked-passage="next"
      ></sbb-train-wagon-button>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
    </sbb-train>
    <sbb-train
      direction-label="Direction of travel"
      station="Luzern"
      direction="left"
      accessibility-label="The top of the train is in Sector E. The train leaves the station in this direction"
    >
      <sbb-train-wagon-button
        wagon-type="wagon-end-left"
        additional-accessibility-text="Top of the train"
        blocked-passage="previous"
        occupancy="none"
        wagon-class="2"
        sector="E"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="50"
        occupancy="low"
        wagon-class="2"
        sector="E"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="51"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="52"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="53"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="54"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="55"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="56"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="57"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon"
        label="58"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon-button>
      <sbb-train-wagon-button
        wagon-type="wagon-end-right"
        label="59"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon-button>
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
  table: {
    category: 'Train Formation',
  },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'] satisfies SbbTrainFormationElement['orientation'][],
  table: {
    category: 'Train Formation',
  },
};

const defaultArgTypes: ArgTypes = {
  view,
  orientation,
};

const defaultArgs: Args = {
  view: 'side',
  orientation: 'horizontal',
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
  ] satisfies SbbTrainWagonElement['wagonType'][],
};

const wagonClass: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2', '1-2', '2-1', null] satisfies SbbTrainWagonElement['wagonClass'][],
};

const wagonActive: InputType = {
  name: 'active',
  control: {
    type: 'boolean',
  },
};

const wagonDefaultArgTypes: ArgTypes = {
  type: wagonType,
  label: wagonLabel,
  occupancy: wagonOccupancy,
  'wagon-class': wagonClass,
  wagonActive,
  'additional-accessibility-text': wagonAdditionalAccessibilityText,
  view,
  orientation,
};

const wagonDefaultArgs: Args = {
  type: wagonType.options![0],
  label: '36',
  occupancy: wagonOccupancy.options![2],
  'wagon-class': wagonClass.options![1],
  wagonActive: false,
  'additional-accessibility-text': '',
  view: view.options![0],
  orientation: orientation.options![0],
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

export const InteractiveFormation: StoryObj = {
  render: InteractiveFormationTemplate,
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

export const wagonButton: StoryObj = {
  render: WagonButtonTemplate,
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
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Train',
};

export default meta;
