/* eslint-disable max-len */
import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic';

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
  if (!context.args.negative) {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

  // return `background-color: ${ColorWhiteDefault};`;
  return `background-color: ${SbbColorCharcoalDefault};`;
};

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

const iconBurgerArgs = {
  icon: 'hamburger-menu-small',
};

const iconSearchArgs = {
  icon: 'magnifying-glass-small',
};

const iconLoginArgs = {
  icon: 'user-small',
};

const iconLanguageArgs = {
  icon: 'globe-small',
};

const SlotIconTemplate = (args) => getMarkupForSvg(args.icon);

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <div>
    {/* *************************************************
    Header section
    ************************************************* */}
    <sbb-section
      width="page-spacing"
      role="banner"
      style="background-color: var(--sbb-color-white-default); cursor: pointer;"
    >
      <sbb-stack
        slot="full-width"
        stack-width="100%"
        gap-horizontal="fixed-10x"
        space-leading="responsive-xxs"
        space-trailing="responsive-xxs"
        appearance="horizontal--space-between--centered"
      >
        <sbb-stack gap-horizontal="responsive-xxs" appearance="horizontal--start--centered">
          <SlotIconTemplate {...iconBurgerArgs} />
          <SlotIconTemplate {...iconSearchArgs} />
          <SlotIconTemplate {...iconLoginArgs} />
          <SlotIconTemplate {...iconLanguageArgs} />
        </sbb-stack>
        <sbb-stack gap-horizontal="fixed-10x" appearance="horizontal--end--centered">
          <sbb-logo
            protective-room="none"
            style="display:flex; height: var(--sbb-spacing-responsive-xxs);"
          ></sbb-logo>
        </sbb-stack>
      </sbb-stack>
    </sbb-section>

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
          <sbb-link-button
            href-value="https://github.com/lyne-design-system/lyne-components"
            text="Timetable toggle pretender"
            variant="secondary"
          ></sbb-link-button>
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
                    <span>Sparbillett</span>
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
                    <sbb-pearl-chain legs='{"legs":[{"cancellation":false,"duration":25},{"cancellation":false,"duration":10},{"cancellation":false,"duration":8},{"cancellation":false,"duration":15},{"cancellation":false,"duration":42}]}'></sbb-pearl-chain>
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
                    <sbb-button
                      icon="qrcode-small"
                      label="Ticket"
                      variant="secondary"
                      visual-button-only=""
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0,0,24,24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="m10,14.0001h4v-4h-4v4zm-.99998,1H15V9.00012H9.00002v5.99998zm1.99998-2h2v-2h-2v2zM6.99902,3.99612H10v-1.001H6.99902v1.001zm0,2.0037v-1h-2v1l1,.003v2h1v-1h2v-1.002H10.999v-1H8.99902v.002h-1v1h-1v-.003zm0,3h-1.999v-2h-1v-1h-1v2h1v1h.999v1h2v-1zm5.00048-3.9966h1v-2h-1v.998h-1v1h1v.002zM20,7.00312h1v-1.001h-1v1.001zm-2,5.00058h1v-1h-1v.998h-2v1h2v-.998zM3.99902,4.00322l2-.008v-1h-3v2.008h1v-1zM18,13.0037v2h1v-1h1v1h1v-2h-3zm-5.0005-8.00048v2h1v-1l3-.002v-1h1v-1h-1v-.998h-1v1.998h-1v-.998h-1v1h-1zM16,7.00372v2h1v-.002h1v-1h-1v-.998h-1zm1,14.00138h1v-2h-1v2zm3-1.0033h-1v1h1v.003h1v-2h-1v.997zm0-14.99858h1v-2h-1v-.002h-2v1h2v1.002zm0,10.00048h-1v2.998h-1v1h2v-1h1v-1h-1v-1.998zm0-2.9996h1v-2.001h-1v2.001zm-3-5.00298h2v-1h-2v1zm2,1.0002v2.00198h1v-.99998l1-.002v-1h-2zM11,21.0021h2v-1.001h-2v1.001zM9.99952,8.00132h.99998v.002h1v-2h-1v.998h-.99998v1zm0,11.00048h-1v1h1v.003h.99998v-2h-.99998v.997zM15,19.0047h-1v2h1v-.003h1v-1h-1v-.997zm-7.00098-4.0029-2,.002v1h1v.998h2v-1h-1v-1zM10,17.0021h2v-1h-2v1zm6-6.001h2v-1h-2v1zM2.99902,18.0011h1v-1h-1v1zm2-5h1.001v-1h-1.001v1zm2-3.99998h1v-1h-1v1zM14,8.00212h1v-1.001h-1v1.001zM3.99902,12.0011h1v-1h-1v1zm-1-1h1V9.00112h-1v1.99998zm0,3.001h1v-2.001h-1v2.001zM4.99902,18.0031h2.001v-1h-2.001v1zm0-4.0013h-1v1l-1,.002v1h2v-2.002zm2,5v.003h-1v1h1v.997h1v-1.998h1v-1h-2v.998zm-3,0h-1v2h1v.003h2v-1h-2v-1.003zm2-4.9977h2v-1h-2v1zm0-2h2v-1h-2v1zM17,17.0021h1v-1h-1v1zm-3-.0003h1v2h2v-1h-1v-1.998h1v-2h-1v1.998l-3,.002v1h-1v2h1v-1h1v-1.002z"
                        ></path>
                      </svg>
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
                    <span>Sparbillett</span>
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
                    <sbb-button
                      icon="qrcode-small"
                      label="Billett"
                      variant="secondary"
                      visual-button-only=""
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0,0,24,24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="m10,14.0001h4v-4h-4v4zm-.99998,1H15V9.00012H9.00002v5.99998zm1.99998-2h2v-2h-2v2zM6.99902,3.99612H10v-1.001H6.99902v1.001zm0,2.0037v-1h-2v1l1,.003v2h1v-1h2v-1.002H10.999v-1H8.99902v.002h-1v1h-1v-.003zm0,3h-1.999v-2h-1v-1h-1v2h1v1h.999v1h2v-1zm5.00048-3.9966h1v-2h-1v.998h-1v1h1v.002zM20,7.00312h1v-1.001h-1v1.001zm-2,5.00058h1v-1h-1v.998h-2v1h2v-.998zM3.99902,4.00322l2-.008v-1h-3v2.008h1v-1zM18,13.0037v2h1v-1h1v1h1v-2h-3zm-5.0005-8.00048v2h1v-1l3-.002v-1h1v-1h-1v-.998h-1v1.998h-1v-.998h-1v1h-1zM16,7.00372v2h1v-.002h1v-1h-1v-.998h-1zm1,14.00138h1v-2h-1v2zm3-1.0033h-1v1h1v.003h1v-2h-1v.997zm0-14.99858h1v-2h-1v-.002h-2v1h2v1.002zm0,10.00048h-1v2.998h-1v1h2v-1h1v-1h-1v-1.998zm0-2.9996h1v-2.001h-1v2.001zm-3-5.00298h2v-1h-2v1zm2,1.0002v2.00198h1v-.99998l1-.002v-1h-2zM11,21.0021h2v-1.001h-2v1.001zM9.99952,8.00132h.99998v.002h1v-2h-1v.998h-.99998v1zm0,11.00048h-1v1h1v.003h.99998v-2h-.99998v.997zM15,19.0047h-1v2h1v-.003h1v-1h-1v-.997zm-7.00098-4.0029-2,.002v1h1v.998h2v-1h-1v-1zM10,17.0021h2v-1h-2v1zm6-6.001h2v-1h-2v1zM2.99902,18.0011h1v-1h-1v1zm2-5h1.001v-1h-1.001v1zm2-3.99998h1v-1h-1v1zM14,8.00212h1v-1.001h-1v1.001zM3.99902,12.0011h1v-1h-1v1zm-1-1h1V9.00112h-1v1.99998zm0,3.001h1v-2.001h-1v2.001zM4.99902,18.0031h2.001v-1h-2.001v1zm0-4.0013h-1v1l-1,.002v1h2v-2.002zm2,5v.003h-1v1h1v.997h1v-1.998h1v-1h-2v.998zm-3,0h-1v2h1v.003h2v-1h-2v-1.003zm2-4.9977h2v-1h-2v1zm0-2h2v-1h-2v1zM17,17.0021h1v-1h-1v1zm-3-.0003h1v2h2v-1h-1v-1.998h1v-2h-1v1.998l-3,.002v1h-1v2h1v-1h1v-1.002z"
                        ></path>
                      </svg>
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
                    <span>Saturady, 21.02.2021, 1 h 26 min</span>
                  </div>
                  <div slot="details">
                    <sbb-pearl-chain legs='{"legs":[{"cancellation":false,"duration":25},{"cancellation":false,"duration":10},{"cancellation":false,"duration":8},{"cancellation":false,"duration":15},{"cancellation":false,"duration":42}]}'></sbb-pearl-chain>
                  </div>
                  <div slot="action">
                    <sbb-button
                      label="Details"
                      variant="secondary"
                      visual-button-only=""
                    ></sbb-button>
                  </div>
                </sbb-card-product>
              </li>
            </sbb-stack>
            <sbb-link-button
              href-value="https://github.com/lyne-design-system/lyne-components"
              text="All purchased tickets"
              variant="secondary"
            ></sbb-link-button>
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
              <sbb-button
                label="Buy"
                size="small"
                variant="secondary"
                visual-button-only=""
              ></sbb-button>
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
              <sbb-button
                label="buy"
                size="small"
                variant="secondary"
                visual-button-only=""
              ></sbb-button>
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
              <sbb-button
                label="Buy"
                size="small"
                variant="secondary"
                visual-button-only=""
              ></sbb-button>
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
              <sbb-button
                icon="highlighter-small"
                label="Edit subscription"
                variant="secondary"
                visual-button-only=""
              >
                <svg width="24" height="24" viewBox="0,0,24,24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="m17.5513,3.84424.3021.30211,3,3,.3021.30211-.2513.34553-8,11.00001-.3441.4732-.4138-.4137-.3167-.3167-.1016.0175c-.2193.0378-.5202.0894-.8459.1447-.5452.0925-1.16545.1962-1.58978.2622-.15323.229-.33883.5095-.49974.7535-.10317.1564-.19582.2973-.26267.399l-.07899.1204-.02139.0326-.00554.0084-.00141.0022-.00035.0005-.00008.0001-.00002.0001-.4182-.2741.41819.2741-.337.5142-.43474-.4347-.21165-.2117-1.15956.773-.12684.0846H2.55908l.52186-.7828,1.77304-2.6595-.6673-.6673.51802-.3363.27223.4194-.27221-.4194h.00004l.00016-.0001.00062-.0004.00243-.0016.00951-.0062.03635-.0236.13265-.0859c.11148-.0722.26436-.1711.42989-.2778.24274-.1565.51538-.3316.72445-.464.06184-.3896.1625-.9921.25396-1.534.05625-.3332.10933-.6453.14835-.8741l.02036-.1192-.31716-.3171-.41376-.4138.47322-.3442L17.2058,4.09553l.3455-.25129zM7.33037,14.0375c-.01603.0946-.03264.1928-.04954.2929-.11266.6674-.23676,1.4122-.28642,1.7436l-.03429.2288-.19661.122c-.1971.1223-.57402.364-.90527.5776l-.0904.0583,2.15556,2.1556.03438-.0522c.20671-.3134.45714-.6916.62792-.9442l.12344-.1826.21808-.0321c.3915-.0575,1.13578-.1815,1.78758-.2921.085-.0144.1682-.0286.2488-.0424l-3.63323-3.6332zm-1.75023,4.2497-1.13946,1.7092h1.40675l.86514-.5768-1.13243-1.1324zm1.68705-5.7271,5.17251,5.1725,7.4045-10.18125-2.3958-2.39579L7.26719,12.5601zm4.08621,1.7934,6-6.00005-.7071-.7071-6,5.99995.7071.7072z"
                  ></path>
                </svg>
              </sbb-button>
            </div>
          </sbb-card-product>
        </sbb-grid>
      </sbb-stack>
    </sbb-section>

    {/* *************************************************
    Hero Teaser section
    ************************************************* */}
    <sbb-section width="full-bleed--until-ultra">
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
    <sbb-footer accessibility-title="Footer" variant="clock-columns" negative={args.negative}>
      <div className="sbb-link-list-button-group">
        <sbb-link-list title-level="2" title-content="Help &amp; Contact.">
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
            variant="block"
          >
            Refunds
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
            variant="block"
          >
            Lost property office
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
            variant="block"
          >
            Complaints
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
            variant="block"
          >
            Praise
          </sbb-link>
          <sbb-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text-size="s"
            variant="block"
          >
            Report property damage
          </sbb-link>
        </sbb-link-list>
        <sbb-button
          variant="primary"
          size="m"
          label="All help topics"
          event-id="Event ID"
          name="sample-name"
          value="sample-value"
        ></sbb-button>
      </div>
      <sbb-link-list title-level="2" title-content="More SBB.">
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
          variant="block"
        >
          Jobs & careers
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
          variant="block"
        >
          Rail traffic information
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
          variant="block"
        >
          SBB News
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
          variant="block"
        >
          SBB Community
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
          variant="block"
        >
          Company
        </sbb-link>
      </sbb-link-list>
      <div className="sbb-link-list-button-group">
        <sbb-link-list title-level="2" title-content="Newsletter.">
          <sbb-link text-size="s" variant="block">
            Our newsletter regularly informs you of attractive offers from SBB via e-mail.
          </sbb-link>
          <span slot="button">
            <sbb-link-button
              href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text="Subscribe"
              variant="secondary"
            ></sbb-link-button>
          </span>
        </sbb-link-list>
        <sbb-button
          variant="secondary"
          size="m"
          label="Subscribe"
          event-id="Event ID"
          name="sample-name"
          value="sample-value"
        ></sbb-button>
      </div>
      <sbb-clock {...args.sbbClock}></sbb-clock>
      <sbb-divider />
      <sbb-link-list horizontal-from="large">
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="xs"
          variant="block"
        >
          Refunds
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="xs"
          variant="block"
        >
          Lost property office
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="xs"
          variant="block"
        >
          Complaints
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="xs"
          variant="block"
        >
          Praise
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="xs"
          variant="block"
        >
          Report property damage
        </sbb-link>
      </sbb-link-list>
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

/**
 * Stop the clock for Chromatic visual regression tests
 * and set time to given time
 */
if (isChromatic()) {
  homeLoggedIn.args.sbbClock = {
    'initial-time': '01:59:27',
    paused: true,
  };
} else {
  homeLoggedIn.args.sbbClock = {
    'initial-time': 'now',
    paused: false,
  };
}

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
