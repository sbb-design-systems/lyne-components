import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-wagon-blocked-passage {...args}></sbb-wagon-blocked-passage>;

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
  title: 'components/timetable/train-formation/sbb-wagon-blocked-passage',
};
