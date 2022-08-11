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

const Template = (args) => (
  <div style="text-align: left">
    <sbb-button
      id="menu-trigger-1"
      size="m"
      label="Open menu"
      style="margin-bottom: 2rem"
    ></sbb-button>
    <sbb-menu {...args} trigger="menu-trigger-1">
      <sbb-menu-action icon="link-small" href="javascript:void(0)">
        View
      </sbb-menu-action>
      <sbb-menu-action icon="pen-small" href="javascript:void(0)">
        Edit
      </sbb-menu-action>
      <sbb-menu-action icon="swisspass-small" amount="2" onclick="console.log('Button clicked')">
        Delete
      </sbb-menu-action>

      <sbb-divider />

      <sbb-menu-action icon="cross-small" onclick="console.log('Close clicked')">
        Cancel
      </sbb-menu-action>
    </sbb-menu>

    <div style="width: 100%; height: 250px; background: var(--sbb-color-cloud-default);"></div>

    <sbb-button
      id="menu-trigger-2"
      size="m"
      label="Open menu"
      style="margin: 2rem 0rem 2rem 0rem"
    ></sbb-button>
    <sbb-menu {...args} trigger="menu-trigger-2">
      <div style={userNameStyle}>Christina Müller</div>
      <span style={userInfoStyle}>UIS9057</span>
      {/* TODO --> fix sbb-link component */}
      <sbb-link
        href="https://github.com/lyne-design-system/lyne-components"
        text-size="xs"
        variant="block"
      >
        Profile
      </sbb-link>

      <sbb-divider />

      <sbb-menu-action icon="link-small" href="javascript:void(0)">
        View
      </sbb-menu-action>
      <sbb-menu-action icon="pen-small" href="javascript:void(0)">
        Edit
      </sbb-menu-action>
      <sbb-menu-action icon="swisspass-small" amount="123" onclick="console.log('Button clicked')">
        Delete
      </sbb-menu-action>

      <sbb-divider />

      <sbb-menu-action icon="cross-small" onclick="console.log('Close clicked')">
        Cancel
      </sbb-menu-action>
    </sbb-menu>

    <div style="width: 100%; height: 250px; background: var(--sbb-color-cloud-default);"></div>
  </div>
);

export const story1 = Template.bind({});

story1.args = {
  'some-prop': 'opt1',
};

story1.documentation = {
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
  title: 'sbb-menu',
};
