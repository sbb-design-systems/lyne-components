import { h } from 'jsx-dom';
import readme from './readme.md';

const uncheckAllTag = () => {
  document.getElementById('all').removeAttribute('checked');
};

const uncheckTags = () => {
  Array.from(document.querySelectorAll('sbb-tag'))
    .filter((e) => e.getAttribute('id') !== 'all' && !e.getAttribute('disabled'))
    .forEach((e) => e.removeAttribute('checked'));
};

const longLabelText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt quis, mattis eu quam.`;

const multiple = {
  control: {
    type: 'boolean',
  },
};

const value = {
  control: {
    type: 'text',
  },
};

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const numberOfTagsInGroup = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes = {
  multiple,
  value,
  'aria-label': ariaLabel,
  numberOfTagsInGroup,
};

const defaultArgs = {
  multiple: true,
  value: undefined,
  'aria-label': 'Select your desired filter',
  numberOfTagsInGroup: 8,
};

const tagTemplate = (label, checked = false) => (
  <sbb-tag checked={checked} value={label} amount="123" icon-name="pie-small">
    {label}
  </sbb-tag>
);

const tagGroupTemplate = ({ numberOfTagsInGroup, ...args }) => (
  <sbb-tag-group {...args}>
    {new Array(numberOfTagsInGroup).fill(0).map((e, i) => tagTemplate(`Label ${i + 1}`, i === 0))}
  </sbb-tag-group>
);

const tagGroupTemplateEllipsis = ({ numberOfTagsInGroup, ...args }) => (
  <sbb-tag-group {...args}>
    {tagTemplate(longLabelText, true)}
    {new Array(numberOfTagsInGroup - 1).fill(0).map((_e, i) => tagTemplate(`Label ${i + 1}`))}
  </sbb-tag-group>
);

const exclusiveTagGroupTemplate = ({ numberOfTagsInGroup, ...args }) => [
  <sbb-tag-group {...args}>
    {new Array(numberOfTagsInGroup).fill(0).map((_e, i) => tagTemplate(`Label ${i + 1}`))}
  </sbb-tag-group>,
  <div style="margin-block-start: 1rem;">
    This sbb-tag-group behaves like a radio or a tab; when a tag is checked, the other become
    unchecked.
  </div>,
];

const allChoiceTagGroupTemplate = ({ numberOfTagsInGroup, ...args }) => [
  <sbb-tag-group {...args}>
    <sbb-tag id="all" onChange={() => uncheckTags()} value="All" checked>
      All
    </sbb-tag>
    {new Array(numberOfTagsInGroup).fill(0).map((e, i) => {
      return (
        <sbb-tag onChange={() => uncheckAllTag()} amount="123" value={`Label ${i + 1}`}>
          Label {i + 1}
        </sbb-tag>
      );
    })}
  </sbb-tag-group>,
  <div style="margin-block-start: 1rem;">
    This sbb-tag-group permits to select the 'All' option, or to select multiple values removing the
    'All' selection.
  </div>,
];

export const tagGroup = tagGroupTemplate.bind({});
tagGroup.argTypes = defaultArgTypes;
tagGroup.args = { ...defaultArgs };

export const ellipsisLabel = tagGroupTemplateEllipsis.bind({});
ellipsisLabel.argTypes = defaultArgTypes;
ellipsisLabel.args = { ...defaultArgs };

export const exclusiveTagGroup = exclusiveTagGroupTemplate.bind({});
exclusiveTagGroup.argTypes = defaultArgTypes;
exclusiveTagGroup.args = {
  ...defaultArgs,
  multiple: false,
};

export const allChoiceTagGroup = allChoiceTagGroupTemplate.bind({});
allChoiceTagGroup.argTypes = defaultArgTypes;
allChoiceTagGroup.args = { ...defaultArgs };

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
      handles: ['input', 'change'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-tag-group',
};
