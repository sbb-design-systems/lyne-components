/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';
import isChromatic from 'chromatic';
import { userEvent, within } from '@storybook/testing-library';

const textBlockStyle: Args = {
  marginBlock: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk-default)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
};

const createLoadingIndicator = (args): void => {
  const loader: HTMLSbbLoadingIndicatorElement = document.createElement(
    'SBB-LOADING-INDICATOR',
  ) as HTMLSbbLoadingIndicatorElement;
  loader.setAttribute('aria-label', 'Loading, please wait');
  loader.size = args['size'];
  loader.variant = args['variant'];
  document.querySelector('.loader-container').append(loader);
  setTimeout(() => loader.remove(), 6000);
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

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  variant,
  size,
  'disable-animation': disableAnimation,
};

const defaultArgs: Args = {
  variant: variant.options[0],
  size: size.options[0],
  'disable-animation': isChromatic(),
};

export const WindowSmall: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WindowLarge: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};

export const Circle: StoryObj = {
  render: InlineTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, variant: variant.options[1] },
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
