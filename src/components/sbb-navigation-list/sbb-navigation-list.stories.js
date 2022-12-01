import { h } from 'jsx-dom';
import readme from './readme.md';

const label = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  label,
};

const defaultArgs = {
  label: 'Label',
};

const SizeMTemplate = (args) => (
  <sbb-navigation-list {...args}>
    <sbb-navigation-action size="m">Tickets & Offers</sbb-navigation-action>
    <sbb-navigation-action size="m">Vacations & Recreation</sbb-navigation-action>
    <sbb-navigation-action size="m">Travel information</sbb-navigation-action>
    <sbb-navigation-action size="m">Help & Contact</sbb-navigation-action>
  </sbb-navigation-list>
);

export const SizeM = SizeMTemplate.bind({});
SizeM.argTypes = defaultArgTypes;
SizeM.args = { ...defaultArgs };
SizeM.documentation = { title: 'Size M' };

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
    actions: {
      handles: [],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/navigation/sbb-navigation-list',
};
