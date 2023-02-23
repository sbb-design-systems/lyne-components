import { h } from 'jsx-dom';
import readme from './readme.md';

const uncheckOtherTags = (event) => {
  Array.from(document.querySelectorAll('sbb-tag'))
    .filter((e) => e !== event.target && !e.getAttribute('disabled'))
    .forEach((e) => e.removeAttribute('checked'));
};

const uncheckAllTag = () => {
  document.getElementById('all').removeAttribute('checked');
};

const uncheckTags = () => {
  Array.from(document.querySelectorAll('sbb-tag'))
    .filter((e) => e.getAttribute('id') !== 'all' && !e.getAttribute('disabled'))
    .forEach((e) => e.removeAttribute('checked'));
};

const longLabelText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt quis, mattis eu quam.`;

const numberOfTagsInGroup = {
  control: {
    type: 'number',
  },
  table: {
    category: 'sbb-tag-group properties',
  },
};

const checked = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'sbb-tag properties',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'sbb-tag properties',
  },
};

const label = {
  control: {
    type: 'text',
  },
  table: {
    category: 'sbb-tag properties',
  },
};

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'sbb-tag properties',
  },
};

const icon = {
  control: {
    type: 'text',
  },
  table: {
    category: 'sbb-tag properties',
  },
};

const amount = {
  control: {
    type: 'number',
  },
  table: {
    category: 'sbb-tag properties',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'sbb-tag properties',
  },
};

const defaultArgTypes = {
  checked,
  disabled,
  label,
  value,
  'icon-name': icon,
  amount,
  'accessibility-label': accessibilityLabel,
  numberOfTagsInGroup,
};

const defaultArgs = {
  checked: false,
  disabled: false,
  label: 'Label',
  value: 'Value',
  'icon-name': undefined,
  amount: undefined,
  'accessibility-label': undefined,
  numberOfTagsInGroup: 8,
};

const tagTemplate = ({ label, ...args }, firstChecked = false) => (
  <sbb-tag {...args} checked={firstChecked || args.checked}>
    {label}
    {args.amount !== undefined && <span slot="amount">{args.amount}</span>}
  </sbb-tag>
);

const tagGroupTemplate = ({ numberOfTagsInGroup, ...args }) => (
  <sbb-tag-group aria-label="Select your desired filter">
    {new Array(numberOfTagsInGroup).fill(0).map((e, i) => tagTemplate(args, i === 0))}
  </sbb-tag-group>
);

const tagGroupTemplateEllipsis = ({ numberOfTagsInGroup, ...args }) => (
  <sbb-tag-group aria-label="Select your desired filter">
    {tagTemplate({ ...args, label: longLabelText }, true)}
    {new Array(numberOfTagsInGroup - 1).fill(0).map(() => tagTemplate(args))}
  </sbb-tag-group>
);

const exclusiveTagGroupTemplate = ({ numberOfTagsInGroup, label, ...args }) => [
  <sbb-tag-group aria-label="Select your desired filter">
    {new Array(numberOfTagsInGroup).fill(0).map((e, i, array) => {
      const labelNumbered = `${label} ${i + 1}`;
      const ariaLabel = `Option ${i + 1} of ${array.length}`;

      return (
        <sbb-tag
          {...args}
          onChange={(event) => uncheckOtherTags(event)}
          accessibility-label={ariaLabel}
        >
          {labelNumbered}
          {args.amount !== undefined && <span slot="amount">{args.amount}</span>}
        </sbb-tag>
      );
    })}
  </sbb-tag-group>,
  <div style="margin-block-start: 1rem;">
    This sbb-tag-group behaves like a radio or a tab; when a tag is checked, the other become
    unchecked.
  </div>,
];

const allChoiceTagGroupTemplate = ({ numberOfTagsInGroup, label, ...args }) => [
  <sbb-tag-group aria-label="Select your desired filter">
    <sbb-tag id="all" {...args} onChange={() => uncheckTags()}>
      All
    </sbb-tag>
    {new Array(numberOfTagsInGroup).fill(0).map((e, i) => {
      return (
        <sbb-tag {...args} onChange={() => uncheckAllTag()}>
          {label} {i + 1}
          {args.amount !== undefined && <span slot="amount">{args.amount}</span>}
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

export const withAmount = tagGroupTemplate.bind({});
withAmount.argTypes = defaultArgTypes;
withAmount.args = { ...defaultArgs, amount: 123 };

export const withIcon = tagGroupTemplate.bind({});
withIcon.argTypes = defaultArgTypes;
withIcon.args = { ...defaultArgs, 'icon-name': 'pie-small' };

export const withAmountAndIcon = tagGroupTemplate.bind({});
withAmountAndIcon.argTypes = defaultArgTypes;
withAmountAndIcon.args = { ...defaultArgs, 'icon-name': 'pie-small', amount: 123 };

export const ellipsisLabel = tagGroupTemplateEllipsis.bind({});
ellipsisLabel.argTypes = defaultArgTypes;
ellipsisLabel.args = { ...defaultArgs, 'icon-name': 'pie-small', amount: 123 };

export const exclusiveTagGroup = exclusiveTagGroupTemplate.bind({});
exclusiveTagGroup.argTypes = defaultArgTypes;
exclusiveTagGroup.args = { ...defaultArgs };

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
      handles: ['change'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-tag-group',
};
