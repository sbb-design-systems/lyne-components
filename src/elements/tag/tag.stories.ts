import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../storybook/helpers/spread.ts';
import type { SbbTagElement, SbbTagGroupElement } from '../tag.ts';

import readme from './readme.md?raw';
import '../action-group.ts';
import '../button.ts';
import '../card.ts';
import '../tag.ts';

const uncheckAllTag = (event: Event): void => {
  const tagGroup = (event.currentTarget as SbbTagElement).closest(
    'sbb-tag-group',
  ) as SbbTagGroupElement;
  tagGroup.querySelector('.all')!.removeAttribute('checked');
};

const uncheckTags = (event: Event): void => {
  const tagGroup = (event.currentTarget as SbbTagElement).closest(
    'sbb-tag-group',
  ) as SbbTagGroupElement;
  Array.from(tagGroup.querySelectorAll('sbb-tag'))
    .filter((e) => !e.classList.contains('all') && !e.getAttribute('disabled'))
    .forEach((e) => e.removeAttribute('checked'));
};

const tagChecked: InputType = {
  control: {
    type: 'boolean',
  },
};

const tagDisabledInteractive: InputType = {
  control: {
    type: 'boolean',
  },
};

const tagLabel: InputType = {
  control: {
    type: 'text',
  },
};

const tagIcon: InputType = {
  control: {
    type: 'text',
  },
};

const tagAmount: InputType = {
  control: {
    type: 'number',
  },
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const listAccessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const numberOfTagsInGroup: InputType = {
  control: {
    type: 'number',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
};

const tagDefaultArgTypes: ArgTypes = {
  checked: tagChecked,
  disabled,
  'disabled-interactive': tagDisabledInteractive,
  label: tagLabel,
  value,
  'icon-name': tagIcon,
  amount: tagAmount,
  'aria-label': ariaLabel,
  size,
};

const tagDefaultArgs: Args = {
  checked: false,
  disabled: false,
  'disabled-interactive': false,
  label: 'Label',
  value: 'Value',
  'icon-name': undefined,
  amount: undefined,
  'aria-label': undefined,
  size: size.options![1],
};

const defaultArgTypes: ArgTypes = {
  multiple,
  disabled,
  value,
  'list-accessibility-label': listAccessibilityLabel,
  'aria-label': ariaLabel,
  numberOfTagsInGroup,
  size,
};

const defaultArgs: Args = {
  multiple: true,
  disabled: false,
  value: undefined,
  'list-accessibility-label': 'Select your desired filter',
  'aria-label': undefined,
  numberOfTagsInGroup: 8,
  size: size.options![1],
};

const TagTemplate = ({ label, ...args }: Args): TemplateResult =>
  html`<sbb-tag ${sbbSpread(args)}>${label}</sbb-tag>`;

const tagInGroupTemplate = (label: string, checked = false, name?: string): TemplateResult => html`
  <sbb-tag
    name="${name || nothing}"
    ?checked=${checked}
    value=${label}
    amount="123"
    icon-name="pie-small"
  >
    ${label}
  </sbb-tag>
`;

const TagGroupTemplate = ({ numberOfTagsInGroup, ...args }: Args): TemplateResult => html`
  <sbb-tag-group ${sbbSpread(args)}>
    ${repeat(new Array(numberOfTagsInGroup), (_e, i) =>
      tagInGroupTemplate(`Label ${i + 1}`, i === 0),
    )}
  </sbb-tag-group>
`;

const ExclusiveTagGroupTemplate = ({ numberOfTagsInGroup, ...args }: Args): TemplateResult => html`
  <sbb-tag-group ${sbbSpread(args)}>
    ${repeat(new Array(numberOfTagsInGroup), (_e, i) => tagInGroupTemplate(`Label ${i + 1}`))}
  </sbb-tag-group>
  <div style="margin-block-start: 1rem;">
    This sbb-tag-group behaves like a radio or a tab; when a tag is checked, the other become
    unchecked.
  </div>
`;

const AllChoiceTagGroupTemplate = ({ numberOfTagsInGroup, ...args }: Args): TemplateResult => html`
  <sbb-tag-group ${sbbSpread(args)}>
    <sbb-tag class="all" @change=${(ev: Event) => uncheckTags(ev)} value="All" checked>
      All
    </sbb-tag>
    ${repeat(
      new Array(numberOfTagsInGroup),
      (_e, i) => html`
        <sbb-tag @change=${(ev: Event) => uncheckAllTag(ev)} amount="123" value=${`Label ${i + 1}`}>
          Label ${i + 1}
        </sbb-tag>
      `,
    )}
  </sbb-tag-group>
  <div style="margin-block-start: 1rem;">
    This sbb-tag-group permits to select the 'All' option, or to select multiple values removing the
    'All' selection.
  </div>
`;

const TemplateWithForm = ({ numberOfTagsInGroup, ...args }: Args): TemplateResult => html`
  <form
    @submit=${(e: SubmitEvent) => {
      e.preventDefault();
      const form = (e.target as HTMLFormElement)!;
      form.querySelector('#form-data')!.innerHTML = JSON.stringify(
        Object.fromEntries(new FormData(form)),
      );
    }}
  >
    <sbb-tag-group ${sbbSpread(args)} style="margin-block-end: 2rem;">
      ${repeat(new Array(numberOfTagsInGroup), (_e, i) =>
        tagInGroupTemplate(`Label ${i + 1}`, i <= 2, `tag${i + 1}`),
      )}
    </sbb-tag-group>

    <sbb-tag-group disabled> ${tagInGroupTemplate('Disabled tag', false)}</sbb-tag-group>

    <sbb-action-group style="margin-block: var(--sbb-spacing-responsive-s)">
      <sbb-secondary-button type="reset">Reset</sbb-secondary-button>
      <sbb-button type="submit">Submit</sbb-button>
    </sbb-action-group>
    <p class="sbb-text-s">Form-Data after click submit:</p>
    <sbb-card color="milk" id="form-data"></sbb-card>
  </form>
`;

export const Tag: StoryObj = {
  render: TagTemplate,
  argTypes: tagDefaultArgTypes,
  args: { ...tagDefaultArgs },
};

export const TagGroup: StoryObj = {
  render: TagGroupTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const TagGroupSizeS: StoryObj = {
  render: TagGroupTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![0] },
};

export const Exclusive: StoryObj = {
  render: ExclusiveTagGroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    multiple: false,
  },
};

export const AllChoice: StoryObj = {
  render: AllChoiceTagGroupTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithForm: StoryObj = {
  render: TemplateWithForm,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['input', 'change'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/tag',
};

export default meta;
