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
  <div>
    <lyne-teaser-hero button-text="Mehr erfahren" image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg" link="https://www.sbb.ch" open-in-new-window="false" text="Rücksichtsvoll mit SBB Green Class."></lyne-teaser-hero>
    <lyne-footer {...args}>
      <div slot='col-1'>
        <lyne-stack>
          <lyne-link-list textsize='s' title-level='2' title-text='Help &amp; Contact.' variant='positive'><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rückerstattungen' text-size='s' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Fundbüro' text-size='s' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Beschwerden' text-size='s' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Lob aussprechen' text-size='s' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Sachbeschädigung melden' text-size='s' variant='positive'></lyne-link></li></lyne-link-list>
          <lyne-stack space-leading='fixed-3x'>
            <lyne-link-button href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='All help topics' variant='primary'></lyne-link-button>
          </lyne-stack>
        </lyne-stack>
      </div>
      <div slot='col-2'>
        <lyne-link-list textsize='s' title-level='2' title-text='More SBB.' variant='positive'><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Jobs & careers' text-size='s' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rail traffic information' text-size='s' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='SBB News' text-size='s' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='SBB Community' text-size='s' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Company' text-size='s' variant='positive'></lyne-link></li></lyne-link-list>
      </div>
      <div slot='col-3'>
        <lyne-stack><lyne-title level='2' text='Newsletter.' variant='positive' visual-level='5'></lyne-title><p>Our newsletter regularly informs you of attractive offers from SBB via e-mail.</p><lyne-stack space-leading='fixed-3x'><lyne-link-button href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Subscribe' variant='secondary'></lyne-link-button></lyne-stack></lyne-stack>
      </div>
      <div slot='clock'>
        <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
      </div>
      <div slot='bottom'>
        <lyne-link-list textsize='xs' title-level='2' title-text='' list-direction='horizontal-from-large' variant='positive'><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rückerstattungen' text-size='xs' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Fundbüro' text-size='xs' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Beschwerden' text-size='xs' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Lob aussprechen' text-size='xs' variant='positive'></lyne-link></li><li class='link-list__item' slot='link-list__item'><lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Sachbeschädigung melden' text-size='xs' variant='positive'></lyne-link></li></lyne-link-list>
      </div>
    </lyne-footer>
  </div>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Footer ------------------------ */
export const home = Template.bind({});

home.argTypes = defaultArgTypes;
home.args = JSON.parse(JSON.stringify(defaultArgs));
home.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Home 2.0'
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
  title: 'pages/home'
};
