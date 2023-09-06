/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

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

const TemplateAccessibility = (args): JSX.Element => (
  <Fragment>
    <span style={{ 'margin-inline-end': '1rem' }}>
      Turn on your screen-reader and click the button to make the loading indicator appear.
    </span>
    <sbb-button onClick={() => createLoadingIndicator(args)}>Show loader</sbb-button>
    <div class="loader-container" aria-live="polite"></div>
  </Fragment>
);

const Template = (args): JSX.Element => <sbb-loading-indicator {...args}></sbb-loading-indicator>;

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

const defaultArgTypes: ArgTypes = {
  variant,
  size,
};

const defaultArgs: Args = {
  variant: variant.options[0],
  size: size.options[0],
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
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, variant: variant.options[1] },
};

export const WindowAccessibility: StoryObj = {
  render: TemplateAccessibility,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
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
