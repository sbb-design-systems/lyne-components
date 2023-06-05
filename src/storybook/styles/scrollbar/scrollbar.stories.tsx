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
  if (args.trackVisible) {
    scrollbarClass += '-track-visible';
  }

  return (
    <div class={`overflow-container ${scrollbarClass}${args.negative ? ' negative' : ''}`}>
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

const trackVisible = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  size,
  negative,
  trackVisible,
};

const defaultArgs = {
  size: size.options[0],
  negative: false,
  trackVisible: false,
};

export const Thin = Template.bind({});
Thin.argTypes = defaultArgTypes;
Thin.args = { ...defaultArgs };

export const ThinTrackVisible = Template.bind({});
ThinTrackVisible.argTypes = defaultArgTypes;
ThinTrackVisible.args = { ...defaultArgs, trackVisible: true };

export const ThinNegative = Template.bind({});
ThinNegative.argTypes = defaultArgTypes;
ThinNegative.args = { ...defaultArgs, negative: true };

export const ThinNegativeTrackVisible = Template.bind({});
ThinNegativeTrackVisible.argTypes = defaultArgTypes;
ThinNegativeTrackVisible.args = { ...defaultArgs, negative: true, trackVisible: true };

export const Thick = Template.bind({});
Thick.argTypes = defaultArgTypes;
Thick.args = { ...defaultArgs, size: size.options[1] };

export const ThickTrackVisible = Template.bind({});
ThickTrackVisible.argTypes = defaultArgTypes;
ThickTrackVisible.args = { ...defaultArgs, size: size.options[1], trackVisible: true };

export const ThickNegative = Template.bind({});
ThickNegative.argTypes = defaultArgTypes;
ThickNegative.args = { ...defaultArgs, size: size.options[1], negative: true };

export const ThickNegativeTrackVisible = Template.bind({});
ThickNegativeTrackVisible.argTypes = defaultArgTypes;
ThickNegativeTrackVisible.args = {
  ...defaultArgs,
  size: size.options[1],
  negative: true,
  trackVisible: true,
};

export default {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'styles/scrollbar',
};
