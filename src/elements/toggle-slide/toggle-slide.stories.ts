import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';
import type { SbbToggleSlideValidateEvent, SbbToggleSlideElement } from '../toggle-slide.ts';

import readme from './readme.md?raw';

import '../toggle-slide.ts';
import '../button.ts';
import '../card.ts';
import '../icon.ts';
import '../title.ts';
import '../form-field.ts';

const longLabel = `For this example we need a very long label, like lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras nec dolor eget leo porttitor ultrices. Mauris sed erat nec justo posuere elementum.
  In pharetra ante vel fringilla tincidunt. Fusce congue accumsan arcu dictum porttitor.
  Pellentesque urna justo, lacinia at velit eu, sagittis tempus nibh.
  Quisque vitae massa et turpis fermentum tristique.`;

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'] satisfies SbbToggleSlideElement['size'][],
};

const checked: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  checked,
  disabled,
  label,
  value,
  name,
  'icon-name': iconName,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  size: undefined,
  checked: false,
  disabled: false,
  label: 'Label',
  value: 'Value',
  name: 'name',
  'icon-name': undefined,
  'aria-label': 'Journey checkin state',
};

// We use property and attribute for `checked` to provide consistency to storybook controls.
// Otherwise, after first user manipulation, the storybook control gets ignored.
// If only using property, the reset mechanism does not work as expected.

const Template = ({ label, checked, ...args }: Args): TemplateResult => html`
  <sbb-toggle-slide
    ${sbbSpread(args)}
    .checked=${checked}
    ?checked=${checked}
    call-to-check-action="To start pull right"
    call-to-uncheck-action="To stop pull left"
    @validate=${(e: SbbToggleSlideValidateEvent) => {
      // Example for asynchronous validation
      e.preventDefaultConditionally(
        new Promise((resolve) => {
          setTimeout(() => resolve(true), 1500);
        }),
      );
    }}
  >
    ${label}
    <span slot="hint">Hint</span>
  </sbb-toggle-slide>
`;

const CustomIconTemplate = ({ label, checked, ...args }: Args): TemplateResult => html`
  <sbb-toggle-slide .checked=${checked} ?checked=${checked} ${sbbSpread(args)}>
    ${label}
  </sbb-toggle-slide>
`;

const BlockVariantTemplate = ({ checked, ...args }: Args): TemplateResult => html`
  <div>
    <sbb-toggle-slide
      .checked=${checked}
      ?checked=${checked}
      ${sbbSpread(args)}
      style="display: block;"
    >
      <sbb-title level="5" style="margin: 0;"> Accessible Connection. </sbb-title>
      <span class="sbb-text-s" style="color: var(--sbb-color-iron);">
        Show connections for accessible journeys.
      </span>
    </sbb-toggle-slide>
    <p class="sbb-text-xs">
      In this example <code>&lt;sbb-toggle-slide&gt;</code> is converted to a block element by
      setting <code>display: block</code>.
    </p>
  </div>
`;

const TemplateWithForm = (args: Args): TemplateResult => html`
  <form
    @submit=${(e: SubmitEvent) => {
      e.preventDefault();
      const form = (e.target as HTMLFormElement)!;
      form.querySelector('#form-data')!.innerHTML = JSON.stringify(
        Object.fromEntries(new FormData(form)),
      );
    }}
  >
    <fieldset>
      <legend class="sbb-text-s">&nbsp;fieldset&nbsp;</legend>
      ${Template(args)}
    </fieldset>

    <fieldset disabled>
      <legend class="sbb-text-s">&nbsp;disabled fieldset&nbsp;</legend>
      ${Template({ ...args, name: 'disabled' })}
    </fieldset>
    <div style="margin-block: var(--sbb-spacing-responsive-s)">
      <sbb-secondary-button type="reset">Reset</sbb-secondary-button>
      <sbb-button type="submit">Submit</sbb-button>
    </div>
    <p class="sbb-text-s">Form-Data after click submit:</p>
    <sbb-card color="milk" id="form-data"></sbb-card>
  </form>
`;

export const SbbToggleSlideDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const SbbToggleSlideDefaultSizeXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![0],
  },
};

export const SbbToggleSlideDefaultSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![1],
  },
};

export const SbbToggleSlideDefaultSizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![2],
  },
};

export const SbbToggleSlideDefaultChecked: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const SbbToggleSlideDefaultLongLabel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: longLabel,
  },
};

export const SbbToggleSlideLabelBefore: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'label-position': 'before',
  },
};

export const SbbToggleSlideWithoutLabel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: undefined,
  },
};

export const SbbToggleSlideDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const SbbToggleSlideDisabledChecked: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    disabled: true,
    checked: true,
  },
};

export const SbbToggleSlideCustomIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    checked: true,
    'icon-name': 'face-smiling-small',
  },
};

export const SbbToggleSlideCustomIconSlotted: StoryObj = {
  render: CustomIconTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    checked: true,
    iconName: undefined,
  },
};

export const SbbToggleSlideBlockVariant: StoryObj = {
  render: BlockVariantTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'label-position': 'before',
    label: undefined,
  },
};

export const withForm: StoryObj = {
  render: TemplateWithForm,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Toggle Slide',
};

export default meta;
