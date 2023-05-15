import { h } from 'jsx-dom';
import events from './sbb-tab-group.events.ts';
import readme from './readme.md';

const firstTabTitle = ({ label, ...args }) => <sbb-tab-title {...args}>{label}</sbb-tab-title>;

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

    <sbb-tab-title disabled={true}>Tab title three</sbb-tab-title>
    <div>I was disabled.</div>

    <sbb-tab-title>Tab title four</sbb-tab-title>
    {tabPanelFour()}
  </sbb-tab-group>
);

const IconsAndNumbersTemplate = (args) => (
  <sbb-tab-group initial-selected-index="0">
    {firstTabTitle(args)}
    {tabPanelOne()}

    <sbb-tab-title amount={args.amount} icon-name="swisspass-small">
      Tab title two
    </sbb-tab-title>
    {tabPanelTwo()}

    <sbb-tab-title disabled={true} amount={args.amount} icon-name="train-small">
      Tab title three
    </sbb-tab-title>
    <div>I was disabled.</div>

    <sbb-tab-title amount={args.amount} icon-name="pie-small">
      Tab title four
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

    <sbb-tab-title amount={args.amount} icon-name="swisspass-small">
      Tab title two
    </sbb-tab-title>
    {tabPanelTwo()}

    <sbb-tab-title disabled={true} amount={args.amount} icon-name="train-small">
      Tab title three
    </sbb-tab-title>
    <div>I was disabled.</div>

    <sbb-tab-title amount={args.amount} icon-name="pie-small">
      Tab title four
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

const iconName = {
  control: {
    type: 'select',
  },
  options: ['app-icon-small', 'train-small', 'swisspass-small', 'pie-small'],
  table: {
    category: 'Tab1',
  },
};

const amount = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Tab1',
  },
};

const basicArgTypes = {
  label,
  'icon-name': iconName,
  amount: amount,
};

const basicArgs = {
  label: 'Tab label one',
  'icon-name': undefined,
  amount: undefined,
};

const templateRes = [
  (Story) => (
    <div style={'padding: 2rem'}>
      <Story />
    </div>
  ),
];

export const defaultTabs = DefaultTemplate.bind({});
defaultTabs.argTypes = basicArgTypes;
defaultTabs.args = { ...basicArgs };
defaultTabs.decorators = templateRes;

export const numbersAndIcons = IconsAndNumbersTemplate.bind({});
numbersAndIcons.argTypes = basicArgTypes;
numbersAndIcons.args = { ...basicArgs, amount: 16, 'icon-name': iconName.options[0] };
numbersAndIcons.decorators = templateRes;

export const nestedTabGroups = NestedTemplate.bind({});
nestedTabGroups.argTypes = basicArgTypes;
nestedTabGroups.args = { ...basicArgs, amount: 16, 'icon-name': iconName.options[0] };
nestedTabGroups.decorators = templateRes;

export const tintedBackground = IconsAndNumbersTemplate.bind({});
tintedBackground.argTypes = basicArgTypes;
tintedBackground.args = { ...basicArgs, amount: 16, 'icon-name': iconName.options[0] };
tintedBackground.decorators = [
  (Story) => (
    <div style={'background: var(--sbb-color-milk-default); padding: 2rem'}>
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
