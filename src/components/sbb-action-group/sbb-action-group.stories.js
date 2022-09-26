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

const TemplateHorizontalAllocation300 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('start')}
    {secondButtonTemplate('start')}
    {linkTemplate('start')}
  </sbb-action-group>
);

const TemplateHorizontalAllocation111 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('start')}
    {secondButtonTemplate('center')}
    {linkTemplate('end')}
  </sbb-action-group>
);

const TemplateHorizontalAllocation201 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('start')}
    {secondButtonTemplate('start')}
    {linkTemplate('end')}
  </sbb-action-group>
);

const TemplateHorizontalAllocation102 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('start')}
    {secondButtonTemplate('end')}
    {linkTemplate('end')}
  </sbb-action-group>
);

const TemplateHorizontalAllocation200 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('start')}
    {secondButtonTemplate('start')}
  </sbb-action-group>
);

const TemplateHorizontalAllocation101 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('start')}
    {secondButtonTemplate('end')}
  </sbb-action-group>
);

const TemplateVerticalAllocation030 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('center')}
    {secondButtonTemplate('center')}
    {linkTemplate('center')}
  </sbb-action-group>
);

const TemplateVerticalAllocation020 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('center')}
    {secondButtonTemplate('center')}
  </sbb-action-group>
);

const TemplateVerticalAllocation003 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('end')}
    {secondButtonTemplate('end')}
    {linkTemplate('end')}
  </sbb-action-group>
);

const TemplateVerticalAllocation002 = (args) => (
  <sbb-action-group {...args}>
    {firstButtonTemplate('end')}
    {secondButtonTemplate('end')}
  </sbb-action-group>
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

const align = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'center', 'stretch', 'end'],
};

const basicArgTypes = {
  align,
  'horizontal-from': horizontalFrom,
  orientation,
};

const basicArgs = {
  align: 'start',
  'horizontal-from': 'medium',
  orientation: 'horizontal',
};

export const sbbActionGroupHorizontalAllocation3_0_0 = TemplateHorizontalAllocation300.bind({});
sbbActionGroupHorizontalAllocation3_0_0.argTypes = basicArgTypes;
sbbActionGroupHorizontalAllocation3_0_0.args = { ...basicArgs };
sbbActionGroupHorizontalAllocation3_0_0.documentation = {
  title: 'SBB Action Group Horizontal Allocation 3-0-0',
};

export const sbbActionGroupHorizontalAllocation1_1_1 = TemplateHorizontalAllocation111.bind({});
sbbActionGroupHorizontalAllocation1_1_1.argTypes = basicArgTypes;
sbbActionGroupHorizontalAllocation1_1_1.args = { ...basicArgs };
sbbActionGroupHorizontalAllocation1_1_1.documentation = {
  title: 'SBB Action Group Horizontal Allocation 1-1-1',
};

export const sbbActionGroupHorizontalAllocation2_0_1 = TemplateHorizontalAllocation201.bind({});
sbbActionGroupHorizontalAllocation2_0_1.argTypes = basicArgTypes;
sbbActionGroupHorizontalAllocation2_0_1.args = { ...basicArgs };
sbbActionGroupHorizontalAllocation2_0_1.documentation = {
  title: 'SBB Action Group Horizontal Allocation 2-0-1',
};

export const sbbActionGroupHorizontalAllocation1_0_2 = TemplateHorizontalAllocation102.bind({});
sbbActionGroupHorizontalAllocation1_0_2.argTypes = basicArgTypes;
sbbActionGroupHorizontalAllocation1_0_2.args = { ...basicArgs };
sbbActionGroupHorizontalAllocation1_0_2.documentation = {
  title: 'SBB Action Group Horizontal Allocation 1-0-2',
};

export const sbbActionGroupHorizontalAllocation2_0_0 = TemplateHorizontalAllocation200.bind({});
sbbActionGroupHorizontalAllocation2_0_0.argTypes = basicArgTypes;
sbbActionGroupHorizontalAllocation2_0_0.args = { ...basicArgs };
sbbActionGroupHorizontalAllocation2_0_0.documentation = {
  title: 'SBB Action Group Horizontal Allocation 2-0-0',
};

