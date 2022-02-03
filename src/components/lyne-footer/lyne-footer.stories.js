import {
  ColorCharcoalDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
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
    'background-color': ColorCharcoalDefault
  };
};

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */

const wrapperStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return `background-color: ${ColorWhiteDefault};`;
  }

  return `background-color: ${ColorCharcoalDefault};`;
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'primary-negative'
  ],
  table: {
    category: 'Appearance'
  }
};

const defaultArgTypes = {
  appearance
};

const defaultArgs = {
  appearance: appearance.options[0]
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <lyne-footer {...args}>
    <div slot='col-1'>
      <lyne-link-list textsize="s" title-level="2" title-text="Help &amp; Contact." variant="positive"><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Rückerstattungen" text-size="s" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Fundbüro" text-size="s" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Beschwerden" text-size="s" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Lob aussprechen" text-size="s" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Sachbeschädigung melden" text-size="s" variant="positive"></lyne-link></li></lyne-link-list>
    </div>
    <div slot='col-2'>
      <lyne-link-list textsize="s" title-level="2" title-text="More SBB." variant="positive"><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Jobs & careers" text-size="s" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Rail traffic information" text-size="s" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="SBB News" text-size="s" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="SBB Community" text-size="s" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Company" text-size="s" variant="positive"></lyne-link></li></lyne-link-list>
    </div>
    <div slot='col-3'>
      <lyne-title level="5" text="Newsletter." variant="positive" visual-level="5"></lyne-title><p style="font-family: var(--typo-type-face-sbb-roman); font-weight: normal; line-height: var(--typo-line-height-body-text); letter-spacing: var(--typo-letter-spacing-body-text); font-size: calc(var(--lyne-font-size-text-s) / var(--typo-scale-default) * 1rem);color: var(--color-granite-default);">Our newsletter regularly informs you of attractive offers from SBB via e-mail.</p><lyne-button variant="secondary" size="large" label="Subscribe" name="sample-name" value="sample-value"></lyne-button>
    </div>
    <div slot='clock'>
      <lyne-sbb-clock initial-time="now"></lyne-sbb-clock>
    </div>
    <div slot='bottom'>
      <lyne-link-list textsize="xs" title-level="2" title-text="" list-direction="horizontal" variant="positive"><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Rückerstattungen" text-size="xs" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Fundbüro" text-size="xs" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Beschwerden" text-size="xs" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Lob aussprechen" text-size="xs" variant="positive"></lyne-link></li><li class="link-list__item" slot="link-list__item"><lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Sachbeschädigung melden" text-size="xs" variant="positive"></lyne-link></li></lyne-link-list>
    </div>
  </lyne-footer>
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
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Footer'
};

/* --- Footer negative --------------- */
export const footerNegative = Template.bind({});

footerNegative.argTypes = defaultArgTypes;
footerNegative.args = {
  ...defaultArgs,
  appearance: appearance.options[1]
};
footerNegative.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Footer Negative'
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}`}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    },
    layout: 'fullscreen'
  },
  title: 'layout/lyne-footer'
};
