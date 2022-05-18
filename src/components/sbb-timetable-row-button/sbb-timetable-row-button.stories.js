import events from './sbb-timetable-row-button.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-timetable-row-button {...args}></sbb-timetable-row-button>
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
  expanded: false
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbTimetableRowButton = Template.bind({});

SbbTimetableRowButton.argTypes = defaultArgTypes;
SbbTimetableRowButton.args = {
  ...defaultArgs
};

SbbTimetableRowButton.documentation = {
  title: 'SBB Timetable Row Button'
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
  title: 'internals/sbb-timetable-row-button'
};
