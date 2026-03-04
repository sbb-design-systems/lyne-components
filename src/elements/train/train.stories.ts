import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './train-wagon.component.ts';
import '../train-formation.ts';
import '../train.ts';

const trainFormationWrapper = (content: TemplateResult): TemplateResult =>
  html`<sbb-train-formation><sbb-train>${content}</sbb-train></sbb-train-formation>`;

const Template = (args: Args): TemplateResult =>
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

const label: InputType = {
  control: {
    type: 'text',
  },
};

const additionalAccessibilityText: InputType = {
  control: {
    type: 'text',
  },
};

const occupancy: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['high', 'medium', 'low', 'none', null],
};

const type: InputType = {
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
  ],
};

const wagonClass: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2', null],
};

const defaultArgTypes: ArgTypes = {
  occupancy,
  type,
  label,
  'wagon-class': wagonClass,
  'additional-accessibility-text': additionalAccessibilityText,
};

const defaultArgs: Args = {
  label: '36',
  type: type.options![0],
  occupancy: occupancy.options![2],
  'wagon-class': wagonClass.options![1],
  'additional-accessibility-text': '',
};

export const wagonLowOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const wagonEndLeftMediumOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    type: type.options![1],
    occupancy: occupancy.options![1],
  },
};

export const wagonEndRightHighOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    type: type.options![2],
    occupancy: occupancy.options![0],
  },
};

export const wagonNoneOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    occupancy: occupancy.options![3],
  },
};

export const couchette: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    type: type.options![3],
    'wagon-class': '',
    occupancy: null,
  },
};

export const sleeping: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    type: type.options![4],
    'wagon-class': '',
    occupancy: null,
  },
};

export const RestaurantIcons: StoryObj = {
  render: WagonIconsTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    type: type.options![5],
    'wagon-class': '',
    occupancy: null,
  },
};

export const wagonFirstClass: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'wagon-class': wagonClass.options![0],
  },
};

export const locomotive: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    type: type.options![6],
    'wagon-class': '',
    occupancy: null,
  },
};

export const closed: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    type: type.options![7],
  },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/timetable/sbb-train-wagon',
};

export default meta;


import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import '../../icon.ts';
import '../train.ts';
import '../train-wagon.ts';
import '../train-blocked-passage.ts';
import './train-formation.component.ts';

const MountedFormationTemplate = (args: Args): TemplateResult => html`
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

const SingleFormationTemplate = (args: Args): TemplateResult => html`
  <sbb-train-formation ${sbbSpread(args)}>
    <sbb-train
      direction-label="Direction of travel"
      station=""
      direction="left"
      accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
    >
      <sbb-train-wagon
        sector="A"
        type="locomotive"
        additional-accessibility-text="Top of the train"
      ></sbb-train-wagon>
      <sbb-train-wagon sector="A" type="closed"></sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        sector="A"
        type="wagon"
        label="38"
        occupancy="low"
        blocked-passage="previous"
        wagon-class="1"
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
      <sbb-train-wagon sector="B" type="wagon" label="39" occupancy="none" wagon-class="1">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon sector="B" type="wagon" label="40" occupancy="high" wagon-class="2">
        <sbb-icon
          aria-hidden="false"
          aria-label="Restaurant 1st and 2nd class"
          name="sa-wr"
        ></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon sector="B" type="wagon" label="41" occupancy="medium" wagon-class="2">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        sector="C"
        type="wagon"
        label="42"
        occupancy="low"
        wagon-class="2"
        blocked-passage="next"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        sector="C"
        type="wagon"
        label="43"
        occupancy="low"
        wagon-class="2"
        blocked-passage="both"
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
        sector="C"
        blocked-passage="previous"
        type="wagon"
        label="44"
        occupancy="low"
        wagon-class="2"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="Family zone" name="sa-fz"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        sector="D"
        type="wagon"
        label="45"
        occupancy="low"
        wagon-class="2"
      ></sbb-train-wagon>
      <sbb-train-wagon
        sector="D"
        type="wagon"
        label="46"
        occupancy="low"
        wagon-class="2"
      ></sbb-train-wagon>
      <sbb-train-wagon
        sector="D"
        type="wagon"
        label="47"
        additional-accessibility-text="End of the train"
        occupancy="low"
        wagon-class="2"
      ></sbb-train-wagon>
    </sbb-train>
  </sbb-train-formation>
`;

const view: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['side', 'top'],
};

const defaultArgTypes: ArgTypes = {
  view,
};

const defaultArgs: Args = {
  view: 'side',
};

export const TrainFormation: StoryObj = {
  render: MountedFormationTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const SingleFormation: StoryObj = {
  render: SingleFormationTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const TrainFormationTopView: StoryObj = {
  render: MountedFormationTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    view: 'top',
  },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/timetable/sbb-train-formation',
};

export default meta;


import type { Args, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './train-blocked-passage.component.ts';

const Template = (args: Args): TemplateResult => html`
  <sbb-train-blocked-passage ${sbbSpread(args)}></sbb-train-blocked-passage>
`;

export const blockedPassage: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/timetable/sbb-train-blocked-passage',
};

export default meta;


import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';

import readme from './readme.md?raw';
import './train.component.ts';

const Template = (args: Args): TemplateResult => html`<sbb-train ${sbbSpread(args)}></sbb-train>`;

const directionLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Direction indicator',
  },
};

const directionLabelLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
  table: {
    category: 'Direction indicator',
  },
};

const station: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Direction indicator',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Direction indicator',
  },
};

const direction: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['left', 'right'],
  table: {
    category: 'Direction indicator',
  },
};

const defaultArgTypes: ArgTypes = {
  'direction-label': directionLabel,
  'accessibility-label': accessibilityLabel,
  station,
  direction,
  'direction-label-level': directionLabelLevel,
};

const defaultArgs: Args = {
  'direction-label': 'Direction of travel',
  'accessibility-label':
    'The top of the train is in Sector A. The train leaves the station in this direction',
  station: 'Bern',
  direction: direction.options![0],
  'direction-label-level': directionLabelLevel.options![4],
};

export const train: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const trainWithoutStation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, station: undefined },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/timetable/sbb-train',
};

export default meta;
