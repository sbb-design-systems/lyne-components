/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'aria-label': ariaLabel,
  'icon-name': iconName,
  disabled: disabled,
};

const defaultArgs: Args = {
  'aria-label': undefined,
  'icon-name': 'circle-information-small',
  disabled: false,
};

const tooltip = (): JSX.Element => (
  <sbb-tooltip data-testid="tooltip" trigger="tooltip-trigger">
    <span id="tooltip-content" class="sbb-text-s">
      Simple information tooltip with link.
      <sbb-link
        size="s"
        variant="block"
        icon-name="chevron-small-right-small"
        icon-placement="end"
        sbb-tooltip-close
      >
        Learn More
      </sbb-link>
    </span>
  </sbb-tooltip>
);

const Template = (args): JSX.Element => (
  <Fragment>
    <span class="sbb-text-s" style={{ display: 'flex', 'align-items': 'center' }}>
      <span style={{ 'margin-inline-end': 'var(--sbb-spacing-fixed-1x)' }}>
        This is a demo text.
      </span>
      <sbb-tooltip-trigger id="tooltip-trigger" {...args}></sbb-tooltip-trigger>
    </span>
    {tooltip()}
  </Fragment>
);

const TemplateWithCustomContent = (args): JSX.Element => (
  <Fragment>
    <div class="sbb-text-xl" style={{ color: 'var(--sbb-color-sky-default)' }}>
      <sbb-tooltip-trigger id="tooltip-trigger" {...args}>
        This is a long tooltip trigger text which should wrap at a certain viewport. It inherits all
        the font styles from the parent element.
      </sbb-tooltip-trigger>
    </div>
    {tooltip()}
  </Fragment>
);

export const IconSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const IconSizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'circle-information-medium' },
};

export const IconSizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'circle-information-large' },
};

export const CustomContent: StoryObj = {
  render: TemplateWithCustomContent,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
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
  title: 'components/sbb-tooltip-trigger',
};

export default meta;
