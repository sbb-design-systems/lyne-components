import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-cus-him.sample-data';

const Template = (args) => (
  <lyne-timetable-cus-him
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
    appearance={args.appearance}
  >
  </lyne-timetable-cus-him>
);

const gridCellRole = {
  control: {
    type: 'boolean'
  }
};

const config = {
  table: {
    disable: false
  }
};

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

const defaultArgTypes = {
  config,
  gridCellRole,
  appearance
};

const defaultArgs = {
  gridCellRole: true,
  appearance: appearance.options[0]
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
  gridCellRole: false,
  config: sampleData[1],
  appearance: appearance.options[1]
};

CusHimSecondLevelList.documentation = {
  title: 'CUS/HIM Icon - Second Level List'
};

export const CusHimSecondLevelMessage = Template.bind({});

CusHimSecondLevelMessage.argTypes = defaultArgTypes;
CusHimSecondLevelMessage.args = {
  gridCellRole: false,
  config: sampleData[2],
  appearance: appearance.options[2]
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
