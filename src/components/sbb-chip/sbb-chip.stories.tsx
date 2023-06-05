import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.color === 'milk' || context.args.color === 'white') {
    return `background-color: var(--sbb-color-granite-default);`;
  }

  return `background-color: var(--sbb-color-white-default);`;
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['xxs', 'xs', 's'],
};

const color = {
  control: {
    type: 'inline-radio',
  },
  options: ['milk', 'charcoal', 'white', 'granite'],
};

const label = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  color,
  size,
  label,
};

const defaultArgs = {
  size: size.options[0],
  color: color.options[0],
  label: 'Label',
};

const Template = ({ label, ...args }) => <sbb-chip {...args}>{label}</sbb-chip>;
const TemplateFixedWidth = ({ label, ...args }) => (
  <sbb-chip {...args} style="width: 10rem;">
    {label}
  </sbb-chip>
);

export const MilkXXS = Template.bind({});
MilkXXS.argTypes = defaultArgTypes;
MilkXXS.args = {
  ...defaultArgs,
};

export const MilkXS = Template.bind({});
MilkXS.argTypes = defaultArgTypes;
MilkXS.args = {
  ...defaultArgs,
  size: size.options[1],
};

export const MilkS = Template.bind({});
MilkS.argTypes = defaultArgTypes;
MilkS.args = {
  ...defaultArgs,
  size: size.options[2],
};

export const Charcoal = Template.bind({});
Charcoal.argTypes = defaultArgTypes;
Charcoal.args = {
  ...defaultArgs,
  color: color.options[1],
};

export const White = Template.bind({});
White.argTypes = defaultArgTypes;
White.args = {
  ...defaultArgs,
  color: color.options[2],
};

export const Granite = Template.bind({});
Granite.argTypes = defaultArgTypes;
Granite.args = {
  ...defaultArgs,
  color: color.options[3],
};

export const FixedWidth = TemplateFixedWidth.bind({});
FixedWidth.argTypes = defaultArgTypes;
FixedWidth.args = {
  ...defaultArgs,
};

export const FixedWidthLongLabel = TemplateFixedWidth.bind({});
FixedWidthLongLabel.argTypes = defaultArgTypes;
FixedWidthLongLabel.args = {
  ...defaultArgs,
  label: 'This is a very long label which will be cut.',
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem;font-size:0;`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-chip',
};
