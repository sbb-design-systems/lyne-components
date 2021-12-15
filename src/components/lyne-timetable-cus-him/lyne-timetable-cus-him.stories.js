import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-cus-him.sample-data';

const Template = (args) => (
  <lyne-timetable-cus-him
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
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
    'second-level-message'
  ]
};

const config = {
  table: {
    disable: false
  }
};

const gridCellRole = {
  control: {
    type: 'boolean'
  }
};

const defaultArgTypes = {
  appearance,
  config,
  gridCellRole
};

const defaultArgs = {
  appearance: appearance.options[0],
  gridCellRole: true
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const CusHimFirstLevelList = Template.bind({});

CusHimFirstLevelList.argTypes = defaultArgTypes;
CusHimFirstLevelList.args = {
  ...defaultArgs,
  config: sampleData[1]
};

CusHimFirstLevelList.documentation = {
  title: 'CUS/HIM Icon - First Level List'
};

export const CusHimSecondLevelList = Template.bind({});

CusHimSecondLevelList.argTypes = defaultArgTypes;
CusHimSecondLevelList.args = {
  appearance: appearance.options[1],
  config: sampleData[1],
  gridCellRole: false
};

CusHimSecondLevelList.documentation = {
  title: 'CUS/HIM Icon - Second Level List'
};

export const CusHimSecondLevelMessage = Template.bind({});

CusHimSecondLevelMessage.argTypes = defaultArgTypes;
CusHimSecondLevelMessage.args = {
  appearance: appearance.options[2],
  config: sampleData[2],
  gridCellRole: false
};

CusHimSecondLevelMessage.documentation = {
  title: 'CUS/HIM - Second Level Message'
};

export default {
  decorators: [
    (Story) => (
      <div>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-cus-him'
};
