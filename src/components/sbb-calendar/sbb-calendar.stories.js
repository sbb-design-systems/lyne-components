import events from './sbb-calendar.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-calendar {...args}></sbb-calendar>;

export const calendar = Template.bind({});

export default {
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.dateSelected],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/datepicker/sbb-calendar',
};
