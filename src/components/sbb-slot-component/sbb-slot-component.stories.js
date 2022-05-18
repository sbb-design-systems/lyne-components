import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-slot-component {...args}>test</sbb-slot-component>
);

export const story1 = Template.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform']
  },
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lab/sbb-slot-component'
};
