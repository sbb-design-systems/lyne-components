import { h } from 'jsx-dom';
import readme from './readme.md';
import { Navigation } from '../../storybook/pages/home/home.common';
import '../../storybook/pages/home/home.scss';

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

        <section class="timetable-section sbb-grid">
          <div class="grid-reduced-width">
            <div class="timetable-placeholder">
              <h3 style="display: inline-block; text-align: center; width: 100%;">
                Skiplink component
              </h3>
            </div>
          </div>
        </section>

        <section class="product-section-logged-in sbb-grid">
          <div class="grid-reduced-width logged-in-overview">
            <h2>Use TAB to see the skiplink box</h2>
          </div>
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
