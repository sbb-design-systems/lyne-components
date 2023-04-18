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

const style =
  'background-color: var(--sbb-color-midnight-default); width: max-content; padding: 2rem';

const navigationActionsL = (active) => [
  <sbb-navigation-action id="nav-1">Tickets & Offers</sbb-navigation-action>,
  <sbb-navigation-action id="nav-2" active={active}>
    Vacations & Recreation
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>,
  <sbb-navigation-action id="nav-4">Help & Contact</sbb-navigation-action>,
];

const navigationActionsS = (active) => [
  <sbb-navigation-action id="nav-5">Deutsch</sbb-navigation-action>,
  <sbb-navigation-action id="nav-6">Français</sbb-navigation-action>,
  <sbb-navigation-action id="nav-7" active={active}>
    Italiano
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-8">English</sbb-navigation-action>,
];

const SizeLTemplate = (args) => (
  <sbb-navigation-marker {...args}>{navigationActionsL(false)}</sbb-navigation-marker>
);

const SizeSTemplate = (args) => (
  <sbb-navigation-marker {...args}>{navigationActionsS(false)}</sbb-navigation-marker>
);

const SizeLActiveTemplate = (args) => (
  <sbb-navigation-marker {...args}>{navigationActionsL(true)}</sbb-navigation-marker>
);

const SizeSActiveTemplate = (args) => (
  <sbb-navigation-marker {...args}>{navigationActionsS(true)}</sbb-navigation-marker>
);

export const SizeL = SizeLTemplate.bind({});
SizeL.argTypes = defaultArgTypes;
SizeL.args = { ...defaultArgs };
SizeL.documentation = { title: 'Size L' };

export const SizeS = SizeSTemplate.bind({});
SizeS.argTypes = defaultArgTypes;
SizeS.args = { ...defaultArgs, size: size.options[1] };
SizeS.documentation = { title: 'Size S' };

export const SizeLActive = SizeLActiveTemplate.bind({});
SizeLActive.argTypes = defaultArgTypes;
SizeLActive.args = { ...defaultArgs };
SizeLActive.documentation = { title: 'Size L Active' };

export const SizeSActive = SizeSActiveTemplate.bind({});
SizeSActive.argTypes = defaultArgTypes;
SizeSActive.args = { ...defaultArgs, size: size.options[1] };
SizeSActive.documentation = { title: 'Size S Active' };

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
  title: 'components/sbb-navigation-marker',
};
