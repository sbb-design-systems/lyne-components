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
    <sbb-header>
      <sbb-header-action id="hamburger-menu" icon-name="hamburger-menu-small" expand-from="small">
        Menu
      </sbb-header-action>
      <div class="spacer" />
      <sbb-header-action icon-name="magnifying-glass-small">Search</sbb-header-action>
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
    <section class="sbb-grid">
      <div class="top-products-container grid-full-width">
        <sbb-title level="2" negative={args.negative}>
          Top Products.
        </sbb-title>
        <div class="top-products-grid">
          <DailyTicketProduct />
          <BikeProduct />
          <LiberoProduct />
          <sbb-card-product
            appearance="primary"
            accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            layout="standard"
            href-value="https://github.com/lyne-design-system/lyne-components"
          >
            <sbb-icon name="ticket-route-medium" slot="icon"></sbb-icon>
            <sbb-title slot="title" level="2" visual-level="6">
              Route map
            </sbb-title>
            <div slot="text">
              <span>For regular trips</span>
            </div>
            <div slot="action">
              <sbb-button size="m" variant="secondary" static>
                Buy
              </sbb-button>
            </div>
          </sbb-card-product>
          <sbb-card-product
            appearance="primary"
            accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            layout="loose"
            href-value="https://github.com/lyne-design-system/lyne-components"
            class="grid-span-2"
          >
            <sbb-title slot="title" level="2" visual-level="1">
              GA
            </sbb-title>
            <sbb-title slot="lead" level="3" visual-level="6">
              Enjoy unlimited travel with the GA travel card.
            </sbb-title>
            <div slot="action">
              <sbb-button variant="secondary" static>
                All GAs at a glance
              </sbb-button>
            </div>
          </sbb-card-product>
          <sbb-card-product
            appearance="primary"
            accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            layout="loose"
            href-value="https://github.com/lyne-design-system/lyne-components"
            class="grid-span-2"
          >
            <sbb-title slot="title" level="2" visual-level="1">
              1/2
            </sbb-title>
            <sbb-title slot="lead" level="3" visual-level="6">
              Travel at half price with the half-fare travel card.
            </sbb-title>
            <div slot="action">
              <sbb-button variant="secondary" static>
                Ride at half price
              </sbb-button>
            </div>
          </sbb-card-product>
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
