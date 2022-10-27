import events from './sbb-dialog.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleImages from '../../global/images';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';

// Function to emulate pausing between interactions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByTestId('dialog-trigger');
  await sleep(300);
  await userEvent.click(button);
};

const titleContent = {
  control: {
    type: 'text',
  },
};

const titleBackButton = {
  control: {
    type: 'boolean',
  },
};

const negative = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Appearance',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityDescribedby = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityLabelledby = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const basicArgTypes = {
  'title-content': titleContent,
  'title-back-button': titleBackButton,
  negative,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
};

const basicArgs = {
  'title-content': 'Title',
  'title-back-button': true,
  negative: false,
  'accessibility-label': undefined,
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
};

const openDialog = (event, id) => {
  const dialog = document.getElementById(id);
  dialog.present(event);
};

const closeDialog = (id, returnValue) => {
  const dialog = document.getElementById(id);
  dialog.dismiss(returnValue);
};

const onFormDialogClose = (dialog) => {
  dialog.addEventListener('sbb-dialog_will-dismiss', (event) => {
    if (event.detail) {
      document.getElementById(
        'returned-value-message'
      ).innerHTML = `${event.detail.message?.value}`;
      document.getElementById('returned-value-animal').innerHTML = `${event.detail.animal?.value}`;
    }
  });
};

const triggerButton = (dialogId) => (
  <sbb-button
    data-testid="dialog-trigger"
    size="m"
    type="button"
    onClick={(event) => openDialog(event, dialogId)}
    style={'--sbb-focus-outline-color: var(--sbb-focus-outline-color-default)'}
  >
    Open dialog
  </sbb-button>
);

const actionGroup = (negative, dialogId) => (
  <sbb-action-group
    slot="action-group"
    align-group="stretch"
    orientation="vertical"
    horizontal-from="medium"
  >
    <sbb-link
      variant="block"
      text-size="s"
      align-self="start"
      icon-name="chevron-small-left-small"
      icon-placement="start"
      href="https://www.sbb.ch/en/"
      negative={negative}
    >
      Link
    </sbb-link>
    <sbb-button size="m" variant="secondary" onClick={() => closeDialog(dialogId)}>
      Cancel
    </sbb-button>
    <sbb-button size="m" variant="primary" onClick={() => closeDialog(dialogId)}>
      Button
    </sbb-button>
  </sbb-action-group>
);

const focusStyle = (context) => {
  if (context.args.negative) {
    return `--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);`;
  }
};

const codeStyle = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  marginInline: 'var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const formDetailsStyle = {
  marginTop: 'var(--sbb-spacing-fixed-4x)',
  padding: 'var(--sbb-spacing-fixed-4x)',
  borderRadius: 'var(--sbb-border-radius-8x)',
  backgroundColor: 'var(--sbb-color-milk-default)',
};

const formStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--sbb-spacing-fixed-4x)',
};

const DefaultTemplate = (args) => [
  triggerButton('my-dialog-1'),
  <sbb-dialog id="my-dialog-1" {...args} disable-animation={isChromatic()}>
    <p id="dialog-content-1" style={'margin: 0'}>
      Dialog content
    </p>
    {actionGroup(args.negative, 'my-dialog-1')}
  </sbb-dialog>,
];

const SlottedTitleTemplate = (args) => [
  triggerButton('my-dialog-2'),
  <sbb-dialog id="my-dialog-2" {...args} disable-animation={isChromatic()}>
    <span slot="title">
      <sbb-icon
        name="book-medium"
        style={'vertical-align: sub; margin-inline-end: 0.5rem;'}
      ></sbb-icon>
      The Catcher in the Rye
    </span>
    <p id="dialog-content-2" style={'margin: 0'}>
      “What really knocks me out is a book that, when you're all done reading it, you wish the
      author that wrote it was a terrific friend of yours and you could call him up on the phone
      whenever you felt like it. That doesn't happen much, though.” ― J.D. Salinger, The Catcher in
      the Rye
    </p>
    {actionGroup(args.negative, 'my-dialog-2')}
  </sbb-dialog>,
];

const LongContentTemplate = (args) => [
  triggerButton('my-dialog-3'),
  <sbb-dialog id="my-dialog-3" {...args} disable-animation={isChromatic()}>
    Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his face
    like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise Frodo saw that
    Aragorn stood beside her; his dark cloak was thrown back, and he seemed to be clad in
    elven-mail, and a star shone on his breast. They spoke together, and then suddenly it seemed to
    Frodo that Arwen turned towards him, and the light of her eyes fell on him from afar and pierced
    his heart.
    <sbb-image
      style={'margin-block: 1rem'}
      image-src={sampleImages[1]}
      alt="Natural landscape"
    ></sbb-image>
    He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels of
    blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
    other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of the
    Rings: The Fellowship of the Ring, “Many Meetings”
    {actionGroup(args.negative, 'my-dialog-3')}
  </sbb-dialog>,
];

