import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-timetable-platform
    platform={args.platform}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
  >
  </lyne-timetable-platform>
);

const gridCellRole = {
  control: {
    type: 'boolean'
  }
};

const platform = {
  control: {
    type: 'text'
  }
};

const defaultArgTypes = {
  gridCellRole,
  platform
};

const defaultArgs = {
  gridCellRole: true,
  platform: '13A/C'
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneTimetablePlatform = Template.bind({});

LyneTimetablePlatform.argTypes = defaultArgTypes;
LyneTimetablePlatform.args = {
  ...defaultArgs
};

LyneTimetablePlatform.documentation = {
  title: 'Lyne Timetable Platform'
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
  title: 'Timetable/lyne-timetable-platform'
};
