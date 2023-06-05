import events from './sbb-alert.events.ts';
import readme from './readme.md';
import { h } from 'jsx-dom';
import { withActions } from '@storybook/addon-actions/decorator';

const Default = ({ 'content-slot-text': contentSlotText, ...args }) => (
  <sbb-alert {...args}>{contentSlotText}</sbb-alert>
);

const DefaultWithOtherContent = (args) => {
  return (
    <div>
      <Default {...args}></Default>
      <p>Other Content on the page.</p>
      {!args.readonly && (
        <p>
          Dismissal event of the alert has to be caught by the consumer and the alert has to be
          manually removed from DOM. See `sbb-alert-group` for demonstration.
        </p>
      )}
    </div>
  );
};

const CustomSlots = ({
  'title-content': titleContent,
  'content-slot-text': contentSlotText,
  ...args
}) => (
  <sbb-alert {...args}>
    <sbb-icon name="disruption" slot="icon"></sbb-icon>
    <span slot="title">{titleContent}</span>
    {contentSlotText}
  </sbb-alert>
);

const titleContent = {
  control: {
    type: 'text',
  },
};

const titleLevel = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const size = {
  control: {
    type: 'select',
  },
  options: ['m', 'l'],
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

const iconName = {
  control: {
    type: 'text',
  },
};

const contentSlotText = {
  control: {
    type: 'text',
  },
};

const linkContent = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const href = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const target = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const defaultArgTypes = {
  'title-content': titleContent,
  'title-level': titleLevel,
  size,
  readonly,
  'disable-animation': disableAnimation,
  'icon-name': iconName,
  'content-slot-text': contentSlotText,
  'link-content': linkContent,
  href,
  target,
  rel,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs = {
  'title-content': 'Interruption between Berne and Olten',
  'title-level': 3,
  size: size.options[0],
  readonly: false,
  'disable-animation': false,
  'icon-name': 'info',
  'content-slot-text':
    "Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock construction work will take place. You have to expect changed travel times and changed connections.",
  'link-content': undefined,
  href: 'https://www.sbb.ch',
  target: undefined,
  rel: undefined,
  'accessibility-label': undefined,
};

export const defaultAlert = DefaultWithOtherContent.bind({});
defaultAlert.argTypes = defaultArgTypes;
defaultAlert.args = { ...defaultArgs };

export const sizeL = Default.bind({});
sizeL.argTypes = defaultArgTypes;
sizeL.args = { ...defaultArgs, size: 'l' };

export const withoutCloseButton = Default.bind({});
withoutCloseButton.argTypes = defaultArgTypes;
withoutCloseButton.args = { ...defaultArgs, readonly: true };

export const withDisabledAnimation = Default.bind({});
withDisabledAnimation.argTypes = defaultArgTypes;
withDisabledAnimation.args = { ...defaultArgs, 'disable-animation': true };

export const withoutLink = Default.bind({});
withoutLink.argTypes = defaultArgTypes;
withoutLink.args = { ...defaultArgs, href: undefined };

export const withCustomLinkText = Default.bind({});
withCustomLinkText.argTypes = defaultArgTypes;
withCustomLinkText.args = { ...defaultArgs, ['link-content']: 'Follow this link (custom text)' };

export const iconAndTitleAsSlot = CustomSlots.bind({});
iconAndTitleAsSlot.argTypes = defaultArgTypes;
// Remove icon name as it has no purpose in slotted variant
delete iconAndTitleAsSlot.argTypes['icon-name'];
iconAndTitleAsSlot.args = { ...defaultArgs };
// Remove icon name as it has no purpose in slotted variant
delete iconAndTitleAsSlot.args['icon-name'];

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
      handles: [events.willPresent, events.didPresent, events.dismissalRequested],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-alert',
};
