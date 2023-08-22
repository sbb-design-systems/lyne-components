/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';
import images from '../../global/images';

const DefaultTemplate = (args): JSX.Element => (
  <sbb-no-results {...args}>
    <sbb-image slot="image" image-src={images[images.length - 1]}></sbb-image>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
    <sbb-button slot="action" icon-name="arrows-circle-small" variant="secondary"></sbb-button>
  </sbb-no-results>
);

const NoImageTemplate = (args): JSX.Element => (
  <sbb-no-results {...args}>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
    <sbb-button slot="action" icon-name="arrows-circle-small" variant="secondary"></sbb-button>
  </sbb-no-results>
);

const NoErrorCodeTemplate = (args): JSX.Element => (
  <sbb-no-results {...args}>
    <sbb-image slot="image" image-src={images[images.length - 1]}></sbb-image>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <sbb-button slot="action" icon-name="arrows-circle-small" variant="secondary"></sbb-button>
  </sbb-no-results>
);

const NoActionTemplate = (args): JSX.Element => (
  <sbb-no-results {...args}>
    <sbb-image slot="image" image-src={images[images.length - 1]}></sbb-image>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
  </sbb-no-results>
);

const SlottedTitleTemplate = (): JSX.Element => (
  <sbb-no-results>
    <sbb-image slot="image" image-src={images[images.length - 1]}></sbb-image>
    <sbb-title slot="title" level="5">
      Unfortunately, an error has occurred.
    </sbb-title>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
    <sbb-button slot="action" icon-name="arrows-circle-small" variant="secondary"></sbb-button>
  </sbb-no-results>
);

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const defaultArgTypes: ArgTypes = {
  'title-content': titleContent,
  'title-level': titleLevel,
};

const defaultArgs: Args = {
  'title-content': 'Unfortunately, an error has occurred.',
  'title-level': 3,
};

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const NoImage: StoryObj = {
  render: NoImageTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const NoErrorCode: StoryObj = {
  render: NoErrorCodeTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const NoAction: StoryObj = {
  render: NoActionTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const SlottedTitle: StoryObj = {
  render: SlottedTitleTemplate,
  argTypes: defaultArgTypes,
  args: { 'title-content': undefined, 'title-level': undefined },
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', 'max-width': '45rem', margin: 'auto' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-no-results',
};

export default meta;
