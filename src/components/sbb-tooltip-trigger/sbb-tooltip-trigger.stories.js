import { h } from 'jsx-dom';
import readme from './readme.md';

const iconName = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  'icon-name': iconName,
};

const defaultArgs = {
  'icon-name': 'circle-information-small',
};

const tooltip = () => (
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger">
    <p id="tooltip-content" style={'margin: 0;'} class="sbb-text-s">
      Simple information tooltip with link.
    </p>
  </sbb-tooltip>
);

const Template = (args) => [
  <span>
    This is a demo text.
    <sbb-tooltip-trigger id="tooltip-trigger" {...args}></sbb-tooltip-trigger>
  </span>,
  tooltip(),
];

const TemplateWithCustomContent = (args) => [
  <div style="font-size: 18px; color: red;">
    <sbb-tooltip-trigger id="tooltip-trigger" {...args}>
      Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut
      labore et dolore magna aliqua.
    </sbb-tooltip-trigger>
  </div>,
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
