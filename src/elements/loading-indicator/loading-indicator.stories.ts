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

const showLoadingIndicator = (): void => {
  document.querySelector('sbb-loading-indicator')!.style.display = 'inline-flex';

  // Minimum display time in milliseconds
  const minimumDisplayTime = 500;
  const minimumDisplayTimePromise = new Promise((resolve) =>
    setTimeout(resolve, minimumDisplayTime),
  );

  // Mock an API call with a random duration between 250ms and 1500ms.
  const mockApiCallDuration = Math.floor(Math.random() * (1500 - 250)) + 250;
  const mockApiCall = new Promise((resolve) => setTimeout(resolve, mockApiCallDuration));

  Promise.all([mockApiCall, minimumDisplayTimePromise]).then(() => {
    document.querySelector('sbb-loading-indicator')!.style.display = 'none';
  });
};

const TemplateAccessibility = (args: Args): TemplateResult => html`
  <sbb-card color="milk">
    Turn on your screen-reader and click the button to make the loading indicator appear.
  </sbb-card>
  <br />
  <sbb-button @click=${(event: Event) => createLoadingIndicator(event, args)}>
    Show loader
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
  <sbb-button @click=${showLoadingIndicator}> Show loader </sbb-button>
  <sbb-loading-indicator ${sbbSpread(args)} style="display: none;"></sbb-loading-indicator>

  <p>
    Here's an example of how to implement a minimum display time for the loading indicator. <br />
    It will be displayed for at least 500 milliseconds, even if the API call completes faster than
    that.
  </p>
  <pre style=${styleMap(codeStyle)}>
function showLoadingIndicator() {
  document.querySelector('sbb-loading-indicator')!.style.display = 'inline-flex';

  // Minimum display time in milliseconds
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
