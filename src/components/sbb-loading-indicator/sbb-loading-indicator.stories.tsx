/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import isChromatic from 'chromatic';
import { userEvent, within } from '@storybook/testing-library';
import './sbb-loading-indicator';
import '../sbb-button';

const textBlockStyle: Args = {
  marginBlock: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk-default)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
};

const negativeBlockStyle: Args = {
  backgroundColor: 'var(--sbb-color-iron-default)',
  color: 'var(--sbb-color-white-default)',
  padding: '2rem',
};

const createLoadingIndicator = (args): void => {
  const loader: HTMLSbbLoadingIndicatorElement = document.createElement(
    'SBB-LOADING-INDICATOR',
  ) as HTMLSbbLoadingIndicatorElement;
  loader.setAttribute('aria-label', 'Loading, please wait');
  loader.size = args['size'];
  loader.variant = args['variant'];
  document.querySelector('.loader-container').append(loader);
  setTimeout(() => {
    const p = document.createElement('p');
    p.textContent = "Loading complete. Here's your data: . . . ";
    document.querySelector('.loader-container').append(p);
    loader.remove();
  }, 5000);
};

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  await userEvent.click(within(canvasElement).getByTestId('trigger'));
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const TemplateAccessibility = (args): JSX.Element => (
  <Fragment>
    <div style={textBlockStyle}>
      Turn on your screen-reader and click the button to make the loading indicator appear.
    </div>
    <sbb-button data-testid="trigger" onClick={() => createLoadingIndicator(args)}>
      Show loader
    </sbb-button>
    <div class="loader-container" aria-live="polite"></div>
  </Fragment>
);

const Template = (args): JSX.Element => <sbb-loading-indicator {...args}></sbb-loading-indicator>;

const NegativeTemplate = (args): JSX.Element => (
  <div style={negativeBlockStyle}>
    <sbb-loading-indicator {...args}></sbb-loading-indicator>
  </div>
);

const InlineTemplate = (args): JSX.Element => (
  <div>
    <p>
      <sbb-loading-indicator {...args}></sbb-loading-indicator> Inline loading indicator
    </p>
    <h2>
      <sbb-loading-indicator {...args}></sbb-loading-indicator> Adaptive to font size
    </h2>
  </div>
);

const NegativeInlineTemplate = (args): JSX.Element => (
  <div style={negativeBlockStyle}>
    <p>
      <sbb-loading-indicator {...args}></sbb-loading-indicator> Inline loading indicator
    </p>
    <h2>
      <sbb-loading-indicator {...args}></sbb-loading-indicator> Adaptive to font size
    </h2>
  </div>
);

const variant: InputType = {
  control: {
    type: 'select',
  },
  options: ['window', 'circle'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['small', 'large'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'smoke', 'white'],
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  variant,
  size,
  color,
  'disable-animation': disableAnimation,
};

const defaultArgs: Args = {
  variant: variant.options[0],
  size: size.options[0],
  color: color.options[0],
  'disable-animation': isChromatic(),
};

export const WindowSmallDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WindowSmallSmoke: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[1] },
};

export const WindowSmallWhite: StoryObj = {
  render: NegativeTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[2] },
};

export const WindowLargeDefault: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};

export const WindowLargeSmoke: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[1], size: size.options[1] },
};

export const WindowLargeWhite: StoryObj = {
  render: NegativeTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[2], size: size.options[1] },
};

export const CircleDefault: StoryObj = {
  render: InlineTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, variant: variant.options[1] },
};

export const CircleSmoke: StoryObj = {
  render: InlineTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[1], variant: variant.options[1] },
};

export const CircleWhite: StoryObj = {
  render: NegativeInlineTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[2], variant: variant.options[1] },
};

export const Accessibility: StoryObj = {
  render: TemplateAccessibility,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
  play: isChromatic() && playStory,
};

export const NoAnimation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'disable-animation': true },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
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
  title: 'components/sbb-loading-indicator',
};

export default meta;
