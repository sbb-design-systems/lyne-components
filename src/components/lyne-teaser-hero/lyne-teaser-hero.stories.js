import { h } from 'jsx-dom';
import images from '../../global/images';
import readme from './readme.md';

// --- Component

const Template = (args) => (
  <lyne-teaser-hero {...args} />
);

export const defaultTeaser = Template.bind({});

defaultTeaser.args = {
  'button-text': 'Button text',
  'image-src': images[0],
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
