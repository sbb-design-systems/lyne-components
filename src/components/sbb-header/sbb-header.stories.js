import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-header {...args}>
    <sbb-header-action
      icon="hamburger-menu-small"
      href="https://lyne-icons.netlify.app/icons/hamburger-menu-small.svg"
    >
      Test
    </sbb-header-action>
  </sbb-header>
);

export const header = Template.bind({});

header.args = {};

header.documentation = {
  title: 'Header',
};

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
  title: 'components/header/sbb-header',
};
