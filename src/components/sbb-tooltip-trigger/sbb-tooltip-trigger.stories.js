import { h } from 'jsx-dom';
import readme from './readme.md';

const iconName = {
  control: {
    type: 'text',
  },
};

const id = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  'icon-name': iconName,
  id,
};

const defaultArgs = {
  'icon-name': 'circle-information-small',
  id: 'tooltip-trigger',
};

const tooltip = () => (
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger">
    <p id="tooltip-content" style={'margin: 0; font-size: var(--sbb-font-size-text-s);'}>
      Simple information tooltip with link.
    </p>
  </sbb-tooltip>
);

const Template = (args) => [<sbb-tooltip-trigger {...args}></sbb-tooltip-trigger>, tooltip()];
const TemplateWithCustomContent = (args) => [
  <sbb-tooltip-trigger {...args}>
    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore
    et dolore magna aliqua.
  </sbb-tooltip-trigger>,
  tooltip(),
];

export const Default = Template.bind({});
Default.argTypes = defaultArgTypes;
Default.args = defaultArgs;

export const CustomContent = TemplateWithCustomContent.bind({});
CustomContent.argTypes = defaultArgTypes;
CustomContent.args = defaultArgs;

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
  title: 'components/sbb-tooltip-trigger',
};
