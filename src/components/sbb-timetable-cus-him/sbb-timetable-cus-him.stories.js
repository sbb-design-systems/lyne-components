import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-cus-him.sample-data';

const Template = (args) => (
  <lyne-timetable-cus-him
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  >
  </lyne-timetable-cus-him>
);

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'first-level-list',
    'second-level-list',
    'second-level-button',
    'second-level-message'
  ]
};

const config = {
  table: {
    disable: false
  }
};

const defaultArgTypes = {
  appearance,
  config
};

const defaultArgs = {
  appearance: appearance.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const CusHimFirstLevelList = Template.bind({});

CusHimFirstLevelList.argTypes = defaultArgTypes;
CusHimFirstLevelList.args = {
  ...defaultArgs,
  config: sampleData[2]
};

CusHimFirstLevelList.documentation = {
  title: 'CUS/HIM Icon - First Level List - Single Item only'
};

export const CusHimSecondLevelList = Template.bind({});

CusHimSecondLevelList.argTypes = defaultArgTypes;
CusHimSecondLevelList.args = {
  appearance: appearance.options[1],
  config: sampleData[1]
};

CusHimSecondLevelList.documentation = {
  title: 'CUS/HIM Icon - Second Level List'
};

export const CusHimSecondLevelButton = Template.bind({});

CusHimSecondLevelButton.argTypes = defaultArgTypes;
CusHimSecondLevelButton.args = {
  appearance: appearance.options[2],
  config: sampleData[2]
};

CusHimSecondLevelButton.documentation = {
  title: 'CUS/HIM - Second Level Button'
};

export const CusHimSecondLevelMessage = Template.bind({});

CusHimSecondLevelMessage.argTypes = defaultArgTypes;
CusHimSecondLevelMessage.args = {
  appearance: appearance.options[3],
  config: sampleData[2]
};

CusHimSecondLevelMessage.documentation = {
  title: 'CUS/HIM - Second Level Message'
};

export default {
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'internals/lyne-timetable-cus-him'
};
