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

const DefaultTemplate = (args) => (
  <sbb-navigation-list {...args}>
    <sbb-navigation-action size="m">Tickets & Offers</sbb-navigation-action>
    <sbb-navigation-action size="m">Vacations & Recreation</sbb-navigation-action>
    <sbb-navigation-action size="m">Travel information</sbb-navigation-action>
    <sbb-navigation-action size="m">Help & Contact</sbb-navigation-action>
  </sbb-navigation-list>
);

const SlottedLabelTemplate = (args) => (
  <sbb-navigation-list {...args}>
    <span slot="label">Label</span>
    <sbb-navigation-action size="m">Tickets & Offers</sbb-navigation-action>
    <sbb-navigation-action size="m">Vacations & Recreation</sbb-navigation-action>
    <sbb-navigation-action size="m">Travel information</sbb-navigation-action>
    <sbb-navigation-action size="m">Help & Contact</sbb-navigation-action>
  </sbb-navigation-list>
);

export const Default = DefaultTemplate.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };
Default.documentation = { title: 'Size M' };

export const SlottedLabel = SlottedLabelTemplate.bind({});
SlottedLabel.argTypes = defaultArgTypes;
SlottedLabel.args = {};
SlottedLabel.documentation = { title: 'Size M' };

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
