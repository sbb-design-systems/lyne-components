import { h } from 'jsx-dom';

import readme from './readme.md';
import './scrollbar-internal.scss';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

const Template = (args) => {
  let scrollbarClass = 'scrollbar';
  if (args.size === 'thick') {
    scrollbarClass += '-thick';
  }
  if (args.negative) {
    scrollbarClass += '-negative';
  }
  return (
    <div class={`overflow-container ${scrollbarClass}`}>
      <div class="inner-box">{text}</div>
    </div>
  );
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['thin', 'thick'],
};

const negative = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  size,
  negative,
};

const defaultArgs = {
  size: size.options[0],
  negative: false,
};

export const Thin = Template.bind({});
Thin.argTypes = defaultArgTypes;
Thin.args = { ...defaultArgs };

export const ThinNegative = Template.bind({});
ThinNegative.argTypes = defaultArgTypes;
ThinNegative.args = { ...defaultArgs, negative: true };

export const Thick = Template.bind({});
Thick.argTypes = defaultArgTypes;
Thick.args = { ...defaultArgs, size: size.options[1] };

export const ThickNegative = Template.bind({});
ThickNegative.argTypes = defaultArgTypes;
ThickNegative.args = { ...defaultArgs, size: size.options[1], negative: true };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'styles/scrollbar',
};
