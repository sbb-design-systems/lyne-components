import { h } from 'jsx-dom';
import readme from './readme.md';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- text ---------------------------------------- */

const panelText = {
  control: {
    type: 'text',
  },
  table: {
    category: 'text',
  },
};

/* --- text slot ----------------------------------- */

const sbbTextArgTypes = {
  text: panelText,
};
const sbbTextArgs = {
  text: 'Rücksichtsvoll mit SBB Green Class',
};

const SlotTemplateSbbText = (args) => <span slot="text">{args.text}</span>;

/* --- link slot ----------------------------------- */

const sbbLinkArgs = {
  href: 'https://www.sbb.ch/',
  text: 'Mehr erfahren',
};

const SlotSbbLinkTemplate = (args) => (
  <sbb-link
    slot="link"
    href-value={args.href}
    icon="chevron-small-right-small"
    icon-flip=""
    id-value=""
    text={args.text}
  >
    <span slot="icon">{getMarkupForSvg('chevron-small-right-small')}</span>
  </sbb-link>
);

const TemplateSbbPanelDefault = (args) => (
  <sbb-panel {...args}>
    <SlotTemplateSbbText {...args} />
    <SlotSbbLinkTemplate {...sbbLinkArgs} />
  </sbb-panel>
);

const TemplateSbbPanelWithoutLink = (args) => (
  <sbb-panel {...args}>
    <SlotTemplateSbbText {...args} />
  </sbb-panel>
);

export const DefaultSbbPanel = TemplateSbbPanelDefault.bind({});
export const WithoutLinkSbbPanel = TemplateSbbPanelWithoutLink.bind({});

DefaultSbbPanel.argTypes = sbbTextArgTypes;

DefaultSbbPanel.args = {
  ...sbbTextArgs,
};

WithoutLinkSbbPanel.argTypes = sbbTextArgTypes;

WithoutLinkSbbPanel.args = {
  ...sbbTextArgs,
};

DefaultSbbPanel.documentation = {
  title: 'SbbPanel, Default',
};

export default {
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-panel (Unfinished)',
};
