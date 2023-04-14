import { Fragment, h } from 'jsx-dom';
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

const navigationActions = () => (
  <Fragment>
    <sbb-navigation-action>Tickets & Offers</sbb-navigation-action>
    <sbb-navigation-action>Vacations & Recreation</sbb-navigation-action>
    <sbb-navigation-action>Travel information</sbb-navigation-action>
    <sbb-navigation-action>Help & Contact</sbb-navigation-action>
  </Fragment>
);

const style =
  'background-color: var(--sbb-color-midnight-default); width: max-content; padding: 2rem';

const DefaultTemplate = (args) => (
  <sbb-navigation-list {...args}>{navigationActions()}</sbb-navigation-list>
);

const SlottedLabelTemplate = (args) => (
  <sbb-navigation-list {...args}>
    <span slot="label">Slotted label</span>
    {navigationActions()}
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
      <div style={style}>
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
  title: 'components/sbb-navigation-list',
};
