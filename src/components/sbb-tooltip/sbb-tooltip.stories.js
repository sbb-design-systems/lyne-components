import events from './sbb-tooltip.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('tooltip').shadowRoot.querySelector('dialog.sbb-tooltip')
  );

  await waitForStablePosition(() => canvas.getByTestId('tooltip-trigger'));

  const button = canvas.getByTestId('tooltip-trigger');
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

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  'hover-trigger': hoverTrigger,
  'show-delay': showDelay,
  'hide-delay': hideDelay,
  'disable-animation': disableAnimation,
};

const defaultArgs = {
  'hover-trigger': false,
  'show-delay': undefined,
  'hide-delay': undefined,
  'disable-animation': isChromatic(),
};

const tooltipTrigger = (position) => (
  <sbb-icon
    data-testid="tooltip-trigger"
    id="tooltip-trigger"
    name="circle-information-small"
    aria-describedby="tooltip-content"
    style={`margin-inline: 2rem; position: absolute; cursor: pointer; ${position};`}
  />
);

const tooltip = (args) => (
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger" {...args}>
    <p id="tooltip-content" style={'margin: 0; font-size: var(--sbb-font-size-text-s)'}>
      Simple information tooltip content with action link.{' '}
      <sbb-link text-size="s" variant="inline" sbb-tooltip-close>
        Link
      </sbb-link>
    </p>
  </sbb-tooltip>
);

const StartBelowTemplate = (args) => [tooltipTrigger('left: 2rem'), tooltip(args)];

const CenterBelowTemplate = (args) => [tooltipTrigger('left: calc(50% - 44px)'), tooltip(args)];

const EndBelowTemplate = (args) => [tooltipTrigger('right: 2rem'), tooltip(args)];

const StartAboveTemplate = (args) => [tooltipTrigger('bottom: 2rem'), tooltip(args)];

const CenterAboveTemplate = (args) => [
  tooltipTrigger('left: calc(50% - 44px); bottom: 2rem'),
  tooltip(args),
];

const EndAboveTemplate = (args) => [tooltipTrigger('right: 2rem; bottom: 2rem'), tooltip(args)];

const HoverTriggerTemplate = (args) => [tooltipTrigger('left: 2rem'), tooltip(args)];

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
  'show-delay': 0,
  'hide-delay': 0,
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
      handles: [events.willOpen, events.didOpen, events.didClose, events.willClose],
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
