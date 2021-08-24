import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-accordion-item {...args}>
  </lyne-accordion-item>
);

export const AccordionItem = Template.bind({});

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
  title: 'lyne-accordion-item'
};

