import { h } from 'jsx-dom';
import readme from './readme.md';

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const iconName = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  'aria-label': ariaLabel,
  'icon-name': iconName,
};

const defaultArgs = {
  'aria-label': undefined,
  'icon-name': 'circle-information-small',
};

const tooltip = () => (
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger">
    <span id="tooltip-content" class="sbb-text-s">
      Simple information tooltip with link.
    </span>
  </sbb-tooltip>
);

const Template = (args) => [
  <span class="sbb-text-s">
    This is a demo text.
    <sbb-tooltip-trigger id="tooltip-trigger" {...args}></sbb-tooltip-trigger>
  </span>,
  tooltip(),
];

const TemplateWithCustomContent = (args) => [
  <div class="sbb-text-xl" style="color: var(--sbb-color-sky-default);">
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
