/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';
import isChromatic from 'chromatic/isChromatic';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
};

const labelFirstLink: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const hrefFirstLink: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const labelSecondLink: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const hrefSecondLink: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const defaultArgTypes: ArgTypes = {
  'title-level': titleLevel,
  'title-content': titleContent,
  labelFirstLink,
  hrefFirstLink,
  labelSecondLink,
  hrefSecondLink,
};

const defaultArgs: Args = {
  'title-level': undefined,
  'title-content': undefined,
  labelFirstLink: 'To content',
  hrefFirstLink: 'https://www.sbb.ch/',
  labelSecondLink: 'To help',
  hrefSecondLink: 'https://www.sbb.ch/en/help-and-contact.html',
};

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitForComponentsReady(() =>
    canvas.getByTestId('skiplink').shadowRoot.querySelectorAll('.sbb-skiplink-list__wrapper')
  );
  await waitForStablePosition(() => canvas.getByTestId('skiplink'));
  userEvent.tab();
};

const Template = ({ labelFirstLink, hrefFirstLink, labelSecondLink, hrefSecondLink, ...args }): JSX.Element => (
  <sbb-skiplink-list {...args} data-testid="skiplink">
    <sbb-link href={hrefFirstLink}>{labelFirstLink}</sbb-link>
    <sbb-link href={hrefSecondLink}>{labelSecondLink}</sbb-link>
  </sbb-skiplink-list>
);

export const SkiplinkList: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() && playStory,
};




export const SkiplinkListWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  'title-level': titleLevel.options[0],
  'title-content': 'Skip',
},
  play: isChromatic() && playStory,
};




const meta: Meta =  {
  decorators: [
    (Story) => (
      <div style={{padding: '2rem'}}>
        <Story />
        <h2>Use TAB to see the skiplink box</h2>
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-skiplink-list',
};

export default meta;
