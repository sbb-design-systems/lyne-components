import events from './lyne-timetable-row-button.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-timetable-row-button {...args}></lyne-timetable-row-button>
);

const expanded = {
  control: {
    type: 'boolean'
  }
};

const defaultArgTypes = {
  expanded
};

const defaultArgs = {
  'expanded': false
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneTimetableRowButton = Template.bind({});

LyneTimetableRowButton.argTypes = defaultArgTypes;
LyneTimetableRowButton.args = {
  ...defaultArgs
};

LyneTimetableRowButton.documentation = {
  title: 'Lyne Timetable Row Button'
};

export default {
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform']
  },
  parameters: {
    actions: {
      handles: [events.click]
    },
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-row-button'
};
