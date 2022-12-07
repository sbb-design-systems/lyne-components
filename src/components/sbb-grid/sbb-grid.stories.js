import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import { h } from 'jsx-dom';
import { futureLeg } from '../sbb-pearl-chain/sbb-pearl-chain.sample-data';
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
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

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

const variant = {
  control: {
    type: 'select',
  },
  options: ['base', 'base--top-products', 'base--eight-columns-centered'],
  table: {
    category: 'Appearance',
  },
};

const defaultArgTypes = {
  appearance,
  variant,
};

const defaultArgs = {
  appearance: appearance.options[0],
  variant: variant.options[0],
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const TemplateGridTopProducts = (args) => (
  <sbb-grid {...args}>
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
          Tageskarte
        </sbb-title>
      </div>
      <div slot="text">
        <span>Gültig heute</span>
      </div>
      <div slot="action">
        <sbb-button size="m" variant="secondary" static>
          Kaufen
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
          Velo Tageskarte
        </sbb-title>
      </div>
      <div slot="text">
        <span>Gültig heute</span>
      </div>
      <div slot="action">
        <sbb-button size="m" variant="secondary" static>
          Kaufen
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
          Libero Kurzstrecke
        </sbb-title>
      </div>
      <div slot="text">
        <span>Gültig heute</span>
      </div>
      <div slot="action">
        <sbb-button size="m" variant="secondary" static>
          Kaufen
        </sbb-button>
      </div>
    </sbb-card-product>
    <sbb-card-product
      style="height: 100%;"
      slot="top-product-4"
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
          Streckenkarte
        </sbb-title>
      </div>
      <div slot="text">
        <span>Für regelmässige Streckenfahrten</span>
      </div>
      <div slot="action">
        <sbb-button size="m" variant="secondary" static>
          Kaufen
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
          Mit dem Generalabonnement geniessen Sie freie Fahrt.
        </sbb-title>
      </div>
      <div slot="action">
        <sbb-button variant="secondary" static>
          Alle GA im Überblick
        </sbb-button>
      </div>
    </sbb-card-product>
    <sbb-card-product
      style="height: 100%;"
      slot="top-product-subscription-2"
      appearance="primary"
      accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
      layout="loose"
      href-value="https://github.com/lyne-design-system/lyne-components"
    >
      <div slot="title">
        <sbb-title level="2" visual-level="1">
          1/2
        </sbb-title>
      </div>
      <div slot="lead">
        <sbb-title level="3" visual-level="6">
          Mit dem Halbtax zum halben Preis fahren.
        </sbb-title>
      </div>
      <div slot="action">
        <sbb-button variant="secondary" static>
          Zum halben Preis fahren
        </sbb-button>
      </div>
    </sbb-card-product>
  </sbb-grid>
);

const TemplateTickets = (args) => (
  <sbb-grid {...args}>
    <sbb-card-product
      slot="eight-columns-centered"
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
      <div slot="category">
        <span>Sparbillett</span>
      </div>
      <div slot="title">
        <sbb-title level="2" visual-level="6">
          Libero Tageskarte: Alle Zonen
        </sbb-title>
      </div>
      <div slot="text">
        <span>Heute, Gültig 24 Stunden</span>
      </div>
      <div slot="action">
        <sbb-button icon-name="qrcode-small" variant="secondary" static>
          Billett
        </sbb-button>
      </div>
    </sbb-card-product>
    <sbb-card-product
      slot="eight-columns-centered"
      appearance="primary"
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
        <span>Samstag, 21.02.2021, 1 h 26 min</span>
      </div>
      <div slot="details">
        <sbb-pearl-chain
          legs={[futureLeg]}
          data-now={new Date('2022-12-08T12:11:00+01:00').valueOf()}
          disable-animation={isChromatic()}
        ></sbb-pearl-chain>
      </div>
      <div slot="action">
        <sbb-button variant="secondary" static>
          Details
        </sbb-button>
      </div>
    </sbb-card-product>
  </sbb-grid>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Grid Base ------------------------ */
export const GridBase = TemplateTickets.bind({});

GridBase.argTypes = defaultArgTypes;
GridBase.args = {
  ...defaultArgs,
};

GridBase.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Grid Top Products',
};

/* --- Grid Top Products ------------------------ */
export const GridTopProducts = TemplateGridTopProducts.bind({});

GridTopProducts.argTypes = defaultArgTypes;
GridTopProducts.args = {
  ...defaultArgs,
  variant: variant.options[1],
};

GridTopProducts.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Grid Top Products',
};

/* --- Grid Top Products ------------------------ */
export const GridEightColumnsCentered = TemplateTickets.bind({});

GridEightColumnsCentered.argTypes = defaultArgTypes;
GridEightColumnsCentered.args = {
  ...defaultArgs,
  variant: variant.options[2],
};
GridEightColumnsCentered.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Grid Eight Columns Centered',
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}; padding: 2em;`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/layout/sbb-grid (Unfinished)',
};
