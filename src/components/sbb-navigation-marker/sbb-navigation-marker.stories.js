import { h } from 'jsx-dom';
import readme from './readme.md';

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 's'],
};

const defaultArgTypes = {
  size,
};

const defaultArgs = {
  size: size.options[0],
};

const SizeLTemplate = (args) => (
  <sbb-navigation-marker {...args}>
    <sbb-navigation-action id="nav-1">Tickets & Offers</sbb-navigation-action>
    <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>
    <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>
    <sbb-navigation-action id="nav-4">Help & Contact</sbb-navigation-action>
  </sbb-navigation-marker>
);

const SizeSTemplate = (args) => (
  <sbb-navigation-marker {...args}>
    <sbb-navigation-action id="nav-5">Deutsch</sbb-navigation-action>
    <sbb-navigation-action id="nav-6">Français</sbb-navigation-action>
    <sbb-navigation-action id="nav-7">Italiano</sbb-navigation-action>
    <sbb-navigation-action id="nav-8">English</sbb-navigation-action>
  </sbb-navigation-marker>
);

export const SizeL = SizeLTemplate.bind({});
SizeL.argTypes = defaultArgTypes;
SizeL.args = { ...defaultArgs };
SizeL.documentation = { title: 'Size L' };

export const SizeS = SizeSTemplate.bind({});
SizeS.argTypes = defaultArgTypes;
SizeS.args = { ...defaultArgs, size: size.options[1] };
SizeS.documentation = { title: 'Size S' };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem;'}>
        <Story />
      </div>
    ),
  ],
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
  title: 'components/navigation/sbb-navigation-marker',
};
