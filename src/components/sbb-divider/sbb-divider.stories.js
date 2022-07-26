import { h } from 'jsx-dom';
import readme from './readme.md';
import {
  SbbColorBlackDefault,
  SbbColorWhiteDefault,
} from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens';

const documentationPlatformContainerStyle = (context) => {
  if (context.args.negative) {
    return {};
  }

  return `background-color: ${SbbColorWhiteDefault};`;
};

const wrapperStyle = (context) => {
  setTimeout(() => {
    // eslint-disable-next-line no-undef
    let sbbDividerHTMLElement = document.querySelectorAll('sbb-divider');
    if (sbbDividerHTMLElement) {
      sbbDividerHTMLElement[0].style.height = '340px';
    }
  });

  if (context.args.negative) {
    return `background-color: ${SbbColorBlackDefault};`;
  }

  return `background-color: ${SbbColorWhiteDefault};`;
};

const Template = (args) => <sbb-divider {...args} />;

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
      <div style={`${wrapperStyle(context)} padding: 20px;`}>
        <Story />
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
