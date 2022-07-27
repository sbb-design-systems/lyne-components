import { h } from 'jsx-dom';
import readme from './readme.md';
import {
  SbbColorBlackDefault,
  SbbColorWhiteDefault,
} from '@sbb-esta/lyne-design-tokens';

const documentationPlatformContainerStyle = (context) => {
  if (context.args.negative) {
    return {};
  }

  return `background-color: ${SbbColorWhiteDefault};`;
};

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return `background-color: ${SbbColorBlackDefault};`;
  }

  return `background-color: ${SbbColorWhiteDefault};`;
};

const Template = (args) => (
  <div style="height: 340px; padding: 20px;">
    <sbb-divider {...args} />
  </div>
);

const orientation = {
  control: {
    type: 'select',
  },
  options: ['horizontal', 'vertical'],
};

const negative = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Appearance',
  },
};

const defaultArgTypes = {
  orientation,
  negative,
};

const defaultArgs = {
  orientation: orientation.options[0],
  negative: false,
};

export const divider = Template.bind({});

divider.args = JSON.parse(JSON.stringify(defaultArgs));
divider.argTypes = defaultArgTypes;
divider.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Divider',
};

export const dividerNegative = Template.bind({});

dividerNegative.argTypes = defaultArgTypes;
dividerNegative.args = {
  ...defaultArgs,
  negative: true,
};
dividerNegative.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Divider Negative',
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-divider',
};
