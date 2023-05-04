import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-skiplink-list>
    <sbb-link negative size="m" href={args.href1}>
      {args.label1}
    </sbb-link>
    <sbb-link negative size="m" href={args.href2}>
      {args.label2}
    </sbb-link>
  </sbb-skiplink-list>
);

const onNavigationClose = (dialog) => {
  dialog.addEventListener('didClose', () => {
    document.getElementById('nav-marker').reset();
  });
};

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
  href1: 'https://www.sbb.ch/',
  label2: 'To contact',
  href2: 'https://www.sbb.ch/en/help-and-contact.html',
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

        {/* NAVIGATION */}
        <sbb-navigation trigger="hamburger-menu" ref={(dialog) => onNavigationClose(dialog)}>
          <sbb-navigation-marker id="nav-marker">
            <sbb-navigation-action id="nav-1">Tickets & Offers</sbb-navigation-action>
            <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>
            <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>
            <sbb-navigation-action id="nav-4" href="https://www.sbb.ch/en/">
              Help & Contact
            </sbb-navigation-action>
          </sbb-navigation-marker>

          <sbb-navigation-marker size="s">
            <sbb-navigation-action id="nav-5">Deutsch</sbb-navigation-action>
            <sbb-navigation-action id="nav-6">Français</sbb-navigation-action>
            <sbb-navigation-action id="nav-7">Italiano</sbb-navigation-action>
            <sbb-navigation-action id="nav-8" active>
              English
            </sbb-navigation-action>
          </sbb-navigation-marker>

          <sbb-navigation-section title-content="Title one" trigger="nav-1">
            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-button size="m" class="navigation-button">
              All Tickets & Offers
            </sbb-button>
          </sbb-navigation-section>

          <sbb-navigation-section title-content="Title two" trigger="nav-2">
            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>
          </sbb-navigation-section>

          <sbb-navigation-section title-content="Title three" trigger="nav-3">
            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-navigation-list label="Label">
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
              <sbb-navigation-action>Label</sbb-navigation-action>
            </sbb-navigation-list>

            <sbb-button
              size="m"
              variant="secondary"
              icon-name="circle-information-small"
              class="navigation-button"
            >
              Travel Information
            </sbb-button>
          </sbb-navigation-section>
        </sbb-navigation>

        {/* SECTION */}
        <section class="timetable-section sbb-grid">
          <div class="grid-reduced-width">
            <div class="timetable-placeholder" style="display: inline-block;">
              <h2 style="text-align: center;">Use TAB button to focus on the skiplink</h2>
            </div>
          </div>
        </section>

        {/* ALERTS */}
        <section class="alert-section sbb-grid">
          <div class="grid-reduced-width">
            <sbb-alert-group accessibility-title="Disruptions">
              <sbb-alert
                title-content="Interruption between Genève and Lausanne"
                href="https://www.sbb.ch"
                size="l"
              >
                The rail traffic between Allaman and Morges is interrupted. All trains are
                cancelled.
              </sbb-alert>
              <sbb-alert
                title-content="Interruption between Berne and Olten"
                href="https://www.sbb.ch"
              >
                Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00
                o'clock construction work will take place. You have to expect changed travel times
                and changed connections.
              </sbb-alert>
            </sbb-alert-group>
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
