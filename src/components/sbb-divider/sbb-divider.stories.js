import { h } from 'jsx-dom';
import readme from './readme.md';
import {
  SbbColorBlackDefault,
  SbbColorWhiteDefault,
} from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens';

const documentationPlatformContainerStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return {};
  }

  return {
    'background-color': SbbColorWhiteDefault,
  };
};

const wrapperStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

  return `background-color: ${SbbColorBlackDefault};`;
};

const Template = (args) => <sbb-divider {...args} />;

const orientation = {
  control: {
    type: 'select',
  },
  options: ['horizontal', 'vertical'],
};

const appearance = {
  control: {
    type: 'select',
  },
  options: ['primary', 'primary-negative'],
  table: {
    category: 'Appearance',
  },
};

const defaultArgTypes = {
  orientation,
  appearance,
};

const defaultArgs = {
  orientation: orientation.options[0],
  appearance: appearance.options[0],
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
  appearance: appearance.options[1],
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
      <div style={`${wrapperStyle(context)} padding: 20px;`}>
        <Story style="height: 400px;" />
      </div>
    ),
  ],
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform'],
  },
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
