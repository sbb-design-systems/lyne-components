/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import './tag-group';
import '../tag';

const uncheckAllTag = (): void => {
  document.getElementById('all').removeAttribute('checked');
};

const uncheckTags = (): void => {
  Array.from(document.querySelectorAll('sbb-tag'))
    .filter((e) => e.getAttribute('id') !== 'all' && !e.getAttribute('disabled'))
    .forEach((e) => e.removeAttribute('checked'));
};

const longLabelText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt quis, mattis eu quam.`;

const multiple: InputType = {
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

const defaultArgTypes: ArgTypes = {
  multiple,
  value,
  'list-accessibility-label': listAccessibilityLabel,
  'aria-label': ariaLabel,
  numberOfTagsInGroup,
};

const defaultArgs: Args = {
  multiple: true,
  value: undefined,
  'list-accessibility-label': 'Select your desired filter',
  'aria-label': undefined,
  numberOfTagsInGroup: 8,
};

const tagTemplate = (label, checked = false): JSX.Element => (
  <sbb-tag checked={checked} value={label} amount="123" icon-name="pie-small">
    {label}
  </sbb-tag>
);

const TagGroupTemplate = ({ numberOfTagsInGroup, ...args }): JSX.Element => (
  <sbb-tag-group {...args}>
    {new Array(numberOfTagsInGroup).fill(0).map((_e, i) => tagTemplate(`Label ${i + 1}`, i === 0))}
  </sbb-tag-group>
);

const TagGroupTemplateEllipsis = ({ numberOfTagsInGroup, ...args }): JSX.Element => (
  <sbb-tag-group {...args}>
    {tagTemplate(longLabelText, true)}
    {new Array(numberOfTagsInGroup - 1).fill(0).map((_e, i) => tagTemplate(`Label ${i + 1}`))}
  </sbb-tag-group>
);

const ExclusiveTagGroupTemplate = ({ numberOfTagsInGroup, ...args }): JSX.Element => (
  <Fragment>
    <sbb-tag-group {...args}>
      {new Array(numberOfTagsInGroup).fill(0).map((_e, i) => tagTemplate(`Label ${i + 1}`))}
    </sbb-tag-group>
    <div style={{ 'margin-block-start': '1rem' }}>
      This sbb-tag-group behaves like a radio or a tab; when a tag is checked, the other become
      unchecked.
    </div>
  </Fragment>
);

const AllChoiceTagGroupTemplate = ({ numberOfTagsInGroup, ...args }): JSX.Element => (
  <Fragment>
    <sbb-tag-group {...args}>
      <sbb-tag id="all" onChange={() => uncheckTags()} value="All" checked>
        All
      </sbb-tag>
      {new Array(numberOfTagsInGroup).fill(0).map((_e, i) => {
        return (
          <sbb-tag onChange={() => uncheckAllTag()} amount="123" value={`Label ${i + 1}`}>
            Label {i + 1}
          </sbb-tag>
        );
      })}
    </sbb-tag-group>
    <div style={{ 'margin-block-start': '1rem' }}>
      This sbb-tag-group permits to select the 'All' option, or to select multiple values removing
      the 'All' selection.
    </div>
  </Fragment>
);

export const tagGroup: StoryObj = {
  render: TagGroupTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const ellipsisLabel: StoryObj = {
  render: TagGroupTemplateEllipsis,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const exclusiveTagGroup: StoryObj = {
  render: ExclusiveTagGroupTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    multiple: false,
  },
};

export const allChoiceTagGroup: StoryObj = {
  render: AllChoiceTagGroupTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story></Story>
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['input', 'change'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-tag/sbb-tag-group',
};

export default meta;
