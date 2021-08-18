import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-pearlchain
    {...args}
  />

);

export const lynePearlchain = Template.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'width: 20rem; height: 20rem;'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-pearlchain'
};
