import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-train-blocked-passage {...args}></sbb-train-blocked-passage>;

export const blockedPassage = Template.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-train-blocked-passage',
};
