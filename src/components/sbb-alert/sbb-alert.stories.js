import events from './sbb-alert.events.ts';
import readme from './readme.md';
import { h } from 'jsx-dom';

const Default = (args) => (
  <sbb-alert {...args}>
    {args['content-slot-text']} <sbb-link href="#">Show more</sbb-link>
  </sbb-alert>
);

const WithoutLink = (args) => <sbb-alert {...args}>{args['content-slot-text']}</sbb-alert>;

const Playground = (args) => (
  <div>
    <Default {...args}></Default>
    <p>Other Content on the page</p>
    <div
      style={{
        display: 'flex',
        gap: '8px',
      }}
    >
      <sbb-button
        variant="secondary"
        label="Present"
        onClick={() => {
          // eslint-disable-next-line no-undef
          document.querySelector('sbb-alert').present();
        }}
      ></sbb-button>
      <sbb-button
        variant="secondary"
        label="Dismiss"
        onClick={() => {
          // eslint-disable-next-line no-undef
          document.querySelector('sbb-alert').dismiss();
        }}
      ></sbb-button>
    </div>
  </div>
);

const CustomSlots = (args) => (
  <sbb-alert {...args}>
    <sbb-icon name="disruption" slot="icon"></sbb-icon>
    <span slot="title">{args['title-content']}</span>
    {args['content-slot-text']} <sbb-link href="#">Show more</sbb-link>
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

const disabledAnimation = {
  control: {
    type: 'boolean',
  },
};

const ariaLivePoliteness = {
  control: {
    type: 'select',
  },
  options: ['off', 'polite', 'assertive'],
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

const defaultArgTypes = {
  'title-content': titleContent,
  'title-level': titleLevel,
  size,
  readonly,
  'disable-animation': disabledAnimation,
  'aria-live-politeness': ariaLivePoliteness,
  'icon-name': iconName,
  'content-slot-text': contentSlotText,
};

const defaultArgs = {
  'title-content': 'Interruption between Berne and Olten',
  'title-level': 3,
  size: size.options[0],
  readonly: false,
  'disable-animation': false,
  'aria-live-politeness': ariaLivePoliteness.options[2],
  'icon-name': 'info',
  'content-slot-text':
    "Between Bern and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock construction work will take place. You have to expect changed travel times and changed connections.",
};

export const defaultAlert = Playground.bind({});
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

export const withoutLink = WithoutLink.bind({});
withoutLink.argTypes = defaultArgTypes;
withoutLink.args = { ...defaultArgs };

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
  ],
  parameters: {
    actions: {
      handles: [events.willPresent, events.didPresent, events.didDismiss],
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
