import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-skiplink-list>
    <sbb-link href={args.href1}>{args.label1}</sbb-link>
    <sbb-link href={args.href2}>{args.label2}</sbb-link>
  </sbb-skiplink-list>
);

const firstLinkLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'first link',
  },
};

const firstLinkHref = {
  control: {
    type: 'text',
  },
  table: {
    category: 'first link',
  },
};

const secondLinkLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'second link',
  },
};

const secondLinkHref = {
  control: {
    type: 'text',
  },
  table: {
    category: 'second link',
  },
};

const defaultArgTypes = {
  label1: firstLinkLabel,
  href1: firstLinkHref,
  label2: secondLinkLabel,
  href2: secondLinkHref,
};

const defaultArgs = {
  label1: 'To content',
  href1: 'http://www.sbb.ch',
  label2: 'To contact',
  href2: 'http://www.sbb.ch',
};

export const skiplinkList = Template.bind({});
skiplinkList.argTypes = defaultArgTypes;
skiplinkList.args = {
  ...defaultArgs,
};

/*
export const skiplinkList = Template.bind({});

skiplinkList.args = {};
*/
export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
  title: 'components/sbb-skiplink-list',
};
