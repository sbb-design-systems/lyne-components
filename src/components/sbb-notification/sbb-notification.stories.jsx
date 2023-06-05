import events from './sbb-notification.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

const titleContent = {
  control: {
    type: 'text',
  },
};

const type = {
  control: {
    type: 'select',
  },
  options: ['info', 'success', 'warn', 'error'],
};

const variant = {
  control: {
    type: 'radio',
  },
  options: ['default', 'colorful', 'transparent'],
};

const readonly = {
  control: {
    type: 'boolean',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  'title-content': titleContent,
  type: type,
  variant: variant,
  readonly: readonly,
  'disable-animation': disableAnimation,
};

const basicArgs = {
  'title-content': 'Title',
  type: type.options[0],
  variant: variant.options[0],
  readonly: false,
  'disable-animation': false,
};

const trigger = () => (
  <sbb-button
    size="m"
    style={'margin-block-end: var(--sbb-spacing-fixed-4x)'}
    onClick={() => document.querySelector('sbb-notification').open()}
    icon-name="circle-information-small"
  >
    Show notification
  </sbb-button>
);

const titleStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--sbb-spacing-fixed-1x)',
  background: 'var(--sbb-color-milk-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  padding: '0rem 0.5rem',
};

const DefaultTemplate = (args) => [
  trigger(),
  <sbb-notification {...args}>
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
  </sbb-notification>,
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis{' '}
    <sbb-link href="/" variant="inline">
      link
    </sbb-link>{' '}
    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>,
];

const SlottedTitleTemplate = (args) => [
  trigger(),
  <sbb-notification {...args}>
    <span slot="title" style={titleStyle}>
      Slotted title <sbb-icon name="face-grinning-small" />
    </span>
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
  </sbb-notification>,
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis{' '}
    <sbb-link href="/" variant="inline">
      link
    </sbb-link>{' '}
    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>,
];

export const InfoDefault = DefaultTemplate.bind({});
InfoDefault.argTypes = basicArgTypes;
InfoDefault.args = { ...basicArgs };

export const InfoColorful = DefaultTemplate.bind({});
InfoColorful.argTypes = basicArgTypes;
InfoColorful.args = { ...basicArgs, variant: variant.options[1] };

export const InfoTransparent = DefaultTemplate.bind({});
InfoTransparent.argTypes = basicArgTypes;
InfoTransparent.args = { ...basicArgs, variant: variant.options[2] };

export const SuccessDefault = DefaultTemplate.bind({});
SuccessDefault.argTypes = basicArgTypes;
SuccessDefault.args = { ...basicArgs, type: type.options[1] };

export const SuccessColorful = DefaultTemplate.bind({});
SuccessColorful.argTypes = basicArgTypes;
SuccessColorful.args = { ...basicArgs, variant: variant.options[1], type: type.options[1] };

export const SuccessTransparent = DefaultTemplate.bind({});
SuccessTransparent.argTypes = basicArgTypes;
SuccessTransparent.args = { ...basicArgs, variant: variant.options[2], type: type.options[1] };

export const WarnDefault = DefaultTemplate.bind({});
WarnDefault.argTypes = basicArgTypes;
WarnDefault.args = { ...basicArgs, type: type.options[2] };

export const WarnColorful = DefaultTemplate.bind({});
WarnColorful.argTypes = basicArgTypes;
WarnColorful.args = { ...basicArgs, variant: variant.options[1], type: type.options[2] };

export const WarnTransparent = DefaultTemplate.bind({});
WarnTransparent.argTypes = basicArgTypes;
WarnTransparent.args = { ...basicArgs, variant: variant.options[2], type: type.options[2] };

export const ErrorDefault = DefaultTemplate.bind({});
ErrorDefault.argTypes = basicArgTypes;
ErrorDefault.args = { ...basicArgs, type: type.options[3] };

export const ErrorColorful = DefaultTemplate.bind({});
ErrorColorful.argTypes = basicArgTypes;
ErrorColorful.args = { ...basicArgs, variant: variant.options[1], type: type.options[3] };

export const ErrorTransparent = DefaultTemplate.bind({});
ErrorTransparent.argTypes = basicArgTypes;
ErrorTransparent.args = { ...basicArgs, variant: variant.options[2], type: type.options[3] };

export const ReadonlyDefault = DefaultTemplate.bind({});
ReadonlyDefault.argTypes = basicArgTypes;
ReadonlyDefault.args = { ...basicArgs, readonly: true };

export const ReadonlyColorful = DefaultTemplate.bind({});
ReadonlyColorful.argTypes = basicArgTypes;
ReadonlyColorful.args = { ...basicArgs, variant: variant.options[1], readonly: true };

export const ReadonlyTransparent = DefaultTemplate.bind({});
ReadonlyTransparent.argTypes = basicArgTypes;
ReadonlyTransparent.args = { ...basicArgs, variant: variant.options[2], readonly: true };

export const NoTitleDefault = DefaultTemplate.bind({});
NoTitleDefault.argTypes = basicArgTypes;
NoTitleDefault.args = { ...basicArgs, 'title-content': undefined };

export const NoTitleColorful = DefaultTemplate.bind({});
NoTitleColorful.argTypes = basicArgTypes;
NoTitleColorful.args = { ...basicArgs, variant: variant.options[1], 'title-content': undefined };

export const NoTitleTransparent = DefaultTemplate.bind({});
NoTitleTransparent.argTypes = basicArgTypes;
NoTitleTransparent.args = { ...basicArgs, variant: variant.options[2], 'title-content': undefined };

export const SlottedTitle = SlottedTitleTemplate.bind({});
SlottedTitle.argTypes = basicArgTypes;
SlottedTitle.args = { ...basicArgs, 'title-content': undefined };

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
    withActions,
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
