import { h } from 'jsx-dom';
import readme from './readme.md';

// --- Component

const Template = (args) => (
  <lyne-teaser-hero {...args} />
);

export const defaultTeaser = Template.bind({});

defaultTeaser.args = {
  'button-text': 'Button text',
  'image-src': 'https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg',
  'text': 'Panel text'
};

export default {
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-teaser-hero'
};
