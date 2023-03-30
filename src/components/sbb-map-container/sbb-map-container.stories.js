import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = () => <sbb-map-container></sbb-map-container>;

export const story1 = Template.bind({});

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
  title: 'sbb-map-container',
};
