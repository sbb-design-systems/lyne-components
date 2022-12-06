import events from '../sbb-tag/sbb-tag.events';
import { h } from 'jsx-dom';
import readme from './readme.md';

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

const accessibilityDescribedby = {
  control: {
    type: 'text',
  },
  table: {
    category: 'sbb-tag properties',
  },
};

const accessibilityLabelledby = {
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
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
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
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
  numberOfTagsInGroup: 8,
};

const tagTemplate = ({ label, ...args }, firstChecked = false) => (
  <sbb-tag {...args} checked={firstChecked || args.checked}>
    {label}
    {args.amount !== undefined && <span slot="amount">{args.amount}</span>}
  </sbb-tag>
);

const tagGroupTemplate = ({ numberOfTagsInGroup, ...args }) => (
  <sbb-tag-group>
    {new Array(numberOfTagsInGroup).fill(0).map((e, i) => tagTemplate(args, i === 0))}
  </sbb-tag-group>
);

const tagGroupTemplateEllipsis = ({ numberOfTagsInGroup, ...args }) => (
  <sbb-tag-group>
    {tagTemplate({ ...args, label: longLabelText }, true)}
    {new Array(numberOfTagsInGroup - 1).fill(0).map(() => tagTemplate(args))}
  </sbb-tag-group>
);

const nestedGroupTemplate = ({ numberOfTagsInGroup, ...args }) => [
  <sbb-tag-group>
    {new Array(numberOfTagsInGroup).fill(0).map((e, i) => tagTemplate(args, i === 0))}
    {tagGroupTemplate({ numberOfTagsInGroup, ...args })}
  </sbb-tag-group>,
  <div style="padding-block: 2rem;">
    Nested sbb-tag-group example. You should see an error in console.
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

export const nestedGroup = nestedGroupTemplate.bind({});
nestedGroup.argTypes = defaultArgTypes;
nestedGroup.args = { ...defaultArgs };

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
      handles: ['change', events.didChange],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/tag/sbb-tag-group',
};
