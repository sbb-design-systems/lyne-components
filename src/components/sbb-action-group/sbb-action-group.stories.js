import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-action-group {...args}>
    <sbb-button variant="secondary" label="Action 1" />
    <sbb-button label="Action 2" />
  </sbb-action-group>
);

const orientationArg = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFromArg = {
  control: {
    type: 'inline-radio',
  },
  options: ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const alignArg = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'center', 'stretch', 'end'],
};

const basicArgs = {
  orientation: 'horizontal',
  'horizontal-from': 'medium',
  align: 'start',
};

const basicArgTypes = {
  orientation: orientationArg,
  'horizontal-from': horizontalFromArg,
  align: alignArg,
};

export const sbbActionGroup = Template.bind({});
sbbActionGroup.argTypes = basicArgTypes;
sbbActionGroup.args = basicArgs;
sbbActionGroup.documentation = {
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
  title: 'components/layout/sbb-action-group',
};
