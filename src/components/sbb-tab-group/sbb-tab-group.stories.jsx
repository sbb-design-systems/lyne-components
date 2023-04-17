import { h } from 'jsx-dom';
import events from './sbb-tab-group.events.ts';
import readme from './readme.md';

const firstTabTitle = (args) => (
  <sbb-tab-title>
    <sbb-icon slot="icon" name={args.iconSlot}></sbb-icon>
    {args.label}
    <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
  </sbb-tab-title>
);

const tabPanelOne = () => (
  <div>
    Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
    elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
    urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus
    turpis in eu mi bibendum neque egestas congue.
    <h3>Content heading</h3>
    Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
    elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
    urna neque viverra justo nec.
  </div>
);

const tabPanelTwo = () => (
  <section>
    Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
    elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
    urna neque viverra justo nec.
  </section>
);

const tabPanelFour = () => (
  <article>
    Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
    elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
    urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus
    turpis in eu mi bibendum neque egestas congue.
  </article>
);

const DefaultTemplate = (args) => (
  <sbb-tab-group initial-selected-index="0">
    {firstTabTitle(args)}
    {tabPanelOne()}

    <sbb-tab-title>Tab title two</sbb-tab-title>
    {tabPanelTwo()}

    <sbb-tab-title disabled={args.disabled}>Tab title three</sbb-tab-title>
    <div>I was disabled.</div>

    <sbb-tab-title>Tab title four</sbb-tab-title>
    {tabPanelFour()}
  </sbb-tab-group>
);

const NumbersTemplate = (args) => (
  <sbb-tab-group initial-selected-index="0">
    {firstTabTitle(args)}
    {tabPanelOne()}

    <sbb-tab-title>
      Tab title two
      <sbb-tab-amount>123</sbb-tab-amount>
    </sbb-tab-title>
    {tabPanelTwo()}

    <sbb-tab-title disabled={args.disabled}>
      Tab title three
      <sbb-tab-amount>123</sbb-tab-amount>
    </sbb-tab-title>
    <div>I was disabled.</div>

    <sbb-tab-title>
      Tab title four
      <sbb-tab-amount>123</sbb-tab-amount>
    </sbb-tab-title>
    {tabPanelFour()}
  </sbb-tab-group>
);

const IconsTemplate = (args) => (
  <sbb-tab-group initial-selected-index="0">
    {firstTabTitle(args)}
    {tabPanelOne()}

    <sbb-tab-title>
      <sbb-icon slot="icon" name="swisspass-small"></sbb-icon>
      Tab title two
    </sbb-tab-title>
    {tabPanelTwo()}

    <sbb-tab-title disabled={args.disabled}>
      <sbb-icon slot="icon" name="train-small"></sbb-icon>
      Tab title three
    </sbb-tab-title>
    <div>I was disabled.</div>

    <sbb-tab-title>
      <sbb-icon slot="icon" name="pie-small"></sbb-icon>
      Tab title four
    </sbb-tab-title>
    {tabPanelFour()}
  </sbb-tab-group>
);

const IconsAndNumbersTemplate = (args) => (
  <sbb-tab-group initial-selected-index="0">
    {firstTabTitle(args)}
    {tabPanelOne()}

    <sbb-tab-title>
      <sbb-icon slot="icon" name="swisspass-small"></sbb-icon>
      Tab title two
      <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
    </sbb-tab-title>
    {tabPanelTwo()}

    <sbb-tab-title disabled={args.disabled}>
      <sbb-icon slot="icon" name="train-small"></sbb-icon>
      Tab title three
      <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
    </sbb-tab-title>
    <div>I was disabled.</div>

    <sbb-tab-title>
      <sbb-icon slot="icon" name="pie-small"></sbb-icon>
      Tab title four
      <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
    </sbb-tab-title>
    {tabPanelFour()}
  </sbb-tab-group>
);

const NestedTemplate = (args) => (
  <sbb-tab-group initial-selected-index="0">
    {firstTabTitle(args)}
    <sbb-tab-group initial-selected-index="1">
      <sbb-tab-title level="2">Nested tab</sbb-tab-title>
      <div>
        Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
        elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis
        rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed
        faucibus turpis in eu mi bibendum neque egestas congue.
      </div>

      <sbb-tab-title level="2">Nested tab</sbb-tab-title>
      <section>
        Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
        elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis
        rhoncus urna.
      </section>
    </sbb-tab-group>

    <sbb-tab-title>
      <sbb-icon slot="icon" name="swisspass-small"></sbb-icon>
      Tab title two
      <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
    </sbb-tab-title>
    {tabPanelTwo()}

    <sbb-tab-title disabled={args.disabled}>
      <sbb-icon slot="icon" name="train-small"></sbb-icon>
      Tab title three
      <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
    </sbb-tab-title>
    <div>I was disabled.</div>

    <sbb-tab-title>
      <sbb-icon slot="icon" name="pie-small"></sbb-icon>
      Tab title four
      <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
    </sbb-tab-title>
    {tabPanelFour()}
  </sbb-tab-group>
);

