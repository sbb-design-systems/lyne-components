/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import { __nameUpperCase__ } from './__name__';
import './__name__';

const myProp: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'my-prop': myProp,
};

const defaultArgs: Args = {
  'my-prop': 'Label',
};

const Template = ({ ...args }): JSX.Element => <__name__ {...args}></__name__>;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story></Story>
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [__nameUpperCase__.events.myEventName],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/__name__',
};

export default meta;
