import { h } from 'jsx-dom';
import readme from './readme.md';

const firstButtonTemplate = (alignSelf) => (
  <sbb-button align-self={alignSelf} variant="secondary" label="Button 1" />
);

const secondButtonTemplate = (alignSelf) => <sbb-button align-self={alignSelf} label="Button 2" />;

const linkTemplate = (alignSelf) => (
  <sbb-link
    align-self={alignSelf}
    variant="block"
    text-size="s"
    icon-name="chevron-small-left-small"
    icon-placement="start"
    href="https://github.com/lyne-design-system/lyne-components"
  >
    Link
  </sbb-link>
);

const TemplateTwoElements = (alignFirst, alignSecond) => [
  firstButtonTemplate(alignFirst),
  secondButtonTemplate(alignSecond),
];

const TemplateThreeElements = (alignFirst, alignSecond, alignThird) => [
  TemplateTwoElements(alignFirst, alignSecond),
  linkTemplate(alignThird),
];

const TemplateHorizontalAllocation300 = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements()}</sbb-action-group>
);

const TemplateHorizontalAllocation111 = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, 'center', null)}</sbb-action-group>
);

const TemplateHorizontalAllocation201 = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'end')}</sbb-action-group>
);

const TemplateHorizontalAllocation102 = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements('start')}</sbb-action-group>
);

const TemplateHorizontalAllocation200 = (args) => (
  <sbb-action-group {...args}>{TemplateTwoElements()}</sbb-action-group>
);

const TemplateHorizontalAllocation101 = (args) => (
  <sbb-action-group {...args}>{TemplateTwoElements(null, 'end')}</sbb-action-group>
);

const TemplateVerticalAllocation300 = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements()}</sbb-action-group>
);

const TemplateVerticalAllocation200 = (args) => (
  <sbb-action-group {...args}>{TemplateTwoElements()}</sbb-action-group>
);

const TemplateVerticalAllocation030 = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements()}</sbb-action-group>
);

const TemplateVerticalAllocation020 = (args) => (
  <sbb-action-group {...args}>{TemplateTwoElements()}</sbb-action-group>
);

const TemplateVerticalAllocation003 = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements()}</sbb-action-group>
);

const TemplateVerticalAllocation002 = (args) => (
  <sbb-action-group {...args}>{TemplateTwoElements()}</sbb-action-group>
);

const TemplateVerticalAllocation300FullWidth = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'start')}</sbb-action-group>
);

const TemplateVerticalAllocation200FullWidth = (args) => (
  <sbb-action-group {...args}>{TemplateTwoElements()}</sbb-action-group>
);

const TemplateVerticalAllocation030FullWidth = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'center')}</sbb-action-group>
);

const TemplateVerticalAllocation020FullWidth = (args) => (
  <sbb-action-group {...args}>{TemplateTwoElements()}</sbb-action-group>
);

const TemplateVerticalAllocation003FullWidth = (args) => (
  <sbb-action-group {...args}>{TemplateThreeElements(null, null, 'end')}</sbb-action-group>
);

const TemplateVerticalAllocation002FullWidth = (args) => (
  <sbb-action-group {...args}>{TemplateTwoElements()}</sbb-action-group>
);

const orientation = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom = {
  control: {
    type: 'inline-radio',
  },
  options: ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const alignGroup = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'center', 'stretch', 'end'],
};

const basicArgTypes = {
  'align-group': alignGroup,
  'horizontal-from': horizontalFrom,
  orientation,
};

const basicArgs = {
  'align-group': 'start',
  'horizontal-from': 'medium',
  orientation: 'horizontal',
};

const basicArgsVertical = {
  ...basicArgs,
  orientation: 'vertical',
};

const basicArgsVerticalFullWidth = {
  ...basicArgsVertical,
  'align-group': 'stretch',
};

export const HorizontalAllocation3_0_0 = TemplateHorizontalAllocation300.bind({});
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

export const HorizontalAllocation2_0_0 = TemplateHorizontalAllocation200.bind({});
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

export const VerticalAllocation3_0_0 = TemplateVerticalAllocation300.bind({});
VerticalAllocation3_0_0.argTypes = basicArgTypes;
VerticalAllocation3_0_0.args = { ...basicArgsVertical, 'align-group': 'start' };
VerticalAllocation3_0_0.documentation = {
  title: 'sbb-action-group vertical allocation 3-0-0',
};

export const VerticalAllocation2_0_0 = TemplateVerticalAllocation200.bind({});
VerticalAllocation2_0_0.argTypes = basicArgTypes;
VerticalAllocation2_0_0.args = { ...basicArgsVertical, 'align-group': 'start' };
VerticalAllocation2_0_0.documentation = {
  title: 'sbb-action-group vertical allocation 2-0-0',
};

export const VerticalAllocation0_3_0 = TemplateVerticalAllocation030.bind({});
VerticalAllocation0_3_0.argTypes = basicArgTypes;
VerticalAllocation0_3_0.args = { ...basicArgsVertical, 'align-group': 'center' };
VerticalAllocation0_3_0.documentation = {
  title: 'sbb-action-group vertical allocation 0-3-0',
};

export const VerticalAllocation0_2_0 = TemplateVerticalAllocation020.bind({});
VerticalAllocation0_2_0.argTypes = basicArgTypes;
VerticalAllocation0_2_0.args = { ...basicArgsVertical, 'align-group': 'center' };
VerticalAllocation0_2_0.documentation = {
  title: 'sbb-action-group vertical allocation 0-2-0',
};

export const VerticalAllocation0_0_3 = TemplateVerticalAllocation003.bind({});
VerticalAllocation0_0_3.argTypes = basicArgTypes;
VerticalAllocation0_0_3.args = { ...basicArgsVertical, 'align-group': 'end' };
VerticalAllocation0_0_3.documentation = {
  title: 'sbb-action-group vertical allocation 0-0-3',
};

export const VerticalAllocation0_0_2 = TemplateVerticalAllocation002.bind({});
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

export const VerticalAllocation2_0_0FullWidth = TemplateVerticalAllocation200FullWidth.bind({});
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

export const VerticalAllocation0_2_0FullWidth = TemplateVerticalAllocation020FullWidth.bind({});
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

export const VerticalAllocation0_0_2FullWidth = TemplateVerticalAllocation002FullWidth.bind({});
VerticalAllocation0_0_2FullWidth.argTypes = basicArgTypes;
VerticalAllocation0_0_2FullWidth.args = { ...basicArgsVerticalFullWidth };
VerticalAllocation0_0_2FullWidth.documentation = {
  title: 'sbb-action-group vertical allocation 0-0-2 full width',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
  title: 'components/layout/sbb-action-group',
};
