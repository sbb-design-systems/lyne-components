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

const accessibilityLabelWagon = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Wagon',
  },
};

const accessibilityAdditionalWagonText = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Wagon',
  },
};

const accessibilityLabelOccupation = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Wagon',
  },
};

const accessibilityLabelClass = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Wagon',
  },
};

const accessibilityLabelIconListTitle = {
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
  options: ['high', 'medium', 'low', 'none'],
  table: {
    category: 'Wagon',
  },
};

const type = {
  control: {
    type: 'inline-radio',
  },
  options: ['locomotive', 'blocked', 'wagon'],
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
  'accessibility-label-wagon': accessibilityLabelWagon,
  'accessibility-additional-wagon-text': accessibilityAdditionalWagonText,
  'accessibility-label-occupation': accessibilityLabelOccupation,
  'accessibility-label-class': accessibilityLabelClass,
  'accessibility-label-icon-list-title': accessibilityLabelIconListTitle,
};

const defaultArgs = {
  label: '36',
  type: type.options[2],
  occupancy: occupancy.options[2],
  'wagon-class': wagonClass.options[1],
  'accessibility-label-wagon': 'Train coach number ',
  'accessibility-label-occupation': 'Expected occupancy low',
  'accessibility-label-class': 'Second class',
  'accessibility-label-icon-list-title': 'Additional wagon information',
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
  'accessibility-label-wagon': 'Locomotive',
};
locomotive.documentation = {
  title: 'Locomotive example',
};

export const blocked = Template.bind({});
blocked.argTypes = defaultArgTypes;
blocked.args = {
  ...defaultArgs,
  type: type.options[1],
  'accessibility-label-wagon': 'Passage blocked',
};
blocked.documentation = {
  title: 'Blocked wagon example',
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
