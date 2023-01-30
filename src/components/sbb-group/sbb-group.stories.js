import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.color === 'white') {
    return `background-color: var(--sbb-color-milk-default);`;
  } else if (context.args.color === 'milk') {
    return `background-color: var(--sbb-color-white-default);`;
  }

  return `background-color: var(--sbb-color-platinum-default);`;
};

const GroupTemplate = (args) => (
  <sbb-group {...args} style="max-width:20rem;">
    <span class="sbb-text-m">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <br />
      Can be multiline.
    </span>
  </sbb-group>
);

const color = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk', 'transparent'],
};

const padding = {
  control: {
    type: 'inline-radio',
  },
  options: ['3x-xxs', 'xxxs-xxs', '4x-xxs', 'xxs-xxs', 'xxxs-s', 's-s', 'l-l'],
};
const defaultArgTypes = {
  color,
  padding,
};

const defaultArgs = {
  color: color.options[0],
  padding: padding.options[3],
};

export const ColorWhite = GroupTemplate.bind({});
ColorWhite.argTypes = defaultArgTypes;
ColorWhite.args = {
  ...defaultArgs,
};

export const ColorMilk = GroupTemplate.bind({});
ColorMilk.argTypes = defaultArgTypes;
ColorMilk.args = {
  ...defaultArgs,
  color: color.options[1],
};

export const ColorTransparent = GroupTemplate.bind({});
ColorTransparent.argTypes = defaultArgTypes;
ColorTransparent.args = {
  ...defaultArgs,
  color: color.options[2],
};

export const Padding3X_XXS = GroupTemplate.bind({});
Padding3X_XXS.argTypes = defaultArgTypes;
Padding3X_XXS.args = {
  ...defaultArgs,
  padding: padding.options[0],
};

export const PaddingXXXS_XXS = GroupTemplate.bind({});
PaddingXXXS_XXS.argTypes = defaultArgTypes;
PaddingXXXS_XXS.args = {
  ...defaultArgs,
  padding: padding.options[1],
};

export const Padding4X_XXS = GroupTemplate.bind({});
Padding4X_XXS.argTypes = defaultArgTypes;
Padding4X_XXS.args = {
  ...defaultArgs,
  padding: padding.options[2],
};

export const PaddingXXS_XXS = GroupTemplate.bind({});
PaddingXXS_XXS.argTypes = defaultArgTypes;
PaddingXXS_XXS.args = {
  ...defaultArgs,
  padding: padding.options[3],
};

export const PaddingXXXS_S = GroupTemplate.bind({});
PaddingXXXS_S.argTypes = defaultArgTypes;
PaddingXXXS_S.args = {
  ...defaultArgs,
  padding: padding.options[4],
};

export const PaddingS_S = GroupTemplate.bind({});
PaddingS_S.argTypes = defaultArgTypes;
PaddingS_S.args = {
  ...defaultArgs,
  padding: padding.options[5],
};

export const PaddingL_L = GroupTemplate.bind({});
PaddingL_L.argTypes = defaultArgTypes;
PaddingL_L.args = {
  ...defaultArgs,
  padding: padding.options[6],
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem;`}>
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
  title: 'components/sbb-group',
};
