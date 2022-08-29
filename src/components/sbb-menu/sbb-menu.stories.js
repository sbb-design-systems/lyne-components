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
    <sbb-button id="menu-trigger-1" size="m" label="Menu trigger"></sbb-button>
    <sbb-menu {...args} trigger="menu-trigger-1" open>
      <sbb-menu-action
        icon="link-small"
        href="https://github.com/lyne-design-system/lyne-components"
      >
        View
      </sbb-menu-action>
      <sbb-menu-action icon="pen-small" amount="1" disabled>
        Edit
      </sbb-menu-action>
      <sbb-menu-action icon="swisspass-small" amount="2">
        Details
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </div>
);

const CustomContentTemplate = (args) => (
  <div>
    <sbb-button id="menu-trigger-2" size="m" label="Menu trigger"></sbb-button>

    <sbb-menu {...args} trigger="menu-trigger-2" open>
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

const LongContentTemplate = (args) => (
  <div>
    <sbb-button id="menu-trigger-3" size="m" label="Menu trigger"></sbb-button>

    <sbb-menu {...args} trigger="menu-trigger-3">
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
      <sbb-menu-action icon="tick-small" event-id="English">
        English
      </sbb-menu-action>
      <sbb-menu-action event-id="German">Deutsch</sbb-menu-action>
      <sbb-menu-action event-id="French">Français</sbb-menu-action>
      <sbb-menu-action event-id="Italian">Italiano</sbb-menu-action>
      <sbb-menu-action>Rumantsch</sbb-menu-action>
      <sbb-menu-action>Español</sbb-menu-action>
      <sbb-menu-action>Português</sbb-menu-action>
      <sbb-menu-action>日本語</sbb-menu-action>
      <sbb-menu-action>한국어</sbb-menu-action>
      <sbb-menu-action>广州话</sbb-menu-action>
      <sbb-menu-action>Afrikaans</sbb-menu-action>
      <sbb-menu-action>українська мова</sbb-menu-action>
      <sbb-menu-action>Svenska</sbb-menu-action>
      <sbb-menu-action>Dansk</sbb-menu-action>
      <sbb-menu-action>Nederlands</sbb-menu-action>
      <sbb-menu-action>Suomi</sbb-menu-action>
      <sbb-menu-action>አማርኛ</sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </div>
);

const EllipsisTemplate = (args) => (
  <div>
    <sbb-button id="menu-trigger-4" size="m" label="Menu trigger"></sbb-button>

    <sbb-menu {...args} trigger="menu-trigger-4">
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
        Very long label that exceeds the maximum width of the menu, very long label that exceeds the
        maximum width of the menu, very long label that exceeds the maximum width of the menu
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </div>
);

export const Default = DefaultTemplate.bind({});
export const CustomContent = CustomContentTemplate.bind({});
export const LongContent = LongContentTemplate.bind({});
export const Ellipsis = EllipsisTemplate.bind({});

Default.args = {
  'some-prop': 'opt1',
};

Default.documentation = {
  title: 'Default',
};

CustomContent.documentation = {
  title: 'Custom Content',
};

CustomContent.documentation = {
  title: 'Long Content',
};

Ellipsis.documentation = {
  title: 'Ellipsis',
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
