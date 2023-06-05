import { h } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';

const secondaryButtonTemplate = (alignSelf) => (
  <sbb-button align-self={alignSelf} variant="secondary">
    Button 1
  </sbb-button>
);

const buttonTemplate = (alignSelf) => <sbb-button align-self={alignSelf}>Button 2</sbb-button>;

const linkTemplate = (alignSelf) => (
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

const CommonTemplateThreeElementsAllocation = ({ ...args }) => (
  <sbb-action-group {...args}>{TemplateThreeElements()}</sbb-action-group>
);

const CommonTemplateTwoElementsAllocation = ({ ...args }) => (
  <sbb-action-group {...args}>{TemplateTwoElements()}</sbb-action-group>
);

const TemplateHorizontalAllocation111 = ({ ...args }) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, 'center')}</sbb-action-group>
);

const TemplateHorizontalAllocation201 = ({ ...args }) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'end')}</sbb-action-group>
);

const TemplateHorizontalAllocation102 = ({ ...args }) => (
  <sbb-action-group {...args}>{TemplateThreeElements('start')}</sbb-action-group>
);

const TemplateHorizontalAllocation101 = ({ ...args }) => (
  <sbb-action-group {...args}>{TemplateTwoElements(null, 'end')}</sbb-action-group>
);

const TemplateVerticalAllocation300FullWidth = ({ ...args }) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'start')}</sbb-action-group>
);

const TemplateVerticalAllocation030FullWidth = ({ ...args }) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'center')}</sbb-action-group>
);

const TemplateVerticalAllocation003FullWidth = ({ ...args }) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'end')}</sbb-action-group>
);

const buttonSize = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm'],
};

const linkSize = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
};

const orientation = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const alignGroup = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'center', 'stretch', 'end'],
};

const basicArgTypes = {
  'align-group': alignGroup,
  orientation,
  'horizontal-from': horizontalFrom,
  'button-size': buttonSize,
  'link-size': linkSize,
};

