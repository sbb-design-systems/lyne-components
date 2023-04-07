import { h } from 'jsx-dom';
import readme from './readme.md';

const LinkTemplate = (args) => <sbb-link href="https://www.sbb.ch">{args.linkTitle}</sbb-link>;

const Template = (args) => (
  <sbb-skiplink-list {...args}>
    {links.map((linkTitle) => (
      <LinkTemplate {...{ linkTitle }} />
    ))}
  </sbb-skiplink-list>
);

const links = ['Content', 'Contact us'];

export const skiplinkList = Template.bind({});

skiplinkList.args = {};

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
