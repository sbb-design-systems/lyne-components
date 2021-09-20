import { h } from 'jsx-dom';
import readme from './readme.md';

// --- Component

const Template = (args) => (
  <lyne-teaser-hero {...args} />
);

export const defaultTeaser = Template.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-teaser-hero'
};