const basicArgs = {
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

export const HorizontalAllocation3_0_0 = CommonTemplateThreeElementsAllocation.bind({});
HorizontalAllocation3_0_0.argTypes = basicArgTypes;
HorizontalAllocation3_0_0.args = { ...basicArgs };
HorizontalAllocation3_0_0.documentation = {
  title: 'sbb-action-group horizontal allocation 3-0-0',
};

export const HorizontalAllocation1_1_1 = TemplateHorizontalAllocation111.bind({});
HorizontalAllocation1_1_1.argTypes = basicArgTypes;
HorizontalAllocation1_1_1.args = { ...basicArgs };
HorizontalAllocation1_1_1.documentation = {
  title: 'sbb-action-group horizontal allocation 1-1-1',
};

export const HorizontalAllocation2_0_1 = TemplateHorizontalAllocation201.bind({});
HorizontalAllocation2_0_1.argTypes = basicArgTypes;
HorizontalAllocation2_0_1.args = { ...basicArgs };
HorizontalAllocation2_0_1.documentation = {
  title: 'sbb-action-group horizontal allocation 2-0-1',
};

export const HorizontalAllocation1_0_2 = TemplateHorizontalAllocation102.bind({});
HorizontalAllocation1_0_2.argTypes = basicArgTypes;
HorizontalAllocation1_0_2.args = { ...basicArgs, 'align-group': 'end' };
HorizontalAllocation1_0_2.documentation = {
  title: 'sbb-action-group horizontal allocation 1-0-2',
};

export const HorizontalAllocation2_0_0 = CommonTemplateTwoElementsAllocation.bind({});
HorizontalAllocation2_0_0.argTypes = basicArgTypes;
HorizontalAllocation2_0_0.args = { ...basicArgs };
HorizontalAllocation2_0_0.documentation = {
  title: 'sbb-action-group horizontal allocation 2-0-0',
};

export const HorizontalAllocation1_0_1 = TemplateHorizontalAllocation101.bind({});
HorizontalAllocation1_0_1.argTypes = basicArgTypes;
HorizontalAllocation1_0_1.args = { ...basicArgs };
HorizontalAllocation1_0_1.documentation = {
  title: 'sbb-action-group horizontal allocation 1-0-1',
};

export const VerticalAllocation3_0_0 = CommonTemplateThreeElementsAllocation.bind({});
VerticalAllocation3_0_0.argTypes = basicArgTypes;
VerticalAllocation3_0_0.args = { ...basicArgsVertical, 'align-group': 'start' };
VerticalAllocation3_0_0.documentation = {
  title: 'sbb-action-group vertical allocation 3-0-0',
};

export const VerticalAllocation2_0_0 = CommonTemplateTwoElementsAllocation.bind({});
VerticalAllocation2_0_0.argTypes = basicArgTypes;
VerticalAllocation2_0_0.args = { ...basicArgsVertical, 'align-group': 'start' };
VerticalAllocation2_0_0.documentation = {
  title: 'sbb-action-group vertical allocation 2-0-0',
};

export const VerticalAllocation0_3_0 = CommonTemplateThreeElementsAllocation.bind({});
VerticalAllocation0_3_0.argTypes = basicArgTypes;
VerticalAllocation0_3_0.args = { ...basicArgsVertical, 'align-group': 'center' };
VerticalAllocation0_3_0.documentation = {
  title: 'sbb-action-group vertical allocation 0-3-0',
};

export const VerticalAllocation0_2_0 = CommonTemplateTwoElementsAllocation.bind({});
VerticalAllocation0_2_0.argTypes = basicArgTypes;
VerticalAllocation0_2_0.args = { ...basicArgsVertical, 'align-group': 'center' };
VerticalAllocation0_2_0.documentation = {
  title: 'sbb-action-group vertical allocation 0-2-0',
};

export const VerticalAllocation0_0_3 = CommonTemplateThreeElementsAllocation.bind({});
VerticalAllocation0_0_3.argTypes = basicArgTypes;
VerticalAllocation0_0_3.args = { ...basicArgsVertical, 'align-group': 'end' };
VerticalAllocation0_0_3.documentation = {
  title: 'sbb-action-group vertical allocation 0-0-3',
};

export const VerticalAllocation0_0_2 = CommonTemplateTwoElementsAllocation.bind({});
VerticalAllocation0_0_2.argTypes = basicArgTypes;
VerticalAllocation0_0_2.args = { ...basicArgsVertical, 'align-group': 'end' };
VerticalAllocation0_0_2.documentation = {
  title: 'sbb-action-group vertical allocation 0-0-2',
};

export const VerticalAllocation3_0_0FullWidth = TemplateVerticalAllocation300FullWidth.bind({});
VerticalAllocation3_0_0FullWidth.argTypes = basicArgTypes;
VerticalAllocation3_0_0FullWidth.args = { ...basicArgsVerticalFullWidth };
VerticalAllocation3_0_0FullWidth.documentation = {
  title: 'sbb-action-group vertical allocation 3-0-0 full width',
};

export const VerticalAllocation2_0_0FullWidth = CommonTemplateTwoElementsAllocation.bind({});
VerticalAllocation2_0_0FullWidth.argTypes = basicArgTypes;
VerticalAllocation2_0_0FullWidth.args = { ...basicArgsVerticalFullWidth };
VerticalAllocation2_0_0FullWidth.documentation = {
  title: 'sbb-action-group vertical allocation 2-0-0 full width',
};

export const VerticalAllocation0_3_0FullWidth = TemplateVerticalAllocation030FullWidth.bind({});
VerticalAllocation0_3_0FullWidth.argTypes = basicArgTypes;
VerticalAllocation0_3_0FullWidth.args = { ...basicArgsVerticalFullWidth };
VerticalAllocation0_3_0FullWidth.documentation = {
  title: 'sbb-action-group vertical allocation 0-3-0 full width',
};

export const VerticalAllocation0_2_0FullWidth = CommonTemplateTwoElementsAllocation.bind({});
VerticalAllocation0_2_0FullWidth.argTypes = basicArgTypes;
VerticalAllocation0_2_0FullWidth.args = { ...basicArgsVerticalFullWidth };
VerticalAllocation0_2_0FullWidth.documentation = {
  title: 'sbb-action-group vertical allocation 0-2-0 full width',
};

export const VerticalAllocation0_0_3FullWidth = TemplateVerticalAllocation003FullWidth.bind({});
VerticalAllocation0_0_3FullWidth.argTypes = basicArgTypes;
VerticalAllocation0_0_3FullWidth.args = { ...basicArgsVerticalFullWidth };
VerticalAllocation0_0_3FullWidth.documentation = {
  title: 'sbb-action-group vertical allocation 0-0-3 full width',
};

export const VerticalAllocation0_0_2FullWidth = CommonTemplateTwoElementsAllocation.bind({});
VerticalAllocation0_0_2FullWidth.argTypes = basicArgTypes;
VerticalAllocation0_0_2FullWidth.args = { ...basicArgsVerticalFullWidth };
VerticalAllocation0_0_2FullWidth.documentation = {
  title: 'sbb-action-group vertical allocation 0-0-2 full width',
};

export const VerticalToHorizontal3_0_0 = CommonTemplateThreeElementsAllocation.bind({});
VerticalToHorizontal3_0_0.argTypes = basicArgTypes;
VerticalToHorizontal3_0_0.args = { ...basicArgsVertical, 'horizontal-from': 'medium' };
VerticalToHorizontal3_0_0.documentation = {
  title: 'sbb-action-group vertical to horizontal allocation 3-0-0',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
    withActions,
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
