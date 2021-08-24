import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-accordion {...args}>
  </lyne-accordion>
);

export const Accordion = Template.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'max-width: 20rem;'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-accordion'
};

