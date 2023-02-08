import readme from './readme.md';

const Template = (args) => <sbb-datepicker-next-day {...args}></sbb-datepicker-next-day>;

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
    actions: {},
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'sbb-datepicker-next-day',
};
