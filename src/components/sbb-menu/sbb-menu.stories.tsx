/** @jsx h */
import events from './sbb-menu.events';
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/testing';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('menu').shadowRoot.querySelector('.sbb-menu'),
  );

  await waitForStablePosition(() => canvas.getByTestId('menu-trigger'));

  const button = canvas.getByTestId('menu-trigger');
  await userEvent.click(button);
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Menu action',
  },
};

const amount: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Menu action',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Menu action',
  },
};

const disableAnimation: InputType = {
  control: { type: 'boolean' },
};

const defaultArgTypes: ArgTypes = {
  'icon-name': iconName,
  amount,
  disabled,
  'disable-animation': disableAnimation,
};

const defaultArgs: Args = {
  'icon-name': 'link-small',
  amount: '123',
  disabled: false,
  'disable-animation': isChromatic(),
};

const userNameStyle: Args = {
  fontFamily: 'var(--sbb-typo-type-face-sbb-bold)',
  fontSize: 'var(--sbb-font-size-text-xs)',
  marginTop: 'var(--sbb-spacing-fixed-1x)',
};

const userInfoStyle: Args = {
  color: 'var(--sbb-color-graphite-default)',
  fontFamily: 'var(--sbb-typo-type-face-sbb-regular)',
  fontSize: 'var(--sbb-font-size-text-xxs)',
};

const triggerButton = (id): JSX.Element => (
  <sbb-button data-testid="menu-trigger" id={id} size="m">
    Menu trigger
  </sbb-button>
);

const DefaultTemplate = (args): JSX.Element => (
  <Fragment>
    {triggerButton('menu-trigger-1')}
    <sbb-menu
      trigger="menu-trigger-1"
      data-testid="menu"
      disable-animation={args['disable-animation']}
    >
      <sbb-menu-action icon-name={args['icon-name']} href="https://www.sbb.ch/en">
        View
      </sbb-menu-action>
      <sbb-menu-action icon-name="pen-small" amount="16" disabled={args.disabled}>
        Edit
      </sbb-menu-action>
      <sbb-menu-action icon-name="swisspass-small" amount={args.amount}>
        Details
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon-name="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </Fragment>
);

const ListTemplate = (args): JSX.Element => (
  <Fragment>
    {triggerButton('menu-trigger-1')}
    <sbb-menu
      trigger="menu-trigger-1"
      data-testid="menu"
      disable-animation={args['disable-animation']}
    >
      <sbb-menu-action icon-name={args['icon-name']} href="https://www.sbb.ch/en">
        View
      </sbb-menu-action>
      <sbb-menu-action icon-name="pen-small" amount="16" disabled={args.disabled}>
        Edit
      </sbb-menu-action>
      <sbb-menu-action icon-name="swisspass-small" amount={args.amount}>
        Details
      </sbb-menu-action>
      <sbb-menu-action icon-name="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </Fragment>
);

const CustomContentTemplate = (args): JSX.Element => (
  <Fragment>
    {triggerButton('menu-trigger-2')}
    <sbb-menu
      trigger="menu-trigger-2"
      data-testid="menu"
      disable-animation={args['disable-animation']}
    >
      <div style={userNameStyle}>Christina Müller</div>
      <span style={userInfoStyle}>UIS9057</span>
      <sbb-link href="https://www.sbb.ch/en" negative size="xs" variant="block">
        Profile
      </sbb-link>
      <sbb-divider />
      <sbb-menu-action icon-name={args['icon-name']} href="https://www.sbb.ch/en">
        View
      </sbb-menu-action>
      <sbb-menu-action icon-name="tickets-class-small" disabled={args.disabled}>
        Tickets
      </sbb-menu-action>
      <sbb-menu-action icon-name="shopping-cart-small" amount={args.amount}>
        Cart
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon-name="exit-small">Log Out</sbb-menu-action>
    </sbb-menu>
  </Fragment>
);

const LongContentTemplate = (args): JSX.Element => (
  <Fragment>
    {triggerButton('menu-trigger-3')}
    <sbb-menu
      trigger="menu-trigger-3"
      data-testid="menu"
      disable-animation={args['disable-animation']}
    >
      <sbb-menu-action icon-name={args['icon-name']} disabled={args.disabled} amount={args.amount}>
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
      <sbb-menu-action icon-name="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </Fragment>
);

const EllipsisTemplate = (args): JSX.Element => (
  <Fragment>
    {triggerButton('menu-trigger-4')}
    <sbb-menu
      trigger="menu-trigger-4"
      data-testid="menu"
      disable-animation={args['disable-animation']}
    >
      <div style={userNameStyle}>Christina Müller</div>
      <span style={userInfoStyle}>UIS9057</span>
      <sbb-link href="https://www.sbb.ch/en" negative size="xs" variant="block">
        Profile
      </sbb-link>
      <sbb-divider />
      <sbb-menu-action icon-name={args['icon-name']} href="https://www.sbb.ch/en">
        View
      </sbb-menu-action>
      <sbb-menu-action icon-name="pen-small" disabled={args.disabled}>
        Edit
      </sbb-menu-action>
      <sbb-menu-action icon-name="swisspass-small" amount={args.amount}>
        Very long label that exceeds the maximum width of the menu, very long label that exceeds the
        maximum width of the menu, very long label that exceeds the maximum width of the menu
      </sbb-menu-action>
      <sbb-divider />
      <sbb-menu-action icon-name="cross-small">Cancel</sbb-menu-action>
    </sbb-menu>
  </Fragment>
);

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
  play: isChromatic() && playStory,
};

export const List: StoryObj = {
  render: ListTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
  play: isChromatic() && playStory,
};

export const CustomContent: StoryObj = {
  render: CustomContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, amount: '2' },
  play: isChromatic() && playStory,
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'tick-small', amount: undefined },
  play: isChromatic() && playStory,
};

export const Ellipsis: StoryObj = {
  render: EllipsisTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() && playStory,
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', 'min-height': isChromatic() ? '100vh' : undefined }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [events.willOpen, events.didOpen, events.didClose, events.willClose],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      story: { inline: false, iframeHeight: '400px' },

      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-menu/sbb-menu',
};

export default meta;
