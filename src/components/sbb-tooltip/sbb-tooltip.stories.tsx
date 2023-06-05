import events from './sbb-tooltip.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';
import { withActions } from '@storybook/addon-actions/decorator';

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

const openDelay = {
  control: {
    type: 'number',
  },
};

const closeDelay = {
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
  'open-delay': openDelay,
  'close-delay': closeDelay,
  'disable-animation': disableAnimation,
};

const defaultArgs = {
  'hover-trigger': false,
  'open-delay': undefined,
  'close-delay': undefined,
  'disable-animation': isChromatic(),
};

const tooltipTrigger = (position) => (
  <sbb-tooltip-trigger
    data-testid="tooltip-trigger"
    style={`margin-inline: 2rem; position: absolute; cursor: pointer; ${position};`}
    id="tooltip-trigger"
  ></sbb-tooltip-trigger>
);

const tooltip = (args) => (
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger" {...args}>
    <p id="tooltip-content" style={'margin: 0; font-size: var(--sbb-font-size-text-s);'}>
      Simple information tooltip with link.{' '}
      <sbb-link
        size="s"
        variant="block"
        icon-name="chevron-small-right-small"
        icon-placement="end"
        sbb-tooltip-close
      >
        Learn More
      </sbb-link>
    </p>
  </sbb-tooltip>
);

const StartBelowTemplate = (args) => [tooltipTrigger('inset-inline-start: 2rem'), tooltip(args)];

const CenterBelowTemplate = (args) => [
  tooltipTrigger('inset-inline-start: calc(50% - 44px)'),
  tooltip(args),
];

const EndBelowTemplate = (args) => [tooltipTrigger('inset-inline-end: 2rem'), tooltip(args)];

const StartAboveTemplate = (args) => [tooltipTrigger('inset-block-end: 2rem'), tooltip(args)];

const CenterAboveTemplate = (args) => [
  tooltipTrigger('inset-inline-start: calc(50% - 44px); inset-block-end: 2rem'),
  tooltip(args),
];

const EndAboveTemplate = (args) => [
  tooltipTrigger('inset-inline-end: 2rem; inset-block-end: 2rem'),
  tooltip(args),
];

const LongContentTemplate = (args) => [
  tooltipTrigger('inset-inline-start: 2rem'),
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger" {...args}>
    <p id="tooltip-content" style={'margin: 0; font-size: var(--sbb-font-size-text-s);'}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </sbb-tooltip>,
];

const HoverTriggerTemplate = (args) => [tooltipTrigger('inset-inline-start: 2rem'), tooltip(args)];

export const StartBelow = StartBelowTemplate.bind({});
StartBelow.argTypes = defaultArgTypes;
StartBelow.args = { ...defaultArgs };
StartBelow.documentation = { title: 'Start Below' };
StartBelow.play = isChromatic() && playStory;

export const CenterBelow = CenterBelowTemplate.bind({});
CenterBelow.argTypes = defaultArgTypes;
CenterBelow.args = { ...defaultArgs };
CenterBelow.documentation = { title: 'Center Below' };
CenterBelow.play = isChromatic() && playStory;

export const EndBelow = EndBelowTemplate.bind({});
EndBelow.argTypes = defaultArgTypes;
EndBelow.args = { ...defaultArgs };
EndBelow.documentation = { title: 'End Below' };
EndBelow.play = isChromatic() && playStory;

export const StartAbove = StartAboveTemplate.bind({});
StartAbove.argTypes = defaultArgTypes;
StartAbove.args = { ...defaultArgs };
StartAbove.documentation = { title: 'Start Above' };
StartAbove.play = isChromatic() && playStory;

export const CenterAbove = CenterAboveTemplate.bind({});
CenterAbove.argTypes = defaultArgTypes;
CenterAbove.args = { ...defaultArgs };
CenterAbove.documentation = { title: 'Center Above' };
CenterAbove.play = isChromatic() && playStory;

export const EndAbove = EndAboveTemplate.bind({});
EndAbove.argTypes = defaultArgTypes;
EndAbove.args = { ...defaultArgs };
EndAbove.documentation = { title: 'End Above' };
EndAbove.play = isChromatic() && playStory;

export const LongContent = LongContentTemplate.bind({});
LongContent.argTypes = defaultArgTypes;
LongContent.args = { ...defaultArgs };
LongContent.documentation = { title: 'Long Content' };
LongContent.play = isChromatic() && playStory;

export const HoverTrigger = HoverTriggerTemplate.bind({});
HoverTrigger.argTypes = defaultArgTypes;
HoverTrigger.args = {
  ...defaultArgs,
  'hover-trigger': true,
  'open-delay': 0,
  'close-delay': 0,
};
HoverTrigger.documentation = { title: 'Hover Trigger' };
HoverTrigger.play = isChromatic() && playStory;

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem; position: relative; min-height: calc(100vh - 2rem)`}>
        <Story />
      </div>
    ),
    withActions,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
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
    layout: 'fullscreen',
  },
  title: 'components/sbb-tooltip',
};