const FormTemplate = (args) => [
  triggerButton('my-dialog-4'),
  <div id="returned-value">
    <div style={formDetailsStyle}>
      <div>
        Your message: <span id="returned-value-message">Hello 👋</span>
      </div>
      <div>
        Your favorite animal: <span id="returned-value-animal">Red Panda</span>
      </div>
    </div>
  </div>,
  <sbb-dialog
    id="my-dialog-4"
    {...args}
    disable-animation={isChromatic()}
    ref={(dialog) => onFormDialogClose(dialog)}
  >
    <div style={'margin-bottom: var(--sbb-spacing-fixed-4x)'}>
      Submit the form below to close the dialog box using the
      <code style={codeStyle}>dismiss(result?: any)</code>
      method and returning the form values to update the details.
    </div>
    <form
      style={formStyle}
      onSubmit={(e) => {
        e.preventDefault();
        closeDialog('my-dialog-4', e.target);
      }}
    >
      <sbb-form-field error-space="none" label="Message" size="m">
        <input placeholder="Your custom massage" value="Hello 👋" name="message" />
      </sbb-form-field>

      <sbb-form-field error-space="none" label="Favorite animal" size="m">
        <select placeholder="Your favorite animal" name="animal">
          <option>Red Panda</option>
          <option>Cheetah</option>
          <option>Polar Bear</option>
          <option>Elephant</option>
        </select>
      </sbb-form-field>

      <sbb-button type="submit" size="m">
        Update details
      </sbb-button>
    </form>
  </sbb-dialog>,
];

const NoFooterTemplate = (args) => [
  triggerButton('my-dialog-5'),
  <sbb-dialog id="my-dialog-5" {...args} disable-animation={isChromatic()}>
    <p id="dialog-content-5" style={'margin: 0'}>
      “What really knocks me out is a book that, when you're all done reading it, you wish the
      author that wrote it was a terrific friend of yours and you could call him up on the phone
      whenever you felt like it. That doesn't happen much, though.” ― J.D. Salinger, The Catcher in
      the Rye
    </p>
  </sbb-dialog>,
];

const FullScreenTemplate = (args) => [
  triggerButton('my-dialog-6'),
  <sbb-dialog id="my-dialog-6" {...args} disable-animation={isChromatic()}>
    <sbb-title visual-level="2" style={'margin-bottom: 1rem'} negative={args.negative}>
      Many Meetings
    </sbb-title>
    Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his face
    like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise Frodo saw that
    Aragorn stood beside her; his dark cloak was thrown back, and he seemed to be clad in
    elven-mail, and a star shone on his breast. They spoke together, and then suddenly it seemed to
    Frodo that Arwen turned towards him, and the light of her eyes fell on him from afar and pierced
    his heart.
    <sbb-image
      style={'margin-block: 1rem'}
      image-src={sampleImages[1]}
      alt="Natural landscape"
    ></sbb-image>
    He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels of
    blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
    other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of the
    Rings: The Fellowship of the Ring, “Many Meetings”
    {actionGroup(args.negative, 'my-dialog-6')}
  </sbb-dialog>,
];

export const defaultDialog = DefaultTemplate.bind({});
defaultDialog.documentation = { title: 'Default Dialog' };
defaultDialog.argTypes = basicArgTypes;
defaultDialog.args = { ...basicArgs, 'accessibility-describedby': 'dialog-content-1' };
defaultDialog.play = playStory;

export const slottedTitle = SlottedTitleTemplate.bind({});
slottedTitle.documentation = { title: 'Slotted title' };
slottedTitle.argTypes = basicArgTypes;
slottedTitle.args = {
  ...basicArgs,
  'title-content': undefined,
  'title-back-button': false,
  'accessibility-describedby': 'dialog-content-2',
};
slottedTitle.play = playStory;

export const longContent = LongContentTemplate.bind({});
longContent.documentation = { title: 'Long content' };
longContent.argTypes = basicArgTypes;
longContent.args = { ...basicArgs };
longContent.play = playStory;

export const form = FormTemplate.bind({});
form.documentation = { title: 'Dialog with form' };
form.argTypes = basicArgTypes;
form.args = { ...basicArgs };
form.play = playStory;

export const noFooter = NoFooterTemplate.bind({});
noFooter.documentation = { title: 'Without footer' };
noFooter.argTypes = basicArgTypes;
noFooter.args = { ...basicArgs };
noFooter.play = playStory;

export const fullScreen = FullScreenTemplate.bind({});
fullScreen.documentation = { title: 'Full screen dialog' };
fullScreen.argTypes = basicArgTypes;
fullScreen.args = { ...basicArgs, 'title-content': undefined };
fullScreen.play = playStory;

export default {
  decorators: [
    (Story, context) => (
      <div
        style={`padding: 2rem; ${focusStyle(context)}; ${isChromatic() ? 'min-height: 100vh' : ''}`}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [
        events.willPresent,
        events.didPresent,
        events.willDismiss,
        events.didDismiss,
        events.backClick,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      inlineStories: false,
      iframeHeight: '600px',
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-dialog',
};
