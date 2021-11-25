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
    disable: true
  }
};

const variant = {
  control: {
    type: 'select'
  },
  options: [
    'first-level-list',
    'second-level-list',
    'second-level-text'
  ]
};

const defaultArgTypes = {
  config,
  gridCellRole,
  variant
};

const defaultArgs = {
  gridCellRole: true,
  variant: variant.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const CusHimList = Template.bind({});

CusHimList.argTypes = defaultArgTypes;
CusHimList.args = {
  ...defaultArgs,
  config: sampleData[0]
};

CusHimList.documentation = {
  title: 'CUS HIM Icon List'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
