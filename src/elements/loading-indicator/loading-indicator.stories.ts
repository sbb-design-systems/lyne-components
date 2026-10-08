import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components-vite';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';
import type { InputType, StoryContext } from 'storybook/internal/types';

import { sbbSpread } from '../../docs/helpers/spread.ts';

import type { SbbLoadingIndicatorElement } from './loading-indicator.component.ts';
import readme from './readme.md?raw';

import '../loading-indicator.ts';
import '../button.ts';
import '../card.ts';

const getLoader = (event: Event): SbbLoadingIndicatorElement =>
  (event.currentTarget as HTMLElement).parentElement!.querySelector('sbb-loading-indicator')!;

const getLoadingResult = (event: Event): HTMLParagraphElement =>
  (event.currentTarget as HTMLElement).parentElement!.querySelector('.loading-result')!;

const loadingRequestIdAttribute = 'data-request-id';

const beginLoadingRequest = (loader: SbbLoadingIndicatorElement): string => {
  const requestId = `${Number(loader.getAttribute(loadingRequestIdAttribute) ?? '0') + 1}`;
  loader.setAttribute(loadingRequestIdAttribute, requestId);

  return requestId;
};

const createLoadingIndicator = (event: Event, args: Args): void => {
  const loader: SbbLoadingIndicatorElement = document.createElement('sbb-loading-indicator');
  const container = (event.currentTarget as HTMLElement).parentElement!.querySelector(
    '.loader-container',
  )!;
  loader.setAttribute('aria-label', 'Loading, please wait');
  loader.size = args['size'];
  container.append(loader);
  setTimeout(() => {
    const p = document.createElement('p');
    p.textContent = "Loading complete. Here's your data: ...";
    container.append(p);
    loader.remove();
  }, 5000);
};

const showLoadingIndicatorWithMinimumDisplayTime = (event: Event): void => {
  const loader = getLoader(event);
  const result = getLoadingResult(event);
  const requestId = beginLoadingRequest(loader);

  loader.style.display = 'inline-flex';
  result.hidden = true;

  // Minimum display time in milliseconds
  const minimumDisplayTime = 500;
  const minimumDisplayTimePromise = new Promise((resolve) =>
    setTimeout(resolve, minimumDisplayTime),
  );

  // Mock an API call with a random duration between 250ms and 1500ms.
  const mockApiCallDuration = Math.floor(Math.random() * (1500 - 250)) + 250;
  const mockApiCall = new Promise((resolve) => setTimeout(resolve, mockApiCallDuration));

  Promise.all([mockApiCall, minimumDisplayTimePromise]).then(() => {
    if (loader.getAttribute(loadingRequestIdAttribute) === requestId) {
      loader.style.display = 'none';
      result.hidden = false;
    }
  });
};

const showLoadingIndicatorAfterDelay = (event: Event): void => {
  const loader = getLoader(event);
  const result = getLoadingResult(event);
  const requestId = beginLoadingRequest(loader);

  loader.style.display = 'none';
  result.hidden = true;

  setTimeout(() => {
    if (loader.getAttribute(loadingRequestIdAttribute) === requestId) {
      loader.style.display = 'inline-flex';
    }
  }, 1000);

  setTimeout(() => {
    if (loader.getAttribute(loadingRequestIdAttribute) === requestId) {
      loader.style.display = 'none';
      result.hidden = false;
    }
  }, 3500);
};

const showLoadingIndicatorImmediately = (event: Event): void => {
  const loader = getLoader(event);
  const result = getLoadingResult(event);
  const requestId = beginLoadingRequest(loader);

  loader.style.display = 'inline-flex';
  result.hidden = true;

  // Mock an API call with a known long duration.
  setTimeout(() => {
    if (loader.getAttribute(loadingRequestIdAttribute) === requestId) {
      loader.style.display = 'none';
      result.hidden = false;
    }
  }, 4000);
};

