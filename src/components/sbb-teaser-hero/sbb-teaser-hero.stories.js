import { h } from 'jsx-dom';
import images from '../../global/images';
import readme from './readme.md';

// --- Controls
const imageLoading = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'eager',
    'lazy'
  ],
  table: {
    category: 'Performance'
  }
};

const openInNewWindowControl = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'true',
    'false'
  ]
};

// --- Component

const Template = (args) => (
  <sbb-teaser-hero {...args} />
);

export const defaultTeaser = Template.bind({});
export const openInNewWindow = Template.bind({});

defaultTeaser.argTypes = {
  'image-loading': imageLoading,
  'open-in-new-window': openInNewWindowControl
};

defaultTeaser.args = {
  'button-text': 'Button text',
  'image-loading': imageLoading.options[0],
  'image-src': images[0],
  'link': 'https://www.sbb.ch',
  'new-window-info-text': '',
  'open-in-new-window': openInNewWindowControl.options[1],
  'text': 'Panel text'
};

defaultTeaser.documentation = {
  title: 'Default Teaser'
};

openInNewWindow.argTypes = {
  'image-loading': imageLoading,
  'open-in-new-window': openInNewWindowControl
};

openInNewWindow.args = {
  'button-text': 'Button text',
  'image-loading': imageLoading.options[0],
  'image-src': images[0],
  'link': 'https://www.sbb.ch',
  'new-window-info-text': 'Link öffnet in neuem Fenster.',
  'open-in-new-window': openInNewWindowControl.options[0],
  'text': 'Panel text'
};

openInNewWindow.documentation = {
  title: 'Teaser Link open in new Window'
};

export default {
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'page sections/meant to be used with sbb-section wrapper/sbb-teaser-hero'
};
