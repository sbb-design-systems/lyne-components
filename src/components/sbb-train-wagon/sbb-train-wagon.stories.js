import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-train-wagon {...args}></sbb-train-wagon>;
const WagonIconsTemplate = (args) => (
  <sbb-train-wagon {...args}>
    <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
    <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
    <sbb-icon
      aria-hidden="false"
      aria-label="Business zone in 1st class: Reservation possible"
      name="sa-bz"
    ></sbb-icon>
  </sbb-train-wagon>
);

const WagonOneIconTemplate = (args) => (
  <sbb-train-wagon {...args}>
    <sbb-icon
      aria-hidden="false"
      aria-label="Business zone in 1st class: Reservation possible"
      name="sa-bz"
    ></sbb-icon>
  </sbb-train-wagon>
);

const label = {
  control: {
    type: 'text',
  },
};

const additionalAccessibilityText = {
  control: {
    type: 'text',
  },
};

const occupancy = {
  control: {
    type: 'inline-radio',
  },
  options: ['high', 'medium', 'low', 'unknown'],
};

const type = {
  control: {
    type: 'inline-radio',
  },
  options: ['locomotive', 'closed', 'wagon'],
};

const wagonClass = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2'],
};

const defaultArgTypes = {
  occupancy,
  type,
  label,
  'wagon-class': wagonClass,
  'additional-accessibility-text': additionalAccessibilityText,
};

const defaultArgs = {
  label: '36',
  type: type.options[2],
  occupancy: occupancy.options[2],
  'wagon-class': wagonClass.options[1],
  'additional-accessibility-text': undefined,
};

export const wagonLowOccupancy = Template.bind({});
wagonLowOccupancy.argTypes = defaultArgTypes;
wagonLowOccupancy.args = defaultArgs;

export const wagonMediumOccupancy = Template.bind({});
wagonMediumOccupancy.argTypes = defaultArgTypes;
wagonMediumOccupancy.args = {
  ...defaultArgs,
  occupancy: occupancy.options[1],
};

export const wagonHighOccupancy = Template.bind({});
wagonHighOccupancy.argTypes = defaultArgTypes;
wagonHighOccupancy.args = {
  ...defaultArgs,
  occupancy: occupancy.options[0],
};

export const wagonUnknownOccupancy = Template.bind({});
wagonUnknownOccupancy.argTypes = defaultArgTypes;
wagonUnknownOccupancy.args = {
  ...defaultArgs,
  occupancy: occupancy.options[3],
};

export const wagonUndefinedOccupancy = Template.bind({});
wagonUndefinedOccupancy.argTypes = defaultArgTypes;
wagonUndefinedOccupancy.args = {
  ...defaultArgs,
  occupancy: '',
};

export const wagonOneIcon = WagonOneIconTemplate.bind({});
wagonOneIcon.argTypes = defaultArgTypes;
wagonOneIcon.args = defaultArgs;

export const wagonMultipleIcons = WagonIconsTemplate.bind({});
wagonMultipleIcons.argTypes = defaultArgTypes;
wagonMultipleIcons.args = defaultArgs;

export const wagonFirstClass = Template.bind({});
wagonFirstClass.argTypes = defaultArgTypes;
wagonFirstClass.args = {
  ...defaultArgs,
  'wagon-class': wagonClass.options[0],
};

export const wagonUndefinedClass = Template.bind({});
wagonUndefinedClass.argTypes = defaultArgTypes;
wagonUndefinedClass.args = {
  ...defaultArgs,
  'wagon-class': undefined,
};

export const locomotive = Template.bind({});
locomotive.argTypes = defaultArgTypes;
locomotive.args = {
  ...defaultArgs,
  type: type.options[0],
};

export const closed = Template.bind({});
closed.argTypes = defaultArgTypes;
closed.args = {
  ...defaultArgs,
  type: type.options[1],
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
  title: 'components/timetable/sbb-train-wagon',
};
