import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import type { SbbSecondaryButtonElement } from '../button.ts';

import { SbbNotificationElement } from './notification.component.ts';
import readme from './readme.md?raw';
import '../button/secondary-button.ts';
import '../link/link.ts';
import '../title.ts';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['info', 'note', 'success', 'warn', 'error'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
};

const animation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['all', 'close', 'open', 'none'],
};

const icon: InputType = {
  control: {
    type: 'text',
  },
};

const basicArgTypes: ArgTypes = {
  type,
  size,
  readonly,
  animation,
  'icon-name': icon,
};

const basicArgs: Args = {
  type: type.options![0],
  size: size.options![1],
  readonly: false,
  animation: animation.options![0],
  'icon-name': undefined,
};

const appendNotification = (event: Event, args: Args): void => {
  const title = document.createElement('sbb-title');
  title.level = '3';
  title.innerText = 'This is a title';

  const newNotification = document.createElement('sbb-notification');
  newNotification.style.setProperty(
    '--sbb-notification-margin',
    '0 0 var(--sbb-spacing-fixed-4x) 0',
  );
  newNotification.type = args['type'];
  newNotification.size = args['size'];
  newNotification.readOnly = args['readonly'];
  newNotification.animation = args['animation'];
  newNotification.iconName = args['icon-name'];
  newNotification.innerHTML =
    'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.';

  newNotification.prepend(title);
  (event.target as SbbSecondaryButtonElement).parentElement
    ?.querySelector('.notification-container')
    ?.append(newNotification);
};

const trigger = (args: Args): TemplateResult => html`
  <sbb-secondary-button
    size="m"
    style="max-width: fit-content"
    @click=${(event: Event) => appendNotification(event, args)}
    icon-name="circle-plus-small"
  >
    Add notification
  </sbb-secondary-button>
`;

const simpleNotification = (type: string, title: string): TemplateResult => html`
  <sbb-notification
    type="${type}"
    style="--sbb-notification-margin: 0 0 var(--sbb-spacing-fixed-4x) 0;"
  >
    <sbb-title level="3">${title}</sbb-title>
    This is a ${type} notification.
  </sbb-notification>
`;

const pageContent = (): TemplateResult => html`
  <p style="margin: 0;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis
    <sbb-link href="/"> link </sbb-link>
    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
`;

const DefaultTemplate = (args: Args): TemplateResult => html`
  <sbb-notification
    ${sbbSpread({ ...args, animation: 'close' })}
    style="--sbb-notification-margin: 0 0 var(--sbb-spacing-fixed-4x) 0;"
  >
    <sbb-title level="3">This is a title</sbb-title>
    The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
    <sbb-link href="/"> Link one</sbb-link>
    <sbb-link href="/"> Link two</sbb-link>
    <sbb-link href="/"> Link three</sbb-link>
  </sbb-notification>
`;

const MultipleNotificationsTemplate = (args: Args): TemplateResult => html`
  <sbb-notification
    ${sbbSpread({ ...args, animation: 'close' })}
    style="--sbb-notification-margin: 0 0 var(--sbb-spacing-fixed-4x) 0;"
  >
    <sbb-title level="3">This is a title</sbb-title>
    The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
    <sbb-link href="/"> Link one</sbb-link>
    <sbb-link href="/"> Link two</sbb-link>
    <sbb-link href="/"> Link three</sbb-link>
  </sbb-notification>

  ${simpleNotification('success', 'Success')} ${simpleNotification('warn', 'Warn')}
  ${simpleNotification('error', 'Error')}
`;

export const Info: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const Note: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, type: type.options![1] },
};

export const Success: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, type: type.options![2] },
};

export const Warn: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, type: type.options![3] },
};

export const Error: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, type: type.options![4] },
};

export const Readonly: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true },
};

export const SizeS: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, size: 's' },
};

export const MultipleNotifications: StoryObj = {
  render: MultipleNotificationsTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

const meta: Meta = {
  decorators: [
    (story, context) =>
      html`<div style="display: flex; gap: var(--sbb-spacing-fixed-4x); flex-direction: column;">
        ${trigger(context.args)}
        <div
          class="notification-container"
          style="display: flex; flex-direction: column;"
          aria-live="polite"
        >
          ${story()}
        </div>
        ${pageContent()}
      </div>`,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [
        SbbNotificationElement.events.open,
        SbbNotificationElement.events.close,
        SbbNotificationElement.events.beforeopen,
        SbbNotificationElement.events.beforeclose,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-notification',
};

export default meta;
