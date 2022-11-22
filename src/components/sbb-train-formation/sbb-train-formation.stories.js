import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-train-formation {...args}></sbb-train-formation>;
const MountedFormationTemplate = (args) => (
  <sbb-train-formation {...args}>
    <sbb-train
      direction-label="Direction of travel"
      station="Bern"
      direction="LEFT"
      accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction."
    >
      <sbb-sector label="Sector A">
        <sbb-wagon
          type="locomotive"
          accessibility-label-wagon="Locomotive"
          accessibility-additional-wagon-text="Top of the train"
        ></sbb-wagon>
        <sbb-wagon type="blocked" accessibility-label-wagon="Passage blocked"></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="38"
          accessibility-label-occupation="Expected occupancy low"
          occupancy="low"
          accessibility-label-class="First class"
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
        </sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector B">
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="39"
          accessibility-label-occupation="Expected occupancy low"
          occupancy="low"
          accessibility-label-class="First class"
          accessibility-label-icon-list-title="Additional wagon information"
          wagon-class="1"
        >
          <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        </sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="40"
          accessibility-label-occupation="Expected occupancy hight"
          accessibility-label-class="Second class"
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
          accessibility-label-wagon="Train coach number"
          label="41"
          accessibility-label-occupation="Expected occupancy medium"
          accessibility-label-class="Second class"
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
          accessibility-label-wagon="Train coach number"
          label="42"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          accessibility-label-icon-list-title="Additional wagon information"
          wagon-class="2"
        >
          <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        </sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="43"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
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
          accessibility-label-wagon="Train coach number"
          label="44"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          accessibility-label-icon-list-title="Additional wagon information"
          wagon-class="2"
        >
          <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
          <sbb-icon aria-hidden="false" aria-label="Family zone" name="sa-fz"></sbb-icon>
        </sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector D">
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="45"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="46"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="47"
          accessibility-additional-wagon-text="End of the train"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
      </sbb-sector>
    </sbb-train>
    <sbb-train
      direction-label="Direction of travel"
      station="Luzern"
      direction="LEFT"
      accessibility-label="The top of the train is in Sector E. The train leaves the station in this direction."
    >
      <sbb-sector label="Sector E">
        <sbb-wagon
          type="locomotive"
          accessibility-label-wagon="Locomotive"
          accessibility-additional-wagon-text="Top of the train"
        ></sbb-wagon>
        <sbb-wagon type="blocked" accessibility-label-wagon="Passage blocked"></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="50"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector F">
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="51"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="52"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="53"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector G">
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="54"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="55"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="56"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
      </sbb-sector>
      <sbb-sector label="Sector H">
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="57"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="58"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
        <sbb-wagon
          type="wagon"
          accessibility-label-wagon="Train coach number"
          label="59"
          accessibility-label-occupation="Expected occupancy low"
          accessibility-label-class="Second class"
          occupancy="low"
          wagon-class="2"
        ></sbb-wagon>
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
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform'],
  },
  parameters: {
    actions: {},
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/train-formation/sbb-train-formation',
};
