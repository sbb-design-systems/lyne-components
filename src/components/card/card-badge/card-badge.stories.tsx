/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import './sbb-card-badge';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color':
    context.args.color === 'charcoal'
      ? 'var(--sbb-color-white-default)'
      : 'var(--sbb-color-charcoal-default)',
});

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['charcoal', 'white'],
};

const defaultArgTypes: ArgTypes = {
  'aria-label': ariaLabel,
  color,
};

const defaultArgs: Args = {
  'aria-label': 'Super saver sales ticket price starts at CHF 92.50 Black Friday Special',
  color: color.options[0],
};

const Template = (args): JSX.Element => (
  <sbb-card-badge {...args}>
    <span>%</span>
    <span>from CHF</span>
    <span>92.50</span>
    <span>
      <time dateTime="2021-11-25">Black Friday</time> Special
    </span>
  </sbb-card-badge>
);

export const Charcoal: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const White: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options[1],
  },
};

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div
        style={{
          ...wrapperStyle(context),
          padding: '0 0 2rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
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
  title: 'components/sbb-card/sbb-card-badge',
};

export default meta;
