import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-train-formation {...args}></sbb-train-formation>;
const MountedFormationTemplate = (args) => (
  <sbb-train-formation {...args}>
    <sbb-train
      direction-label="Direction of travel"
      station="Bern"
      direction="left"
      accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction."
    >
      <sbb-sector label="Sector A">
        <sbb-wagon type="locomotive" additional-accessibility-text="Top of the train"></sbb-wagon>
        <sbb-wagon type="closed"></sbb-wagon>
        <sbb-blocked-passage />
        <sbb-wagon
          type="wagon"
          label="38"
          occupancy="low"
          blocked-passage="previous"
          accessibility-label-icon-list-title="Additional wagon information"
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
        </sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector B">
        <sbb-wagon
          type="wagon"
          label="39"
          occupancy="low"
          accessibility-label-icon-list-title="Additional wagon information"
          wagon-class="1"
        >
          <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        </sbb-wagon>
        <sbb-wagon
          type="wagon"
          label="40"
          occupancy="high"
          accessibility-label-icon-list-title="Additional wagon information"
          wagon-class="2"
        >
          <sbb-icon
            aria-hidden="false"
            aria-label="Restaurant 1st and 2nd class"
            name="sa-wr"
          ></sbb-icon>
          <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
        </sbb-wagon>
        <sbb-wagon
          type="wagon"
          label="41"
          occupancy="medium"
          accessibility-label-icon-list-title="Additional wagon information"
          wagon-class="2"
        >
          <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        </sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector C">
        <sbb-wagon
          type="wagon"
          label="42"
          occupancy="low"
          accessibility-label-icon-list-title="Additional wagon information"
          wagon-class="2"
        >
          <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        </sbb-wagon>
        <sbb-wagon
          type="wagon"
          label="43"
          occupancy="low"
          accessibility-label-icon-list-title="Additional wagon information"
          wagon-class="2"
        >
          <sbb-icon
            aria-hidden="false"
            aria-label="stroller space"
            name="sa-abteilkinderwagen"
          ></sbb-icon>
          <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        </sbb-wagon>
        <sbb-wagon
          type="wagon"
          label="44"
          occupancy="low"
          accessibility-label-icon-list-title="Additional wagon information"
          wagon-class="2"
        >
          <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
          <sbb-icon aria-hidden="false" aria-label="Family zone" name="sa-fz"></sbb-icon>
        </sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector D">
        <sbb-wagon type="wagon" label="45" occupancy="low" wagon-class="2"></sbb-wagon>
        <sbb-wagon type="wagon" label="46" occupancy="low" wagon-class="2"></sbb-wagon>
        <sbb-wagon
          type="wagon"
          label="47"
          accessibility-additional-wagon-text="End of the train"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
      </sbb-sector>
    </sbb-train>
    <sbb-train
      direction-label="Direction of travel"
      station="Luzern"
      direction="left"
      accessibility-label="The top of the train is in Sector E. The train leaves the station in this direction."
    >
      <sbb-sector label="Sector E">
        <sbb-wagon
          type="locomotive"
          accessibility-label-wagon="Locomotive"
          additional-accessibility-text="Top of the train"
        ></sbb-wagon>
        <sbb-wagon type="closed" label="49"></sbb-wagon>
        <sbb-blocked-passage />
        <sbb-wagon type="wagon" label="50" occupancy="low" wagon-class="2"></sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector F">
        <sbb-wagon type="wagon" label="51" occupancy="low" wagon-class="2"></sbb-wagon>
        <sbb-wagon type="wagon" label="52" occupancy="low" wagon-class="2"></sbb-wagon>
        <sbb-wagon type="wagon" label="53" occupancy="low" wagon-class="2"></sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector G">
        <sbb-wagon type="wagon" label="54" occupancy="low" wagon-class="2"></sbb-wagon>
        <sbb-wagon type="wagon" label="55" occupancy="low" wagon-class="2"></sbb-wagon>
        <sbb-wagon type="wagon" label="56" occupancy="low" wagon-class="2"></sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector H">
        <sbb-wagon type="wagon" label="57" occupancy="low" wagon-class="2"></sbb-wagon>
        <sbb-wagon type="wagon" label="58" occupancy="low" wagon-class="2"></sbb-wagon>
        <sbb-wagon type="wagon" label="59" occupancy="low" wagon-class="2"></sbb-wagon>
      </sbb-sector>
    </sbb-train>
  </sbb-train-formation>
);

export const EmptyTrainFormation = Template.bind({});
EmptyTrainFormation.documentation = {
  title: 'Sbb-train-formation without any content',
};

export const TrainFormation = MountedFormationTemplate.bind({});
TrainFormation.documentation = {
  title: 'Sbb-train-formation with trains slotted',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/train-formation/sbb-train-formation',
};