const TemplateAccessibility = (args: Args): TemplateResult => html`
  <sbb-card color="milk">
    Turn on your screen-reader and click the button to make the loading indicator appear.
  </sbb-card>
  <br />
  <sbb-button @click=${(event: Event) => createLoadingIndicator(event, args)}>
    Start loading
  </sbb-button>
  <div
    class="loader-container"
    aria-live="polite"
    style="padding-block: var(--sbb-spacing-fixed-4x)"
  ></div>
`;

const Template = (args: Args): TemplateResult => html`
  <sbb-loading-indicator ${sbbSpread(args)}></sbb-loading-indicator>
`;

const codeStyle: Readonly<StyleInfo> = {
  padding: 'var(--sbb-spacing-fixed-4x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-background-color-4)',
  fontSize: 'small',
};
const MinimumDisplayTimeTemplate = (args: Args): TemplateResult => html`
  <sbb-button @click=${showLoadingIndicatorWithMinimumDisplayTime}>Start loading</sbb-button>
  <sbb-loading-indicator ${sbbSpread(args)} style="display: none;"></sbb-loading-indicator>
  <p class="loading-result" hidden>Loading complete. Here's your data: ...</p>

  <p>
    Here's an example of how to implement a minimum display time for the loading indicator. <br />
    It will be displayed for at least 500 milliseconds, even if the API call completes faster than
    that.
  </p>
  <pre style=${styleMap(codeStyle)}>
function showLoadingIndicatorWithMinimumDisplayTime(event) {
  document.querySelector('sbb-loading-indicator')!.style.display = 'inline-flex';

  // Minimum display time in milliseconds.
  const minimumDisplayTime = 500;
  const minimumDisplayTimePromise = new Promise((resolve) => setTimeout(resolve, minimumDisplayTime));

  // Mock an API call with a random duration between 250ms and 1500ms.
  const mockApiCallDuration = Math.floor(Math.random() * (1500 - 250)) + 250;
  const mockApiCall = new Promise((resolve) => setTimeout(resolve, mockApiCallDuration));

  Promise.all([mockApiCall, minimumDisplayTimePromise]).then(() => {
    document.querySelector('sbb-loading-indicator')!.style.display = 'none';
  });
} </pre>
`;

const DisplayAfterOneSecondTemplate = (args: Args): TemplateResult => html`
  <sbb-button @click=${showLoadingIndicatorAfterDelay}> Start loading </sbb-button>
  <sbb-loading-indicator ${sbbSpread(args)} style="display: none;"></sbb-loading-indicator>
  <p class="loading-result" hidden>Loading complete. Here's your data: ...</p>

  <p>
    Here's an example of how to delay the loading indicator until one second has elapsed since the
    action started. <br />
    This avoids showing the indicator immediately for short loading states.
  </p>
`;

const ExpectedLongLoadingTimeTemplate = (args: Args): TemplateResult => html`
  <sbb-button @click=${showLoadingIndicatorImmediately}>Start loading</sbb-button>
  <sbb-loading-indicator ${sbbSpread(args)} style="display: none;"></sbb-loading-indicator>
  <p class="loading-result" hidden>Loading complete. Here's your data: ...</p>

  <p>
    Here's an example of how to show the loading indicator immediately when a long loading time is
    expected. <br />
    This is useful when it is known in advance that the back-end service will take at least one
    second to respond.
  </p>
`;

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'l', 'xl', 'xxl', 'xxxl'] satisfies SbbLoadingIndicatorElement['size'][],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'smoke', 'white'] satisfies SbbLoadingIndicatorElement['color'][],
};

const defaultArgTypes: ArgTypes = {
  size,
  color,
};

const defaultArgs: Args = {
  size: size.options![0],
  color: color.options![0],
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const ExpectedShortLoadingTime: StoryObj = {
  render: DisplayAfterOneSecondTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const ExpectedLongLoadingTime: StoryObj = {
  render: ExpectedLongLoadingTimeTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const MinimumDisplayTime: StoryObj = {
  render: MinimumDisplayTimeTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const Accessibility: StoryObj = {
  render: TemplateAccessibility,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.color === 'white'
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/Loading Indicator',
};

export default meta;
