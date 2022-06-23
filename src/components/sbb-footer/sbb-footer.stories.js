import {
  SbbColorCharcoalDefault,
  SbbColorWhiteDefault,
} from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens.mjs';
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

  return `background-color: ${SbbColorWhiteDefault};`;
  // return `background-color: ${ColorCharcoalDefault};`;
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
  'accessibility-title': 'Footer',
  appearance: appearance.options[0],
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <sbb-footer {...args}>
    <div slot="col-1">
      <sbb-stack>
        <sbb-link-list
          textsize="s"
          title-level="2"
          title-text="Help &amp; Contact."
          variant="positive"
        >
          <li class="link-list__item" slot="link-list__item">
            <sbb-link
              href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text="Rückerstattungen"
              text-size="s"
              variant="positive"
            ></sbb-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <sbb-link
              href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text="Fundbüro"
              text-size="s"
              variant="positive"
            ></sbb-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <sbb-link
              href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text="Beschwerden"
              text-size="s"
              variant="positive"
            ></sbb-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <sbb-link
              href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text="Lob aussprechen"
              text-size="s"
              variant="positive"
            ></sbb-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <sbb-link
              href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
              text="Sachbeschädigung melden"
              text-size="s"
              variant="positive"
            ></sbb-link>
          </li>
        </sbb-link-list>
        <sbb-stack space-leading="fixed-3x">
          <sbb-link-button
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="All help topics"
            variant="primary"
          ></sbb-link-button>
        </sbb-stack>
      </sbb-stack>
    </div>
    <div slot="col-2">
      <sbb-link-list textsize="s" title-level="2" title-text="More SBB." variant="positive">
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="Jobs & careers"
            text-size="s"
            variant="positive"
          ></sbb-link>
        </li>
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="Rail traffic information"
            text-size="s"
            variant="positive"
          ></sbb-link>
        </li>
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="SBB News"
            text-size="s"
            variant="positive"
          ></sbb-link>
        </li>
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="SBB Community"
            text-size="s"
            variant="positive"
          ></sbb-link>
        </li>
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="Company"
            text-size="s"
            variant="positive"
          ></sbb-link>
        </li>
      </sbb-link-list>
    </div>
    <div slot="col-3">
      <sbb-stack>
        <sbb-title level="2" text="Newsletter." variant="positive" visual-level="5"></sbb-title>
        <p>Our newsletter regularly informs you of attractive offers from SBB via e-mail.</p>
        <sbb-stack space-leading="fixed-3x">
          <sbb-link-button
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="Subscribe"
            variant="secondary"
          ></sbb-link-button>
        </sbb-stack>
      </sbb-stack>
    </div>
    <div slot="clock">
      <sbb-clock initial-time="now" class="chromatic-ignore"></sbb-clock>
    </div>
    <div slot="bottom">
      <sbb-link-list
        textsize="xs"
        title-level="2"
        title-text=""
        list-direction="horizontal-from-large"
        variant="positive"
      >
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="Rückerstattungen"
            text-size="xs"
            variant="positive"
          ></sbb-link>
        </li>
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="Fundbüro"
            text-size="xs"
            variant="positive"
          ></sbb-link>
        </li>
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="Beschwerden"
            text-size="xs"
            variant="positive"
          ></sbb-link>
        </li>
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="Lob aussprechen"
            text-size="xs"
            variant="positive"
          ></sbb-link>
        </li>
        <li class="link-list__item" slot="link-list__item">
          <sbb-link
            href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            text="Sachbeschädigung melden"
            text-size="xs"
            variant="positive"
          ></sbb-link>
        </li>
      </sbb-link-list>
    </div>
  </sbb-footer>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Footer ------------------------ */
export const footer = Template.bind({});

footer.argTypes = defaultArgTypes;
footer.args = JSON.parse(JSON.stringify(defaultArgs));
footer.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Footer',
};

/* --- Footer negative --------------- */
export const footerNegative = Template.bind({});

footerNegative.argTypes = defaultArgTypes;
footerNegative.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
};
footerNegative.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Footer Negative',
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
  title: 'components/sbb-footer',
};
