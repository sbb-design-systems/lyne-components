import events from './lyne-timetable-button.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-timetable-button {...args}></lyne-timetable-button>
);

const variant = {
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
    category: 'General properties'
  }
};

const defaultArgTypes = {
  variant: variant
};

const defaultArgs = {
  variant: variant.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const ButtonEarlierConnections = Template.bind({});

ButtonEarlierConnections.argTypes = defaultArgTypes;
ButtonEarlierConnections.args = {
  ...defaultArgs
};

ButtonEarlierConnections.documentation = {
  title: 'Button Earlier Connections'
};

export const ButtonLaterConnections = Template.bind({});

ButtonLaterConnections.argTypes = defaultArgTypes;
ButtonLaterConnections.args = {
  ...defaultArgs,
  variant: variant.options[1]
};

ButtonLaterConnections.documentation = {
  title: 'Button Later Connections'
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
    actions: {
      handles: [events.click]
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-button'
};
