/* eslint-disable max-len */
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
    {/* *************************************************
    Header section
    ************************************************* */}
    <sbb-section width='page-spacing' role='banner' style='background-color: var(--color-white-default); cursor: pointer;'>
      <sbb-stack slot='full-width' stack-width='100%' gap-horizontal='fixed-10x' space-leading='responsive-xxs' space-trailing='responsive-xxs' appearance='horizontal--space-between--centered'>
        <sbb-stack gap-horizontal='responsive-xxs' appearance='horizontal--start--centered'>
          <SlotIconTemplate {...iconBurgerArgs}/>
          <SlotIconTemplate {...iconSearchArgs}/>
          <SlotIconTemplate {...iconLoginArgs}/>
          <SlotIconTemplate {...iconLanguageArgs}/>
        </sbb-stack>
        <sbb-stack gap-horizontal='fixed-10x' appearance='horizontal--end--centered'>
          <sbb-logo protective-room='none' style='display:flex; height: calc((var(--spacing-responsive-xxs)) / var(--typo-scale-default) * 1rem);'></sbb-logo>
        </sbb-stack>
      </sbb-stack>
    </sbb-section>

    {/* *************************************************
    Timetable input section
    ************************************************* */}
    <sbb-section width='page-spacing' style='background-color: var(--color-red-default); max-width: 1440px; margin-inline-start: auto; margin-inline-end: auto;'>
      <sbb-grid slot='full-width' variant='base--eight-columns-centered'>
        <sbb-stack slot='eight-columns-centered' stack-width='100%' space-leading='responsive-xl' gap-vertical='fixed-4x' appearance='vertical--centered'>
          <sbb-link-button href-value='https://github.com/lyne-design-system/lyne-components' text='Timetable toggle pretender' variant='secondary'></sbb-link-button>
          <sbb-stack gap-vertical='fixed-4x' appearance='vertical--centered' style='background-color: white; border-radius: 16px; max-width: 842px; height: 21vh; width: 100%; margin-bottom: -7vh; box-shadow: calc(var(--shadow-elevation-level-9-shadow-2-offset-x) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-2-offset-y) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-2-blur) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-2-spread) / var(--typo-scale-default) * 1rem) var(--shadow-elevation-level-9-hard-2-color), calc(var(--shadow-elevation-level-9-shadow-1-offset-x) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-1-offset-y) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-1-blur) / var(--typo-scale-default) * 1rem) calc(var(--shadow-elevation-level-9-shadow-1-spread) / var(--typo-scale-default) * 1rem) var(--shadow-elevation-level-5-hard-1-color)'></sbb-stack>
        </sbb-stack>
      </sbb-grid>
    </sbb-section>

    {/* *************************************************
    Top products section
    ************************************************* */}

    <sbb-section width='page-spacing' style='padding-block-start: 7vh;'>
      <sbb-stack slot='full-width' gap-vertical='responsive-m' space-leading='responsive-l' space-trailing='responsive-l'>
        <sbb-title level='2' text='Top Produkte.' variant='positive' visual-level='2'></sbb-title>
        <sbb-grid variant='base--top-products'>
          <sbb-card-product style='height: 100%;' slot='top-product-1' appearance='primary' accessibility-label='The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography' layout='standard' href-value='https://github.com/lyne-design-system/lyne-components'><div slot='icon'><svg width='36' height='36' viewBox='0,0,36,36' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='m3.25,6.24951h29.5v6.99999h-.5c-2.2739,0-4,1.7262-4,4,0,2.2739,1.7261,4,4,4h.5v7H3.25V6.24951zm1,1V27.2495h27.5v-5.023c-2.5785-.2395-4.5-2.32-4.5-4.977s1.9215-4.7375,4.5-4.977V7.24951H4.25zm10.9501,8.67479c.3869.2079.8295.3259,1.2999.3259,1.5181,0,2.75-1.2318,2.75-2.75,0-1.5198-1.2321-2.75-2.75-2.75-1.5196,0-2.75,1.2304-2.75,2.75,0,.6876.2524,1.3164.6697,1.7988l-2.6206,3.2764c-.387-.2079-.8293-.3259-1.2991-.3259-1.51986,0-2.75,1.2321-2.75,2.75s1.23014,2.75,2.75,2.75c1.5181,0,2.75-1.2318,2.75-2.75,0-.6877-.2528-1.3167-.6704-1.799l2.6205-3.2762zM14.75,13.5002c0-.9673.7826-1.75,1.75-1.75.9661,0,1.75.7829,1.75,1.75,0,.9659-.7841,1.75-1.75,1.75-.9671,0-1.75-.7839-1.75-1.75zm-4.25,5.7493c-.96714,0-1.75.7839-1.75,1.75s.78286,1.75,1.75,1.75c.9659,0,1.75-.7841,1.75-1.75,0-.9658-.7841-1.75-1.75-1.75zM24.25,7.49951v.4875h1v-.4875h-1zm0,1.4625v.975h1v-.975h-1zm0,1.94999v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zM24.25,26.512v.4875h1v-.4875h-1z'></path></svg></div><div slot='title'><sbb-title level='2' text='Tageskarte' visual-level='6'></sbb-title></div><div slot='text'><span>Gültig heute</span></div><div slot='action'><sbb-button label='Kaufen' size='small' variant='secondary' visual-button-only=''></sbb-button></div></sbb-card-product>
          <sbb-card-product style='height: 100%;' slot='top-product-2' appearance='primary' accessibility-label='The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography' layout='standard' href-value='https://github.com/lyne-design-system/lyne-components'><div slot='icon'><svg width='36' height='36' viewBox='0,0,36,36' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='m24.75,9.24902H19.5v.99998h4.3157l-2.3333,3.5h-8.3326l-.1197.3292-1.0424,2.8666c-.4747-.1272-.9734-.195-1.4877-.195-3.17114,0-5.75,2.5788-5.75,5.75,0,3.1711,2.57886,5.75,5.75,5.75,3.1711,0,5.75-2.5789,5.75-5.75,0-2.3043-1.3617-4.2959-3.3228-5.2125l.923-2.5383h7.5779l1.2476,2.7436c-1.7451.9882-2.9242,2.8622-2.9242,5.0072,0,3.171,2.5772,5.75,5.75,5.75,3.1711,0,5.75-2.5789,5.75-5.75,0-3.1712-2.5789-5.75-5.75-5.75-.6716,0-1.3166.1155-1.916.3278l-1.2653-2.7825,2.8458-4.2687.5183-.77738H24.75zM20.7515,22.4998c0-1.7403.9403-3.2651,2.3401-4.0924l1.9547,4.2986.9104-.4139-1.9553-4.2998c.4717-.1573.9761-.2425,1.5001-.2425,2.6188,0,4.75,2.1311,4.75,4.75,0,2.6188-2.1312,4.75-4.75,4.75-2.6203,0-4.75-2.1311-4.75-4.75zm-9.1072-4.6107-1.6142,4.4391.9398.3417,1.6139-4.4381c1.5774.7734,2.6662,2.3961,2.6662,4.268,0,2.6188-2.1311,4.75-4.75,4.75-2.61886,0-4.75-2.1312-4.75-4.75,0-2.6189,2.13114-4.75,4.75-4.75.3944,0,.7777.0483,1.1443.1393zm-.8316-6.1393h4.188v-1h-4.188v1z'></path></svg></div><div slot='title'><sbb-title level='2' text='Velo Tageskarte' visual-level='6'></sbb-title></div><div slot='text'><span>Gültig heute</span></div><div slot='action'><sbb-button label='Kaufen' size='small' variant='secondary' visual-button-only=''></sbb-button></div></sbb-card-product>
          <sbb-card-product style='height: 100%;' slot='top-product-3' appearance='primary' accessibility-label='The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography' layout='standard' href-value='https://github.com/lyne-design-system/lyne-components'><div slot='icon'><svg width='36' height='36' viewBox='0,0,36,36' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='m3.25,6.24951h29.5v6.99999h-.5c-2.2739,0-4,1.7262-4,4,0,2.2739,1.7261,4,4,4h.5v7H3.25V6.24951zm1,1V27.2495h27.5v-5.023c-2.5785-.2395-4.5-2.32-4.5-4.977s1.9215-4.7375,4.5-4.977V7.24951H4.25zm10.9501,8.67479c.3869.2079.8295.3259,1.2999.3259,1.5181,0,2.75-1.2318,2.75-2.75,0-1.5198-1.2321-2.75-2.75-2.75-1.5196,0-2.75,1.2304-2.75,2.75,0,.6876.2524,1.3164.6697,1.7988l-2.6206,3.2764c-.387-.2079-.8293-.3259-1.2991-.3259-1.51986,0-2.75,1.2321-2.75,2.75s1.23014,2.75,2.75,2.75c1.5181,0,2.75-1.2318,2.75-2.75,0-.6877-.2528-1.3167-.6704-1.799l2.6205-3.2762zM14.75,13.5002c0-.9673.7826-1.75,1.75-1.75.9661,0,1.75.7829,1.75,1.75,0,.9659-.7841,1.75-1.75,1.75-.9671,0-1.75-.7839-1.75-1.75zm-4.25,5.7493c-.96714,0-1.75.7839-1.75,1.75s.78286,1.75,1.75,1.75c.9659,0,1.75-.7841,1.75-1.75,0-.9658-.7841-1.75-1.75-1.75zM24.25,7.49951v.4875h1v-.4875h-1zm0,1.4625v.975h1v-.975h-1zm0,1.94999v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zM24.25,26.512v.4875h1v-.4875h-1z'></path></svg></div><div slot='title'><sbb-title level='2' text='Libero Kurzstrecke' visual-level='6'></sbb-title></div><div slot='text'><span>Gültig heute</span></div><div slot='action'><sbb-button label='Kaufen' size='small' variant='secondary' visual-button-only=''></sbb-button></div></sbb-card-product>
          <sbb-card-product style='height: 100%;' slot='top-product-4' appearance='primary' accessibility-label='The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography' layout='standard' href-value='https://github.com/lyne-design-system/lyne-components'><div slot='icon'><svg width='36' height='36' viewBox='0,0,36,36' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='m3.25,6.24951h29.5v6.99999h-.5c-2.2739,0-4,1.7262-4,4,0,2.2739,1.7261,4,4,4h.5v7H3.25V6.24951zm1,1V27.2495h27.5v-5.023c-2.5785-.2395-4.5-2.32-4.5-4.977s1.9215-4.7375,4.5-4.977V7.24951H4.25zm10.9501,8.67479c.3869.2079.8295.3259,1.2999.3259,1.5181,0,2.75-1.2318,2.75-2.75,0-1.5198-1.2321-2.75-2.75-2.75-1.5196,0-2.75,1.2304-2.75,2.75,0,.6876.2524,1.3164.6697,1.7988l-2.6206,3.2764c-.387-.2079-.8293-.3259-1.2991-.3259-1.51986,0-2.75,1.2321-2.75,2.75s1.23014,2.75,2.75,2.75c1.5181,0,2.75-1.2318,2.75-2.75,0-.6877-.2528-1.3167-.6704-1.799l2.6205-3.2762zM14.75,13.5002c0-.9673.7826-1.75,1.75-1.75.9661,0,1.75.7829,1.75,1.75,0,.9659-.7841,1.75-1.75,1.75-.9671,0-1.75-.7839-1.75-1.75zm-4.25,5.7493c-.96714,0-1.75.7839-1.75,1.75s.78286,1.75,1.75,1.75c.9659,0,1.75-.7841,1.75-1.75,0-.9658-.7841-1.75-1.75-1.75zM24.25,7.49951v.4875h1v-.4875h-1zm0,1.4625v.975h1v-.975h-1zm0,1.94999v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zm0,1.95v.975h1v-.975h-1zM24.25,26.512v.4875h1v-.4875h-1z'></path></svg></div><div slot='title'><sbb-title level='2' text='Streckenkarte' visual-level='6'></sbb-title></div><div slot='text'><span>Für regelmässige Streckenfahrten</span></div><div slot='action'><sbb-button label='Kaufen' size='small' variant='secondary' visual-button-only=''></sbb-button></div></sbb-card-product>
          <sbb-card-product style='height: 100%;' slot='top-product-subscription-1' appearance='primary' accessibility-label='The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography' layout='loose' href-value='https://github.com/lyne-design-system/lyne-components'><div slot='title'><sbb-title level='2' text='GA' visual-level='1'></sbb-title></div><div slot='lead'><sbb-title level='3' text='Mit dem Generalabonnement geniessen Sie freie Fahrt.' visual-level='6'></sbb-title></div><div slot='action'><sbb-button label='Alle GA im Überblick' variant='secondary' visual-button-only='true'></sbb-button></div></sbb-card-product>
          <sbb-card-product style='height: 100%;' slot='top-product-subscription-2' appearance='primary' accessibility-label='The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography' layout='loose' href-value='https://github.com/lyne-design-system/lyne-components'><div slot='title'><sbb-title level='2' text='1/2' visual-level='1'></sbb-title></div><div slot='lead'><sbb-title level='3' text='Mit dem Halbtax zum halben Preis fahren.' visual-level='6'></sbb-title></div><div slot='action'><sbb-button label='Zum halben Preis fahren' variant='secondary' visual-button-only=''></sbb-button></div></sbb-card-product>
        </sbb-grid>
        <sbb-stack appearance='horizontal--start' collapse-horizontal-below='small' gap-horizontal='fixed-4x' gap-vertical='fixed-2x'>
          <sbb-link-button href-value='https://github.com/lyne-design-system/lyne-components' icon='user-small' icon-placement='start' text='Meine Billette &amp; Abos' variant='primary'><span slot='icon'><svg width='24' height='24' viewBox='0,0,24,24' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='m9.5,8.99976c0-1.73197,1.1887-3,2.5-3s2.5,1.26803,2.5,3c0,1.73194-1.1887,3.00004-2.5,3.00004s-2.5-1.2681-2.5-3.00004zm2.5-4c-2.00269,0-3.5,1.86596-3.5,4,0,.92922.28389,1.80764.76978,2.50324C6.47282,12.9019,5,16.3669,5,19.5v.5h14v-.5c0-3.1497-1.4746-6.6059-4.2697-7.997.4858-.6957.7697-1.57405.7697-2.50324,0-2.13404-1.4973-4-3.5-4zm2.0156,7.27454c-.5617.4541-1.2519.7255-2.0156.7255-.7639,0-1.4543-.2716-2.01615-.7259C7.61923,13.2905,6.16607,16.1356,6.01337,19H17.9868c-.1522-2.8799-1.6079-5.7167-3.9712-6.7257z'></path></svg></span></sbb-link-button>
          <sbb-link-button href-value='https://github.com/lyne-design-system/lyne-components' text='Alle Produkte' variant='secondary'></sbb-link-button>
        </sbb-stack>
      </sbb-stack>
    </sbb-section>

    {/* *************************************************
    Hero Teaser section
    ************************************************* */}
    <sbb-section width='full-bleed--until-ultra' {...args}>
      <sbb-stack slot='full-width' space-leading='responsive-l' space-trailing='responsive-l'>
        <sbb-teaser-hero button-text='Mehr erfahren' loading='eager' image-src='https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg' link='https://www.sbb.ch' open-in-new-window='false' text='Rücksichtsvoll mit SBB Green Class.'></sbb-teaser-hero>
      </sbb-stack>
    </sbb-section>

    {/* *************************************************
    Footer section
    ************************************************* */}
    <sbb-footer accessibility-title='Footer' {...args}>
      <div slot='col-1'>
        <sbb-stack>
          <sbb-link-list textsize='s' title-level='2' title-text='Help &amp; Contact.' variant='positive'><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rückerstattungen' text-size='s' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Fundbüro' text-size='s' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Beschwerden' text-size='s' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Lob aussprechen' text-size='s' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Sachbeschädigung melden' text-size='s' variant='positive'></sbb-link></li></sbb-link-list>
          <sbb-stack space-leading='fixed-3x'>
            <sbb-link-button href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='All help topics' variant='primary'></sbb-link-button>
          </sbb-stack>
        </sbb-stack>
      </div>
      <div slot='col-2'>
        <sbb-link-list textsize='s' title-level='2' title-text='More SBB.' variant='positive'><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Jobs & careers' text-size='s' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rail traffic information' text-size='s' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='SBB News' text-size='s' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='SBB Community' text-size='s' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Company' text-size='s' variant='positive'></sbb-link></li></sbb-link-list>
      </div>
      <div slot='col-3'>
        <sbb-stack><sbb-title level='2' text='Newsletter.' visual-level='5'></sbb-title><p>Our newsletter regularly informs you of attractive offers from SBB via e-mail.</p><sbb-stack space-leading='fixed-3x'><sbb-link-button href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Subscribe' variant='secondary'></sbb-link-button></sbb-stack></sbb-stack>
      </div>
      <div slot='clock'>
        <sbb-clock initial-time='now' class='chromatic-ignore'></sbb-clock>
      </div>
      <div slot='bottom'>
        <sbb-link-list textsize='xs' title-level='2' title-text='' list-direction='horizontal-from-large' variant='positive'><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rückerstattungen' text-size='xs' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Fundbüro' text-size='xs' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Beschwerden' text-size='xs' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Lob aussprechen' text-size='xs' variant='positive'></sbb-link></li><li class='link-list__item' slot='link-list__item'><sbb-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Sachbeschädigung melden' text-size='xs' variant='positive'></sbb-link></li></sbb-link-list>
      </div>
    </sbb-footer>
  </div>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Home ------------------------ */
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
