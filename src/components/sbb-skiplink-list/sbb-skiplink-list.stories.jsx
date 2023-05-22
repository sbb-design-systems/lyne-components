import { h } from 'jsx-dom';
import readme from './readme.md';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';
import isChromatic from 'chromatic';

const titleContent = {
  control: {
    type: 'text',
  },
};

const titleLevel = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
};

const labelFirstLink = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const hrefFirstLink = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const labelSecondLink = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const hrefSecondLink = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Links',
  },
};

const defaultArgTypes = {
  'title-level': titleLevel,
  'title-content': titleContent,
  labelFirstLink,
  hrefFirstLink,
  labelSecondLink,
  hrefSecondLink,
};

const defaultArgs = {
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

const Template = ({ labelFirstLink, hrefFirstLink, labelSecondLink, hrefSecondLink, ...args }) => (
  <sbb-skiplink-list {...args} data-testid="skiplink">
    <sbb-link href={hrefFirstLink}>{labelFirstLink}</sbb-link>
    <sbb-link href={hrefSecondLink}>{labelSecondLink}</sbb-link>
  </sbb-skiplink-list>
);

export const SkiplinkList = Template.bind({});
SkiplinkList.argTypes = defaultArgTypes;
SkiplinkList.args = { ...defaultArgs };
SkiplinkList.play = isChromatic() && playStory;

export const SkiplinkListWithTitle = Template.bind({});
SkiplinkListWithTitle.argTypes = defaultArgTypes;
SkiplinkListWithTitle.args = {
  ...defaultArgs,
  'title-level': titleLevel.options[0],
  'title-content': 'Skip',
};
SkiplinkListWithTitle.play = isChromatic() && playStory;

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
        <h2>Use TAB to see the skiplink box</h2>
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
    layout: 'fullscreen',
  },
  title: 'components/sbb-skiplink-list',
};
