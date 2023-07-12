/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/html';
import { InputType } from '@storybook/types';

const contentText: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  contentText,
};

const defaultArgs: Args = {
  contentText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio, ut blandit libero cursus vel.',
};

const Template = ({ contentText }): JSX.Element => (
  <sbb-expansion-panel-content>
    <p>Static content.</p>
    <p>Dynamic content: {contentText}</p>
  </sbb-expansion-panel-content>
);

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
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
  title: 'components/sbb-accordion/sbb-expansion-panel-content',
};

export default meta;
