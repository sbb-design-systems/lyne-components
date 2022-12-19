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
    <span slot="label">Slotted label</span>
    <sbb-navigation-action size="m">Tickets & Offers</sbb-navigation-action>
    <sbb-navigation-action size="m">Vacations & Recreation</sbb-navigation-action>
    <sbb-navigation-action size="m">Travel information</sbb-navigation-action>
    <sbb-navigation-action size="m">Help & Contact</sbb-navigation-action>
  </sbb-navigation-list>
);

export const Default = DefaultTemplate.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };
Default.documentation = { title: 'Default' };

export const SlottedLabel = SlottedLabelTemplate.bind({});
SlottedLabel.argTypes = defaultArgTypes;
SlottedLabel.args = {};
SlottedLabel.documentation = { title: 'Slotted label' };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
  title: 'components/navigation/sbb-navigation-list',
};
