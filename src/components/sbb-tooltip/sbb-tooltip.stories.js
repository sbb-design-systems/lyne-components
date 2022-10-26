import events from './sbb-tooltip.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';

// Function to emulate pausing between interactions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByTestId('tooltip-trigger');
  await sleep(300);
  await userEvent.click(button);
};

const hoverTrigger = {
  control: {
    type: 'boolean',
  },
};

const showDelay = {
  control: {
    type: 'number',
  },
};

const hideDelay = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes = {
  'hover-trigger': hoverTrigger,
  'show-delay': showDelay,
  'hide-delay': hideDelay,
};

const defaultArgs = {
  'hover-trigger': false,
  'show-delay': undefined,
  'hide-delay': undefined,
};

const tooltipTrigger = (position, id) => (
  <sbb-icon
    data-testid="tooltip-trigger"
    id={id}
    name="circle-information-small"
    style={`margin-inline: 2rem; position: absolute; cursor: pointer; ${position};`}
  />
);

const tooltip = (args, triggerId) => (
  <sbb-tooltip trigger={triggerId} {...args} disable-animation={isChromatic()}>
    <p style={'margin: 0; font-size: var(--sbb-font-size-text-s)'}>
      Simple information tooltip content with action link.{' '}
      <sbb-link text-size="s" variant="inline">
        Link
      </sbb-link>
    </p>
  </sbb-tooltip>
);

const StartBelowTemplate = (args) => [
  tooltipTrigger('left: 2rem', 'tooltip-trigger'),
  tooltip(args, 'tooltip-trigger'),
];

const CenterBelowTemplate = (args) => [
  tooltipTrigger('left: calc(50% - 44px)', 'tooltip-trigger'),
  tooltip(args, 'tooltip-trigger'),
];

const EndBelowTemplate = (args) => [
  tooltipTrigger('right: 2rem', 'tooltip-trigger'),
  tooltip(args, 'tooltip-trigger'),
];

const StartAboveTemplate = (args) => [
  tooltipTrigger('bottom: 2rem', 'tooltip-trigger'),
  tooltip(args, 'tooltip-trigger'),
];

const CenterAboveTemplate = (args) => [
  tooltipTrigger('left: calc(50% - 44px); bottom: 2rem', 'tooltip-trigger'),
  tooltip(args, 'tooltip-trigger'),
];

const EndAboveTemplate = (args) => [
  tooltipTrigger('right: 2rem; bottom: 2rem', 'tooltip-trigger'),
  tooltip(args, 'tooltip-trigger'),
];

const HoverTriggerTemplate = (args) => [
  tooltipTrigger('left: 2rem', 'tooltip-trigger'),
  tooltip(args, 'tooltip-trigger'),
];

export const StartBelow = StartBelowTemplate.bind({});
StartBelow.argTypes = defaultArgTypes;
StartBelow.args = { ...defaultArgs };
StartBelow.documentation = { title: 'Start Below' };
StartBelow.play = playStory;

export const CenterBelow = CenterBelowTemplate.bind({});
CenterBelow.argTypes = defaultArgTypes;
CenterBelow.args = { ...defaultArgs };
CenterBelow.documentation = { title: 'Center Below' };
CenterBelow.play = playStory;

export const EndBelow = EndBelowTemplate.bind({});
EndBelow.argTypes = defaultArgTypes;
EndBelow.args = { ...defaultArgs };
EndBelow.documentation = { title: 'End Below' };
EndBelow.play = playStory;

export const StartAbove = StartAboveTemplate.bind({});
StartAbove.argTypes = defaultArgTypes;
StartAbove.args = { ...defaultArgs };
StartAbove.documentation = { title: 'Start Above' };
StartAbove.play = playStory;

export const CenterAbove = CenterAboveTemplate.bind({});
CenterAbove.argTypes = defaultArgTypes;
CenterAbove.args = { ...defaultArgs };
CenterAbove.documentation = { title: 'Center Above' };
CenterAbove.play = playStory;

export const EndAbove = EndAboveTemplate.bind({});
EndAbove.argTypes = defaultArgTypes;
EndAbove.args = { ...defaultArgs };
EndAbove.documentation = { title: 'End Above' };
EndAbove.play = playStory;

export const HoverTrigger = HoverTriggerTemplate.bind({});
HoverTrigger.argTypes = defaultArgTypes;
HoverTrigger.args = {
  ...defaultArgs,
  'hover-trigger': true,
  'show-delay': 250,
  'hide-delay': 500,
};
HoverTrigger.documentation = { title: 'Hover Trigger' };
HoverTrigger.play = playStory;

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem; position: relative; min-height: calc(100vh - 2rem)`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: [events.willPresent, events.didPresent, events.didDismiss, events.willDismiss],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      inlineStories: false,
      iframeHeight: '250px',
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-tooltip',
};
