/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic';
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
  SkiplinkList,
  TeaserHero,
  TimetableInput,
  wrapperStyle,
} from './home.common';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
};

const defaultArgs: Args = {
  negative: false,
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args): JSX.Element => (
  <div>
    <SkiplinkList />

    {/* *************************************************
    Header section
    ************************************************* */}
    <sbb-header hide-on-scroll="true">
      <sbb-header-action id="hamburger-menu" icon-name="hamburger-menu-small" expand-from="small">
        Menu
      </sbb-header-action>
      <div class="sbb-header-spacer" />
      <sbb-header-action icon-name="magnifying-glass-small" href="/">
        Search
      </sbb-header-action>
      <sbb-header-action
        icon-name="user-small"
        id="user-menu-trigger"
        class="sbb-header-shrinkable"
      >
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
        <sbb-menu-action aria-pressed="false">Deutsch</sbb-menu-action>
        <sbb-menu-action aria-pressed="false">Français</sbb-menu-action>
        <sbb-menu-action aria-pressed="false">Italiano</sbb-menu-action>
        <sbb-menu-action icon-name="tick-small" aria-pressed="true">
          English
        </sbb-menu-action>
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
              <sbb-card>
                <sbb-card-badge>
                  <span>%</span>
                  <span>from CHF</span>
                  <span>92.50</span>
                  <span>
                    on <time dateTime="2021-11-25">Black Friday</time>
                  </span>
                </sbb-card-badge>

                <sbb-card-action href="https://github.com/lyne-design-system/lyne-components">
                  View Ticket
                </sbb-card-action>

                <span class="card-product">
                  <sbb-icon name="ticket-route-medium"></sbb-icon>
                  <span class="content">
                    <span class="sbb-text-s card-description">Saver ticket</span>
                    <sbb-title level="2" visual-level="1">
                      GA
                    </sbb-title>
                    <sbb-journey-header
                      origin="La Chaux de Fonds"
                      destination="Loèche-les-Bains"
                      round-trip
                      level="2"
                    ></sbb-journey-header>
                    <sbb-title level="3" visual-level="6">
                      Generalabonnement
                    </sbb-title>
                    <span class="sbb-text-s card-description">
                      2nd class, valid until 30.11.2022
                    </span>
                    <sbb-pearl-chain
                      legs={[pastLeg, futureLeg]}
                      data-now={new Date('2021-12-08T12:11:00+01:00').valueOf()}
                      disable-animation={isChromatic()}
                    />
                  </span>
                  <sbb-button variant="secondary" icon-name="qrcode-small" is-static>
                    Ticket
                  </sbb-button>
                </span>
              </sbb-card>
            </li>
            <li>
              <sbb-card>
                <sbb-card-action href="https://github.com/lyne-design-system/lyne-components">
                  Buy saver ticket
                </sbb-card-action>

                <span class="card-product">
                  <sbb-icon name="ticket-route-medium"></sbb-icon>
                  <span class="content">
                    <span class="sbb-text-s card-description">Saver ticket</span>
                    <sbb-title level="2" visual-level="6">
                      Libero day ticket: All zones
                    </sbb-title>
                    <span class="sbb-text-s card-description">Today, Valid 24 hours</span>
                  </span>
                  <sbb-button variant="secondary" icon-name="qrcode-small" is-static>
                    Ticket
                  </sbb-button>
                </span>
              </sbb-card>
            </li>
            <li>
              <sbb-card>
                <sbb-card-action href="https://github.com/lyne-design-system/lyne-components">
                  Check details of the journey
                </sbb-card-action>

                <span class="card-product">
                  <span class="content">
                    <sbb-journey-header
                      origin="La Chaux de Fonds"
                      destination="Loèche-les-Bains"
                      round-trip=""
                      level="2"
                    ></sbb-journey-header>
                    <span class="sbb-text-s card-description">
                      Saturday, 21.02.2021, 1 h 26 min
                    </span>
                    <sbb-pearl-chain
                      legs={[pastLeg, futureLeg]}
                      data-now={new Date('2021-12-08T12:11:00+01:00').valueOf()}
                      disable-animation={isChromatic()}
                    />
                  </span>
                  <sbb-button variant="secondary" is-static>
                    Details
                  </sbb-button>
                </span>
              </sbb-card>
            </li>
          </ul>
          <sbb-button
            variant="secondary"
            class="all-purchased-tickets-button"
            onClick={() => (document.getElementById('my-dialog') as HTMLSbbDialogElement).open()}
          >
            All purchased tickets
          </sbb-button>

          <sbb-dialog id="my-dialog" title-content="My Dialog" title-back-button>
            <p style={{ marginTop: '0' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <sbb-button
              variant="secondary"
              size="m"
              onClick={() =>
                (document.getElementById('my-stacked-dialog') as HTMLSbbDialogElement).open()
              }
            >
              Open stacked dialog
            </sbb-button>

            <sbb-dialog id="my-stacked-dialog" title-content="Stacked Dialog" title-back-button>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </sbb-dialog>

            <sbb-action-group
              slot="action-group"
              align-group="stretch"
              orientation="vertical"
              horizontal-from="medium"
            >
              <sbb-link
                size="s"
                align-self="start"
                icon-name="chevron-small-left-small"
                href="https://www.sbb.ch/en/"
                sbb-dialog-close
              >
                Link
              </sbb-link>
              <sbb-button size="m" variant="secondary" sbb-dialog-close>
                Cancel
              </sbb-button>
              <sbb-button size="m" variant="primary" sbb-dialog-close>
                Button
              </sbb-button>
            </sbb-action-group>
          </sbb-dialog>
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
            <sbb-card color="milk" size="s">
              <sbb-card-action href="https://github.com/lyne-design-system/lyne-components">
                Edit subscription
              </sbb-card-action>

              <span class="card-product-big">
                <span class="content">
                  <sbb-title level="2" visual-level="1">
                    GA
                  </sbb-title>
                  <sbb-title level="3" visual-level="6">
                    Generalabonnement
                  </sbb-title>
                  <span class="sbb-text-s card-description">2nd class, valid until 30.11.2022</span>
                </span>
                <sbb-button variant="secondary" is-static>
                  Edit subscription
                </sbb-button>
              </span>
            </sbb-card>
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
export const homeLoggedIn: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div style={wrapperStyle(context)}>
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

export default meta;
