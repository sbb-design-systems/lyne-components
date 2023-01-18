import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import {
  futureLeg,
  pastLeg,
} from '../../../components/sbb-pearl-chain/sbb-pearl-chain.sample-data';
import './home.scss';
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
    <sbb-header>
      <sbb-header-action id="hamburger-menu" icon-name="hamburger-menu-small" expand-from="small">
        Menu
      </sbb-header-action>
      <div class="spacer" />
      <sbb-header-action icon-name="magnifying-glass-small">Search</sbb-header-action>
      <sbb-header-action icon-name="user-small" id="user-menu-trigger">
        Christina Müller
      </sbb-header-action>
      <sbb-menu trigger="user-menu-trigger">
        <sbb-menu-action icon-name="user-small" href="/">
          Account
        </sbb-menu-action>
        <sbb-menu-action icon-name="tickets-class-small">Tickets</sbb-menu-action>
        <sbb-menu-action icon-name="shopping-cart-small" amount="1">
          Shopping cart
        </sbb-menu-action>
        <sbb-divider />
        <sbb-menu-action icon-name="exit-small">Sign out</sbb-menu-action>
      </sbb-menu>
      <sbb-header-action icon-name="globe-small" id="language-menu-trigger" class="last-element">
        English
      </sbb-header-action>
      <sbb-menu trigger="language-menu-trigger">
        <sbb-menu-action>Deutsch</sbb-menu-action>
        <sbb-menu-action>Français</sbb-menu-action>
        <sbb-menu-action>Italiano</sbb-menu-action>
        <sbb-menu-action icon-name="tick-small">English</sbb-menu-action>
      </sbb-menu>
    </sbb-header>

    <Navigation />

    {/* *************************************************
    Timetable input section
    ************************************************* */}
    <TimetableInput />

    {/* *************************************************
    Products — Logged in
    ************************************************* */}
    <section class="product-section-logged-in sbb-grid">
      <div class="grid-reduced-width logged-in-overview">
        <div class="welcome">
          <span class="avatar-mock"></span>
          <sbb-title level="2" visual-level="1">
            Welcome, Christina Müller
          </sbb-title>
        </div>
        <div class="current-tickets">
          <sbb-title level="3" visual-level="4">
            Your current tickets & trips.
          </sbb-title>
          <ul class="current-tickets-list">
            <li>
              <sbb-card-product
                appearance="primary-negative"
                accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
                layout="standard"
                href-value="https://github.com/lyne-design-system/lyne-components"
              >
                <sbb-icon name="ticket-route-medium" slot="icon"></sbb-icon>
                <div slot="category">
                  <span>Saver ticket</span>
                </div>
                <div slot="title">
                  <sbb-title level="2" visual-level="1">
                    GA
                  </sbb-title>
                  <sbb-journey-header
                    destination="Loèche-les-Bains"
                    is-round-trip=""
                    markup="h2"
                    origin="La Chaux de Fonds"
                    size="5"
                  ></sbb-journey-header>
                </div>
                <sbb-title slot="lead" level="3" visual-level="6">
                  Generalabonnement
                </sbb-title>
                <div slot="text">
                  <span>2nd class, valid until 30.11.2022</span>
                </div>
                <div slot="details">
                  <sbb-pearl-chain
                    legs={[pastLeg, futureLeg]}
                    data-now={new Date('2021-12-08T12:11:00+01:00').valueOf()}
                    disable-animation={isChromatic()}
                  />
                </div>
                <div slot="card-badge">
                  <sbb-card-badge
                    is-discount=""
                    price="92.50"
                    slotgeneric='<span>on <time datetime="2021-11-25">Black Friday</time></span>'
                    text="from CHF"
                  >
                    <span slot="generic">
                      <span>
                        on <time datetime="2021-11-25">Black Friday</time>
                      </span>
                    </span>
                  </sbb-card-badge>
                </div>
                <div slot="action">
                  <sbb-button variant="secondary" static icon-name="qrcode-small">
                    Ticket
                  </sbb-button>
                </div>
              </sbb-card-product>
            </li>
            <li>
              <sbb-card-product
                appearance="primary-negative"
                accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
                layout="standard"
                href-value="https://github.com/lyne-design-system/lyne-components"
              >
                <sbb-icon name="ticket-route-medium" slot="icon"></sbb-icon>
                <div slot="category">
                  <span>Saver ticket</span>
                </div>
                <sbb-title slot="title" level="2" visual-level="6">
                  Libero day ticket: All zones
                </sbb-title>
                <div slot="text">
                  <span>Today, Valid 24 hours</span>
                </div>
                <div slot="action">
                  <sbb-button variant="secondary" static icon-name="qrcode-small">
                    Ticket
                  </sbb-button>
                </div>
              </sbb-card-product>
            </li>
            <li>
              <sbb-card-product
                appearance="primary-negative"
                accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
                layout="standard"
                href-value="https://github.com/lyne-design-system/lyne-components"
              >
                <sbb-journey-header
                  destination="Loèche-les-Bains"
                  is-round-trip=""
                  markup="h2"
                  origin="La Chaux de Fonds"
                  size="5"
                  slot="title"
                ></sbb-journey-header>
                <div slot="text">
                  <span>Saturday, 21.02.2021, 1 h 26 min</span>
                </div>
                <div slot="details">
                  <sbb-pearl-chain
                    legs={[pastLeg, futureLeg]}
                    data-now={new Date('2021-12-08T12:11:00+01:00').valueOf()}
                    disable-animation={isChromatic()}
                  />
                </div>
                <div slot="action">
                  <sbb-button variant="secondary" static>
                    Details
                  </sbb-button>
                </div>
              </sbb-card-product>
            </li>
          </ul>
          <sbb-button
            href="https://github.com/lyne-design-system/lyne-components"
            variant="secondary"
            class="all-purchased-tickets-button"
          >
            All purchased tickets
          </sbb-button>
        </div>
      </div>
    </section>

    {/* *************************************************
    Top products section
    ************************************************* */}
    <section class="sbb-page-spacing">
      <div class="tickets-container">
        <sbb-title level="2" negative={args.negative}>
          Your tickets & subscriptions.
        </sbb-title>
        <div class="tickets">
          <div class="purchase-tickets-again">
            <sbb-title level="3" visual-level="4" negative={args.negative}>
              Purchase tickets again.
            </sbb-title>
            <DailyTicketProduct />
            <BikeProduct />
            <LiberoProduct />
          </div>
          <div class="your-subscriptions">
            <sbb-title level="3" visual-level="4" negative={args.negative}>
              Your subscriptions.
            </sbb-title>
            <sbb-card-product
              appearance="primary"
              accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
              layout="loose"
              href-value="https://github.com/lyne-design-system/lyne-components"
            >
              <sbb-title slot="title" level="2" visual-level="1">
                GA
              </sbb-title>
              <sbb-title slot="lead" level="3" visual-level="6">
                Generalabonnement
              </sbb-title>
              <div slot="text">
                <span>2nd class, valid until 30.11.2022</span>
              </div>
              <div slot="action">
                <sbb-button variant="secondary" static>
                  Edit subscription
                </sbb-button>
              </div>
            </sbb-card-product>
          </div>
        </div>
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

/* --- Home Logged In ------------------------ */
export const homeLoggedIn = Template.bind({});

homeLoggedIn.argTypes = defaultArgTypes;
homeLoggedIn.args = { ...defaultArgs };
homeLoggedIn.documentation = {
  title: 'Home 2.0 Logged In',
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
