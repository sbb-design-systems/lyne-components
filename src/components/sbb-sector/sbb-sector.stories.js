import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-sector {...args}></sbb-sector>;

const sectorLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Sector',
  },
};

const defaultArgTypes = {
  label: sectorLabel,
};

const defaultArgs = {
  label: 'Sector A',
};

export const sector = Template.bind({});
sector.argTypes = defaultArgTypes;
sector.args = defaultArgs;

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
  title: 'components/timetable/train-formation/sbb-sector',
};
