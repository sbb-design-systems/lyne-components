import { h } from 'jsx-dom';
import readme from './readme.md';
import {
  BikeProduct,
  DailyTicketProduct,
  Footer,
  LiberoProduct,
  Navigation,
  TeaserHero,
  TimetableInput,
  wrapperStyle,
} from './home.common';
import './home.scss';

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const negative = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes = {
  negative,
};

const defaultArgs = {
  negative: false,
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <div>
    {/* *************************************************
    Header section
    ************************************************* */}
    <sbb-header hide-on-scroll="true">
      <sbb-header-action id="hamburger-menu" icon-name="hamburger-menu-small" expand-from="small">
        Menu
      </sbb-header-action>
      <div class="spacer" />
      <sbb-header-action icon-name="magnifying-glass-small" href="/">
        Search
      </sbb-header-action>
      <sbb-header-action icon-name="user-small">Sign in</sbb-header-action>
      <sbb-header-action icon-name="globe-small" id="language-menu-trigger" class="last-element">
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

    {/* *************************************************
    Timetable input section
    ************************************************* */}
    <TimetableInput />

    {/* *************************************************
    Alerts section
    ************************************************* */}
    <section class="alert-section sbb-grid">
      <div class="grid-reduced-width">
        <sbb-alert-group accessibility-title="Disruptions">
          <sbb-alert
            title-content="Interruption between Genève and Lausanne"
            href="https://www.sbb.ch"
            size="l"
          >
            The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          </sbb-alert>
          <sbb-alert title-content="Interruption between Berne and Olten" href="https://www.sbb.ch">
            Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00
            o'clock construction work will take place. You have to expect changed travel times and
            changed connections.
          </sbb-alert>
        </sbb-alert-group>
      </div>
    </section>

    {/* *************************************************
    Top products section
    ************************************************* */}
    <section class="sbb-page-spacing">
      <div class="top-products-container">
        <sbb-title level="2" negative={args.negative}>
          Top Products.
        </sbb-title>
        <div class="top-products-grid">
          <DailyTicketProduct />
          <BikeProduct />
          <LiberoProduct />
          <sbb-card
            aria-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            href="https://github.com/lyne-design-system/lyne-components"
            color="milk"
            size="s"
          >
            <span class="card-product">
              <sbb-icon name="ticket-route-medium"></sbb-icon>
              <span class="content">
                <sbb-title level="2" visual-level="6">
                  Route map
                </sbb-title>
                <span class="sbb-text-s card-description">For regular trips</span>
              </span>
              <sbb-button size="m" variant="secondary">
                Buy
              </sbb-button>
            </span>
          </sbb-card>

          <sbb-card
            aria-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            href="https://github.com/lyne-design-system/lyne-components"
            color="milk"
            size="s"
            class="grid-span-2"
          >
            <span class="card-product-big">
              <span class="content">
                <sbb-title level="2" visual-level="1">
                  GA
                </sbb-title>
                <sbb-title level="3" visual-level="6">
                  Enjoy unlimited travel with the GA travel card.
                </sbb-title>
              </span>
              <sbb-button variant="secondary">All GAs at a glance</sbb-button>
            </span>
          </sbb-card>

          <sbb-card
            aria-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            href="https://github.com/lyne-design-system/lyne-components"
            class="grid-span-2"
            color="milk"
            size="s"
          >
            <span class="card-product-big">
              <span class="content">
                <sbb-title level="2" visual-level="1">
                  1/2
                </sbb-title>
                <sbb-title level="3" visual-level="6">
                  Travel at half price with the half-fare travel card.
                </sbb-title>
              </span>
              <sbb-button variant="secondary">Ride at half price</sbb-button>
            </span>
          </sbb-card>
        </div>
        <sbb-action-group orientation="vertical" horizontal-from="small">
          <sbb-button
            href="https://github.com/lyne-design-system/lyne-components"
            icon-name="qrcode-small"
            variant="primary"
          >
            My tickets & subscriptions
          </sbb-button>
          <sbb-button
            href="https://github.com/lyne-design-system/lyne-components"
            variant="secondary"
          >
            All Products
          </sbb-button>
        </sbb-action-group>
      </div>
    </section>

    {/* *************************************************
    Hero Teaser section
    ************************************************* */}
    <TeaserHero />

    {/* *************************************************
    Footer section
    ************************************************* */}
    <Footer {...args} />
  </div>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Home ------------------------ */
export const home = Template.bind({});

home.argTypes = defaultArgTypes;
home.args = { ...defaultArgs };
home.documentation = {
  title: 'Home 2.0',
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'pages/home',
};
