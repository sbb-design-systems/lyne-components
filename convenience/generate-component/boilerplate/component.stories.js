import events from './__name__.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <__name__ {...args}></__name__>;

export const story1 = Template.bind({});

story1.args = {
  'some-prop': 'opt1',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.click],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: '__name__',
};
