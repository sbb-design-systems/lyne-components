import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-header-action {...args}></sbb-header-action>;

const iconArg = {
  control: {
    type: 'select',
  },
  options: ['arrow-right-small', 'arrow-down-small', 'arrow-compass-small', 'pie-small'],
};

const expandFromArg = {
  control: {
    type: 'inline-radio',
  },
  options: ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const isAnchorOrButtonArg = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  icon: iconArg,
  'expand-from': expandFromArg,
  'is-anchor-or-button': isAnchorOrButtonArg,
};

const basicArgs = {
  icon: 'pie-small',
  'expand-from': 'medium',
  'is-anchor-or-button': false,
};

export const sbbHeaderAction = Template.bind({});

sbbHeaderAction.args = JSON.parse(JSON.stringify(basicArgs));

sbbHeaderAction.argTypes = basicArgTypes;

sbbHeaderAction.documentation = {
  title: 'Title which will be rendered on documentation platform',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
  title: 'components/header/sbb-header-action',
};
