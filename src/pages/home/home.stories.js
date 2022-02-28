import {
  ColorCharcoalDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
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

  // return `background-color: ${ColorWhiteDefault};`;
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

const iconBurgerArgs = {
  icon: 'hamburger-menu-small'
};

const iconSearchArgs = {
  icon: 'magnifying-glass-small'
};

const iconLoginArgs = {
  icon: 'user-small'
};

const iconLanguageArgs = {
  icon: 'globe-small'
};

const SlotIconTemplate = (args) => (
  getMarkupForSvg(args.icon)
);

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <div>
    <lyne-section width='page-spacing' accessibility-title='Header' role='banner' style='background-color: var(--color-white-default); cursor: pointer;'>
      <lyne-stack slot='full-width' stack-width='100%' gap-horizontal='fixed-10x' space-leading='responsive-xxs' space-trailing='responsive-xxs' appearance='horizontal--space-between--centered'>
        <lyne-stack gap-horizontal='responsive-xxs' appearance='horizontal--start--centered'>
          <SlotIconTemplate {...iconBurgerArgs}/>
          <SlotIconTemplate {...iconSearchArgs}/>
          <SlotIconTemplate {...iconLoginArgs}/>
          <SlotIconTemplate {...iconLanguageArgs}/>
        </lyne-stack>
        <lyne-stack gap-horizontal='fixed-10x' appearance='horizontal--end--centered'>
          <lyne-sbb-logo protective-room='none' style='display:flex; height: calc((var(--spacing-responsive-xxs)) / var(--typo-scale-default) * 1rem);'></lyne-sbb-logo>
        </lyne-stack>
      </lyne-stack>
    </lyne-section>

    <lyne-section width='full-bleed--until-ultra-plus' accessibility-title='Timetable search' {...args} style='--section-background-color: var(--color-red-default)'>
      <lyne-stack slot='full-width' stack-width='100%' space-leading='responsive-xl' gap-vertical='fixed-4x' appearance='vertical--centered' style='margin-inline-start: calc(var(--page-spacing-responsive-left) / var(--typo-scale-default) * 1rem); margin-inline-end: calc(var(--page-spacing-responsive-right) / var(--typo-scale-default) * 1rem);'>
        <lyne-link-button href-value='https://github.com/lyne-design-system/lyne-components' text='Timetable toggle pretender' variant='secondary'></lyne-link-button>
        <lyne-stack gap-vertical='fixed-4x' appearance='vertical--centered' style='background-color: white; border-radius: 16px; max-width: 728px; height: 21vh; width: 100%; margin-bottom: -7vh; box-shadow: calc(var(--shadow-elevation-level-9-shadow-2-offset-x) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-2-offset-y) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-2-blur) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-2-spread) / var(--typo-scale-default) * 1rem) var(--shadow-elevation-level-9-hard-2-color), calc(var(--shadow-elevation-level-9-shadow-1-offset-x) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-1-offset-y) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-1-blur) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-1-spread) / var(--typo-scale-default) * 1rem) var(--shadow-elevation-level-5-hard-1-color)'></lyne-stack>
      </lyne-stack>
    </lyne-section>

    {/* <lyne-section accessibility-title='Experiment' {...args} style='margin-block-start: calc((var(--spacing-responsive-l)) / var(--typo-scale-default) * 1rem);'>
      <div slot='col-1'>
        <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
      </div>
      <div slot='col-2'>
        <lyne-stack space-leading='fixed-6x'>
          <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
          <lyne-stack space-leading='fixed-12x'>
            <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
          </lyne-stack>
        </lyne-stack>
      </div>
      <div slot='col-3'>
        <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
      </div>
      <div slot='col-4'>
        <lyne-stack space-leading='fixed-16x'>
          <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
        </lyne-stack>
      </div>
    </lyne-section> */}

    {/* <lyne-section accessibility-title='Experiment' {...args} style='margin-block-start: calc((var(--spacing-responsive-l)) / var(--typo-scale-default) * 1rem);'>
      <div slot='col-1'>
        <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
      </div>
      <div slot='col-2'>
        <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
      </div>
      <div slot='col-3'>
        <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
      </div>
      <div slot='col-4'>
        <lyne-sbb-clock initial-time='now'></lyne-sbb-clock>
      </div>
    </lyne-section> */}

    <lyne-section width='full-bleed--until-ultra' accessibility-title='Hero Teaser' {...args} style='margin-block-start: 21vh;'>
      <lyne-teaser-hero slot='full-width' button-text='Mehr erfahren' loading='eager' image-src='https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg' link='https://www.sbb.ch' open-in-new-window='false' text='Rücksichtsvoll mit SBB Green Class.'></lyne-teaser-hero>
    </lyne-section>
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
        <lyne-stack><lyne-title level='2' text='Newsletter.' visual-level='5'></lyne-title><p>Our newsletter regularly informs you of attractive offers from SBB via e-mail.</p><lyne-stack space-leading='fixed-3x'><lyne-link-button href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Subscribe' variant='secondary'></lyne-link-button></lyne-stack></lyne-stack>
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
