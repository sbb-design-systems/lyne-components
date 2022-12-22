import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-wagon {...args}></sbb-wagon>;
const WagonWithIconsTemplate = (args) => (
  <sbb-wagon {...args}>
    <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
    <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
    <sbb-icon
      aria-hidden="false"
      aria-label="Business zone in 1st class: Reservation possible"
      name="sa-bz"
    ></sbb-icon>
  </sbb-wagon>
);

const label = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Wagon',
  },
};

const additionalAccessibilityText = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Wagon',
  },
};

const customAccessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Wagon',
  },
};

const occupancy = {
  control: {
    type: 'inline-radio',
  },
  options: ['high', 'medium', 'low', 'unknown'],
  table: {
    category: 'Wagon',
  },
};

const type = {
  control: {
    type: 'inline-radio',
  },
  options: ['locomotive', 'closed', 'wagon'],
  table: {
    category: 'Wagon',
  },
};

const wagonClass = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2'],
  table: {
    category: 'Wagon',
  },
};

const defaultArgTypes = {
  occupancy,
  type,
  label,
  'wagon-class': wagonClass,
  'additional-accessibility-text': additionalAccessibilityText,
  'custom-accessibility-label': customAccessibilityLabel,
};

const defaultArgs = {
  label: '36',
  type: type.options[2],
  occupancy: occupancy.options[2],
  'wagon-class': wagonClass.options[1],
  'additional-accessibility-text': '',
  'custom-accessibility-label': '',
};

export const wagon = Template.bind({});
wagon.argTypes = defaultArgTypes;
wagon.args = defaultArgs;
wagon.documentation = {
  title: 'Wagon example with label, occupancy, class without icons',
};

export const wagonWithIcons = WagonWithIconsTemplate.bind({});
wagonWithIcons.argTypes = defaultArgTypes;
wagonWithIcons.args = defaultArgs;
wagonWithIcons.documentation = {
  title: 'Wagon example with label, occupancy, class with icons',
};

export const locomotive = Template.bind({});
locomotive.argTypes = defaultArgTypes;
locomotive.args = {
  ...defaultArgs,
  type: type.options[0],
};
locomotive.documentation = {
  title: 'Locomotive example',
};

export const closed = Template.bind({});
closed.argTypes = defaultArgTypes;
closed.args = {
  ...defaultArgs,
  type: type.options[1],
};
closed.documentation = {
  title: 'Closed wagon example',
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
  title: 'components/timetable/train-formation/sbb-wagon',
};
