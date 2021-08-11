import events from './lyne-cta-button.events.ts';
import { h } from 'jsx-dom';
import lyneIcons from 'lyne-icons/dist/icons.json';

const getMarkupForSvg = (svgName) => {
  const icon = lyneIcons.icons[svgName];
  const frag = document.createRange()
    .createContextualFragment(icon);

  return frag.firstChild;
};

const icons = {
  control: {
    type: 'select'
  },
  options: [
    'arrow-right-small',
    'arrow-down-small',
    'lyne-arrow-compass-small'
  ]
};

const variants = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'primary-negative',
    'secondary',
    'secondary-negative',
    'tertiary',
    'tertiary-negative',
    'transparent',
    'transparent-negative'
  ]
};

const Template = (args) => (
  <lyne-cta-button {...args}>
    {getMarkupForSvg(args.icon)}
  </lyne-cta-button>
);

export const button = Template.bind({});

button.argTypes = {
  disabled: false,
  icon: icons,
  variant: variants
};

/* eslint-disable sort-keys */
button.args = {
  variant: variants.options[0],
  label: 'Label',
  icon: icons.options[0],
  disabled: false
};
/* eslint-enable sort-keys */

export default {
  parameters: {
    actions: {
      handles: [events.click]
    },
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    }
  },
  title: 'Button'
};
