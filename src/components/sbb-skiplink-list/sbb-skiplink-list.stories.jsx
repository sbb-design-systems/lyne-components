import { h } from 'jsx-dom';
import readme from './readme.md';
import { Navigation, TimetableInput } from '../../storybook/pages/home/home.common';
import '../../storybook/pages/home/home.scss';

const size = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

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
  size,
  'title-level': titleLevel,
  'title-content': titleContent,
  labelFirstLink,
  hrefFirstLink,
  labelSecondLink,
  hrefSecondLink,
};

const defaultArgs = {
  size: size.options[1],
  'title-level': undefined,
  'title-content': undefined,
  labelFirstLink: 'To content',
  hrefFirstLink: 'https://www.sbb.ch/',
  labelSecondLink: 'To contact',
  hrefSecondLink: 'https://www.sbb.ch/en/help-and-contact.html',
};

const Template = ({ labelFirstLink, hrefFirstLink, labelSecondLink, hrefSecondLink, ...args }) => (
  <sbb-skiplink-list {...args}>
    <sbb-link href={hrefFirstLink}>{labelFirstLink}</sbb-link>
    <sbb-link href={hrefSecondLink}>{labelSecondLink}</sbb-link>
  </sbb-skiplink-list>
);

export const skiplinkList = Template.bind({});
skiplinkList.argTypes = defaultArgTypes;
skiplinkList.args = { ...defaultArgs };

export const skiplinkListWithTitle = Template.bind({});
skiplinkListWithTitle.argTypes = defaultArgTypes;
skiplinkListWithTitle.args = {
  ...defaultArgs,
  'title-level': titleLevel.options[0],
  'title-content': 'Skip',
};

export default {
  decorators: [
    (Story) => (
      <div>
        <Story />

        <sbb-header hide-on-scroll="true">
          <sbb-header-action
            id="hamburger-menu"
            icon-name="hamburger-menu-small"
            expand-from="small"
          >
            Menu
          </sbb-header-action>
          <div class="spacer" />
          <sbb-header-action icon-name="magnifying-glass-small" href="/">
            Search
          </sbb-header-action>
          <sbb-header-action icon-name="user-small">Sign in</sbb-header-action>
          <sbb-header-action
            icon-name="globe-small"
            id="language-menu-trigger"
            class="last-element"
          >
            English
          </sbb-header-action>
          <sbb-menu trigger="language-menu-trigger">
            <sbb-menu-action>Deutsch</sbb-menu-action>
            <sbb-menu-action>Français</sbb-menu-action>
            <sbb-menu-action>Italiano</sbb-menu-action>
            <sbb-menu-action icon-name="tick-small">English</sbb-menu-action>
          </sbb-menu>
          <a href="https://www.sbb.ch" slot="logo">
            <sbb-logo protective-room="none"></sbb-logo>
          </a>
        </sbb-header>

        <Navigation />

        <TimetableInput />

        <section class="sbb-page-spacing">
          <div class="top-products-container">Press TAB to open the skiplink panel</div>
        </section>
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
