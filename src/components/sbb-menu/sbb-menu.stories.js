// import events from './sbb-menu.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const userNameStyle = {
  fontFamily: 'var(--sbb-typo-type-face-sbb-bold)',
  fontSize: 'var(--sbb-font-size-text-xs)',
  marginTop: 'var(--sbb-spacing-fixed-1x)',
};

const userInfoStyle = {
  color: 'var(--sbb-color-graphite-default)',
  fontFamily: 'var(--sbb-typo-type-face-sbb-regular)',
  fontSize: 'var(--sbb-font-size-text-xxs)',
};

const DefaultTemplate = (args) => (
  <div>
    <sbb-button id="menu-trigger-1" size="m" label="Open menu"></sbb-button>

    <sbb-menu {...args} trigger="menu-trigger-1">
      <sbb-menu-action
        icon="link-small"
        href="https://github.com/lyne-design-system/lyne-components"
      >
        View
      </sbb-menu-action>
      <sbb-menu-action icon="pen-small">Edit</sbb-menu-action>
      <sbb-menu-action icon="swisspass-small" amount="2" disabled>
        Details
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </div>
);

const CustomContentTemplate = (args) => (
  <div>
    <sbb-button id="menu-trigger-2" size="m" label="Open menu"></sbb-button>

    <sbb-menu {...args} trigger="menu-trigger-2">
      <div style={userNameStyle}>Christina Müller</div>
      <span style={userInfoStyle}>UIS9057</span>
      <sbb-link
        href="https://github.com/lyne-design-system/lyne-components"
        text-size="xs"
        variant="block"
      >
        Profile
      </sbb-link>
      <sbb-divider />
      <sbb-menu-action
        icon="link-small"
        href="https://github.com/lyne-design-system/lyne-components"
      >
        View
      </sbb-menu-action>
      <sbb-menu-action icon="pen-small">Edit</sbb-menu-action>
      <sbb-menu-action icon="swisspass-small" amount="123">
        Details
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </div>
);

export const Default = DefaultTemplate.bind({});
export const CustomContent = CustomContentTemplate.bind({});

Default.args = {
  'some-prop': 'opt1',
};

Default.documentation = {
  title: 'Default',
};

CustomContent.documentation = {
  title: 'Custom Content',
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
    actions: {
      // handles: [events.click],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/menu/sbb-menu',
};
