import events from './sbb-timetable-button.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import cusHimSampleData from '../sbb-timetable-cus-him/sbb-timetable-cus-him.sample-data';
import walkSampleData from '../sbb-timetable-transportation-walk//sbb-timetable-transportation-walk.sample-data';

const Template = (args) => (
  <sbb-timetable-button
    {...args}
  >
  </sbb-timetable-button>
);

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'earlier-connections',
    'later-connections',
    'cus-him',
    'walk'
  ],
  table: {
    category: 'Button Appearance'
  }
};

const config = {
  table: {
    category: 'Button Config'
  }
};

const disabledArg = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Button State'
  }
};

const eventId = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Button Config'
  }
};

const expanded = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Button State'
  }
};

const defaultArgTypes = {
  appearance,
  config,
  'disabled': disabledArg,
  'event-id': eventId,
  expanded
};

const defaultArgs = {
  'appearance': appearance.options[0],
  'config': {},
  'disabled': false,
  'event-id': '',
  'expanded': false
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const ButtonEarlierConnections = Template.bind({});

ButtonEarlierConnections.argTypes = defaultArgTypes;
ButtonEarlierConnections.args = {
  ...defaultArgs,
  'event-id': 'earlier-connections'
};

ButtonEarlierConnections.documentation = {
  title: 'Button Earlier Connections'
};

export const ButtonLaterConnections = Template.bind({});

ButtonLaterConnections.argTypes = defaultArgTypes;
ButtonLaterConnections.args = {
  ...defaultArgs,
  'appearance': appearance.options[1],
  'event-id': 'later-connections'
};

ButtonLaterConnections.documentation = {
  title: 'Button Later Connections'
};

export const ButtonCusHimSecondLevel = Template.bind({});

ButtonCusHimSecondLevel.argTypes = defaultArgTypes;
ButtonCusHimSecondLevel.args = {
  ...defaultArgs,
  'appearance': appearance.options[2],
  'config': cusHimSampleData[2],
  'event-id': 'show-cus-him-xyz'
};

ButtonCusHimSecondLevel.documentation = {
  title: 'Button CUS/HIM - Second Level'
};

export const ButtonWalkSecondLevel = Template.bind({});

ButtonWalkSecondLevel.argTypes = defaultArgTypes;
ButtonWalkSecondLevel.args = {
  ...defaultArgs,
  'appearance': appearance.options[3],
  'config': walkSampleData[3],
  'event-id': 'show-map-xyz'
};

ButtonWalkSecondLevel.documentation = {
  title: 'Button Walk - Second Level'
};

export default {
  decorators: [
    (Story) => (
      <div style='background: #f6f6f6; padding: 2rem;'>
        <Story/>
      </div>
    )
  ],
  parameters: {
    actions: {
      handles: [events.click]
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/timetable/sbb-timetable-button'
};
