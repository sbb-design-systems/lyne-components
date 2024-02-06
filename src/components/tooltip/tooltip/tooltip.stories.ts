import { withActions } from '@storybook/addon-actions/decorator';
import { userEvent, within } from '@storybook/testing-library';
import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components';
import isChromatic from 'chromatic';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { waitForComponentsReady } from '../../../storybook/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../../storybook/testing/wait-for-stable-position';
import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import { SbbTooltipElement } from './tooltip';
import '../../link';
import '../../title';
import '../tooltip-trigger';

async function commonPlayStory(canvasElement: HTMLElement): Promise<Element> {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('tooltip').shadowRoot!.querySelector('.sbb-tooltip'),
  );

  await waitForStablePosition(() => canvas.getByTestId('tooltip-trigger'));

  return canvas.getByTestId('tooltip-trigger');
}

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }: StoryContext): Promise<void> => {
  const button = await commonPlayStory(canvasElement);
  await userEvent.click(button);
};

// Hover story interaction executed after the story renders
const playStoryHover = async ({ canvasElement }: StoryContext): Promise<void> => {
  const button = await commonPlayStory(canvasElement);
  await userEvent.hover(button);
};

const hoverTrigger: InputType = {
  control: {
    type: 'boolean',
  },
};

const hideCloseButton: InputType = {
  control: { type: 'boolean' },
};

const openDelay: InputType = {
  control: {
    type: 'number',
  },
};

const closeDelay: InputType = {
  control: {
    type: 'number',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'hover-trigger': hoverTrigger,
  'hide-close-button': hideCloseButton,
  'open-delay': openDelay,
  'close-delay': closeDelay,
  'disable-animation': disableAnimation,
};

const defaultArgs: Args = {
  'hover-trigger': false,
  'hide-close-button': false,
  'open-delay': undefined,
  'close-delay': undefined,
  'disable-animation': isChromatic(),
};

const tooltipTrigger = (position: Record<string, string>): TemplateResult => html`
  <sbb-tooltip-trigger
    data-testid="tooltip-trigger"
    style=${styleMap({
      'margin-inline': '2rem',
      position: 'absolute',
      cursor: 'pointer',
      ...position,
    })}
    id="tooltip-trigger"
  ></sbb-tooltip-trigger>
`;

const tooltip = (args: Args): TemplateResult => html`
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger" ${sbbSpread(args)}>
    <sbb-title level="2" visual-level="6" style="margin-block-start: 0">
      Simple tooltip with link.
    </sbb-title>
    <p style="margin: 0" class="sbb-text-s">
      Some content.
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
`;

const simpleTooltip = (args: Args): TemplateResult => html`
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger" ${sbbSpread(args)}>
    <sbb-title level="2" visual-level="6" style="margin-block-start: 0">
      Simple tooltip without any interactive content but a list.
    </sbb-title>
    <ul aria-label="Colors">
      <li>Red</li>
      <li>Green</li>
      <li>Blue</li>
    </ul>
  </sbb-tooltip>
`;

const StartBelowTemplate = (args: Args): TemplateResult => html`
  ${tooltipTrigger({ 'inset-inline-start': '2rem' })} ${tooltip(args)}
`;

const CenterBelowTemplate = (args: Args): TemplateResult => html`
  ${tooltipTrigger({ 'inset-inline-start': 'calc(50% - 44px)' })} ${tooltip(args)}
`;

const EndBelowTemplate = (args: Args): TemplateResult => html`
  ${tooltipTrigger({ 'inset-inline-end': '2rem' })} ${tooltip(args)}
`;

const StartAboveTemplate = (args: Args): TemplateResult => html`
  ${tooltipTrigger({ 'inset-block-end': '2rem' })} ${tooltip(args)}
`;

const CenterAboveTemplate = (args: Args): TemplateResult => html`
  ${tooltipTrigger({ 'inset-inline-start': 'calc(50% - 44px)', 'inset-block-end': '2rem' })}
  ${tooltip(args)}
`;

const EndAboveTemplate = (args: Args): TemplateResult => html`
  ${tooltipTrigger({ 'inset-inline-end': '2rem', 'inset-block-end': '2rem' })} ${tooltip(args)}
`;

const LongContentTemplate = (args: Args): TemplateResult => html`
  ${tooltipTrigger({ 'inset-inline-start': '2rem' })}
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger" ${sbbSpread(args)}>
    <sbb-title level="2" visual-level="6" style="margin-block-start: 0">
      Tooltip with long content.
    </sbb-title>
    <p style="margin: 0;" class="sbb-text-s">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </sbb-tooltip>
`;

const HoverTriggerTemplate = (args: Args): TemplateResult => html`
  ${tooltipTrigger({ 'inset-inline-start': '2rem' })} ${tooltip(args)}
`;

const WithoutCloseButtonTemplate = (args: Args): TemplateResult => html`
  ${tooltipTrigger({ 'inset-inline-start': '2rem' })} ${simpleTooltip(args)}
`;

export const StartBelow: StoryObj = {
  render: StartBelowTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const CenterBelow: StoryObj = {
  render: CenterBelowTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const EndBelow: StoryObj = {
  render: EndBelowTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const StartAbove: StoryObj = {
  render: StartAboveTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const CenterAbove: StoryObj = {
  render: CenterAboveTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const EndAbove: StoryObj = {
  render: EndAboveTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const HoverTrigger: StoryObj = {
  render: HoverTriggerTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'hover-trigger': true,
    'open-delay': 0,
    'close-delay': 0,
  },
  play: isChromatic() ? playStoryHover : undefined,
};

export const WithoutCloseButton: StoryObj = {
  render: WithoutCloseButtonTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'hide-close-button': true,
  },
  play: isChromatic() ? playStory : undefined,
};

export const WithoutCloseButtonHover: StoryObj = {
  render: WithoutCloseButtonTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'hide-close-button': true,
    'hover-trigger': true,
  },
  play: isChromatic() ? playStoryHover : undefined,
};

const meta: Meta = {
  decorators: [
    (story) => html`
      <div style="padding: 2rem; position: relative; min-height: calc(100vh - 2rem);">
        ${story()}
      </div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [
        SbbTooltipElement.events.willOpen,
        SbbTooltipElement.events.didOpen,
        SbbTooltipElement.events.didClose,
        SbbTooltipElement.events.willClose,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      story: { inline: false, iframeHeight: '250px' },
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-tooltip/sbb-tooltip',
};

export default meta;
