import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.ts';
import sampleImages from '../../core/images.ts';
import type { SbbTitleLevel } from '../../title.ts';

import { SbbDialogElement } from './dialog.component.ts';
import readme from './readme.md?raw';

import '../../autocomplete.ts';
import '../../option.ts';
import '../../button.ts';
import '../../card.ts';
import '../../link.ts';
import '../../form-field.ts';
import '../../image.ts';
import '../../popover.ts';
import '../../stepper.ts';
import '../dialog-actions.ts';
import '../dialog-close-button.ts';
import '../dialog-content.ts';
import '../dialog-title.ts';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
  deserunt mollit anim id est laborum.`;

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
  table: {
    category: 'Title',
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

const backdrop: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['opaque', 'translucent'],
};

const backdropAction: InputType = {
  control: {
    type: 'select',
  },
  options: ['close', 'none'],
};

const includeCloseButton: InputType = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes: ArgTypes = {
  level,
  negative,
  'accessibility-label': accessibilityLabel,
  backdrop,
  'backdrop-action': backdropAction,
  includeCloseButton,
};

const basicArgs: Args = {
  level: level.options![1],
  negative: false,
  'accessibility-label': undefined,
  backdrop: 'opaque',
  'backdrop-action': backdropAction.options![0],
  includeCloseButton: false,
};

const triggerButton = (triggerId: string): TemplateResult => html`
  <sbb-button id=${triggerId} size="m">Open dialog</sbb-button>
`;

const dialogActions = (negative: boolean, includeCloseButton: boolean): TemplateResult => html`
  <sbb-dialog-actions align-group="stretch" orientation="vertical" horizontal-from="large">
    <sbb-secondary-button sbb-dialog-close ?negative=${negative}>Cancel</sbb-secondary-button>
    <sbb-button sbb-dialog-close ?sbb-focus-initial=${!includeCloseButton} ?negative=${negative}>
      Confirm
    </sbb-button>
  </sbb-dialog-actions>
`;

const dialogTitle = (level: SbbTitleLevel): TemplateResult => html`
  <sbb-dialog-title level=${level}>A describing title of the dialog</sbb-dialog-title>
`;

const textBlock = (): TemplateResult => html`
  <sbb-card color="milk" style="margin-block-start: 1rem">
    J.R.R. Tolkien, the mastermind behind Middle-earth's enchanting world, was born on January 3,
    1892. With "The Hobbit" and "The Lord of the Rings", he pioneered fantasy literature. Tolkien's
    linguistic brilliance and mythic passion converge in a literary legacy that continues to
    transport readers to magical realms.
  </sbb-card>
`;

const DefaultTemplate = ({ level, includeCloseButton, ...args }: Args): TemplateResult => html`
  ${triggerButton('dialog-trigger')}
  <sbb-dialog trigger="dialog-trigger" ${sbbSpread(args)}>
    ${dialogTitle(level)}
    ${includeCloseButton ? html`<sbb-dialog-close-button></sbb-dialog-close-button>` : nothing}
    <sbb-dialog-content>
      <p style="display: flex; align-items: center; gap: var(--sbb-spacing-fixed-1x); margin: 0;">
        Dialog content
        <sbb-mini-button
          icon-name="circle-information-small"
          id="popover-trigger"
        ></sbb-mini-button>
      </p>
      <sbb-popover trigger="popover-trigger">
        <p style="margin: 0" class="sbb-text-s">Some content.</p>
      </sbb-popover>
    </sbb-dialog-content>
    ${dialogActions(args.negative, includeCloseButton)}
  </sbb-dialog>
`;

const LongContentTemplate = ({ level, includeCloseButton, ...args }: Args): TemplateResult => html`
  ${triggerButton('dialog-trigger')}
  <sbb-dialog trigger="dialog-trigger" ${sbbSpread(args)}>
    ${dialogTitle(level)}
    ${includeCloseButton ? html`<sbb-dialog-close-button></sbb-dialog-close-button>` : nothing}
    <sbb-dialog-content>
      Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his face
      like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise Frodo saw that
      Aragorn stood beside her; his dark cloak was thrown back, and he seemed to be clad in
      elven-mail, and a star shone on his breast. They spoke together, and then suddenly it seemed
      to Frodo that Arwen turned towards him, and the light of her eyes fell on him from afar and
      pierced his heart.
      <sbb-image
        style="margin-block: 1rem;"
        image-src=${sampleImages[1]}
        alt="Natural landscape"
      ></sbb-image>
      He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels
      of blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
      other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of
      the Rings: The Fellowship of the Ring, “Many Meetings” ${textBlock()}
    </sbb-dialog-content>
    ${dialogActions(args.negative, includeCloseButton)}
  </sbb-dialog>