const EllipsisTemplate = (args) => (
  <sbb-tab-group initial-selected-index="0">
    {firstTabTitle(args)}
    {tabPanelOne()}

    <sbb-tab-title>
      <sbb-icon slot="icon" name="swisspass-small"></sbb-icon>
      Tab title two
      <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
    </sbb-tab-title>
    {tabPanelTwo()}

    <sbb-tab-title disabled={args.disabled}>
      <sbb-icon slot="icon" name="train-small"></sbb-icon>
      Tab title three
      <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
    </sbb-tab-title>
    <div>I was disabled.</div>

    <sbb-tab-title>
      <sbb-icon slot="icon" name="pie-small"></sbb-icon>
      This is a very long label diam maecenas ultricies mi eget mauris pharetra et ultrices neque
      ornare aenean euismod elementum nisi eleifend quam adipiscing urna.
      <sbb-tab-amount>{args.amountSlot}</sbb-tab-amount>
    </sbb-tab-title>
    {tabPanelFour()}
  </sbb-tab-group>
);

const label = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Tab1',
  },
};

const iconSlot = {
  control: {
    type: 'select',
  },
  options: ['app-icon-small', 'train-small', 'swisspass-small', 'pie-small'],
  table: {
    category: 'Tab1',
  },
};

const amountSlot = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Tab1',
  },
};

const disabledArg = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Disabled Tab',
  },
};

const basicArgTypes = {
  label,
  iconSlot,
  amountSlot,
  disabled: disabledArg,
};

const basicArgs = {
  label: 'Tab label one',
  iconSlot: undefined,
  amountSlot: undefined,
  disabled: true,
};

export const defaultTabs = DefaultTemplate.bind({});
export const numbers = NumbersTemplate.bind({});
export const icons = IconsTemplate.bind({});
export const numbersAndIcons = IconsAndNumbersTemplate.bind({});
export const nestedTabGroups = NestedTemplate.bind({});
export const tintedBackground = IconsAndNumbersTemplate.bind({});
export const ellipsisLabel = EllipsisTemplate.bind({});

defaultTabs.argTypes = basicArgTypes;
numbers.argTypes = basicArgTypes;
icons.argTypes = basicArgTypes;
numbersAndIcons.argTypes = basicArgTypes;
nestedTabGroups.argTypes = basicArgTypes;
tintedBackground.argTypes = basicArgTypes;
ellipsisLabel.argTypes = basicArgTypes;

defaultTabs.args = { ...basicArgs };
numbers.args = { ...basicArgs };
icons.args = { ...basicArgs };
numbersAndIcons.args = { ...basicArgs };
nestedTabGroups.args = { ...basicArgs };
tintedBackground.args = { ...basicArgs };
ellipsisLabel.args = { ...basicArgs };

/* VARIANTS */
numbers.args.amountSlot = '77';
icons.args.iconSlot = iconSlot.options[0];
numbersAndIcons.args.amountSlot = '16';
numbersAndIcons.args.iconSlot = iconSlot.options[0];
nestedTabGroups.args.amountSlot = '16';
nestedTabGroups.args.iconSlot = iconSlot.options[0];
tintedBackground.args.amountSlot = '16';
tintedBackground.args.iconSlot = iconSlot.options[0];
ellipsisLabel.args.amountSlot = '16';
ellipsisLabel.args.iconSlot = iconSlot.options[0];

defaultTabs.documentation = {
  title: 'Default Tabs',
};
numbers.documentation = {
  title: 'Tabs with numbers',
};
icons.documentation = {
  title: 'Tabs with icons',
};
numbersAndIcons.documentation = {
  title: 'Tabs with numbers and icons',
};
tintedBackground.documentation = {
  title: 'Tab group on non-white background',
};
ellipsisLabel.documentation = {
  title: 'Tab group with a long tab label',
};

defaultTabs.decorators = [
  (Story) => (
    <div style={'padding: 2rem'}>
      <Story />
    </div>
  ),
];

const templateRes = [
  (Story) => (
    <div style={'padding: 2rem'}>
      <Story />
    </div>
  ),
];

numbers.decorators = templateRes;
icons.decorators = templateRes;
numbersAndIcons.decorators = templateRes;
nestedTabGroups.decorators = templateRes;
tintedBackground.decorators = [
  (Story) => (
    <div style={'background: var(--sbb-color-milk-default); padding: 2rem'}>
      <Story />
    </div>
  ),
];
ellipsisLabel.decorators = [
  (Story) => (
    <div style={'max-width: var(--sbb-breakpoint-medium-max); padding: 2rem'}>
      <Story />
    </div>
  ),
];

export default {
  parameters: {
    actions: {
      handles: [events.selectedTabChanged],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-tab-group',
};
