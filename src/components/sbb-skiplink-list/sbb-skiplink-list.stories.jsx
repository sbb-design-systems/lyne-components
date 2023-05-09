import { h } from 'jsx-dom';
import readme from './readme.md';
import { Navigation, TimetableInput } from '../../storybook/pages/home/home.common';
import '../../storybook/pages/home/home.scss';

const firstLinkLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'First link',
  },
};

const firstLinkHref = {
  control: {
    type: 'text',
  },
  table: {
    category: 'First link',
  },
};

const secondLinkLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Second link',
  },
};

const secondLinkHref = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Second link',
  },
};

const defaultArgTypes = {
  labelFirstLink: firstLinkLabel,
  hrefFirstLink: firstLinkHref,
  labelSecondLink: secondLinkLabel,
  hrefSecondLink: secondLinkHref,
};

const defaultArgs = {
  labelFirstLink: 'To content',
  hrefFirstLink: 'https://www.sbb.ch/',
  labelSecondLink: 'To contact',
  hrefSecondLink: 'https://www.sbb.ch/en/help-and-contact.html',
};

const Template = (args) => (
  <sbb-skiplink-list>
    <sbb-link negative size="m" href={args.hrefFirstLink}>
      {args.labelFirstLink}
    </sbb-link>
    <sbb-link negative size="m" href={args.hrefSecondLink}>
      {args.labelSecondLink}
    </sbb-link>
  </sbb-skiplink-list>
);

export const skiplinkList = Template.bind({});
skiplinkList.argTypes = defaultArgTypes;
skiplinkList.args = { ...defaultArgs };

export default {
  decorators: [
    (Story) => (
      <div>
        <Story />

        {/* HEADER */}
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
