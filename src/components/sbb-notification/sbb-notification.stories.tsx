/** @jsx h */
import events from './sbb-notification.events';
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['info', 'success', 'warn', 'error'],
};

const variant: InputType = {
  control: {
    type: 'radio',
  },
  options: ['default', 'colorful', 'transparent'],
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes: ArgTypes = {
  'title-content': titleContent,
  type: type,
  variant: variant,
  readonly: readonly,
  'disable-animation': disableAnimation,
};

const basicArgs: Args = {
  'title-content': 'Title',
  type: type.options[0],
  variant: variant.options[0],
  readonly: false,
  'disable-animation': true,
};

const appendNotification = (): void => {
  const newNotification = document.createElement('SBB-NOTIFICATION') as HTMLSbbNotificationElement;
  newNotification.style.setProperty(
    '--sbb-notification-margin',
    '0 0 var(--sbb-spacing-fixed-4x) 0'
  );
  newNotification.titleContent = 'Title';
  newNotification.innerHTML =
    'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.';
  document.querySelector('.notification-container').append(newNotification);
};

const trigger: JSX.Element = (
  <sbb-button
    size="m"
    variant="secondary"
    style={{ 'margin-block-end': 'var(--sbb-spacing-fixed-4x)' }}
    onClick={() => appendNotification()}
    icon-name="circle-information-small"
  >
    Add notification
  </sbb-button>
);

const notification = (args): JSX.Element => (
  <sbb-notification {...args} style={{ 'margin-block-end': 'var(--sbb-spacing-fixed-4x)' }}>
    The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.&nbsp;
    <sbb-link href="/" variant="block">
      Link one
    </sbb-link>
    &nbsp;
    <sbb-link href="/" variant="inline">
      Link two
    </sbb-link>
    &nbsp;
    <sbb-link href="/" variant="inline">
      Link three
    </sbb-link>
  </sbb-notification>
);

const pageContent: JSX.Element = (
  <p style={{ margin: '0' }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis{' '}
    <sbb-link href="/" variant="inline">
      link
    </sbb-link>{' '}
    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
);

const titleStyle: Args = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--sbb-spacing-fixed-1x)',
  background: 'var(--sbb-color-milk-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  padding: '0rem 0.5rem',
};

const DefaultTemplate = (args): JSX.Element => (
  <Fragment>
    {trigger}
    <div class="notification-container" style={{ display: 'flex', 'flex-direction': 'column' }}>
      {notification(args)}
    </div>
    {pageContent}
  </Fragment>
);

const SlottedTitleTemplate = (args): JSX.Element => (
  <Fragment>
    {trigger}
    <div class="notification-container" style={{ display: 'flex', 'flex-direction': 'column' }}>
      <sbb-notification {...args} style={{ 'margin-block-end': 'var(--sbb-spacing-fixed-4x)' }}>
        <span slot="title" style={titleStyle}>
          Slotted title <sbb-icon name="face-grinning-small" />
        </span>
        The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy
        dog.&nbsp;
        <sbb-link href="/" variant="block">
          Link one
        </sbb-link>
        &nbsp;
        <sbb-link href="/" variant="inline">
          Link two
        </sbb-link>
        &nbsp;
        <sbb-link href="/" variant="inline">
          Link three
        </sbb-link>
      </sbb-notification>
    </div>
    {pageContent}
  </Fragment>
);

export const InfoDefault: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const InfoColorful: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[1] },
};

export const InfoTransparent: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[2] },
};

export const SuccessDefault: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, type: type.options[1] },
};

export const SuccessColorful: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[1], type: type.options[1] },
};

export const SuccessTransparent: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[2], type: type.options[1] },
};

export const WarnDefault: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, type: type.options[2] },
};

export const WarnColorful: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[1], type: type.options[2] },
};

export const WarnTransparent: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[2], type: type.options[2] },
};

export const ErrorDefault: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, type: type.options[3] },
};

export const ErrorColorful: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[1], type: type.options[3] },
};

export const ErrorTransparent: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[2], type: type.options[3] },
};

export const ReadonlyDefault: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true },
};

export const ReadonlyColorful: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[1], readonly: true },
};

export const ReadonlyTransparent: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[2], readonly: true },
};

export const NoTitleDefault: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'title-content': undefined },
};

export const NoTitleColorful: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[1], 'title-content': undefined },
};

export const NoTitleTransparent: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, variant: variant.options[2], 'title-content': undefined },
};

export const SlottedTitle: StoryObj = {
  render: SlottedTitleTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'title-content': undefined },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [events.didOpen, events.didClose, events.willOpen, events.willClose],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-notification',
};

export default meta;
