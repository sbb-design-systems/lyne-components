import events from './sbb-menu.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';

// Function to emulate pausing between interactions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByTestId('menu-trigger');
  await sleep(100);
  await userEvent.click(button);
};

const icon = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Menu action',
  },
};

const amount = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Menu action',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Menu action',
  },
};

const defaultArgTypes = {
  icon,
  amount,
  disabled,
};

const defaultArgs = {
  icon: 'link-small',
  amount: '123',
  disabled: false,
};

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
    <sbb-button
      data-testid="menu-trigger"
      id="menu-trigger-1"
      size="m"
      label="Menu trigger"
    ></sbb-button>

    <sbb-menu trigger="menu-trigger-1" no-animation={isChromatic()}>
      <sbb-menu-action icon={args.icon} href="https://www.sbb.ch/en">
        View
      </sbb-menu-action>
      <sbb-menu-action icon="pen-small" amount="16" disabled={args.disabled}>
        Edit
      </sbb-menu-action>
      <sbb-menu-action icon="swisspass-small" amount={args.amount}>
        Details
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </div>
);

const CustomContentTemplate = (args) => (
  <div>
    <sbb-button
      data-testid="menu-trigger"
      id="menu-trigger-2"
      size="m"
      label="Menu trigger"
    ></sbb-button>

    <sbb-menu trigger="menu-trigger-2" no-animation={isChromatic()}>
      <div style={userNameStyle}>Christina Müller</div>
      <span style={userInfoStyle}>UIS9057</span>
      <sbb-link href="https://www.sbb.ch/en" negative text-size="xs" variant="block">
        Profile
      </sbb-link>
      <sbb-divider />
      <sbb-menu-action icon={args.icon} href="https://www.sbb.ch/en">
        View
      </sbb-menu-action>
      <sbb-menu-action icon="tickets-class-small" disabled={args.disabled}>
        Tickets
      </sbb-menu-action>
      <sbb-menu-action icon="shopping-cart-small" amount={args.amount}>
        Cart
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon="exit-small">Log Out</sbb-menu-action>
    </sbb-menu>
  </div>
);

const LongContentTemplate = (args) => (
  <div>
    <sbb-button
      data-testid="menu-trigger"
      id="menu-trigger-3"
      size="m"
      label="Menu trigger"
    ></sbb-button>

    <sbb-menu trigger="menu-trigger-3" no-animation={isChromatic()}>
      <sbb-menu-action
        icon={args.icon}
        event-id="English"
        disabled={args.disabled}
        amount={args.amount}
      >
        English
      </sbb-menu-action>
      <sbb-menu-action>Deutsch</sbb-menu-action>
      <sbb-menu-action>Français</sbb-menu-action>
      <sbb-menu-action>Italiano</sbb-menu-action>
      <sbb-menu-action>Rumantsch</sbb-menu-action>
      <sbb-menu-action>Español</sbb-menu-action>
      <sbb-menu-action>Português</sbb-menu-action>
      <sbb-menu-action>日本語</sbb-menu-action>
      <sbb-menu-action>한국어</sbb-menu-action>
      <sbb-menu-action>广州话</sbb-menu-action>
      <sbb-menu-action>Afrikaans</sbb-menu-action>
      <sbb-menu-action>Svenska</sbb-menu-action>
      <sbb-menu-action>Dansk</sbb-menu-action>
      <sbb-menu-action>Nederlands</sbb-menu-action>
      <sbb-menu-action>Suomi</sbb-menu-action>
      <sbb-menu-action>українська мова</sbb-menu-action>
      <sbb-menu-action>አማርኛ</sbb-menu-action>
      <sbb-menu-action>ქართული ენა</sbb-menu-action>
      <sbb-menu-action>Afrikaans</sbb-menu-action>
      <sbb-menu-action>Svenska</sbb-menu-action>
      <sbb-menu-action>Dansk</sbb-menu-action>
      <sbb-menu-action>Nederlands</sbb-menu-action>
      <sbb-menu-action>Suomi</sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </div>
);

const EllipsisTemplate = (args) => (
  <div>
    <sbb-button
      data-testid="menu-trigger"
      id="menu-trigger-4"
      size="m"
      label="Menu trigger"
    ></sbb-button>

    <sbb-menu trigger="menu-trigger-4" no-animation={isChromatic()}>
      <div style={userNameStyle}>Christina Müller</div>
      <span style={userInfoStyle}>UIS9057</span>
      <sbb-link href="https://www.sbb.ch/en" negative text-size="xs" variant="block">
        Profile
      </sbb-link>
      <sbb-divider />
      <sbb-menu-action icon={args.icon} href="https://www.sbb.ch/en">
        View
      </sbb-menu-action>
      <sbb-menu-action icon="pen-small" disabled={args.disabled}>
        Edit
      </sbb-menu-action>
      <sbb-menu-action icon="swisspass-small" amount={args.amount}>
        Very long label that exceeds the maximum width of the menu, very long label that exceeds the
        maximum width of the menu, very long label that exceeds the maximum width of the menu
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </div>
);

export const Default = DefaultTemplate.bind({});
Default.argTypes = defaultArgTypes;
Default.args = { ...defaultArgs };
Default.args.disabled = true;
Default.documentation = { title: 'Default' };
Default.play = playStory;

export const CustomContent = CustomContentTemplate.bind({});
CustomContent.argTypes = defaultArgTypes;
CustomContent.args = { ...defaultArgs };
CustomContent.args.amount = '2';
CustomContent.documentation = { title: 'Custom Content' };
CustomContent.play = playStory;

export const LongContent = LongContentTemplate.bind({});
LongContent.argTypes = defaultArgTypes;
LongContent.args = { ...defaultArgs };
LongContent.args.icon = 'tick-small';
LongContent.args.amount = '';
LongContent.documentation = { title: 'Long Content' };
LongContent.play = playStory;

export const Ellipsis = EllipsisTemplate.bind({});
Ellipsis.argTypes = defaultArgTypes;
Ellipsis.args = { ...defaultArgs };
Ellipsis.documentation = { title: 'Ellipsis' };
Ellipsis.play = playStory;

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem; ${isChromatic() && 'min-height: 100vh'}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.willOpen, events.didOpen, events.didClose, events.willClose],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      inlineStories: false,
      iframeHeight: '400px',
      extractComponentDescription: () => readme,
    },
    chromatic: { delay: 300 },
  },
  title: 'components/menu/sbb-menu',
};
