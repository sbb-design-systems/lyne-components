/* eslint-disable max-len */
import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Documentation platform container                  */
/* ************************************************* */

const documentationPlatformContainerStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return {};
  }

  return {
    'background-color': SbbColorCharcoalDefault,
  };
};

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */

const wrapperStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

  // return `background-color: ${ColorWhiteDefault};`;
  return `background-color: ${SbbColorCharcoalDefault};`;
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const appearance = {
  control: {
    type: 'select',
  },
  options: ['primary', 'primary-negative'],
  table: {
    category: 'Appearance',
  },
};

const defaultArgTypes = {
  appearance,
};

const defaultArgs = {
  appearance: appearance.options[0],
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <div>
    {/* *************************************************
    Header section
    ************************************************* */}
    <sbb-header shadow={true}>
      <sbb-header-action icon="hamburger-menu-small" expand-from="small">
        Menu
      </sbb-header-action>
      <div class="spacer" />
      <sbb-header-action icon="magnifying-glass-small">Suchen</sbb-header-action>
      <sbb-header-action icon="user-small" id="user-menu-trigger">
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
      <sbb-header-action icon="globe-small" id="language-menu-trigger" className="last-element">
        Deutsch
      </sbb-header-action>
      <sbb-menu trigger="language-menu-trigger">
        <sbb-menu-action icon-name="tick-small">Deutsch</sbb-menu-action>
        <sbb-menu-action>Français</sbb-menu-action>
        <sbb-menu-action>Italiano</sbb-menu-action>
        <sbb-menu-action>English</sbb-menu-action>
      </sbb-menu>
    </sbb-header>

    {/* *************************************************
    Timetable input section
    ************************************************* */}
    <sbb-section
      width="page-spacing"
      style="background-color: var(--sbb-color-red-default); max-width: 1440px; margin-inline-start: auto; margin-inline-end: auto;"
    >
      <sbb-grid slot="full-width" variant="base--eight-columns-centered">
        <sbb-stack
          slot="eight-columns-centered"
          stack-width="100%"
          space-leading="responsive-xl"
          gap-vertical="fixed-4x"
          appearance="vertical--centered"
        >
          <sbb-button
            href="https://github.com/lyne-design-system/lyne-components"
            variant="secondary"
          >
            Timetable toggle pretender
          </sbb-button>
          <sbb-stack
            gap-vertical="fixed-4x"
            appearance="vertical--centered"
            style="background-color: white; border-radius: 16px; max-width: 842px; height: 21vh; width: 100%; margin-bottom: -7vh; box-shadow: var(--sbb-shadow-elevation-level-9-shadow-2-offset-x) var(--sbb-shadow-elevation-level-9-shadow-2-offset-y) var(--sbb-shadow-elevation-level-9-shadow-2-blur) var(--sbb-shadow-elevation-level-9-shadow-2-spread) var(--sbb-shadow-elevation-level-9-hard-2-color), var(--sbb-shadow-elevation-level-9-shadow-1-offset-x) var(--sbb-shadow-elevation-level-9-shadow-1-offset-y) var(--sbb-shadow-elevation-level-9-shadow-1-blur) var(--sbb-shadow-elevation-level-9-shadow-1-spread) var(--sbb-shadow-elevation-level-5-hard-1-color)"
          ></sbb-stack>
        </sbb-stack>
      </sbb-grid>
    </sbb-section>

    {/* *************************************************
    Products — Logged in
    ************************************************* */}
    <sbb-section
      width="page-spacing"
      style="margin-inline-start: auto; margin-inline-end: auto; margin-block-end: var(--sbb-spacing-responsive-l); padding-block-start: 7vh; max-width: 1440px; background-color: var(--sbb-color-milk-default);"
    >
      <sbb-grid slot="full-width" variant="base--eight-columns-centered">
        <sbb-stack
          slot="eight-columns-centered"
          appearance="vertical"
          gap-vertical="responsive-m"
          space-leading="responsive-xl"
          space-trailing="responsive-l"
        >
          <sbb-stack
            appearance="horizontal--start"
            collapse-horizontal-below="small"
            gap-horizontal="fixed-6x"
            gap-vertical="fixed-4x"
            no-wrap="true"
          >
            <span
              class="i-pretend-to-be-the-avatar-component"
              style="min-width: 72px; width: 72px; height: 72px; background-color: var(--sbb-color-cloud-default); border-radius: 50%; display:flex;'"
            ></span>
            <sbb-title level="2" visual-level="1">
              Welcome, Christina Müller
            </sbb-title>
          </sbb-stack>
          <sbb-stack appearance="vertical" gap-vertical="responsive-s">
            <sbb-title level="3" visual-level="4">
              Your current tickets & trips.
            </sbb-title>
            <sbb-stack tag="ul" appearance="vertical" gap-vertical="fixed-4x">
              <li>
                <sbb-card-product
                  appearance="primary-negative"
                  accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
                  layout="standard"
                  href-value="https://github.com/lyne-design-system/lyne-components"
                >
                  <div slot="icon">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0,0,36,36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="m3.25,6.24951h29.5v6.99999h-.5c-2.2739,0-4,1.7262-4,4,0,2.2739,1.7261,4,4,4h.5v7H3.25V6.24951zm1,1V27.2495h27.5v-5.023c-2.5785-.2395-4.5-2.32-4.5-4.977s1.9215-4.7375,4.5-4.977V7.24951H4.25zm10.9501,8.67479c.3869.2079.8295.3259,1.2999.3259,1.5181,0,2.75-1.2318,2.75-2.75,0-1.5198-1.2321-2.75-2.75-2.75-1.5196,0-2.75,1.2304-2.75,2.75,0,.6876.2524,1.3164.6697,1.7988l-2.6206,3.2764c-.387-.2079-.8293-.3259-1.2991-.3259-1.51986,0-2.75,1.2321-2.75,2.75s1.23014,2.75,2.75,2.75c1.5181,0,2.75-1.2318,2.75-2.75,0-.6877-.2528-1.3167-.6704-1.799l2.6205-3.2762zM14.75,13.5002c0-.9673.7826-1.75,1.75-1.75.9661,0,1.75.7829,1.75,1.75,0,.9659-.7841,1.75-1.75,1.75-.9671,0-1.75-.7839-1.75-1.75zm-4.25,5.7493c-.96714,0-1.75.7839-1.75,1.75s.78286,1.75,1.75,1.75c.9659,0,1.75-.7841,1.75-1.75,0-.9658-.7841-1.75-1.75-1.75zM24.25,7.49951v.4875h1v-.4875h-1zm0,1.4625v.975h1v-.975h-1zm0,1.94999v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zM24.25,26.512v.4875h1v-.4875h-1z"
                      ></path>
                    </svg>
                  </div>
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
                  <div slot="lead">
                    <sbb-title level="3" visual-level="6">
                      Generalabonnement
                    </sbb-title>
                  </div>
                  <div slot="text">
                    <span>2nd class, valid until 30.11.2022</span>
                  </div>
                  <div slot="details">
                    <sbb-pearl-chain legs={[{ duration: 60 }, { duration: 120 }]} />
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
                  <div slot="icon">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0,0,36,36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="m3.25,6.24951h29.5v6.99999h-.5c-2.2739,0-4,1.7262-4,4,0,2.2739,1.7261,4,4,4h.5v7H3.25V6.24951zm1,1V27.2495h27.5v-5.023c-2.5785-.2395-4.5-2.32-4.5-4.977s1.9215-4.7375,4.5-4.977V7.24951H4.25zm10.9501,8.67479c.3869.2079.8295.3259,1.2999.3259,1.5181,0,2.75-1.2318,2.75-2.75,0-1.5198-1.2321-2.75-2.75-2.75-1.5196,0-2.75,1.2304-2.75,2.75,0,.6876.2524,1.3164.6697,1.7988l-2.6206,3.2764c-.387-.2079-.8293-.3259-1.2991-.3259-1.51986,0-2.75,1.2321-2.75,2.75s1.23014,2.75,2.75,2.75c1.5181,0,2.75-1.2318,2.75-2.75,0-.6877-.2528-1.3167-.6704-1.799l2.6205-3.2762zM14.75,13.5002c0-.9673.7826-1.75,1.75-1.75.9661,0,1.75.7829,1.75,1.75,0,.9659-.7841,1.75-1.75,1.75-.9671,0-1.75-.7839-1.75-1.75zm-4.25,5.7493c-.96714,0-1.75.7839-1.75,1.75s.78286,1.75,1.75,1.75c.9659,0,1.75-.7841,1.75-1.75,0-.9658-.7841-1.75-1.75-1.75zM24.25,7.49951v.4875h1v-.4875h-1zm0,1.4625v.975h1v-.975h-1zm0,1.94999v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zM24.25,26.512v.4875h1v-.4875h-1z"
                      ></path>
                    </svg>
                  </div>
                  <div slot="category">
                    <span>Saver ticket</span>
                  </div>
                  <div slot="title">
                    <sbb-title level="2" visual-level="6">
                      Libero day ticket: All zones
                    </sbb-title>
                  </div>
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
                  <div slot="title">
                    <sbb-journey-header
                      destination="Loèche-les-Bains"
                      is-round-trip=""
                      markup="h2"
                      origin="La Chaux de Fonds"
                      size="5"
                    ></sbb-journey-header>
                  </div>
                  <div slot="text">
                    <span>Saturday, 21.02.2021, 1 h 26 min</span>
                  </div>
                  <div slot="details">
                    <sbb-pearl-chain legs={[{ duration: 60 }, { duration: 120 }]} />
                  </div>
                  <div slot="action">
                    <sbb-button variant="secondary" static>
                      Details
                    </sbb-button>
                  </div>
                </sbb-card-product>
              </li>
            </sbb-stack>
            <sbb-button
              href="https://github.com/lyne-design-system/lyne-components"
              variant="secondary"
            >
              All purchased tickets
            </sbb-button>
          </sbb-stack>
        </sbb-stack>
      </sbb-grid>
    </sbb-section>

    {/* *************************************************
    Top products section
    ************************************************* */}

    <sbb-section width="page-spacing">
      <sbb-stack
        slot="full-width"
        gap-vertical="responsive-m"
        space-leading="responsive-l"
        space-trailing="responsive-l"
      >
        <sbb-title level="2" visual-level="2">
          Your tickets & subscriptions.
        </sbb-title>
        <sbb-grid variant="base--top-products">
          <sbb-card-product
            style="height: 100%;"
            slot="top-product-1"
            appearance="primary"
            accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            layout="standard"
            href-value="https://github.com/lyne-design-system/lyne-components"
          >
            <div slot="icon">
              <svg width="36" height="36" viewBox="0,0,36,36" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="m3.25,6.24951h29.5v6.99999h-.5c-2.2739,0-4,1.7262-4,4,0,2.2739,1.7261,4,4,4h.5v7H3.25V6.24951zm1,1V27.2495h27.5v-5.023c-2.5785-.2395-4.5-2.32-4.5-4.977s1.9215-4.7375,4.5-4.977V7.24951H4.25zm10.9501,8.67479c.3869.2079.8295.3259,1.2999.3259,1.5181,0,2.75-1.2318,2.75-2.75,0-1.5198-1.2321-2.75-2.75-2.75-1.5196,0-2.75,1.2304-2.75,2.75,0,.6876.2524,1.3164.6697,1.7988l-2.6206,3.2764c-.387-.2079-.8293-.3259-1.2991-.3259-1.51986,0-2.75,1.2321-2.75,2.75s1.23014,2.75,2.75,2.75c1.5181,0,2.75-1.2318,2.75-2.75,0-.6877-.2528-1.3167-.6704-1.799l2.6205-3.2762zM14.75,13.5002c0-.9673.7826-1.75,1.75-1.75.9661,0,1.75.7829,1.75,1.75,0,.9659-.7841,1.75-1.75,1.75-.9671,0-1.75-.7839-1.75-1.75zm-4.25,5.7493c-.96714,0-1.75.7839-1.75,1.75s.78286,1.75,1.75,1.75c.9659,0,1.75-.7841,1.75-1.75,0-.9658-.7841-1.75-1.75-1.75zM24.25,7.49951v.4875h1v-.4875h-1zm0,1.4625v.975h1v-.975h-1zm0,1.94999v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zM24.25,26.512v.4875h1v-.4875h-1z"
                ></path>
              </svg>
            </div>
            <div slot="title">
              <sbb-title level="2" visual-level="6">
                <span>Daily ticket</span>
              </sbb-title>
            </div>
            <div slot="text">
              <span>Valid today</span>
            </div>
            <div slot="action">
              <sbb-button size="m" variant="secondary" static>
                Buy
              </sbb-button>
            </div>
          </sbb-card-product>
          <sbb-card-product
            style="height: 100%;"
            slot="top-product-2"
            appearance="primary"
            accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            layout="standard"
            href-value="https://github.com/lyne-design-system/lyne-components"
          >
            <div slot="icon">
              <svg width="36" height="36" viewBox="0,0,36,36" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="m24.75,9.24902H19.5v.99998h4.3157l-2.3333,3.5h-8.3326l-.1197.3292-1.0424,2.8666c-.4747-.1272-.9734-.195-1.4877-.195-3.17114,0-5.75,2.5788-5.75,5.75,0,3.1711,2.57886,5.75,5.75,5.75,3.1711,0,5.75-2.5789,5.75-5.75,0-2.3043-1.3617-4.2959-3.3228-5.2125l.923-2.5383h7.5779l1.2476,2.7436c-1.7451.9882-2.9242,2.8622-2.9242,5.0072,0,3.171,2.5772,5.75,5.75,5.75,3.1711,0,5.75-2.5789,5.75-5.75,0-3.1712-2.5789-5.75-5.75-5.75-.6716,0-1.3166.1155-1.916.3278l-1.2653-2.7825,2.8458-4.2687.5183-.77738H24.75zM20.7515,22.4998c0-1.7403.9403-3.2651,2.3401-4.0924l1.9547,4.2986.9104-.4139-1.9553-4.2998c.4717-.1573.9761-.2425,1.5001-.2425,2.6188,0,4.75,2.1311,4.75,4.75,0,2.6188-2.1312,4.75-4.75,4.75-2.6203,0-4.75-2.1311-4.75-4.75zm-9.1072-4.6107-1.6142,4.4391.9398.3417,1.6139-4.4381c1.5774.7734,2.6662,2.3961,2.6662,4.268,0,2.6188-2.1311,4.75-4.75,4.75-2.61886,0-4.75-2.1312-4.75-4.75,0-2.6189,2.13114-4.75,4.75-4.75.3944,0,.7777.0483,1.1443.1393zm-.8316-6.1393h4.188v-1h-4.188v1z"
                ></path>
              </svg>
            </div>
            <div slot="title">
              <sbb-title level="2" visual-level="6">
                Bike day pass
              </sbb-title>
            </div>
            <div slot="text">
              <span>Valid today</span>
            </div>
            <div slot="action">
              <sbb-button size="m" variant="secondary" static>
                Buy
              </sbb-button>
            </div>
          </sbb-card-product>
          <sbb-card-product
            style="height: 100%;"
            slot="top-product-3"
            appearance="primary"
            accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            layout="standard"
            href-value="https://github.com/lyne-design-system/lyne-components"
          >
            <div slot="icon">
              <svg width="36" height="36" viewBox="0,0,36,36" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="m3.25,6.24951h29.5v6.99999h-.5c-2.2739,0-4,1.7262-4,4,0,2.2739,1.7261,4,4,4h.5v7H3.25V6.24951zm1,1V27.2495h27.5v-5.023c-2.5785-.2395-4.5-2.32-4.5-4.977s1.9215-4.7375,4.5-4.977V7.24951H4.25zm10.9501,8.67479c.3869.2079.8295.3259,1.2999.3259,1.5181,0,2.75-1.2318,2.75-2.75,0-1.5198-1.2321-2.75-2.75-2.75-1.5196,0-2.75,1.2304-2.75,2.75,0,.6876.2524,1.3164.6697,1.7988l-2.6206,3.2764c-.387-.2079-.8293-.3259-1.2991-.3259-1.51986,0-2.75,1.2321-2.75,2.75s1.23014,2.75,2.75,2.75c1.5181,0,2.75-1.2318,2.75-2.75,0-.6877-.2528-1.3167-.6704-1.799l2.6205-3.2762zM14.75,13.5002c0-.9673.7826-1.75,1.75-1.75.9661,0,1.75.7829,1.75,1.75,0,.9659-.7841,1.75-1.75,1.75-.9671,0-1.75-.7839-1.75-1.75zm-4.25,5.7493c-.96714,0-1.75.7839-1.75,1.75s.78286,1.75,1.75,1.75c.9659,0,1.75-.7841,1.75-1.75,0-.9658-.7841-1.75-1.75-1.75zM24.25,7.49951v.4875h1v-.4875h-1zm0,1.4625v.975h1v-.975h-1zm0,1.94999v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zM24.25,26.512v.4875h1v-.4875h-1z"
                ></path>
              </svg>
            </div>
            <div slot="title">
              <sbb-title level="2" visual-level="6">
                Libero short distance ticket
              </sbb-title>
            </div>
            <div slot="text">
              <span>Valid today</span>
            </div>
            <div slot="action">
              <sbb-button size="m" variant="secondary" static>
                Buy
              </sbb-button>
            </div>
          </sbb-card-product>
          <sbb-card-product
            style="height: 100%;"
            slot="top-product-subscription-1"
            appearance="primary"
            accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
            layout="loose"
            href-value="https://github.com/lyne-design-system/lyne-components"
          >
            <div slot="title">
              <sbb-title level="2" visual-level="1">
                GA
              </sbb-title>
            </div>
            <div slot="lead">
              <sbb-title level="3" visual-level="6">
                Generalabonnement
              </sbb-title>
            </div>
            <div slot="text">
              <span>2nd class, valid until 30.11.2022</span>
            </div>
            <div slot="action">
              <sbb-button icon-name="highlighter-small" variant="secondary" static>
                Edit subscription
              </sbb-button>
            </div>
          </sbb-card-product>
        </sbb-grid>
      </sbb-stack>
    </sbb-section>

    {/* *************************************************
    Hero Teaser section
    ************************************************* */}
    <sbb-section width="full-bleed--until-ultra" {...args}>
      <sbb-stack slot="full-width" space-leading="responsive-l" space-trailing="responsive-l">
        <sbb-teaser-hero
          link-content="Learn more"
          image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"
          href="https://www.sbb.ch"
        >
          Considerate with SBB Green Class.
        </sbb-teaser-hero>
      </sbb-stack>
    </sbb-section>

    {/* *************************************************
    Footer section
    ************************************************* */}
    <sbb-footer accessibility-title="Footer" {...args}>
      <div slot="col-1">
        <sbb-stack>
          <sbb-link-list title-level="2" title-content="Help &amp; Contact.">
            <sbb-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text-size="s"
            >
              Refunds
            </sbb-link>
            <sbb-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text-size="s"
            >
              Lost property office
            </sbb-link>
            <sbb-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text-size="s"
            >
              Complaints
            </sbb-link>
            <sbb-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text-size="s"
            >
              Praise
            </sbb-link>
            <sbb-link
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text-size="s"
            >
              Report property damage
            </sbb-link>
          </sbb-link-list>
          <sbb-stack space-leading="fixed-3x">
            <sbb-button
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              variant="primary"
            >
              All help topics
            </sbb-button>
          </sbb-stack>
        </sbb-stack>
      </div>
      <div slot="col-2">
        <sbb-link-list title-level="2" title-content="More SBB.">
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
          >
            Jobs & careers
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
          >
            Rail traffic information
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
          >
            SBB News
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
          >
            SBB Community
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
          >
            Company
          </sbb-link>
        </sbb-link-list>
      </div>
      <div slot="col-3">
        <sbb-stack>
          <sbb-title level="2" visual-level="5">
            Newsletter.
          </sbb-title>
          <p>Our newsletter regularly informs you of attractive offers from SBB via e-mail.</p>
          <sbb-stack space-leading="fixed-3x">
            <sbb-button
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              variant="secondary"
            >
              Subscribe
            </sbb-button>
          </sbb-stack>
        </sbb-stack>
      </div>
      <div slot="clock">
        <sbb-clock initial-time="now" class="chromatic-ignore"></sbb-clock>
      </div>
      <div slot="bottom">
        <sbb-link-list title-level="2" title-content="" horizontal-from="large">
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="xs"
          >
            Refunds
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="xs"
          >
            Lost property office
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="xs"
          >
            Complaints
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="xs"
          >
            Praise
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="xs"
          >
            Report property damage
          </sbb-link>
        </sbb-link-list>
      </div>
    </sbb-footer>
  </div>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Home Logged In ------------------------ */
export const homeLoggedIn = Template.bind({});

homeLoggedIn.argTypes = defaultArgTypes;
homeLoggedIn.args = JSON.parse(JSON.stringify(defaultArgs));
homeLoggedIn.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
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
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'pages/home',
};