export const sbbActionGroupHorizontalAllocation1_0_1 = TemplateHorizontalAllocation101.bind({});
sbbActionGroupHorizontalAllocation1_0_1.argTypes = basicArgTypes;
sbbActionGroupHorizontalAllocation1_0_1.args = { ...basicArgs };
sbbActionGroupHorizontalAllocation1_0_1.documentation = {
  title: 'SBB Action Group Horizontal Allocation 1-0-1',
};

export const sbbActionGroupVerticalAllocation3_0_0 = TemplateHorizontalAllocation300.bind({});
sbbActionGroupVerticalAllocation3_0_0.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation3_0_0.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation3_0_0.documentation = {
  title: 'SBB Action Group Vertical Allocation 3-0-0',
};

export const sbbActionGroupVerticalAllocation2_0_0 = TemplateHorizontalAllocation200.bind({});
sbbActionGroupVerticalAllocation2_0_0.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation2_0_0.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation2_0_0.documentation = {
  title: 'SBB Action Group Vertical Allocation 2-0-0',
};

export const sbbActionGroupVerticalAllocation0_3_0 = TemplateVerticalAllocation030.bind({});
sbbActionGroupVerticalAllocation0_3_0.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation0_3_0.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation0_3_0.documentation = {
  title: 'SBB Action Group Vertical Allocation 0-3-0',
};

export const sbbActionGroupVerticalAllocation0_2_0 = TemplateVerticalAllocation020.bind({});
sbbActionGroupVerticalAllocation0_2_0.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation0_2_0.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation0_2_0.documentation = {
  title: 'SBB Action Group Vertical Allocation 0-2-0',
};

export const sbbActionGroupVerticalAllocation0_0_3 = TemplateVerticalAllocation003.bind({});
sbbActionGroupVerticalAllocation0_0_3.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation0_0_3.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation0_0_3.documentation = {
  title: 'SBB Action Group Vertical Allocation 0-0-3',
};

export const sbbActionGroupVerticalAllocation0_0_2 = TemplateVerticalAllocation002.bind({});
sbbActionGroupVerticalAllocation0_0_2.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation0_0_2.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation0_0_2.documentation = {
  title: 'SBB Action Group Vertical Allocation 0-0-2',
};

export const sbbActionGroupVerticalAllocation3_0_0FullWidth = TemplateHorizontalAllocation300.bind(
  {}
);
sbbActionGroupVerticalAllocation3_0_0FullWidth.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation3_0_0FullWidth.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation3_0_0FullWidth.documentation = {
  title: 'SBB Action Group Vertical Allocation 3-0-0',
};

export const sbbActionGroupVerticalAllocation2_0_0FullWidth = TemplateHorizontalAllocation200.bind(
  {}
);
sbbActionGroupVerticalAllocation2_0_0FullWidth.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation2_0_0FullWidth.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation2_0_0FullWidth.documentation = {
  title: 'SBB Action Group Vertical Allocation 2-0-0',
};

export const sbbActionGroupVerticalAllocation0_3_0FullWidth = TemplateVerticalAllocation030.bind(
  {}
);
sbbActionGroupVerticalAllocation0_3_0FullWidth.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation0_3_0FullWidth.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation0_3_0FullWidth.documentation = {
  title: 'SBB Action Group Vertical Allocation 0-3-0',
};

export const sbbActionGroupVerticalAllocation0_2_0FullWidth = TemplateVerticalAllocation020.bind(
  {}
);
sbbActionGroupVerticalAllocation0_2_0FullWidth.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation0_2_0FullWidth.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation0_2_0FullWidth.documentation = {
  title: 'SBB Action Group Vertical Allocation 0-2-0',
};

export const sbbActionGroupVerticalAllocation0_0_3FullWidth = TemplateVerticalAllocation003.bind(
  {}
);
sbbActionGroupVerticalAllocation0_0_3FullWidth.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation0_0_3FullWidth.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation0_0_3FullWidth.documentation = {
  title: 'SBB Action Group Vertical Allocation 0-0-3',
};

export const sbbActionGroupVerticalAllocation0_0_2FullWidth = TemplateVerticalAllocation002.bind(
  {}
);
sbbActionGroupVerticalAllocation0_0_2FullWidth.argTypes = basicArgTypes;
sbbActionGroupVerticalAllocation0_0_2FullWidth.args = { ...basicArgs, orientation: 'vertical' };
sbbActionGroupVerticalAllocation0_0_2FullWidth.documentation = {
  title: 'SBB Action Group Vertical Allocation 0-0-2',
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
