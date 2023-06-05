/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const secondaryButtonTemplate = (alignSelf): JSX.Element => (
  <sbb-button align-self={alignSelf} variant="secondary">
    Button 1
  </sbb-button>
);

const buttonTemplate = (alignSelf) => <sbb-button align-self={alignSelf}>Button 2</sbb-button>;

const linkTemplate = (alignSelf): JSX.Element => (
  <sbb-link
    align-self={alignSelf}
    icon-name="chevron-small-left-small"
    href="https://github.com/lyne-design-system/lyne-components"
  >
    Link
  </sbb-link>
);

const TemplateTwoElements = (alignSelfFirst, alignSelfSecond) => [
  secondaryButtonTemplate(alignSelfFirst),
  buttonTemplate(alignSelfSecond),
];

const TemplateThreeElements = (alignSelfFirst, alignSelfSecond, alignSelfThird) => [
  TemplateTwoElements(alignSelfFirst, alignSelfSecond),
  linkTemplate(alignSelfThird),
];

const CommonTemplateThreeElementsAllocation = ({ ...args }): JSX.Element => (
  <sbb-action-group {...args}>{TemplateThreeElements()}</sbb-action-group>
);

const CommonTemplateTwoElementsAllocation = ({ ...args }): JSX.Element => (
  <sbb-action-group {...args}>{TemplateTwoElements()}</sbb-action-group>
);

const TemplateHorizontalAllocation111 = ({ ...args }): JSX.Element => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, 'center')}</sbb-action-group>
);

const TemplateHorizontalAllocation201 = ({ ...args }): JSX.Element => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'end')}</sbb-action-group>
);

const TemplateHorizontalAllocation102 = ({ ...args }): JSX.Element => (
  <sbb-action-group {...args}>{TemplateThreeElements('start')}</sbb-action-group>
);

const TemplateHorizontalAllocation101 = ({ ...args }): JSX.Element => (
  <sbb-action-group {...args}>{TemplateTwoElements(null, 'end')}</sbb-action-group>
);

const TemplateVerticalAllocation300FullWidth = ({ ...args }): JSX.Element => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'start')}</sbb-action-group>
);

const TemplateVerticalAllocation030FullWidth = ({ ...args }): JSX.Element => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'center')}</sbb-action-group>
);

const TemplateVerticalAllocation003FullWidth = ({ ...args }): JSX.Element => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'end')}</sbb-action-group>
);

const buttonSize: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm'],
};

const linkSize: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const alignGroup: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'center', 'stretch', 'end'],
};

const basicArgTypes: ArgTypes = {
  'align-group': alignGroup,
  orientation,
  'horizontal-from': horizontalFrom,
  'button-size': buttonSize,
  'link-size': linkSize,
};

const basicArgs: Args = {
  'align-group': 'start',
  orientation: 'horizontal',
  'horizontal-from': 'unset',
  'button-size': buttonSize.options[0],
  'link-size': linkSize.options[0],
};

const basicArgsVertical = {
  ...basicArgs,
  orientation: 'vertical',
};

const basicArgsVerticalFullWidth = {
  ...basicArgsVertical,
  'align-group': 'stretch',
};

export const HorizontalAllocation3_0_0: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};




export const HorizontalAllocation1_1_1: StoryObj = {
  render: TemplateHorizontalAllocation111,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};




export const HorizontalAllocation2_0_1: StoryObj = {
  render: TemplateHorizontalAllocation201,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};




export const HorizontalAllocation1_0_2: StoryObj = {
  render: TemplateHorizontalAllocation102,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'align-group': 'end' },
};




export const HorizontalAllocation2_0_0: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};




export const HorizontalAllocation1_0_1: StoryObj = {
  render: TemplateHorizontalAllocation101,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};




export const VerticalAllocation3_0_0: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'start' },
};




export const VerticalAllocation2_0_0: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'start' },
};




export const VerticalAllocation0_3_0: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'center' },
};




export const VerticalAllocation0_2_0: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'center' },
};




export const VerticalAllocation0_0_3: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'end' },
};




export const VerticalAllocation0_0_2: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'end' },
};




export const VerticalAllocation3_0_0FullWidth: StoryObj = {
  render: TemplateVerticalAllocation300FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};




export const VerticalAllocation2_0_0FullWidth: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};




export const VerticalAllocation0_3_0FullWidth: StoryObj = {
  render: TemplateVerticalAllocation030FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};




export const VerticalAllocation0_2_0FullWidth: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};




export const VerticalAllocation0_0_3FullWidth: StoryObj = {
  render: TemplateVerticalAllocation003FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};




export const VerticalAllocation0_0_2FullWidth: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};




export const VerticalToHorizontal3_0_0: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'horizontal-from': 'medium' },
};




const meta: Meta =  {
  decorators: [
    (Story) => (
      <div style={{padding: '2rem'}}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handels: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-action-group',
};

export default meta;