`;

const NoFooterTemplate = ({ level, includeCloseButton, ...args }: Args): TemplateResult => html`
  ${triggerButton('dialog-trigger')}
  <sbb-dialog trigger="dialog-trigger" ${sbbSpread(args)}>
    ${dialogTitle(level)}
    ${includeCloseButton ? html`<sbb-dialog-close-button></sbb-dialog-close-button>` : nothing}
    <sbb-dialog-content>
      <p style="margin: 0;">
        “What really knocks me out is a book that, when you're all done reading it, you wish the
        author that wrote it was a terrific friend of yours and you could call him up on the phone
        whenever you felt like it. That doesn't happen much, though.” ― J.D. Salinger, The Catcher
        in the Rye
      </p>
    </sbb-dialog-content>
  </sbb-dialog>
`;

const NestedTemplate = ({
  level,
  includeCloseButton,
  negative,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('dialog-trigger')}
  <sbb-dialog trigger="dialog-trigger" ?negative=${negative} ${sbbSpread(args)}>
    ${dialogTitle(level)}
    ${includeCloseButton ? html`<sbb-dialog-close-button></sbb-dialog-close-button>` : nothing}
    <sbb-dialog-content> Click the button to open a nested dialog. </sbb-dialog-content>
    <sbb-dialog-actions align-group="end">
      ${triggerButton('dialog-trigger-2')}
    </sbb-dialog-actions>
    <sbb-dialog negative trigger="dialog-trigger-2" ${sbbSpread(args)}>
      ${dialogTitle(level)}
      ${includeCloseButton ? html`<sbb-dialog-close-button></sbb-dialog-close-button>` : nothing}
      <sbb-dialog-content>
        <p style="margin-block:0">Nested dialog content. ${loremIpsum}</p>
        <sbb-form-field>
          <label>Pressing 'Escape' keydown with multiple overlay</label>
          <input />
          <sbb-autocomplete>
            <sbb-option value="1">1</sbb-option>
            <sbb-option value="2">2</sbb-option>
            <sbb-option value="3">3</sbb-option>
          </sbb-autocomplete>
        </sbb-form-field>
      </sbb-dialog-content>
      ${dialogActions(negative, includeCloseButton)}
    </sbb-dialog>
  </sbb-dialog>
`;

const StepperTemplate = ({
  level,
  orientation,
  linear,
  includeCloseButton,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('dialog-trigger')}
  <sbb-dialog trigger="dialog-trigger" ${sbbSpread(args)}>
    ${dialogTitle(level)}
    ${includeCloseButton ? html`<sbb-dialog-close-button></sbb-dialog-close-button>` : nothing}
    <sbb-dialog-content>
      <sbb-stepper orientation="${orientation}" ?linear=${linear} size="m">
        ${['First', 'Second', 'Third', 'Fourth'].map(
          (element, index, arr) => html`
            <sbb-step-label>${element} step</sbb-step-label>
            <sbb-step>
              <div
                tabindex="0"
                class="sbb-focus-outline"
                style="margin-block-end: var(--sbb-spacing-fixed-4x)"
              >
                ${element} step content ${index === 0 || index === 2 ? loremIpsum : nothing}
              </div>
              ${index !== 0
                ? html`<sbb-secondary-button size="m" sbb-stepper-previous
                    >Back</sbb-secondary-button
                  >`
                : nothing}
              ${index !== arr.length - 1
                ? html`<sbb-button size="m" sbb-stepper-next>Next</sbb-button>`
                : html`<sbb-button size="m" sbb-stepper-next>Submit</sbb-button>`}
            </sbb-step>
          `,
        )}
      </sbb-stepper>
    </sbb-dialog-content>
  </sbb-dialog>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: basicArgs,
};

export const DefaultWithCloseButton: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    includeCloseButton: true,
  },
};

export const Negative: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    negative: true,
  },
};

export const TranslucentBackdrop: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    backdrop: 'translucent',
  },
};

export const AllowBackdropClick: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'backdrop-action': backdropAction.options![1] },
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, includeCloseButton: true },
};

export const NoFooter: StoryObj = {
  render: NoFooterTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, includeCloseButton: true },
};

export const Nested: StoryObj = {
  render: NestedTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, includeCloseButton: true },
};

export const Stepper: StoryObj = {
  render: StepperTemplate,
  argTypes: {
    ...basicArgTypes,
    orientation: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
      table: { category: 'Stepper' },
    },
    linear: {
      control: { type: 'boolean' },
      table: { category: 'Stepper' },
    },
  },
  args: {
    ...basicArgs,
    orientation: 'horizontal',
    linear: false,
    includeCloseButton: true,
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbDialogElement.events.beforeopen,
        SbbDialogElement.events.open,
        SbbDialogElement.events.beforeclose,
        SbbDialogElement.events.close,
      ],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-dialog/sbb-dialog',
};

export default meta;
