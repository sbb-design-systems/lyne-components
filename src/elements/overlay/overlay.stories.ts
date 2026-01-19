import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import sampleImages from '../core/images.ts';

import { SbbOverlayElement } from './overlay.component.ts';
import readme from './readme.md?raw';

import '../button.ts';
import '../card.ts';
import '../form-field.ts';
import '../image.ts';
import '../link.ts';
import '../title.ts';

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityCloseLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const basicArgTypes: ArgTypes = {
  expanded,
  accessibilityCloseLabel,
  negative,
  'accessibility-label': accessibilityLabel,
};

const basicArgs: Args = {
  expanded: false,
  accessibilityCloseLabel: 'Close overlay',
  negative: false,
  'accessibility-label': undefined,
};

const triggerButton = (triggerId: string): TemplateResult => html`
  <sbb-button size="m" id=${triggerId}>Open overlay</sbb-button>
`;

const textBlock = (): TemplateResult => html`
  <sbb-card color="transparent-bordered" style="margin-block-start: 1rem">
    J.R.R. Tolkien, the mastermind behind Middle-earth's enchanting world, was born on January 3,
    1892. With "The Hobbit" and "The Lord of the Rings", he pioneered fantasy literature. Tolkien's
    linguistic brilliance and mythic passion converge in a literary legacy that continues to
    transport readers to magical realms.
  </sbb-card>
`;

const DefaultTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('overlay-trigger')}
  <sbb-overlay ${sbbSpread(args)} trigger="overlay-trigger">
    <div class="overlay-content">
      <sbb-title visual-level="2" ?negative=${args.negative} style="margin-block-start: 0">
        Many Meetings
      </sbb-title>
      Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his face
      like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise Frodo saw that
      Aragorn stood beside her; his dark cloak was thrown back, and he seemed to be clad in
      elven-mail, and a star shone on his breast. They spoke together, and then suddenly it seemed
      to Frodo that Arwen turned towards him, and the light of her eyes fell on him from afar and
      pierced his heart.
      <sbb-image
        style="margin-block: 1rem"
        image-src=${sampleImages[1]}
        alt="Natural landscape"
      ></sbb-image>
      He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels
      of blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
      other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of
      the Rings: The Fellowship of the Ring, “Many Meetings” ${textBlock()}
    </div>
  </sbb-overlay>
`;

const NestedTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('overlay-trigger')}
  <sbb-overlay ${sbbSpread(args)} trigger="overlay-trigger">
    <div class="overlay-content">
      Click the button to open a nested overlay. ${triggerButton('overlay-trigger-2')}
    </div>
    <sbb-overlay ${sbbSpread(args)} trigger="overlay-trigger-2">
      <p class="overlay-content">
        Nested overlay content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.
      </p>
    </sbb-overlay>
  </sbb-overlay>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const Negative: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    negative: true,
  },
};

export const Expanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    expanded: true,
  },
};

export const Nested: StoryObj = {
  render: NestedTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbOverlayElement.events.beforeopen,
        SbbOverlayElement.events.open,
        SbbOverlayElement.events.beforeclose,
        SbbOverlayElement.events.close,
      ],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-overlay',
};

export default meta;
